import React, { useEffect, useState } from "react";

const ExpirDateCountDown = ({ expireDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    const countDown = () => {
      if (!expireDate) return;

      const targetDate = new Date(expireDate);
      if (isNaN(targetDate.getTime())) {
        return;
      }

      const now = new Date();
      const difference = targetDate - now;

      if (difference > 0) {
        setExpired(false);
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({
          days: String(days).padStart(2, "0"),
          hours: String(hours).padStart(2, "0"),
          minutes: String(minutes).padStart(2, "0"),
          seconds: String(seconds).padStart(2, "0"),
        });
      } else {
        setExpired(true);
        setTimeLeft({
          days: "00",
          hours: "00",
          minutes: "00",
          seconds: "00",
        });
      }
    };

    const interval = setInterval(countDown, 1000);
    return () => clearInterval(interval);
  }, [expireDate]);

  if (expired) {
    return <div className="text-center text-red-500 font-bold">Expired</div>;
  }

  return (
    <div className="flex items-center justify-between bg-[#1e293b] rounded-lg p-4 text-center">
      {Object.entries(timeLeft).map(([label, value]) => (
        <div key={label}>
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-sm text-gray-400">{label.toUpperCase()}</p>
        </div>
      ))}
    </div>
  );
};

export default ExpirDateCountDown;
