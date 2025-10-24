import React, { useState, useEffect } from "react";
import { fetchData } from "../../api/youtubeApi";
import {VideoCard }from "../../components/index.js";
import {ClosedCaptionIcon} from 'lucide-react'

const HomePage = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    const loadVideos = async () => {
      try {
        const data = await fetchData("Hello", 15);
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
    <div className="bg-gray-50 min-h-screen py-6 px-4 flex flex-col items-center">
      {/* Loading & Error States */}
      {loading && (
        <p className="bg-fuchsia-400 text-black my-20 rounded-2xl w-80 border border-black text-center p-8 text-xl font-semibold">
          Loading videos...
        </p>
      )}
      {error && (
        <p className="bg-fuchsia-400 text-black my-20 rounded-2xl w-80 border border-black text-center p-8 text-xl font-semibold">
          Error: {error}
        </p>
      )}


      {!loading && !error && (
        <div className="flex flex-wrap gap-x-4 gap-y-10 max-w-[95%] justify-center">
          {videos.length > 0 ? (
            videos
              .filter((video) => video.id?.videoId)
              .slice(0, 9)
              .map((video) => (
                <VideoCard
               
                  key={video.id.videoId}
                  video={video}
                  onSelect={() => setSelectedVideo(video)}
                />
              ))
          ) : (
            <p className="text-gray-700 text-center text-lg font-medium mt-10">
              No videos found.
            </p>
          )}
        </div>
      )}

      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl aspect-video">
            <iframe
              src={`https://www.youtube.com/embed/${selectedVideo.id.videoId}?autoplay=1`}
              title={selectedVideo.snippet.title}
              allowFullScreen
              className="w-full h-full rounded-xl shadow-2xl"
            ></iframe>
          </div>

          <h3 className="text-lg md:text-xl font-semibold text-white mt-4 text-center px-4">
            {selectedVideo.snippet.title}
          </h3>

          <button
            onClick={() => setSelectedVideo(null)}
            className="mt-5 bg-white text-gray-800 px-5 py-2 rounded-lg hover:bg-gray-200 transition font-medium"
          >
            <ClosedCaptionIcon className="w-4 h-4 inline-block mr-1" />
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
