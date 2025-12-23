import { Edit3, ThumbsUp, Trash2 } from "lucide-react";
import { useState } from "react";
import { commentApi, EditCommentBox, likeApi } from "../../index.js";

export default function CommentItem({ comment, refresh, currentUser }) {
  const [editing, setEditing] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(comment.likes?.length || 0);
  const [isLikingComment, setIsLikingComment] = useState(false);

  const remove = async () => {
    if (!window.confirm("Delete this comment?")) return;
    await commentApi.deleteComment(comment._id);
    refresh();
  };

  const handleCommentLike = async () => {
    if (isLikingComment) return;
    
    try {
      setIsLikingComment(true);
      await likeApi.toggleCommentLike(comment._id);
      
      const newIsLiked = !isLiked;
      setIsLiked(newIsLiked);
      setLikeCount(prev => newIsLiked ? prev + 1 : prev - 1);
    } catch (error) {
      console.error("Error toggling comment like:", error);
    } finally {
      setIsLikingComment(false);
    }
  };

  return (
    <div className="p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors">
      <div className="flex gap-3">
        {/* User Avatar */}
        <img 
          src={comment.owner?.avatar || "https://via.placeholder.com/40"} 
          alt={comment.owner?.username} 
          className="w-10 h-10 rounded-full object-cover"
        />

        <div className="flex-1">
          {/* User Info */}
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-sm">
              {comment.owner?.fullName || "User"}
            </span>
            <span className="text-gray-500 text-xs">
              @{comment.owner?.username || "anonymous"}
            </span>
            <span className="text-gray-400 text-xs">•</span>
            <span className="text-gray-500 text-xs">
              {new Date(comment.createdAt).toLocaleDateString()}
            </span>
          </div>

          {/* Comment Content */}
          {editing ? (
            <EditCommentBox
              comment={comment}
              cancel={() => setEditing(false)}
              refresh={refresh}
            />
          ) : (
            <p className="text-gray-800 text-sm mb-2">{comment.content}</p>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Like Button */}
            <button
              onClick={handleCommentLike}
              disabled={isLikingComment}
              className={`flex items-center gap-1 text-xs font-medium transition-colors ${
                isLiked 
                  ? "text-purple-600" 
                  : "text-gray-600 hover:text-purple-600"
              }`}
            >
              <ThumbsUp size={14} fill={isLiked ? "currentColor" : "none"} />
              <span>{likeCount > 0 ? likeCount : "Like"}</span>
            </button>

            {/* Show edit/delete only if owner */}
            {currentUser && currentUser._id === comment.owner?._id && (
              <>
                {!editing && (
                  <button
                    onClick={() => setEditing(true)}
                    className="flex items-center gap-1 text-xs font-medium text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <Edit3 size={14} />
                    <span>Edit</span>
                  </button>
                )}
                <button
                  onClick={remove}
                  className="flex items-center gap-1 text-xs font-medium text-gray-600 hover:text-red-600 transition-colors"
                >
                  <Trash2 size={14} />
                  <span>Delete</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
