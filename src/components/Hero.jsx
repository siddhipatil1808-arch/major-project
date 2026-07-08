import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="hero">

      <div className="hero-content">

        <h1>
          Smart Food
          <span> Expiry </span>
          & Pantry Manager
        </h1>

        <p>
          Organize your pantry, reduce food waste,
          receive expiry alerts and generate AI-powered recipes
          from ingredients already available at home.
        </p>

        <div className="hero-buttons">

          <Link to="/register">
            <button className="primary-btn">
              Get Started
            </button>
          </Link>

          <Link to="/dashboard">
            <button className="secondary-btn">
              Explore Dashboard
            </button>
          </Link>

        </div>

      </div>

    </section>
  );
}

export default Hero;