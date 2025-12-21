import { useState } from "react";
import { forgotPassword } from "../../api/userApi";
import { Button, Input, Loader, logo } from "../../components/index.js";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ type: "idle", message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setStatus({ type: "error", message: "Email is required." });
      return;
    }
    setStatus({ type: "loading", message: "" });
    try {
      const res = await forgotPassword(email.trim());
      const message = res?.data?.message || "If the email exists, a reset link was sent.";
      setStatus({ type: "success", message });
      setEmail("");
    } catch (error) {
      const message =
        error?.response?.data?.message || "Unable to process request right now.";
      setStatus({ type: "error", message });
    }
  };

  if (status.type === "loading") {
    return <Loader />;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md border border-purple-200">
        <div className="text-center mb-6">
          <img src={logo} alt="MyTube Logo" className="mx-auto w-12 h-12 mb-3" />
          <h1 className="text-2xl font-semibold text-gray-800">Forgot Password</h1>
          <p className="text-gray-500 text-sm mt-1">
            Enter your email and we will send you reset instructions.
          </p>
        </div>

        {status.message && (
          <div
            className={`text-sm text-center px-3 py-2 rounded-lg mb-4 ${
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
            label="Email"
            type="email"
            name="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button
            type="submit"
            name="Send Reset Link"
            className="w-full bg-purple-600 hover:bg-purple-700 rounded-full"
          />
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
