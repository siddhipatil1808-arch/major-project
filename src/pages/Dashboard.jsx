import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { supabase } from "../services/supabase";
import {
  Package,
  CheckCircle,
  AlertTriangle,
  XCircle,
} from "lucide-react";

function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    fresh: 0,
    expiring: 0,
    expired: 0,
  });

  const [recentFoods, setRecentFoods] = useState([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
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

    let fresh = 0;
    let expiring = 0;
    let expired = 0;

    const today = new Date();

    data.forEach((item) => {
      const diff = Math.ceil(
        (new Date(item.expiry_date) - today) /
          (1000 * 60 * 60 * 24)
      );

      if (diff < 0) expired++;
      else if (diff <= 3) expiring++;
      else fresh++;
    });

    setStats({
      total: data.length,
      fresh,
      expiring,
      expired,
    });

    setRecentFoods(data.slice(0, 5));
  }

  function getStatus(date) {
    const today = new Date();

    const diff = Math.ceil(
      (new Date(date) - today) /
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

  return (
    <>
      <Navbar />

      <div className="p-8">

        <h1 className="text-4xl font-bold text-green-700 mb-8">
          Dashboard
        </h1>

        {/* Statistics */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

          <div className="bg-blue-500 text-white rounded-xl p-6 shadow-lg">
            <Package size={40} />
            <h3 className="mt-4">Total Items</h3>
            <h1 className="text-4xl font-bold">
              {stats.total}
            </h1>
          </div>

          <div className="bg-green-500 text-white rounded-xl p-6 shadow-lg">
            <CheckCircle size={40} />
            <h3 className="mt-4">Fresh</h3>
            <h1 className="text-4xl font-bold">
              {stats.fresh}
            </h1>
          </div>

          <div className="bg-yellow-500 text-white rounded-xl p-6 shadow-lg">
            <AlertTriangle size={40} />
            <h3 className="mt-4">Expiring</h3>
            <h1 className="text-4xl font-bold">
              {stats.expiring}
            </h1>
          </div>

          <div className="bg-red-500 text-white rounded-xl p-6 shadow-lg">
            <XCircle size={40} />
            <h3 className="mt-4">Expired</h3>
            <h1 className="text-4xl font-bold">
              {stats.expired}
            </h1>
          </div>

        </div>

        {/* Recent Food Items */}

        <div className="bg-white rounded-xl shadow-lg p-6">

          <h2 className="text-2xl font-bold mb-5">
            Recent Food Items
          </h2>

          {recentFoods.length === 0 ? (
            <p>No food items found.</p>
          ) : (
            <table className="w-full">

              <thead>

                <tr className="border-b">

                  <th className="text-left py-3">
                    Food
                  </th>

                  <th className="text-left">
                    Category
                  </th>

                  <th className="text-left">
                    Quantity
                  </th>

                  <th className="text-left">
                    Status
                  </th>

                </tr>

              </thead>

              <tbody>

                {recentFoods.map((food) => (

                  <tr
                    key={food.id}
                    className="border-b"
                  >

                    <td className="py-4">
                      {food.food_name}
                    </td>

                    <td>
                      {food.category}
                    </td>

                    <td>
                      {food.quantity}
                    </td>

                    <td>
                      {getStatus(food.expiry_date)}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>
          )}

        </div>

      </div>
    </>
  );
}

export default Dashboard;