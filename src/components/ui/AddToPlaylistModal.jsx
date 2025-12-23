import { Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import { addVideoToPlaylist, createPlaylist, getUserPlaylists } from "../../api/playlistApi";
import { useToast } from "../../context/ToastContext";
import { useAuth } from "../../hooks/useAuth";
import { Loader } from "../index.js";

const AddToPlaylistModal = ({ isOpen, onClose, videoId }) => {
  const { user } = useAuth();
  const toast = useToast();
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState("");

  useEffect(() => {
    if (isOpen && user) {
      fetchPlaylists();
    }
  }, [isOpen, user]);

  const fetchPlaylists = async () => {
    try {
      setLoading(true);
      const response = await getUserPlaylists(user._id);
      setPlaylists(response.data.data || []);
    } catch (err) {
      toast.error("Failed to load playlists", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToPlaylist = async (playlistId) => {
    try {
      await addVideoToPlaylist(videoId, playlistId);
      toast.success("Video added to playlist!");
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add video");
    }
  };

  const handleCreateAndAdd = async (e) => {
    e.preventDefault();
    if (!newPlaylistName.trim()) return;

    try {
      const response = await createPlaylist({
        name: newPlaylistName,
        description: "",
      });
      const newPlaylistId = response.data.data._id;
      await addVideoToPlaylist(videoId, newPlaylistId);
      toast.success("Playlist created and video added!");
      onClose();
    } catch (err) {
      toast.error("Failed to create playlist", err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[80vh] overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">Save to Playlist</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        <div className="overflow-y-auto max-h-96 p-6">
          {loading ? (
            <div className="flex justify-center py-8">
              <Loader />
            </div>
          ) : (
            <>
              {/* Create New Playlist */}
              {!showCreateForm ? (
                <button
                  onClick={() => setShowCreateForm(true)}
                  className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors mb-4 border-2 border-dashed border-gray-300"
                >
                  <Plus size={20} className="text-purple-600" />
                  <span className="font-medium text-purple-600">Create new playlist</span>
                </button>
              ) : (
                <form onSubmit={handleCreateAndAdd} className="mb-4 p-4 bg-gray-50 rounded-lg">
                  <input
                    type="text"
                    value={newPlaylistName}
                    onChange={(e) => setNewPlaylistName(e.target.value)}
                    placeholder="Playlist name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    autoFocus
                  />
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium"
                    >
                      Create & Add
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowCreateForm(false);
                        setNewPlaylistName("");
                      }}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              {/* Existing Playlists */}
              {playlists.length > 0 ? (
                <div className="space-y-2">
                  {playlists.map((playlist) => (
                    <button
                      key={playlist._id}
                      onClick={() => handleAddToPlaylist(playlist._id)}
                      className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <div className="text-left">
                        <p className="font-medium">{playlist.name}</p>
                        <p className="text-sm text-gray-600">
                          {playlist.videos?.length || 0} videos
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                !showCreateForm && (
                  <p className="text-center text-gray-500 py-4">
                    No playlists yet. Create one to get started!
                  </p>
                )
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddToPlaylistModal;
