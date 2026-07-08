import {
  Package,
  Bell,
  Brain,
  ShoppingCart
} from "lucide-react";

function Features() {
  return (
    <section className="features">

      <h2>Why Choose PantryPal?</h2>

      <div className="feature-grid">

        <div className="card">
          <Package size={45} />
          <h3>Pantry Management</h3>
          <p>
            Organize every food item in one place.
          </p>
        </div>

        <div className="card">
          <Bell size={45} />
          <h3>Expiry Alerts</h3>
          <p>
            Get notified before food expires.
          </p>
        </div>

        <div className="card">
          <Brain size={45} />
          <h3>AI Recipe</h3>
          <p>
            Generate recipes using pantry ingredients.
          </p>
        </div>

        <div className="card">
          <ShoppingCart size={45} />
          <h3>Shopping List</h3>
          <p>
            Create grocery lists instantly.
          </p>
        </div>

      </div>

    </section>
  );
}

export default Features;