import React, { useEffect, useState, Suspense } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import Loading from "../Loading/Loading";
import { FaArrowLeft } from "react-icons/fa";
import EditDelete from "./EditDelete";
import ExpirDateCountDown from "./ExpirDateCountDown";
import useAuth from "../../Hooks/useAuth";
import {
  getFoodStatus,
  getExpiryTextColor,
  statusText,
} from "../../utility/Status";
import NotesSection from "./NotesSection ";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";

const Details = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchFoodDetails = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://assignment-sooty-psi.vercel.app/fridgeFood/${id}`
      );
      setData(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error loading food item:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoodDetails();
  }, [id]);

  const handleUpdateSuccess = (updatedData) => {
    setData(updatedData);
  };

  if (loading) return <Loading />;

  const expiryStatus = getFoodStatus(data.expiryDate);
  const expiryColorClass = getExpiryTextColor(expiryStatus);
  const expiryStatusText = statusText[expiryStatus];

  return (
    <motion.div
      className="min-h-screen w-4/5 mx-auto text-white px-6 py-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <Helmet>
        <meta charSet="utf-8" />
        <title>Food Expiry || Details</title>
      </Helmet>

      <button
        className="flex items-center text-sm mb-4 text-blue-400 hover:text-blue-300"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft className="mr-1" /> Back
      </button>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Animated Image Section */}
        <motion.div
          className="lg:w-1/2"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src={data.imageUrl}
            alt="Food"
            className="rounded-lg w-full object-cover h-full max-h-[500px]"
          />
        </motion.div>

        {/* Animated Info Section */}
        <motion.div
          className="lg:w-1/2 flex flex-col justify-between bg-[#0f172a] p-6 rounded-lg shadow-lg"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div>
            <h1 className="text-2xl font-bold">{data.title}</h1>
            <p className={`${expiryColorClass} font-bold`}>
              {expiryStatusText}
            </p>

            <div className="mt-4">
              <p className="text-gray-400 text-sm mb-1">Time Until Expiry:</p>
              {expiryStatus !== "expired" ? (
                <ExpirDateCountDown expireDate={data.expiryDate} />
              ) : (
                <p className="font-bold text-red-500">Item has expired.</p>
              )}
            </div>

            <div className="mt-6 space-y-2 text-sm">
              <p>
                <span className="text-gray-400">Category:</span> {data.category}
              </p>
              <p>
                <span className="text-gray-400">Quantity:</span> {data.quantity}
              </p>
              <p>
                <span className="text-gray-400">Added:</span>{" "}
                {new Date(data.currentDate).toLocaleString()}
              </p>
              <p>
                <span className="text-gray-400">Expires:</span>{" "}
                <span className={expiryColorClass}>{data.expiryDate}</span>
              </p>
              <p>
                <span className="text-gray-400">Description:</span>{" "}
                {data.description}
              </p>
              <p>
                <span className="text-gray-400">Added by:</span> {data.userName}
              </p>
            </div>
          </div>

          {user?.email === data.email && (
            <div className="mt-6 flex gap-4">
              <Suspense fallback={<div>Loading...</div>}>
                <EditDelete
                  onDelete={() => navigate(-1)}
                  setData={setData}
                  foodId={data._id}
                  onUpdate={handleUpdateSuccess}
                />
              </Suspense>
            </div>
          )}
        </motion.div>
      </div>

      {/* Notes Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <NotesSection data={data} />
      </motion.div>
    </motion.div>
  );
};

export default Details;
