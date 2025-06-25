import { FaPlusCircle } from "react-icons/fa";
import { useState } from "react";
import { getFoodStatus } from "../../utility/Status";
import commentsFood from "../../Apis/comments";
import { toast } from "react-toastify";
import Comments from "../Comments/Comments";
import useAuth from "../../Hooks/useAuth";

const NotesSection = ({ data }) => {
  const { user } = useAuth();
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);
  const [newComment, setNewComment] = useState(null);

  const expiryStatus = getFoodStatus(data.expiryDate);

  const handleAddNote = async () => {
    const trimmedNote = note.trim();
    if (!trimmedNote) return;

    const commentObj = {
      foodId: data._id,
      note: trimmedNote,
      userName: user?.displayName,
      date: new Date().toISOString(),
    };

    try {
      const res = await commentsFood(commentObj);
      if (res.success || res.insertedId) {
        const finalComment = {
          ...commentObj,
          _id: res.insertedId || Date.now().toString(),
        };

        setNewComment(finalComment);
        setNotes([...notes, trimmedNote]);
        setNote("");
        toast.success("Note added successfully!");
      } else {
        toast.error("Failed to add note.");
      }
    } catch (error) {
      toast.error("Error adding note.");
      console.log(error);
    }
  };

  return (
    <div className="mt-12 border-t border-gray-600 pt-6">
      <p className="text-lg font-semibold text-green-400 flex items-center gap-2 mb-4">
        <span className="text-2xl">💬</span> Notes
      </p>

      {user?.email === data.email ? (
        <div className="bg-[#0f172a] p-4 rounded-lg w-full">
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Add a note about this item (e.g., storage tips, recipe ideas)..."
            className="w-full bg-[#1e293b] text-white border border-gray-700 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
            rows={4}
          ></textarea>

          <button
            onClick={handleAddNote}
            className="mt-3 flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white px-4 py-2 rounded-md text-sm font-medium"
          >
            <FaPlusCircle /> Add Note
          </button>
        </div>
      ) : (
        <p className="text-yellow-400 italic">
          ⚠️ You are not the owner of this item. Only the owner can add notes.
        </p>
      )}

      <div className="mt-6 text-gray-400 text-sm">
        <Comments foodId={data._id} newComment={newComment} />
      </div>
    </div>
  );
};

export default NotesSection;
