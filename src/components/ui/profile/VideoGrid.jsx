import React from "react";
import {VideoCard} from "../../index.js";

const VideoGrid = ({ videos }) => {
  if (!videos.length)
    return <p className="text-gray-500 text-center mt-4">No videos uploaded yet.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {videos.map((video) => (
        <VideoCard key={video._id} video={video} />
      ))}
    </div>
  );
};

export default VideoGrid;
