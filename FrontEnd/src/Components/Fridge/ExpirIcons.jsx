import React from 'react';
import {
  FaCheckCircle,
  FaClock,
  FaExclamationTriangle,
} from 'react-icons/fa';
import { getFoodStatus } from '../../utility/Status';

const statusIcons = {
  fresh: <FaCheckCircle className="text-green-500 text-xl" />,
  expiring: <FaClock className="text-yellow-400 text-xl" />,
  expired: <FaExclamationTriangle className="text-red-600 text-xl" />,
};

const ExpirIcons = ({ expireFood }) => {
  const status = getFoodStatus(expireFood);

  // Only show icon if there's a valid status
  if (!status) return null;

  return (
    <p className={`text-xs font-bold text-white px-2 py-1 rounded inline-block`}>
      {statusIcons[status]}
    </p>
  );
};

export default ExpirIcons;
