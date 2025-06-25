import React, { useEffect, useState } from "react";
import getFridgeData from "../../Apis/getFridgeData";
import { getFoodStatus } from "../../utility/Status";
import { Link, useNavigate } from "react-router"; 
import ExpirIcons from "../Fridge/ExpirIcons";
import Status from "../Fridge/Status";
import Expiry from "../Fridge/Expiry";
import useAuth from "../../Hooks/useAuth";

const ExpiredItemsCard = () => {
  const [expiringItems, setExpiringItems] = useState([]);
  const { user } = useAuth();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getFridgeData();
        const expired = Array.isArray(data)
          ? data.filter((item) => getFoodStatus(item.expiryDate) === "expired")
          : [];
        setExpiringItems(expired);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {expiringItems.length === 0 ? (
        <p className="text-center text-gray-400">No items expiring soon.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {expiringItems.map((item) => (
            <div key={item._id} className="bg-slate-900 text-white rounded-2xl shadow-md overflow-hidden">
              <div className="relative">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-48 object-cover rounded-t-2xl"
                />
                <div className="absolute top-2 right-2 bg-opacity-70 px-2 py-1 rounded">
                  <Status expireFood={item?.expiryDate} />
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-bold capitalize">{item.title}</h2>
                  <ExpirIcons expireFood={item?.expiryDate} />
                </div>
                <p className="text-sm text-gray-400 mt-1">
                  Category: {item.category}
                </p>
                <p className="text-sm text-gray-400">
                  Quantity: {item.quantity}
                </p>
                <p className="text-sm text-green-400">
                  <Expiry expireFood={item?.expiryDate} />
                </p>
                <p className="text-sm text-gray-500 mt-1 mb-3">
                  Added by: {item.userName}
                </p>
                <div className="border-t border-gray-700 mb-3"></div>
               <Link
                  to={user ? `/fridgeFood/${item._id}` : "/login"}
                  state={user ? undefined : { from: `/fridgeFood/${item._id}` }}
                  className="block w-full border border-green-700 py-2 text-green-700 hover:bg-gray-800 rounded duration-300 text-center"
                >
                  See Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExpiredItemsCard;
