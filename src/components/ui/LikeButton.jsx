import { ThumbsUp } from "lucide-react";
import { useState } from "react";
import { toggleVideoLike } from "../../api/likeApi";

const LikeButton = ({ videoId, initialLiked = false, likeCount = 0 }) => {
  const [isLiked, setIsLiked] = useState(initialLiked);
  const [count, setCount] = useState(likeCount);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleLike = async () => {
    if (isLoading) return;

    try {
      setIsLoading(true);
       await toggleVideoLike(videoId);
      
      // Toggle the like state
      const newIsLiked = !isLiked;
      setIsLiked(newIsLiked);
      
      // Update count
      setCount(prev => newIsLiked ? prev + 1 : prev - 1);
      
    } catch (error) {
      console.error("Error toggling like:", error);
      // Revert on error
      setIsLiked(!isLiked);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggleLike}
      disabled={isLoading}
      className={`
        flex items-center gap-2 px-4 py-2 rounded-full transition-colors font-medium
        ${isLiked 
          ? "bg-purple-600 text-white hover:bg-purple-700" 
          : "bg-gray-100 hover:bg-gray-200 text-gray-900"
        }
        ${isLoading ? "opacity-50 cursor-not-allowed" : ""}
      `}
    >
      <ThumbsUp 
        size={20} 
        fill={isLiked ? "currentColor" : "none"}
      />
      <span>{count > 0 ? count : "Like"}</span>
    </button>
  );
};

export default LikeButton;
