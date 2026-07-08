import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { supabase } from "../services/supabase";
import { PlusCircle } from "lucide-react";

function AddFood() {
  const navigate = useNavigate();

  const [foodName, setFoodName] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [storageLocation, setStorageLocation] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } = await supabase.from("food_items").insert([
      {
        user_id: user.id,
        food_name: foodName,
        category,
        quantity,
        purchase_date: purchaseDate,
        expiry_date: expiryDate,
        storage_location: storageLocation,
      },
    ]);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Food Added Successfully!");
    navigate("/pantry");
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 flex justify-center items-center p-8">

        <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl p-8">

          <div className="flex items-center gap-3 mb-8">
            <PlusCircle size={35} className="text-green-600" />
            <h1 className="text-3xl font-bold text-green-700">
              Add New Food Item
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="font-semibold">
                Food Name
              </label>

              <input
                type="text"
                className="w-full border rounded-lg p-3 mt-2"
                placeholder="Enter food name"
                value={foodName}
                onChange={(e) => setFoodName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="font-semibold">
                Category
              </label>

              <select
                className="w-full border rounded-lg p-3 mt-2"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">Select Category</option>
                <option>Dairy</option>
                <option>Vegetables</option>
                <option>Fruits</option>
                <option>Bakery</option>
                <option>Beverages</option>
                <option>Snacks</option>
                <option>Frozen Food</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="font-semibold">
                Quantity
              </label>

              <input
                type="number"
                className="w-full border rounded-lg p-3 mt-2"
                placeholder="Enter quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-5">

              <div>
                <label className="font-semibold">
                  Purchase Date
                </label>

                <input
                  type="date"
                  className="w-full border rounded-lg p-3 mt-2"
                  value={purchaseDate}
                  onChange={(e) => setPurchaseDate(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="font-semibold">
                  Expiry Date
                </label>

                <input
                  type="date"
                  className="w-full border rounded-lg p-3 mt-2"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  required
                />
              </div>

            </div>

            <div>
              <label className="font-semibold">
                Storage Location
              </label>

              <select
                className="w-full border rounded-lg p-3 mt-2"
                value={storageLocation}
                onChange={(e) =>
                  setStorageLocation(e.target.value)
                }
                required
              >
                <option value="">Select Location</option>
                <option>Refrigerator</option>
                <option>Freezer</option>
                <option>Kitchen Shelf</option>
                <option>Pantry Cabinet</option>
              </select>
            </div>

            <button
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl text-lg font-semibold transition"
            >
              Add Food
            </button>

          </form>

        </div>

      </div>

    </>
  );
}

export default AddFood;