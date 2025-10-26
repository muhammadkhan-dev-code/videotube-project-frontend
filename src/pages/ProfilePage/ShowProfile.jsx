import React, { useEffect, useState } from "react";
import { getUserProfile } from "../api/userApi"; // API function to fetch user profile
import CoverImage from "../components/Profile/CoverImage";
import ProfileHeader from "../components/Profile/ProfileHeader";
import TabsSection from "../components/Profile/TabsSection";
import VideoGrid from "../components/Profile/VideoGrid";
import Loader from "../components/Profile/Loader";

const ShowProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
       
        const res = await getUserProfile();
        setUser(res?.data?.data || res?.data); // Adjust for API response shape
      } catch (error) {
        console.error("Error loading profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <Loader />;

  if (!user)
    return (
      <p className="text-center text-gray-500 mt-20">
        User not found.
      </p>
    );

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100">
      {/* Cover image */}
      <CoverImage image={user.coverImage} />

      {/* Profile Header */}
      <ProfileHeader
        avatar={user.avatar}
        fullName={user.fullName}
        username={user.username}
        email={user.email}
        subscribersCount={user.subscribersCount}
      />

      {/* Tabs Section */}
      <TabsSection />

      {/* Uploaded Videos Section */}
      <div className="w-full max-w-5xl mt-6 px-4">
        <h2 className="text-xl font-semibold mb-3 text-gray-800">
          Uploaded Videos
        </h2>

        {/* Display user videos */}
        {user.videos && user.videos.length > 0 ? (
          <VideoGrid videos={user.videos} />
        ) : (
          <p className="text-gray-500">No videos uploaded yet.</p>
        )}
      </div>
    </div>
  );
};

export default ShowProfile;
