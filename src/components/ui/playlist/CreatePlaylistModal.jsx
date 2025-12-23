import { X } from "lucide-react";
import { useState } from "react";
import { createPlaylist } from "../../api/playlistApi";
import { useToast } from "../../context/ToastContext";
import { Button, Input } from "../index.js";

const CreatePlaylistModal = ({ isOpen, onClose, onSuccess }) => {
  const toast = useToast();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error("Please enter a playlist name");
      return;
    }

    try {
      setLoading(true);
      await createPlaylist(formData);
      toast.success("Playlist created successfully!");
      onSuccess();
      onClose();
      setFormData({ name: "", description: "" });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create playlist");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Create New Playlist</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Enter playlist name"
              disabled={loading}
              maxLength={100}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Describe your playlist"
              rows={4}
              disabled={loading}
              maxLength={500}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              name={loading ? "Creating..." : "Create Playlist"}
              disabled={loading}
              className="flex-1"
            />
            <Button
              type="button"
              name="Cancel"
              onClick={onClose}
              disabled={loading}
              className="!bg-gray-500 hover:!bg-gray-600"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePlaylistModal;
