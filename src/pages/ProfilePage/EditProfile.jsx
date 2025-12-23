import { Upload } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input, userApi } from "../../components/index.js";
import { useToast } from "../../context/ToastContext";
import { useAuth } from "../../hooks/useAuth";

const EditProfile = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  
  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
  });
  
  const [avatarFile, setAvatarFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || "");
  const [coverPreview, setCoverPreview] = useState(user?.coverImage || "");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverFile(file);
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      if (formData.fullName !== user.fullName || formData.email !== user.email) {
        await userApi.updateAccount({
          fullName: formData.fullName,
          email: formData.email,
        });
      }
      
      if (avatarFile) {
        const avatarFormData = new FormData();
        avatarFormData.append("avatar", avatarFile);
        await userApi.updateAvatar(avatarFormData);
      }
      
      if (coverFile) {
        const coverFormData = new FormData();
        coverFormData.append("coverImage", coverFile);
        await userApi.updateCoverImage(coverFormData);
      }
      
      toast.success("Profile updated successfully!");
      
      const response = await userApi.getCurrentUser();
      updateUser(response.data.data);
      
      navigate("/users/profile");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Edit Profile</h1>

      <form onSubmit={handleUpdateProfile} className="space-y-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cover Image
          </label>
          <div className="relative h-48 bg-gray-200 rounded-lg overflow-hidden">
            {coverPreview && (
              <img src={coverPreview} alt="Cover" className="w-full h-full object-cover" />
            )}
            <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 cursor-pointer hover:bg-opacity-50 transition-opacity">
              <div className="text-white text-center">
                <Upload size={32} className="mx-auto mb-2" />
                <span className="text-sm">Upload Cover Image</span>
              </div>
              <input type="file" accept="image/*" onChange={handleCoverChange} className="hidden" disabled={loading} />
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Profile Picture</label>
          <div className="flex items-center gap-6">
            <div className="relative w-32 h-32 rounded-full overflow-hidden bg-gray-200">
              {avatarPreview && (
                <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
              )}
              <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 cursor-pointer hover:bg-opacity-50 transition-opacity">
                <Upload size={24} className="text-white" />
                <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" disabled={loading} />
              </label>
            </div>
            <div>
              <p className="text-sm text-gray-600">Click to upload a new profile picture</p>
              <p className="text-xs text-gray-500 mt-1">JPG, PNG or GIF. Max 5MB.</p>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
          <Input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="Enter your full name" disabled={loading} />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <Input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Enter your email" disabled={loading} />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
          <Input type="text" value={user?.username || ""} disabled className="!bg-gray-100" />
          <p className="text-xs text-gray-500 mt-1">Username cannot be changed</p>
        </div>

        <div className="flex gap-4 pt-4">
          <Button type="submit" name={loading ? "Updating..." : "Save Changes"} disabled={loading} className="flex-1" />
          <Button type="button" name="Cancel" onClick={() => navigate("/users/profile")} disabled={loading} className="!bg-gray-500 hover:!bg-gray-600" />
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
