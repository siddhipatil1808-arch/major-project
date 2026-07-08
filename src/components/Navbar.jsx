import { Link, useNavigate } from "react-router-dom";
import { Refrigerator } from "lucide-react";
import { supabase } from "../services/supabase";

function Navbar() {
  const navigate = useNavigate();

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/login");
  }

  return (
    <nav className="navbar">

      <div className="logo">
        <Refrigerator size={32} />
        <h2>PantryPal</h2>
      </div>

      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/pantry">Pantry</Link>
        <Link to="/add-food">Add Food</Link>
        <Link to="/recipe-ai">AI Recipe</Link>

        <button
          onClick={handleLogout}
          className="logout-btn"
        >
          Logout
        </button>
      </div>

    </nav>
  );
}

export default Navbar;