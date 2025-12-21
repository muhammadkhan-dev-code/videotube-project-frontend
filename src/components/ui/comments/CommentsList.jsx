import React, { useState, useEffect } from "react";
import { commentApi,CommentItem, AddCommentBox} from "../../index.js";

const CommentsList = ({ videoId, currentUser }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchComments = async (pageNum = 1) => {
    try {
      setLoading(true);
      setError(null);
      const response = await commentApi.fetchComments(videoId, pageNum, 15);
      const newComments = response.data?.data?.docs || [];
      
      if (pageNum === 1) {
        setComments(newComments);
      } else {
        setComments((prev) => [...prev, ...newComments]);
      }
      
      setHasMore(response.data?.data?.hasNextPage || false);
      setPage(pageNum);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load comments");
      console.error("Error fetching comments:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (videoId) {
      fetchComments(1);
    }
  }, [videoId]);

  const handleRefresh = () => {
    fetchComments(1);
  };

  const loadMore = () => {
    if (hasMore && !loading) {
      fetchComments(page + 1);
    }
  };

  return (
    <div className="comments-section">
      <h3 className="text-xl font-semibold mb-4">
        {comments.length} {comments.length === 1 ? "Comment" : "Comments"}
      </h3>

      {/* Add Comment Box */}
      <div className="mb-6">
        <AddCommentBox videoId={videoId} refresh={handleRefresh} />
      </div>

      {/* Loading State */}
      {loading && page === 1 && (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Comments List */}
      {!loading && !error && comments.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>No comments yet. Be the first to comment!</p>
        </div>
      )}

      <div className="space-y-4">
        {comments.map((comment) => (
          <CommentItem
            key={comment._id}
            comment={comment}
            refresh={handleRefresh}
            currentUser={currentUser}
          />
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && comments.length > 0 && (
        <div className="flex justify-center mt-6">
          <button
            onClick={loadMore}
            disabled={loading}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Loading..." : "Load More Comments"}
          </button>
        </div>
      )}

      {/* End of Comments */}
      {!hasMore && comments.length > 0 && (
        <div className="text-center py-4 text-gray-500 text-sm">
          No more comments
        </div>
      )}
    </div>
  );
};

export default CommentsList;
