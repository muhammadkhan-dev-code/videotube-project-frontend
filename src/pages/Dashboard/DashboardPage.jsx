import { Eye, ThumbsUp, TrendingUp, Users, Video } from "lucide-react";
import { useEffect, useState } from "react";
import { getChannelStats, getChannelVideos } from "../../api/dashboardApi";
import { Loader } from "../../components/index.js";
import { useToast } from "../../context/ToastContext";

const DashboardPage = () => {
  const toast = useToast();
  const [stats, setStats] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [statsRes, videosRes] = await Promise.all([
        getChannelStats(),
        getChannelVideos(),
      ]);
      setStats(statsRes.data.data);
      setVideos(videosRes.data.data);
    } catch (error) {
      toast.error("Failed to load dashboard data");
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

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-8">Channel Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={<Video className="text-purple-600" size={32} />}
          title="Total Videos"
          value={stats?.totalVideos || 0}
          bgColor="bg-purple-50"
        />
        <StatCard
          icon={<Eye className="text-blue-600" size={32} />}
          title="Total Views"
          value={(stats?.totalViews || 0).toLocaleString()}
          bgColor="bg-blue-50"
        />
        <StatCard
          icon={<Users className="text-green-600" size={32} />}
          title="Subscribers"
          value={(stats?.totalSubscribers || 0).toLocaleString()}
          bgColor="bg-green-50"
        />
        <StatCard
          icon={<ThumbsUp className="text-pink-600" size={32} />}
          title="Total Likes"
          value={(stats?.totalLikes || 0).toLocaleString()}
          bgColor="bg-pink-50"
        />
      </div>

      {/* Channel Performance */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <TrendingUp className="text-purple-600" size={24} />
          <h2 className="text-xl font-semibold">Channel Performance</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-gray-600 mb-1">Average Views per Video</p>
            <p className="text-2xl font-bold text-gray-900">
              {stats?.totalVideos > 0
                ? Math.round(stats.totalViews / stats.totalVideos).toLocaleString()
                : 0}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Engagement Rate</p>
            <p className="text-2xl font-bold text-gray-900">
              {stats?.totalViews > 0
                ? ((stats.totalLikes / stats.totalViews) * 100).toFixed(1)
                : 0}%
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Subscriber to View Ratio</p>
            <p className="text-2xl font-bold text-gray-900">
              {stats?.totalViews > 0
                ? ((stats.totalSubscribers / stats.totalViews) * 100).toFixed(2)
                : 0}%
            </p>
          </div>
        </div>
      </div>

      {/* Videos List */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Your Videos</h2>
        </div>
        <div className="divide-y">
          {videos && videos.length > 0 ? (
            videos.map((video) => (
              <div key={video._id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex gap-4">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-40 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">{video.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>{video.views} views</span>
                      <span>•</span>
                      <span>{video.likes?.length || 0} likes</span>
                      <span>•</span>
                      <span>{new Date(video.createdAt).toLocaleDateString()}</span>
                      <span>•</span>
                      <span className={video.isPublished ? "text-green-600" : "text-gray-500"}>
                        {video.isPublished ? "Published" : "Draft"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-12 text-center text-gray-500">
              No videos uploaded yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value, bgColor }) => (
  <div className={`${bgColor} rounded-lg p-6`}>
    <div className="flex items-center justify-between mb-3">
      {icon}
    </div>
    <p className="text-sm text-gray-600 mb-1">{title}</p>
    <p className="text-3xl font-bold text-gray-900">{value}</p>
  </div>
);

export default DashboardPage;
