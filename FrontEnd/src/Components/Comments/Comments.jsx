import React, { useEffect, useState } from "react";
import getComments from "../../Apis/getComments";

const Comments = ({ foodId, newComment }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (!foodId || (typeof foodId === 'object' && !foodId._id)) return;

    const id = typeof foodId === "object" ? foodId._id : foodId;

    getComments().then((data) => {
      const filtered = data.filter(comment => comment.foodId === id);
      setComments(filtered);
    });
  }, [foodId]);

  
  // Add new comment to the list instantly
  useEffect(() => {
    if (newComment && newComment.foodId === foodId) {
      setComments(prev => [newComment, ...prev]);
    }
  }, [newComment, foodId]);

  return (
    <div className="mt-6">
      {comments.length === 0 ? (
        <p className="text-gray-400">No comments for this item yet.</p>
      ) : (
        <div className="space-y-3">
          {comments.map((comment) => (
            <div key={comment._id} className="p-3 bg-gray-700 text-white rounded-md">
              <p>{comment.note}</p>
              <small className="text-xs text-gray-400">
                Comment By: {comment.userName} {new Date(comment.date).toLocaleString()}
              </small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Comments;
