import { ListPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getVideoById } from "../../api/videoApi";
import { CommentsList, Loader, LikeButton, ShareButton, AddToPlaylistModal, SubscribeButton } from "../../components/index.js";
import { useAuth } from "../../hooks/useAuth";

const VideoPage = () => {
  const { videoId } = useParams();
  const { user } = useAuth();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getVideoById(videoId);
        setVideo(response.data.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load video");
        console.error("Error fetching video:", err);
      } finally {
        setLoading(false);
      }
    };

    if (videoId) {
      fetchVideo();
    }
  }, [videoId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
          <p className="text-lg font-semibold">Error</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!video) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500">Video not found</p>
      </div>
    );
  }

  const formatDate = (date) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const formatViews = (views) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Video Player */}
          <div className="bg-black rounded-lg overflow-hidden aspect-video mb-4">
            <video
              src={video.videoFile}
              controls
              className="w-full h-full"
              poster={video.thumbnail}
            >
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Video Info */}
          <div className="space-y-4">
            {/* Title */}
            <h1 className="text-2xl font-bold text-gray-900">
              {video.title}
            </h1>

            {/* Views and Date */}
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4 text-gray-600">
                <span>{formatViews(video.views)} views</span>
                <span>•</span>
                <span>{formatDate(video.createdAt)}</span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <LikeButton 
                  videoId={videoId} 
                  initialLiked={false}
                  likeCount={video.likes?.length || 0}
                />
                <ShareButton videoId={videoId} title={video.title} />
                <button 
                  onClick={() => setShowPlaylistModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                >
                  <ListPlus size={20} />
                  <span className="font-medium">Save</span>
                </button>
              </div>
            </div>

            {/* Channel Info */}
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <img
                src={video.owner?.avatar}
                alt={video.owner?.fullName}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-lg">
                  {video.owner?.fullName}
                </h3>
                <p className="text-sm text-gray-600">
                  @{video.owner?.username}
                </p>
              </div>
              <SubscribeButton channelId={video.owner?._id} />
            </div>

            {/* Description */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className={`text-gray-700 ${!showFullDescription && "line-clamp-3"}`}>
                {video.description}
              </div>
              <button
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="text-purple-600 font-medium mt-2 hover:underline"
              >
                {showFullDescription ? "Show less" : "Show more"}
              </button>
            </div>

            {/* Comments Section */}
            <div className="mt-8">
              <CommentsList videoId={videoId} currentUser={user} />
                        </div>
                      </div>
                    </div>

                    {/* Sidebar - Recommended Videos */}
                    <div className="lg:col-span-1">
                      <h3 className="text-lg font-semibold mb-4">Recommended</h3>
                      <div className="space-y-3">
                        <p className="text-gray-500 text-sm">
                          No recommendations available yet
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Add to Playlist Modal */}
                  <AddToPlaylistModal
                    isOpen={showPlaylistModal}
                    onClose={() => setShowPlaylistModal(false)}
                    videoId={videoId}
                  />
            </div>
          </div>
        </div>

        {/* Sidebar - Recommended Videos */}
        <div className="lg:col-span-1">
          <h3 className="text-lg font-semibold mb-4">Recommended</h3>
          <div className="space-y-3">
            <p className="text-gray-500 text-sm">
              No recommendations available yet
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
