import { useState } from "react";
import { updateComment } from "../../api/commentApi";

export default function EditCommentBox({ comment, cancel, refresh }) {
  const [content, setContent] = useState(comment.content);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!content.trim()) return;
    setLoading(true);
    await updateComment(comment._id, { content });
    setLoading(false);
    refresh();
    cancel();
  };

  return (
    <div>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{ width: "100%", height: "60px" }}
      />

      <button onClick={submit} disabled={loading}>Save</button>
      <button onClick={cancel} style={{ marginLeft: "10px" }}>
        Cancel
      </button>
    </div>
  );
}
