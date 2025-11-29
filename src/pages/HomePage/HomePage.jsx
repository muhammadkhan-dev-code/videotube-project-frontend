import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { fetchData } from "../../api/youtubeApi";
import { VideoCard,VideoPopup } from "../../components/index.js";


const HomePage = () => {
  const { searchQuery } = useOutletContext();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    const loadVideos = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchData(searchQuery?.trim() || "JavaScript", 27);
        setVideos(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message || "Failed to load videos");
      } finally {
        setLoading(false);
      }
    };

    loadVideos();
  }, [searchQuery]);

  return (
    <div className="bg-gray-50 min-h-screen py-6 px-4 flex flex-col items-center">

      {loading && <p>Loading videos...</p>}
      {error && <p>Error: {error}</p>}

      {/* Grid */}
      {!loading && !error && (
        <div className="flex flex-wrap gap-6 justify-center">
          {videos.length > 0 ? (
            videos
              .filter((video) => video.id?.videoId)
              .map((video) => (
                <VideoCard
                  key={video.id.videoId}
                  video={video}
                  onSelect={() => setSelectedVideo(video)}
                />
              ))
          ) : (
            <p>No videos found</p>
          )}
        </div>
      )}

      {/* ⭐ Popup */}
      {selectedVideo && (
        <VideoPopup
          video={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </div>
  );
};

export default HomePage;
