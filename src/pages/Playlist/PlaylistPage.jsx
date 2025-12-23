import { Edit, Play, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deletePlaylist, getPlaylistById, removeVideoFromPlaylist } from "../../api/playlistApi";
import { Loader } from "../../components/index.js";
import { useToast } from "../../context/ToastContext";

const PlaylistPage = () => {
  const { playlistId } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlaylist();
  }, [playlistId]);

  const fetchPlaylist = async () => {
    try {
      setLoading(true);
      const response = await getPlaylistById(playlistId);
      setPlaylist(response.data.data);
    } catch (error) {
      toast.error("Failed to load playlist");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePlaylist = async () => {
    if (!window.confirm("Are you sure you want to delete this playlist?")) return;

    try {
      await deletePlaylist(playlistId);
      toast.success("Playlist deleted successfully");
      navigate("/playlists");
    } catch (error) {
      toast.error("Failed to delete playlist");
    }
  };

  const handleRemoveVideo = async (videoId) => {
    if (!window.confirm("Remove this video from playlist?")) return;

    try {
      await removeVideoFromPlaylist(videoId, playlistId);
      toast.success("Video removed from playlist");
      fetchPlaylist();
    } catch (error) {
      toast.error("Failed to remove video");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader />
      </div>
    );
  }

  if (!playlist) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500">Playlist not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-8 text-white mb-6">
        <h1 className="text-3xl font-bold mb-2">{playlist.name}</h1>
        <p className="text-purple-100 mb-4">{playlist.description}</p>
        <div className="flex items-center gap-4 text-sm">
          <span>{playlist.videos?.length || 0} videos</span>
          <span>•</span>
          <span>Created by {playlist.owner?.fullName}</span>
        </div>
        <div className="flex gap-3 mt-6">
          <button className="flex items-center gap-2 px-6 py-2 bg-white text-purple-600 rounded-full font-medium hover:bg-gray-100">
            <Play size={20} />
            Play All
          </button>
          <button
            onClick={() => navigate(`/playlists/edit/${playlistId}`)}
            className="flex items-center gap-2 px-6 py-2 bg-purple-700 rounded-full font-medium hover:bg-purple-800"
          >
            <Edit size={20} />
            Edit
          </button>
          <button
            onClick={handleDeletePlaylist}
            className="flex items-center gap-2 px-6 py-2 bg-red-600 rounded-full font-medium hover:bg-red-700"
          >
            <Trash2 size={20} />
            Delete
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {playlist.videos && playlist.videos.length > 0 ? (
          playlist.videos.map((video, index) => (
            <div
              key={video._id}
              className="flex gap-4 p-4 bg-white rounded-lg border hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => navigate(`/video/${video._id}`)}
            >
              <div className="flex-shrink-0 text-gray-500 font-medium w-8">
                {index + 1}
              </div>
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-40 h-24 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1">{video.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{video.owner?.fullName}</p>
                <p className="text-xs text-gray-500">
                  {video.views} views • {new Date(video.createdAt).toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveVideo(video._id);
                }}
                className="flex-shrink-0 p-2 text-red-600 hover:bg-red-50 rounded-lg"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No videos in this playlist yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlaylistPage;
