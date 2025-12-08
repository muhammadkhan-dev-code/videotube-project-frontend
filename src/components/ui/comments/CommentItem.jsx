import { useState } from "react";
import { deleteComment } from "../../index.js";
import { EditCommentBox } from "../../index.js";

export default function CommentItem({ comment, refresh, currentUser }) {
  const [editing, setEditing] = useState(false);

  const remove = async () => {
    if (!window.confirm("Delete this comment?")) return;
    await deleteComment(comment._id);
    refresh();
  };

  return (
    <div style={{ marginBottom: "15px" }}>
      <b>{comment.owner?.username || "User"}</b>
      <span style={{ marginLeft: "10px", color: "gray" }}>
        {new Date(comment.createdAt).toLocaleString()}
      </span>

      {/* Show Edit Mode */}
      {editing ? (
        <EditCommentBox
          comment={comment}
          cancel={() => setEditing(false)}
          refresh={refresh}
        />
      ) : (
        <p>{comment.content}</p>
      )}

      {/* Show edit/delete only if owner */}
      {currentUser && currentUser._id === comment.owner?._id && (
        <>
          {!editing && (
            <button onClick={() => setEditing(true)}>Edit</button>
          )}
          <button onClick={remove} style={{ marginLeft: "10px" }}>
            Delete
          </button>
        </>
      )}
    </div>
  );
}
