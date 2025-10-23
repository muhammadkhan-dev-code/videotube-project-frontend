import React, { useState } from "react";
import { Button, logo, Input } from "../../components/index.js"; // ✅ Added Input

const SignupPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    bio: "",
    avatar: null,
    cover: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white shadow-lg rounded-3xl p-8 w-full max-w-2xl border border-gray-100 mt-4">
     
        <div className="text-center mb-6">
          <img src={logo} alt="MyTube Logo" className="mx-auto w-12 h-12 mb-3" />
          <h2 className="text-xl font-semibold mt-2">
            Create your MyTube account
          </h2>
          <p className="text-gray-500 text-sm">
            Join our community and start sharing videos
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-3">
            <Input
              label="Full Name"
              name="fullName"
              placeholder="Muhammad Khan"
              value={formData.fullName}
              onChange={handleChange}
              required
            />

            <Input
              label="Username"
              name="username"
              placeholder="muhammadkhandevcode"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <Input
            type="email"
            label="Email"
            name="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <Input
            type="password"
            label="Password"
            name="password"
            placeholder="Create a strong password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          {/* Bio */}
          <div>
            <label className="block mb-2 pl-1 text-sm font-medium text-gray-700">
              Bio
            </label>
            <textarea
              name="bio"
              placeholder="Tell us about yourself..."
              value={formData.bio}
              onChange={handleChange}
              rows="3"
              className="px-4 py-3 rounded-2xl bg-white text-black outline-none border border-gray-300 
              focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 
              w-full resize-none"
            />
          </div>
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block mb-2 pl-1 text-sm font-medium text-gray-700">
                Profile Picture
              </label>
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full text-sm px-4 py-2 border border-gray-300 rounded-2xl cursor-pointer 
                file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 
                file:text-sm file:font-medium file:bg-purple-50 file:text-purple-700 
                hover:file:bg-purple-100"
              />
            </div>

            <div className="flex-1">
              <label className="block mb-2 pl-1 text-sm font-medium text-gray-700">
                Cover Image
              </label>
              <input
                type="file"
                name="cover"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full text-sm px-4 py-2 border border-gray-300 rounded-2xl cursor-pointer 
                file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 
                file:text-sm file:font-medium file:bg-purple-50 file:text-purple-700 
                hover:file:bg-purple-100"
              />
            </div>
          </div>

          {/* Submit Button */}
          <Button
            name="Create Account"
            type="submit"
            className="w-full mt-3 bg-purple-600 text-white py-3 rounded-2xl hover:bg-purple-700 transition font-medium"
          />
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-purple-600 font-medium hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
