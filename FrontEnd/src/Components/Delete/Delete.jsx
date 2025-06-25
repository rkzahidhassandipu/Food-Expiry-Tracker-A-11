import React from "react";
import Swal from "sweetalert2";
import deleteFridgeFood from "../../Apis/deleteFridgeFood";
import { FaTrash } from "react-icons/fa";

const Delete = ({ item, onDeleteSuccess, Delete = false }) => {
  const handleDelete = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await deleteFridgeFood(item);
          if (res?.deletedCount > 0) {
            Swal.fire("Deleted!", "Your item has been deleted.", "success");
            onDeleteSuccess(item);
          } else {
            Swal.fire("Failed!", "Something went wrong.", "error");
          }
        } catch (err) {
          Swal.fire("Error!", "An error occurred while deleting.", "error");
          console.error(err);
        }
      }
    });
  };

  return (
    <button onClick={handleDelete} className={
    Delete
      ? "w-1/2 flex items-center justify-center gap-2 bg-red-600 cursor-pointer hover:bg-red-500 text-white py-2 px-4 rounded-md"
      : "flex gap-4 items-center justify-center cursor-pointer"
  }>
      <FaTrash className="hover:text-red-500 cursor-pointer" />
      {Delete && <span>Delete</span>}
    </button>
  );
};

export default Delete;
// <div
//   className={
//     delete
//       ? "w-1/2 flex items-center justify-center gap-2 bg-red-600 cursor-pointer hover:bg-red-500 text-white py-2 px-4 rounded-md"
//       : "flex gap-4 items-center justify-center cursor-pointer"
//   }
// >
//   {/* Your content here */}
// </div>