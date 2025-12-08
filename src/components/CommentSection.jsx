import { useEffect, useState } from "react";
import { fetchComments, AddCommentBox,CommentItem    } from "../components/index.js";

export default function CommentSection({ videoId, user }) {
  const [comments, setComments] = useState([]);
  const [meta, setMeta] = useState({});
  const [loading, setLoading] = useState(true);

  const loadComments = async (page = 1) => {
    setLoading(true);
    try {
      const res = await fetchComments(videoId, page);
      setComments(res.data.data.docs);
      setMeta(res.data.data);
    } catch (err) {
      console.error("Failed to load comments, ", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadComments();
  }, [videoId]);

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Comments ({meta.total || 0})</h3>

      {/* Add Comment Box */}
      <AddCommentBox videoId={videoId} refresh={loadComments} />

      <hr />

      {loading && <p>Loading comments...</p>}

      {!loading && comments.length === 0 && (
        <p>No comments yet. Be the first!</p>
      )}

      {comments.map((c) => (
        <CommentItem
          key={c._id}
          comment={c}
          refresh={loadComments}
          currentUser={user}
        />
      ))}

      {/* Pagination */}
      {meta.totalPages > 1 && (
        <div style={{ marginTop: "10px" }}>
          <button
            disabled={meta.page === 1}
            onClick={() => loadComments(meta.page - 1)}
          >
            Prev
          </button>

          <span style={{ margin: "0 10px" }}>
            Page {meta.page} / {meta.totalPages}
          </span>

          <button
            disabled={meta.page === meta.totalPages}
            onClick={() => loadComments(meta.page + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
