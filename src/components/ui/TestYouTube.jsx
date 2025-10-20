import { useEffect, useState } from "react";
import { fetchData } from "../../api/youtubeApi";

const TestYouTube = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    const loadVideos = async () => {
      try {
        const data = await fetchData("Mathematics", 16);
        setVideos(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message || "Failed to load videos");
      } finally {
        setLoading(false);
      }
    };
    loadVideos();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        🎥 YouTube Videos
      </h2>

      {loading && <p className="text-center">Loading videos...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {selectedVideo && (
        <div className="mb-6 flex flex-col items-center">
          <iframe
            width="720"
            height="405"
            src={`https://www.youtube.com/embed/${selectedVideo.id.videoId}?autoplay=0`}
            title={selectedVideo.snippet.title}
            allowFullScreen
            className="rounded-lg shadow-lg"
          ></iframe>
          <h3 className="text-lg font-semibold mt-2">
            {selectedVideo.snippet.title}
          </h3>
          <button
            onClick={() => setSelectedVideo(null)}
            className="mt-2 bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
          >
            Close Video
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {Array.isArray(videos) && videos.length > 0 ? (
          videos
            .filter(video => video.id?.videoId)
            .map(video => (
              <div
                key={video.id.videoId}
                onClick={() => setSelectedVideo(video)}
                className="border p-2 rounded shadow-sm cursor-pointer hover:shadow-md transition"
              >
                <img
                  src={video.snippet?.thumbnails?.medium?.url}
                  alt={video.snippet?.title || "Video"}
                  className="rounded w-full"
                />
                <p className="font-semibold mt-2 line-clamp-2">
                  {video.snippet?.title}
                </p>
                <p className="text-sm text-gray-500">
                  {video.snippet?.channelTitle}
                </p>
              </div>
            ))
        ) : (
          !loading && <p className="text-center">No videos found.</p>
        )}
      </div>
    </div>
  );
};
export default TestYouTube;
