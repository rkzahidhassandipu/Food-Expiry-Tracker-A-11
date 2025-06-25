const commentsFood = async (com) => {
  return fetch("https://assignment-sooty-psi.vercel.app/comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(com),
  }).then((res) => res.json());
};
export default commentsFood;
