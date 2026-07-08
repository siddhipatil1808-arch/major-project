import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../services/supabase";

function EditFood() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [food, setFood] = useState({
    food_name: "",
    category: "",
    quantity: "",
    purchase_date: "",
    expiry_date: "",
    storage_location: "",
  });

  useEffect(() => {
    getFood();
  }, []);

  async function getFood() {
    const { data } = await supabase
      .from("food_items")
      .select("*")
      .eq("id", id)
      .single();

    if (data) setFood(data);
  }

  async function updateFood(e) {
    e.preventDefault();

    const { error } = await supabase
      .from("food_items")
      .update({
        food_name: food.food_name,
        category: food.category,
        quantity: food.quantity,
        purchase_date: food.purchase_date,
        expiry_date: food.expiry_date,
        storage_location: food.storage_location,
      })
      .eq("id", id);

    if (!error) {
      alert("Food Updated Successfully");
      navigate("/pantry");
    }
  }

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6 text-green-700">
        Edit Food
      </h1>

      <form onSubmit={updateFood} className="space-y-4">

        <input
          className="border p-3 rounded w-full"
          placeholder="Food Name"
          value={food.food_name}
          onChange={(e) =>
            setFood({ ...food, food_name: e.target.value })
          }
        />

        <input
          className="border p-3 rounded w-full"
          placeholder="Category"
          value={food.category}
          onChange={(e) =>
            setFood({ ...food, category: e.target.value })
          }
        />

        <input
          className="border p-3 rounded w-full"
          placeholder="Quantity"
          value={food.quantity}
          onChange={(e) =>
            setFood({ ...food, quantity: e.target.value })
          }
        />

        <input
          type="date"
          className="border p-3 rounded w-full"
          value={food.purchase_date}
          onChange={(e) =>
            setFood({ ...food, purchase_date: e.target.value })
          }
        />

        <input
          type="date"
          className="border p-3 rounded w-full"
          value={food.expiry_date}
          onChange={(e) =>
            setFood({ ...food, expiry_date: e.target.value })
          }
        />

        <input
          className="border p-3 rounded w-full"
          placeholder="Storage Location"
          value={food.storage_location}
          onChange={(e) =>
            setFood({
              ...food,
              storage_location: e.target.value,
            })
          }
        />

        <button className="bg-green-600 text-white px-6 py-3 rounded">
          Update Food
        </button>

      </form>
    </div>
  );
}

export default EditFood;