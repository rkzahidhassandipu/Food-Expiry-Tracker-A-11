import React, { useState } from "react";
import {
  FaLeaf,
  FaImage,
  FaTags,
  FaSortAmountUpAlt,
  FaCalendarAlt,
  FaRegFileAlt,
  FaPlus,
} from "react-icons/fa";
import postFoodExpiry from "../../Apis/FoodExpiry"; // Adjust path as needed
import useAuth from "../../Hooks/useAuth";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";

const AddFood = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const initialFormData = {
    title: "",
    imageUrl: "",
    category: "",
    quantity: "",
    expiryDate: "",
    description: "",
    email: user?.email,
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formWithData = {
        ...formData,
        currentDate: new Date().toISOString(),
        userName: user?.displayName,
      };
      const response = await postFoodExpiry(formWithData);
      console.log("Food item added:", response);
      toast.success("Food item successfully added!");
      setFormData({ ...initialFormData, email: user?.email });
      navigate("/myItems");
    } catch (error) {
      toast.error("Error posting food item:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br py-20 from-[#0B1120] to-[#0F172A] flex justify-center items-center px-4">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Food Expiry || Add Food</title>
      </Helmet>
      <div className="w-full max-w-2xl bg-[#111827] rounded-xl p-8 shadow-lg">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-2">
          Add New Food Item
        </h2>
        <p className="text-center text-gray-400 mb-8">
          Fill in the details to add an item to your inventory.
        </p>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Food Title */}
          <div>
            <label className="flex items-center gap-2 text-white mb-1">
              <FaLeaf className="text-green-400" />
              Food Title *
            </label>
            <input
              name="title"
              type="text"
              placeholder="e.g., Organic Apples"
              className="input input-bordered w-full bg-[#1F2937] text-white placeholder:text-gray-400"
              required
              onChange={handleChange}
              value={formData.title}
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="flex items-center gap-2 text-white mb-1">
              <FaImage className="text-green-400" />
              Food Image URL
            </label>
            <input
              name="imageUrl"
              type="text"
              placeholder="https://example.com/image.jpg"
              className="input input-bordered w-full bg-[#1F2937] text-white placeholder:text-gray-400"
              onChange={handleChange}
              value={formData.imageUrl}
            />
          </div>

          {/* Category and Quantity */}
          <div className="flex flex-col md:flex-row gap-5">
            <div className="flex-1">
              <label className="flex items-center gap-2 text-white mb-1">
                <FaTags className="text-green-400" />
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="select select-bordered w-full bg-[#1F2937] text-white"
              >
                <option value="" disabled>
                  Select category
                </option>
                <option value="Fruits">Fruits</option>
                <option value="Vegetables">Vegetables</option>
                <option value="Dairy">Dairy</option>
                <option value="Meat">Meat</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="flex items-center gap-2 text-white mb-1">
                <FaSortAmountUpAlt className="text-green-400" />
                Quantity *
              </label>
              <input
                name="quantity"
                type="text"
                placeholder="e.g., 5 pieces, 1 kg"
                className="input input-bordered w-full bg-[#1F2937] text-white placeholder:text-gray-400"
                required
                value={formData.quantity}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Expiry Date */}
          <div>
            <label className="flex items-center gap-2 text-white mb-1">
              <FaCalendarAlt className="text-green-400" />
              Expiry Date *
            </label>
            <input
              name="expiryDate"
              type="date"
              className="input input-bordered w-full bg-[#1F2937] text-white"
              required
              onChange={handleChange}
              value={formData.expiryDate}
            />
          </div>

          {/* Description */}
          <div>
            <label className="flex items-center gap-2 text-white mb-1">
              <FaRegFileAlt className="text-green-400" />
              Description
            </label>
            <textarea
              name="description"
              className="textarea textarea-bordered w-full bg-[#1F2937] text-white placeholder:text-gray-400"
              placeholder="Any additional notes..."
              rows="3"
              onChange={handleChange}
              value={formData.description}
            ></textarea>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="btn w-full bg-green-500 hover:bg-green-600 text-white font-semibold text-lg"
            >
              <FaPlus className="mr-2" /> Add Food Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFood;
