import React from 'react';

const getFoodStatus = (expiryDate) => {
  const now = new Date();
  const expiry = new Date(expiryDate);

  const diffInMs = expiry - now;
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

  if (diffInMs <= 0) return 'expired';
  else if (diffInDays <= 5) return 'expiring';
  return 'fresh';
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // month is 0-based
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const Expiry = ({ expireFood }) => {
  const status = getFoodStatus(expireFood);

  return (
    <div className="">
      <p className={`text-sm mt-2 ${
        status === 'expired'
          ? 'text-red-600'
          : status === 'expiring'
          ? 'text-yellow-500'
          : 'text-green-500'
      }`}>
        Expiry: {formatDate(expireFood)}
      </p>
    </div>
  );
};

export default Expiry;
