import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import EditFood from "../EditFood/EditFood";
import axios from "axios";
import Delete from "../Delete/Delete";

const EditDelete = ({ setData, onUpdate, foodId, onDelete }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [foodData, setFoodData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (showPopup) {
      setLoading(true);
      axios
        .get(`https://assignment-sooty-psi.vercel.app/fridgeFood/${foodId}`)
        .then((res) => {
          setFoodData(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [showPopup, foodId]);

  const handleDeleteSuccess = () => {
    onDelete();
  };

  const handleClosePopup = () => setShowPopup(false);

  return (
    <div className="w-full">
      <div className="flex w-full gap-5">
        <button
          onClick={() => setShowPopup(true)}
          className="w-1/2 flex items-center justify-center gap-2 bg-green-600 cursor-pointer hover:bg-green-500 text-white py-2 px-4 rounded-md"
        >
          <FaEdit /> Edit
        </button>

        <Delete
          Delete={Delete}
          item={foodId}
          onDeleteSuccess={handleDeleteSuccess}
        />
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur z-50 flex justify-center items-center">
          {loading ? (
            <div className="text-white">Loading...</div>
          ) : (
            <EditFood
              foodData={foodData}
              onClose={handleClosePopup}
              onUpdate={(updatedFood) => {
                onUpdate(updatedFood);
                handleClosePopup();
              }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default EditDelete;
