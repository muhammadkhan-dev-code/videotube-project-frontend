import React from "react";

const VideoCard = ({ video, onSelect }) => {
  if (!video?.snippet) return null;

  const { snippet, statistics, contentDetails } = video;

  // --- Format duration from ISO8601 to readable format ---
  const formatDuration = (duration) => {
    if (!duration) return "10:42"; // fallback
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return "00:00";
    const [, hours, minutes, seconds] = match.map((v) => parseInt(v) || 0);
    return hours > 0
      ? `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
      : `${minutes}:${String(seconds).padStart(2, "0")}`;
  };

  // --- Format views in a readable way (e.g., 592K, 2.3M) ---
  const formatViews = (views) => {
    if (!views) return "592K";
    if (views >= 1_000_000) return `${(views / 1_000_000).toFixed(1)}M`;
    if (views >= 1_000) return `${Math.floor(views / 1000)}K`;
    return views.toString();
  };

  return (
    <div
      className="flex flex-col max-w-[436px] hover:scale-[1.02] hover:bg-fuchsia-50 rounded-2xl transition-transform duration-100 ease-in-out cursor-pointer"
        onClick={onSelect}
    >
      {/* Video Thumbnail */}
      <div className="relative w-full h-[250px] rounded-md overflow-hidden">
        <img
          src={snippet.thumbnails?.medium?.url}
          alt={snippet.title || "Video thumbnail"}
          className="w-full h-full object-cover border-fuchsia-500 border-4 rounded-xl"
        />
        <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-semibold px-1.5 py-0.5 rounded">
          {formatDuration(contentDetails?.duration)}
        </span>
      </div>

      {/* Video Info */}
      <div className="flex mt-3 px-1">
        {/* Channel Avatar */}
        <div className="w-9 h-9 rounded-full bg-gray-200 overflow-hidden flex-shrink-0 mr-3">
          <img
            src={
              snippet.channelThumbnail ||
              `https://yt3.ggpht.com/ytc/${snippet.channelId}-no-rj`
            }
            alt={snippet.channelTitle}
            className="w-full h-full object-cover"
            onError={(e) => (e.target.style.display = "none")}
          />
        </div>

        {/* Text Info */}
        <div className="flex flex-col overflow-hidden">
          <p className="font-semibold text-[15px] text-gray-900 line-clamp-2 leading-snug">
            {snippet.title}
          </p>
          <p className="text-sm text-gray-600 mt-1 hover:text-black transition">
            {snippet.channelTitle}
          </p>
          <p className="text-xs text-gray-500 mt-0.5">
            {formatViews(statistics?.viewCount)} views •{" "}
            {snippet.publishedAt
              ? new Date(snippet.publishedAt).toLocaleDateString()
              : "2 years ago"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
