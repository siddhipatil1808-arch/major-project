import { Routes, Route } from "react-router-dom";

import AddFood from "./pages/AddFood";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Pantry from "./pages/Pantry";
import EditFood from "./pages/EditFood";
import RecipeAI from "./pages/RecipeAI";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/add-food" element={<AddFood />} />
      <Route path="/pantry" element={<Pantry />} />
      <Route path="/edit-food/:id" element={<EditFood />} />
      <Route path="/recipe-ai" element={<RecipeAI />} />
    </Routes>
  );
}

export default App;