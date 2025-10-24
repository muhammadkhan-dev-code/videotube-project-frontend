// src/components/Profile/ProfileHeader.jsx
import React from "react";

const ProfileHeader = ({ coverImage, avatar }) => {
  return (
    <div className="relative w-full h-56 bg-gray-300">
      <img
        src={coverImage || "../../../assets/cover-image.jpeg"}
        alt="Cover"
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-[-50px] left-8">
        <img
          src={avatar || "../../../assets/cover-image2.jpeg"}
          alt="Avatar"
          className="w-24 h-24 rounded-full border-4 border-white shadow-md"
        />
      </div>
    </div>
  );
};

export default ProfileHeader;
