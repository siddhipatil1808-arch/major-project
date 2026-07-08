import { useState } from "react";

function RecipeAI() {
  const [ingredients, setIngredients] = useState("");
  const [recipe, setRecipe] = useState("");
  const [loading, setLoading] = useState(false);

  function generateRecipe() {
    if (!ingredients.trim()) {
      alert("Please enter ingredients");
      return;
    }

    setLoading(true);
    setRecipe("");

    setTimeout(() => {
      const recipes = [
        {
          name: "🥗 Healthy Vegetable Salad",
          steps: [
            "Wash all vegetables properly.",
            "Cut vegetables into small pieces.",
            "Add salt, pepper and lemon juice.",
            "Mix everything well.",
            "Serve fresh."
          ]
        },
        {
          name: "🥪 Veg Sandwich",
          steps: [
            "Prepare bread slices.",
            "Add vegetables and cheese.",
            "Apply sauce or chutney.",
            "Toast the sandwich.",
            "Serve hot."
          ]
        },
        {
          name: "🍝 Quick Pasta",
          steps: [
            "Boil pasta for 10 minutes.",
            "Prepare sauce with ingredients.",
            "Mix pasta with sauce.",
            "Add spices.",
            "Cook for few minutes and serve."
          ]
        }
      ];

      const randomRecipe =
        recipes[Math.floor(Math.random() * recipes.length)];

      setRecipe(`
✨ AI Recipe Suggestion

🥘 Recipe:
${randomRecipe.name}

🧺 Available Ingredients:
${ingredients}

👩‍🍳 Cooking Steps:

${randomRecipe.steps
  .map((step, index) => `${index + 1}. ${step}`)
  .join("\n")}


⏱ Cooking Time:
15-20 minutes

🔥 Difficulty:
Easy

Enjoy your delicious meal! 😋
      `);

      setLoading(false);
    }, 1500);
  }

  return (
    <div className="min-h-screen bg-green-50 flex justify-center p-8">

      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-3xl">

        <h1 className="text-4xl font-bold text-green-700 text-center mb-3">
          🤖 AI Recipe Generator
        </h1>

        <p className="text-gray-500 text-center mb-6">
          Enter your available ingredients and get smart recipe ideas
        </p>


        <textarea
          rows="5"
          placeholder="Example: Tomato, Onion, Bread, Cheese..."
          className="border border-gray-300 w-full rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-green-500"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />


        <button
          onClick={generateRecipe}
          className="mt-5 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition"
        >
          {loading ? "Generating Recipe..." : "Generate Recipe 🍳"}
        </button>


        {loading && (
          <div className="text-center mt-6 text-green-600 font-medium">
            AI is creating your recipe... 🤖
          </div>
        )}


        {recipe && !loading && (
          <div className="mt-8 bg-green-100 border border-green-300 rounded-xl p-6 whitespace-pre-line">

            <h2 className="text-2xl font-bold text-green-800 mb-3">
              Your Recipe
            </h2>

            <p className="text-gray-700">
              {recipe}
            </p>

          </div>
        )}

      </div>

    </div>
  );
}

export default RecipeAI;