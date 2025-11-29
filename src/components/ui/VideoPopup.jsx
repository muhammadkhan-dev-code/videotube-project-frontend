import React, { useState } from "react";
import { X, Minus, Maximize2, Minimize2 } from "lucide-react";
import {Button} from "../index.js";

const VideoPopup = ({ video, onClose }) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm z-50 flex items-center justify-center p-4">

      <div
        className={`
          bg-gray-900 rounded-xl shadow-2xl overflow-hidden relative transition-all
          ${isMaximized ? "w-[95%] h-[95%]" : "w-full max-w-4xl h-auto"}
          ${isMinimized ? "h-14 w-64" : ""}
        `}
      >
      
        <div className="flex justify-between items-center bg-black bg-opacity-50 px-4 py-2">

        
          <h2 className="text-white text-sm truncate w-[70%]">
            {video.snippet.title}
          </h2>

          <div className="flex items-center gap-2">

            {/* Minimize */}
            <Button
              name={<Minus size={16} />}
              onClick={() => setIsMinimized(!isMinimized)}
              className="!py-2 !px-3"
            />

            {/* Maximize */}
            <Button
              name={
                isMaximized ? <Minimize2 size={16} /> : <Maximize2 size={16} />
              }
              onClick={() => setIsMaximized(!isMaximized)}
              className="!py-2 !px-3"
            />

            {/* Close */}
            <Button
              name={<X size={18} />}
              onClick={onClose}
              className="!bg-red-600 hover:!bg-red-700 !py-2 !px-3"
            />
          </div>
        </div>

        {/* Video */}
        {!isMinimized && (
          <div className="w-full aspect-video">
            <iframe
              src={`https://www.youtube.com/embed/${video.id.videoId}?autoplay=1`}
              title={video.snippet.title}
              className="w-full h-full"
              allowFullScreen
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoPopup;
