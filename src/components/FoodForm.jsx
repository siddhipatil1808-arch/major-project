import { useState } from "react";

function FoodForm({ onSubmit, initialData = {} }) {
  const [foodName, setFoodName] = useState(initialData.food_name || "");
  const [category, setCategory] = useState(initialData.category || "");
  const [quantity, setQuantity] = useState(initialData.quantity || "");
  const [purchaseDate, setPurchaseDate] = useState(
    initialData.purchase_date || ""
  );
  const [expiryDate, setExpiryDate] = useState(
    initialData.expiry_date || ""
  );
  const [storageLocation, setStorageLocation] = useState(
    initialData.storage_location || ""
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      food_name: foodName,
      category,
      quantity: Number(quantity),
      purchase_date: purchaseDate,
      expiry_date: expiryDate,
      storage_location: storageLocation,
    });

    setFoodName("");
    setCategory("");
    setQuantity("");
    setPurchaseDate("");
    setExpiryDate("");
    setStorageLocation("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl shadow-lg space-y-4"
    >
      <h2 className="text-2xl font-bold text-green-700">
        Add Food Item
      </h2>

      <input
        type="text"
        placeholder="Food Name"
        value={foodName}
        onChange={(e) => setFoodName(e.target.value)}
        className="w-full border p-3 rounded-lg"
        required
      />

      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full border p-3 rounded-lg"
        required
      />

      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        className="w-full border p-3 rounded-lg"
        required
      />

      <div>
        <label className="block mb-1">Purchase Date</label>
        <input
          type="date"
          value={purchaseDate}
          onChange={(e) => setPurchaseDate(e.target.value)}
          className="w-full border p-3 rounded-lg"
        />
      </div>

      <div>
        <label className="block mb-1">Expiry Date</label>
        <input
          type="date"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          className="w-full border p-3 rounded-lg"
          required
        />
      </div>

      <input
        type="text"
        placeholder="Storage Location"
        value={storageLocation}
        onChange={(e) => setStorageLocation(e.target.value)}
        className="w-full border p-3 rounded-lg"
      />

      <button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg"
      >
        Save Food Item
      </button>
    </form>
  );
}

export default FoodForm;