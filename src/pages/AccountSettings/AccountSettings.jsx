import React, { useState } from "react";
import { updateAccount, changePassword } from "../api/userApi";
import {Loader} from "../../components/index.js";

const AccountSettings = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    oldPassword: "",
    newPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdateAccount = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await updateAccount({
        fullName: form.fullName,
        email: form.email,
      });
      setMessage(res.data?.message || "Account updated successfully!");
    } catch (err) {
      setMessage("Error updating account.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await changePassword({
        oldPassword: form.oldPassword,
        newPassword: form.newPassword,
      });
      setMessage(res.data?.message || "Password changed successfully!");
    } catch (err) {
      setMessage("Error changing password.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="flex flex-col items-center mt-10 px-4">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">
        Account Settings
      </h1>

      {message && (
        <p className="text-center text-sm text-green-600 mb-4">{message}</p>
      )}

      {/* Update Account Section */}
      <form
        onSubmit={handleUpdateAccount}
        className="bg-white shadow-md rounded-lg p-6 w-full max-w-md mb-8"
      >
        <h2 className="text-lg font-medium mb-4 text-gray-700">
          Update Account Info
        </h2>

        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={form.fullName}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded-md"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded-md"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          Update Account
        </button>
      </form>

      {/* Change Password Section */}
      <form
        onSubmit={handleChangePassword}
        className="bg-white shadow-md rounded-lg p-6 w-full max-w-md"
      >
        <h2 className="text-lg font-medium mb-4 text-gray-700">
          Change Password
        </h2>

        <input
          type="password"
          name="oldPassword"
          placeholder="Old Password"
          value={form.oldPassword}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded-md"
        />
        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          value={form.newPassword}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded-md"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          Change Password
        </button>
      </form>
    </div>
  );
};

export default AccountSettings;
