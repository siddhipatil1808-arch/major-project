import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { supabase } from "../services/supabase";
import {
  Search,
  Pencil,
  Trash2,
  Package,
} from "lucide-react";

function Pantry() {
  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchFoods();
  }, []);

  async function fetchFoods() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("food_items")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);
      return;
    }

    setFoods(data || []);
  }

  async function deleteFood(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );

    if (!confirmDelete) return;

    await supabase.from("food_items").delete().eq("id", id);

    fetchFoods();
  }

  function getStatus(expiryDate) {
    const today = new Date();

    const diff = Math.ceil(
      (new Date(expiryDate) - today) /
        (1000 * 60 * 60 * 24)
    );

    if (diff < 0)
      return (
        <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm">
          Expired
        </span>
      );

    if (diff <= 3)
      return (
        <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
          Expiring
        </span>
      );

    return (
      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
        Fresh
      </span>
      );
  }

  const filteredFoods = foods.filter((food) =>
    food.food_name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />

      <div className="p-8">

        <div className="flex justify-between items-center mb-8">

          <h1 className="text-4xl font-bold text-green-700">
            My Pantry
          </h1>

          <Link
            to="/add-food"
            className="bg-green-600 text-white px-5 py-3 rounded-lg"
          >
            + Add Food
          </Link>

        </div>

        <div className="relative mb-8">

          <Search
            size={20}
            className="absolute left-4 top-4 text-gray-500"
          />

          <input
            type="text"
            placeholder="Search food..."
            className="w-full border rounded-lg pl-12 p-3"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

        {filteredFoods.length === 0 ? (

          <div className="text-center mt-20">

            <Package
              size={70}
              className="mx-auto text-gray-400"
            />

            <h2 className="text-2xl mt-4">
              No Food Items Found
            </h2>

          </div>

        ) : (

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {filteredFoods.map((food) => (

              <div
                key={food.id}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition"
              >

                <div className="flex justify-between">

                  <h2 className="text-2xl font-bold">
                    {food.food_name}
                  </h2>

                  {getStatus(food.expiry_date)}

                </div>

                <div className="mt-5 space-y-2">

                  <p>
                    <b>Category:</b> {food.category}
                  </p>

                  <p>
                    <b>Quantity:</b> {food.quantity}
                  </p>

                  <p>
                    <b>Purchase:</b> {food.purchase_date}
                  </p>

                  <p>
                    <b>Expiry:</b> {food.expiry_date}
                  </p>

                  <p>
                    <b>Storage:</b>{" "}
                    {food.storage_location}
                  </p>

                </div>

                <div className="flex gap-3 mt-6">

                  <Link
                    to={`/edit/${food.id}`}
                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg flex justify-center items-center gap-2"
                  >
                    <Pencil size={18} />
                    Edit
                  </Link>

                  <button
                    onClick={() =>
                      deleteFood(food.id)
                    }
                    className="flex-1 bg-red-600 text-white py-2 rounded-lg flex justify-center items-center gap-2"
                  >
                    <Trash2 size={18} />
                    Delete
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>
    </>
  );
}

export default Pantry;