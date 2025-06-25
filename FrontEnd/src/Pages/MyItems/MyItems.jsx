import React, { useEffect, useState } from "react";
import { FaPlusCircle, FaEye } from "react-icons/fa";
import { Link } from "react-router";
import EditBtn from "../../Components/EditFood/EditBtn";
import useAuth from "../../Hooks/useAuth";
import getFridgeData from "../../Apis/getFridgeData";
import Loading from "../../Components/Loading/Loading";
import {
  getFoodStatus,
  getExpiryTextColor,
  statusText,
} from "../../utility/Status";
import Delete from "../../Components/Delete/Delete";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { fadeIn } from "../../Components/animation/motions";

const MyItems = () => {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const filteredItems = Array.isArray(items)
    ? items.filter((item) => item.email === user.email)
    : [];

  useEffect(() => {
    if (user?.email) {
      setLoading(true);
      getFridgeData(user.email, user.accessToken)
        .then((data) => {
          const dataArray = Array.isArray(data)
            ? data
            : data && typeof data === "object"
            ? [data]
            : [];
          setItems(dataArray);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Failed to fetch items:", error);
          setItems([]);
          setLoading(false);
        });
    }
  }, [user?.email]);

  const handleUpdateSuccess = (updatedItem) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item._id === updatedItem._id ? updatedItem : item
      )
    );
  };

  const handleDeleteSuccess = (deletedItemId) => {
    setItems((prevItems) =>
      prevItems.filter((item) => item._id !== deletedItemId)
    );
  };

  if (loading) return <Loading />;

  return (
    <div className="p-4 md:p-10 text-white font-sans">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Food Expiry || My Items</title>
      </Helmet>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">My Food Items</h1>
            <p className="text-gray-400">
              Manage your personal food inventory.
            </p>
          </div>
          <Link to={"/addFood"}>
            <button className="bg-green-500 duration-300 cursor-pointer hover:bg-green-600 text-white font-semibold py-2 px-4 rounded flex items-center gap-2">
              <FaPlusCircle /> Add New Item
            </button>
          </Link>
        </div>

        {/* Table for medium+ screens */}
        <div className="hidden md:block bg-[#1e293b] rounded-lg overflow-x-auto">
          <table className="w-full text-left table-auto min-w-[700px]">
            <thead className="text-gray-400 bg-[#1e293b] border-b border-gray-600">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Quantity</th>
                <th className="px-6 py-4">Expiry Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item, idx) => {
                const expiryStatus = getFoodStatus(item.expiryDate);
                const expiryColorClass = getExpiryTextColor(expiryStatus);
                const expiryStatusText = statusText[expiryStatus];

                return (
                  <motion.tr
                    key={item._id}
                    variants={fadeIn("up", idx * 0.1)}
                    initial="hidden"
                    animate="show"
                    viewport={{ once: true }}
                    className="border-t border-gray-700 hover:bg-[#334155] transition"
                  >
                    <td className="px-6 py-4">{item.title}</td>
                    <td className="px-6 py-4">{item.category}</td>
                    <td className="px-6 py-4">{item.quantity}</td>
                    <td className="px-6 py-4">{item.expiryDate}</td>
                    <td className={`px-6 py-4 ${expiryColorClass}`}>
                      {expiryStatusText}
                    </td>
                    <td className="px-6 py-4 text-right flex justify-end gap-4 text-gray-300">
                      <Link to={`/fridgeFood/${item._id}`}>
                        <FaEye className="hover:text-white cursor-pointer" />
                      </Link>
                      <EditBtn
                        foodId={item._id}
                        onUpdate={handleUpdateSuccess}
                        className="text-lg hover:text-white"
                      />
                      <Delete
                        item={item._id}
                        onDeleteSuccess={handleDeleteSuccess}
                      />
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Card view for small screens */}
        {/* Card view for small screens */}
        <div className="md:hidden space-y-4">
          {filteredItems.map((item, idx) => {
            const expiryStatus = getFoodStatus(item.expiryDate);
            const expiryColorClass = getExpiryTextColor(expiryStatus);
            const expiryStatusText = statusText[expiryStatus];

            return (
              <motion.div
                key={item._id}
                variants={fadeIn("up", idx * 0.1)}
                initial="hidden"
                animate="show"
                viewport={{ once: true }}
                className="bg-[#1e293b] p-4 rounded-md"
              >
                <h3 className="text-lg font-bold">{item.title}</h3>
                <p className="text-sm text-gray-400">
                  Category: {item.category}
                </p>
                <p className="text-sm text-gray-400">
                  Quantity: {item.quantity}
                </p>
                <p className="text-sm text-gray-400">
                  Expiry: {item.expiryDate}
                </p>
                <p className={`text-sm ${expiryColorClass}`}>
                  {expiryStatusText}
                </p>
                <div className="flex gap-4 mt-3 text-gray-300">
                  <Link to={`/fridgeFood/${item._id}`}>
                    <FaEye className="hover:text-white" />
                  </Link>
                  <EditBtn
                    foodId={item._id}
                    onUpdate={handleUpdateSuccess}
                    className="text-lg hover:text-white"
                  />
                  <Delete
                    item={item._id}
                    onDeleteSuccess={handleDeleteSuccess}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MyItems;
