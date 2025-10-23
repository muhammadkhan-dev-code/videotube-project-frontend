import React, { useState } from "react";
import { logo, Button, Input } from "../../components/index.js";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data:", formData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="bg-gray-50 shadow-lg rounded-2xl p-8 w-full max-w-md border border-fuchsia-900 mt-4">
       
        <div className="text-center mb-5">
          <img
            src={logo}
            alt="MyTube Logo"
            className="mx-auto w-12 h-12 mb-3"
          />
          <h2 className="text-xl font-semibold mt-2 mb-1">
            Welcome Back to MyTube
          </h2>
          <p className="text-gray-500 text-sm">
            Sign in to continue watching and sharing videos
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
         
          <Input
          
            type="email"
            name="email"
            placeholder="myemail@.com"
            value={formData.email}
            onChange={handleChange}
            required
          />

          {/* Password Input */}
          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
           
          />

          {/* Forgot password */}
          <div className="text-right text-sm">
            <a
              href="/forgot-password"
              className="text-purple-600 hover:underline font-medium"
            >
              Forgot password?
            </a>
          </div>

          {/* Sign In Button */}
          <Button
            name="Sign In"
            type="submit"
            className="w-full mt-3 bg-purple-600 text-white py-3 rounded-full hover:bg-purple-700 transition font-medium"
            onClick={() => console.log("Sign in clicked")}
          />
        </form>

        {/* Sign Up Link */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Don’t have an account?{" "}
          <a href="/sign-up" className="text-purple-600 font-medium hover:underline">
            Create one
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
