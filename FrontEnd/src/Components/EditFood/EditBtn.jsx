import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import EditFood from "./EditFood";
import axios from "axios";
import Loading from "../Loading/Loading";

const EditBtn = ({foodId, onUpdate}) => {
  const [showPopup, setShowPopup] = useState(false);
  const [foodData, setFoodData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(showPopup){
      axios.get(`https://assignment-sooty-psi.vercel.app/fridgeFood/${foodId}`)
      .then((res) => {
        setFoodData(res.data);
        setLoading(false)
        
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
    }
  }, [showPopup, foodId])
  

  const handleEditClick = () => {
    setFoodData(null)
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  if(loading) return <Loading />

  return (
    <div>
      {/* Edit Button */}
      <FaEdit
        onClick={handleEditClick}
        className="hover:text-white cursor-pointer text-xl"
      />

      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-z-50 flex justify-center items-center">
          <EditFood onUpdate={(updatedFood) => {onUpdate(updatedFood); handleClosePopup()}} foodData={foodData} onClose={handleClosePopup} />
        </div>
      )}
    </div>
  );
};

export default EditBtn;
