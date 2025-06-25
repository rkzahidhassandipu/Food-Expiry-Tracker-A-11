import React, { useEffect, useState } from "react";
import { GoAlertFill } from "react-icons/go";
import getFridgeData from "../../Apis/getFridgeData";
import { getFoodStatus } from "../../utility/Status";
import { FaClock } from "react-icons/fa";

const SoonExpiryCard = () => {
  const [expiringCount, setExpiringCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getFridgeData();
        const expiringItems = Array.isArray(data)
          ? data.filter((item) => getFoodStatus(item.expiryDate) === "expiring") // ✅ Correct logic
          : [];
        setExpiringCount(expiringItems.length);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="w-80 bg-gray-800 p-6 rounded-lg text-center shadow text-white space-y-2">
      <div className="flex justify-center">
        <FaClock className="text-yellow-400 text-3xl" />
      </div>
      <h2 className="font-bold text-5xl text-yellow-400 my-5">
        {expiringCount}
      </h2>
      <p className="text-gray-200 text-lg">Items Expiring Soon (Next 5 Days)</p>
    </div>
  );
};

export default SoonExpiryCard;
