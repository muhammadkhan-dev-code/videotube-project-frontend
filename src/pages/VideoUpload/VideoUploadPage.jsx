import { AlertCircle, CheckCircle, Upload, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadVideo } from "../../api/videoApi";
import { Button, Input } from "../../components/index.js";

const VideoUploadPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    videoFile: null,
    thumbnail: null,
    isPublished: true,
  });

  const [previews, setPreviews] = useState({
    video: null,
    thumbnail: null,
  });

  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file
    if (fieldName === "videoFile") {
      if (!file.type.startsWith("video/")) {
        setError("Please select a valid video file");
        return;
      }
      if (file.size > 500 * 1024 * 1024) { // 500MB limit
        setError("Video file size must be less than 500MB");
        return;
      }
    } else if (fieldName === "thumbnail") {
      if (!file.type.startsWith("image/")) {
        setError("Please select a valid image file");
        return;
      }
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setError("Thumbnail size must be less than 5MB");
        return;
      }
    }

    setFormData((prev) => ({
      ...prev,
      [fieldName]: file,
    }));

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviews((prev) => ({
        ...prev,
        [fieldName === "videoFile" ? "video" : "thumbnail"]: reader.result,
      }));
    };
    reader.readAsDataURL(file);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!formData.title.trim()) {
      setError("Please enter a video title");
      return;
    }
    if (!formData.description.trim()) {
      setError("Please enter a video description");
      return;
    }
    if (!formData.videoFile) {
      setError("Please select a video file");
      return;
    }
    if (!formData.thumbnail) {
      setError("Please select a thumbnail image");
      return;
    }

    try {
      setUploading(true);
      setUploadProgress(0);

      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("videoFile", formData.videoFile);
      formDataToSend.append("thumbnail", formData.thumbnail);

      // Simulate progress (in real app, use axios onUploadProgress)
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + 10;
        });
      }, 500);

      const response = await uploadVideo(formDataToSend);
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      setSuccess(true);

      // Redirect to the uploaded video
      setTimeout(() => {
        navigate(`/video/${response.data.data._id}`);
      }, 2000);

    } catch (err) {
      setError(err.response?.data?.message || "Failed to upload video");
      console.error("Upload error:", err);
    } finally {
      setUploading(false);
    }
  };

  const clearVideoFile = () => {
    setFormData((prev) => ({ ...prev, videoFile: null }));
    setPreviews((prev) => ({ ...prev, video: null }));
  };

  const clearThumbnail = () => {
    setFormData((prev) => ({ ...prev, thumbnail: null }));
    setPreviews((prev) => ({ ...prev, thumbnail: null }));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Upload Video</h1>

      {/* Success Message */}
      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
          <CheckCircle className="text-green-600" size={24} />
          <div>
            <p className="font-medium text-green-900">Upload Successful!</p>
            <p className="text-sm text-green-700">Redirecting to your video...</p>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
          <AlertCircle className="text-red-600" size={24} />
          <p className="text-red-700">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Video File Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Video File <span className="text-red-500">*</span>
          </label>
          {!formData.videoFile ? (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-400 transition-colors">
              <Upload className="mx-auto mb-4 text-gray-400" size={48} />
              <p className="text-gray-600 mb-2">Drag and drop your video here, or</p>
              <label className="cursor-pointer">
                <span className="text-purple-600 hover:text-purple-700 font-medium">
                  Browse files
                </span>
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => handleFileChange(e, "videoFile")}
                  className="hidden"
                />
              </label>
              <p className="text-xs text-gray-500 mt-2">Max size: 500MB</p>
            </div>
          ) : (
            <div className="relative border border-gray-300 rounded-lg p-4">
              <button
                type="button"
                onClick={clearVideoFile}
                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
              >
                <X size={16} />
              </button>
              <video
                src={previews.video}
                controls
                className="w-full max-h-64 rounded-lg"
              />
              <p className="text-sm text-gray-600 mt-2">
                {formData.videoFile.name} ({(formData.videoFile.size / 1024 / 1024).toFixed(2)} MB)
              </p>
            </div>
          )}
        </div>

        {/* Thumbnail Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Thumbnail <span className="text-red-500">*</span>
          </label>
          {!formData.thumbnail ? (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-400 transition-colors">
              <Upload className="mx-auto mb-4 text-gray-400" size={48} />
              <label className="cursor-pointer">
                <span className="text-purple-600 hover:text-purple-700 font-medium">
                  Select thumbnail
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, "thumbnail")}
                  className="hidden"
                />
              </label>
              <p className="text-xs text-gray-500 mt-2">Max size: 5MB</p>
            </div>
          ) : (
            <div className="relative border border-gray-300 rounded-lg p-4">
              <button
                type="button"
                onClick={clearThumbnail}
                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
              >
                <X size={16} />
              </button>
              <img
                src={previews.thumbnail}
                alt="Thumbnail preview"
                className="w-full max-h-64 object-cover rounded-lg"
              />
            </div>
          )}
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title <span className="text-red-500">*</span>
          </label>
          <Input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter video title"
            maxLength={100}
            disabled={uploading}
          />
          <p className="text-xs text-gray-500 mt-1">
            {formData.title.length}/100 characters
          </p>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Tell viewers about your video"
            rows={6}
            maxLength={5000}
            disabled={uploading}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
          />
          <p className="text-xs text-gray-500 mt-1">
            {formData.description.length}/5000 characters
          </p>
        </div>

        {/* Publish Status */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="isPublished"
            name="isPublished"
            checked={formData.isPublished}
            onChange={handleInputChange}
            disabled={uploading}
            className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
          />
          <label htmlFor="isPublished" className="text-sm font-medium text-gray-700">
            Publish immediately
          </label>
        </div>

        {/* Upload Progress */}
        {uploading && (
          <div>
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Uploading...</span>
              <span>{uploadProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Submit Buttons */}
        <div className="flex gap-4 pt-4">
          <Button
            type="submit"
            name={uploading ? "Uploading..." : "Upload Video"}
            disabled={uploading || success}
            className="flex-1"
          />
          <Button
            type="button"
            name="Cancel"
            onClick={() => navigate(-1)}
            disabled={uploading}
            className="!bg-gray-500 hover:!bg-gray-600"
          />
        </div>
      </form>
    </div>
  );
};

export default VideoUploadPage;
