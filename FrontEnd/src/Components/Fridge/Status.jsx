import React from 'react';
import { getFoodStatus, getExpiryBgColor, statusText } from '../../utility/Status'; // adjust path as needed

const Status = ({ expireFood }) => {
  const status = getFoodStatus(expireFood);

  if (status === 'fresh') return null;

  const bgColor = getExpiryBgColor(status);

  return (
    <p className={`text-xs font-bold text-white px-2 py-1 rounded ${bgColor} inline-block`}>
      {statusText[status]}
    </p>
  );
};

export default Status;
