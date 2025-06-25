import axios from "axios";

const updateFood = async (id, updatedData) => {
  console.log(id, updatedData)
  try {
    const res = await axios.patch(
      `https://assignment-sooty-psi.vercel.app/fridge/${id}`,
      updatedData,
      {
        withCredentials: true,
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error updating food:", error);
    throw error;
  }
};

export default updateFood;
