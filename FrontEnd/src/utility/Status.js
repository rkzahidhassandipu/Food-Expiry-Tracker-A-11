// foodStatusUtils.js

export const getFoodStatus = (expiryDate) => {
  if (!expiryDate || isNaN(new Date(expiryDate).getTime())) {
    return null; // no valid expiry date
  }

  const now = new Date();
  const expiry = new Date(expiryDate);

  const diffInMs = expiry - now;
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

  if (diffInMs <= 0) return 'expired';
  else if (diffInDays <= 5) return 'expiring';
  return 'fresh';
};


export const getExpiryBgColor = (status) => {
  switch (status) {
    case 'expired':
      return 'bg-red-600';
    case 'expiring':
      return 'bg-yellow-500';
    default:
      return '';
  }
};
export const getExpiryTextColor = (status) => {
  switch (status) {
    case 'expired':
      return 'text-red-600';
    case 'expiring':
      return 'text-yellow-500';
    case 'fresh':
      return 'text-green-600';
    default:
      return '';
  }
};

export const statusText = {
  fresh: "Fresh",
  expiring: "EXPIRES SOON",
  expired: "EXPIRED",
};
