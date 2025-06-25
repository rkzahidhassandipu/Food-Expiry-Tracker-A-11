// src/api/FoodExpiryPromise.js
const postFoodExpiry = (foodData) => {
  return fetch("https://assignment-sooty-psi.vercel.app/FoodExpiry", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(foodData),
  }).then((res) => res.json());
};

export default postFoodExpiry;
