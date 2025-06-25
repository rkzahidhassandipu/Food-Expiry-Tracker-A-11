export const detailLoader = async ({ params }) => {
  const { id } = params;
  const res = await fetch(`https://assignment-sooty-psi.vercel.app/fridgeFood/${id}`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch item");
  const data = await res.json();
  return data;
};
