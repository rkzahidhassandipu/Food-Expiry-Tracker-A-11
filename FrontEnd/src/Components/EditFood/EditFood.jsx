import axios from "axios";
import React from "react";
import {
  FaCalendarAlt,
  FaImage,
  FaLeaf,
  FaPlus,
  FaRegFileAlt,
  FaSortAmountUpAlt,
  FaTags,
} from "react-icons/fa";
import { toast } from "react-toastify";

const EditFood = ({ onClose, foodData, onUpdate }) => {
 const updateFoodStatus = async (id, updatedData) => {
  console.log(id, updatedData)
    try {
      const res = await axios.patch(`https://assignment-sooty-psi.vercel.app/fridge/${id}`, updatedData, {
        withCredentials: true,
      });
      console.log("Update result:", res.data);
      toast.success("Your Food is updated")
      // ✅ Update local UI with new data
      if (onUpdate) {
        onUpdate({ ...foodData, ...updatedData });
      }

      onClose();
    } catch (error) {
      toast.error("Error updating status:", error)
    }
  };
  const handleUpdated = (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedItem = {
      title: form.title.value,
      imageUrl: form.imageUrl.value,
      category: form.category.value,
      quantity: form.quantity.value,
      expiryDate: form.expiryDate.value,
      description: form.description.value,
    };

    updateFoodStatus(foodData._id, updatedItem);
  };

  return (
    <div className="fixed inset-0 z-50 mt-10 flex justify-center items-center px-4">
      <div className="w-full max-w-2xl max-h-[80vh] overflow-y-auto bg-gray-800 rounded-xl p-8 shadow-lg relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 cursor-pointer text-white text-xl font-bold hover:text-red-500"
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-2">
          Edit Food Item
        </h2>
        <p className="text-center text-gray-400 mb-8">
          Fill in the details to update your item.
        </p>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleUpdated}>
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
              defaultValue={foodData?.title}
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
              defaultValue={foodData?.imageUrl}
              placeholder="https://example.com/image.jpg"
              className="input input-bordered w-full bg-[#1F2937] text-white placeholder:text-gray-400"
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
                defaultValue={foodData?.category}
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
                defaultValue={foodData?.quantity}
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
              defaultValue={foodData?.expiryDate}
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
              defaultValue={foodData?.description}
            ></textarea>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="btn w-full bg-green-500 hover:bg-green-600 text-white font-semibold text-lg"
            >
              <FaPlus className="mr-2" /> Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditFood;
