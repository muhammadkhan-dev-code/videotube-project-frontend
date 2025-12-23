import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loader, SubscribeButton, userApi } from "../../components/index.js";
import { useToast } from "../../context/ToastContext";

const ChannelPage = () => {
  const { username } = useParams();
  const toast = useToast();
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("videos");

  useEffect(() => {
    fetchChannel();
  }, [username]);

  const fetchChannel = async () => {
    try {
      setLoading(true);
      const response = await userApi.getChannelProfile(username);
      setChannel(response.data.data);
    } catch (error) {
      toast.error("Failed to load channel");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader />
      </div>
    );
  }

  if (!channel) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500">Channel not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Cover Image */}
      {channel.coverImage && (
        <div className="w-full h-48 md:h-64 bg-gray-200">
          <img
            src={channel.coverImage}
            alt="Cover"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Channel Header */}
      <div className="px-4 py-6">
        <div className="flex items-start gap-6">
          <img
            src={channel.avatar}
            alt={channel.fullName}
            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
          />
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-1">{channel.fullName}</h1>
            <p className="text-gray-600 mb-2">@{channel.username}</p>
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
              <span>{channel.subscribersCount || 0} subscribers</span>
              <span>•</span>
              <span>{channel.channelsSubscribedToCount || 0} subscriptions</span>
              <span>•</span>
              <span>{channel.videos?.length || 0} videos</span>
            </div>
            <SubscribeButton channelId={channel._id} />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 px-4">
        <div className="flex gap-8">
          {["videos", "playlists", "about"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-3 px-1 font-medium capitalize transition-colors relative ${
                activeTab === tab
                  ? "text-purple-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="px-4 py-6">
        {activeTab === "videos" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {channel.videos && channel.videos.length > 0 ? (
              channel.videos.map((video) => (
                <div key={video._id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold mb-2 line-clamp-2">{video.title}</h3>
                    <p className="text-sm text-gray-600">
                      {video.views} views • {new Date(video.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 col-span-full text-center py-12">
                No videos yet
              </p>
            )}
          </div>
        )}

        {activeTab === "playlists" && (
          <div className="text-center py-12">
            <p className="text-gray-500">No playlists yet</p>
          </div>
        )}

        {activeTab === "about" && (
          <div className="max-w-2xl">
            <h2 className="text-xl font-semibold mb-4">About</h2>
            <div className="space-y-2 text-gray-700">
              <p><strong>Email:</strong> {channel.email}</p>
              <p><strong>Joined:</strong> {new Date(channel.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChannelPage;
