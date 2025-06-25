import { useEffect, useState } from "react";
import getFridgeData from "../../Apis/getFridgeData";
import FridgeCard from "../../Components/Fridge/FridgeCard";
import Loading from "../../Components/Loading/Loading";
import { Helmet } from "react-helmet";

export default function Fridge() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("all");

  useEffect(() => {
    getFridgeData()
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch fridge data:", error);
        setLoading(false);
      });
  }, []);

  const getFoodStatus = (expiryDate) => {
    const now = new Date();
    const expiry = new Date(expiryDate);
    const diffInMs = expiry - now;
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

    if (diffInMs <= 0) return "expired";
    else if (diffInDays <= 5) return "expiring";
    return "fresh";
  };

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory = category === "All" || item.category === category;
    const matchesStatus =
      status === "all" || getFoodStatus(item.expiryDate) === status;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="min-h-screen w-4/5 mx-auto text-white p-6">
       <Helmet>
        <meta charSet="utf-8" />
        <title>Food Expiry || Fridge</title>
      </Helmet>
      <h1 className="text-4xl font-bold text-center mb-4">Community Fridge</h1>
      <p className="text-center text-gray-400 mb-6">
        Browse all food items shared by the community. Filter by category,
        status, or search for specific items.
      </p>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-center mb-6 py-6 px-3 rounded-xl duration-300 hover:shadow-md shadow-green-700 bg-gray-900">
        <input
          type="text"
          placeholder="Search food items..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 rounded-md bg-slate-800 text-white w-full"
        />

        <select
          className="p-2 rounded-md bg-slate-800 text-white w-full"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Vegetables">Vegetables</option>
          <option value="Fruits">Fruits</option>
          <option value="Dairy">Dairy</option>
          <option value="Meat">Meat</option>
          <option value="Others">Others</option>
        </select>

        <select
          className="p-2 rounded-md bg-slate-800 text-white w-full"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="fresh">Fresh</option>
          <option value="expiring">Expiring Soon</option>
          <option value="expired">Expired</option>
        </select>
      </div>

      {/* Grid */}
      {loading ? (
        <Loading />
      ) : filteredItems.length === 0 ? (
        <p className="text-center text-red-400">
          No matching food items found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map((item, idx) => (
            <FridgeCard key={idx} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
