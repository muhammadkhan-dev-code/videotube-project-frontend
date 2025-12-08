import { useState } from "react";
import { addComment } from '../../index.js'

export default function AddCommentBox({ videoId, refresh }) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!content.trim()) return;

    setLoading(true);
    try {
      await addComment(videoId, { content });
      setContent("");
      refresh();
    } 
    catch (err) {
     console.error("Failed to add comment:", err);
    }
    setLoading(false);
  };

  return (
    <div>
      <textarea
        placeholder="Add a public comment..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{ width: "100%", height: "60px" }}
      ></textarea>

      <button
        onClick={submit}
        disabled={!content.trim() || loading}
        style={{ marginTop: "5px" }}
      >
        Comment
      </button>
    </div>
  );
}
