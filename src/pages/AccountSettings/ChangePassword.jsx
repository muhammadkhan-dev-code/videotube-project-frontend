import React, { useState } from "react";
import { changePassword } from "../../api/userApi";
import { Input, Button, Loader } from "../../components/index.js";

const ChangePassword = () => {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [status, setStatus] = useState({ type: "idle", message: "" });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.currentPassword || !form.newPassword || !form.confirmPassword) {
      setStatus({ type: "error", message: "All fields are required." });
      return;
    }
    if (form.newPassword !== form.confirmPassword) {
      setStatus({ type: "error", message: "New passwords do not match." });
      return;
    }
    if (form.newPassword.length < 8) {
      setStatus({ type: "error", message: "Use at least 8 characters." });
      return;
    }

    setStatus({ type: "loading", message: "" });
    try {
      const res = await changePassword({
        oldPassword: form.currentPassword,
        newPassword: form.newPassword,
      });
      const message = res?.data?.message || "Password updated successfully.";
      setStatus({ type: "success", message });
      setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error) {
      const message =
        error?.response?.data?.message || "Unable to change password right now.";
      setStatus({ type: "error", message });
    }
  };

  if (status.type === "loading") {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold text-gray-800">Change Password</h1>
          <p className="text-sm text-gray-500">
            Update your password to keep your account secure.
          </p>
        </div>

        {status.message && (
          <div
            className={`text-sm text-center px-3 py-2 rounded-lg ${
              status.type === "error"
                ? "bg-red-50 text-red-600"
                : "bg-green-50 text-green-700"
            }`}
          >
            {status.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Current Password"
            name="currentPassword"
            type="password"
            placeholder="Enter current password"
            value={form.currentPassword}
            onChange={handleChange}
          />
          <Input
            label="New Password"
            name="newPassword"
            type="password"
            placeholder="Enter new password"
            value={form.newPassword}
            onChange={handleChange}
          />
          <Input
            label="Confirm New Password"
            name="confirmPassword"
            type="password"
            placeholder="Re-enter new password"
            value={form.confirmPassword}
            onChange={handleChange}
          />
          <Button
            type="submit"
            name="Update Password"
            className="w-full bg-blue-600 hover:bg-blue-700 rounded-xl"
          />
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
