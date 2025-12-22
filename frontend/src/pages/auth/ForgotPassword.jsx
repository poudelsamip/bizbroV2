import { useContext, useState } from "react";
import { data, Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [codeCheckLoading, setCodeCheckLoading] = useState(false);
  const [resetPasswordLoading, setResetPasswordLoading] = useState(false);
  const [dataEntered, setDataEntered] = useState("");

  const { sendVerificationCode, verifyEmailCode, resetPassword } =
    useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!email) {
      setError("Email is required");
      setLoading(false);
      return;
    }
    await sendVerificationCode(email);
    setDataEntered("email");
    setLoading(false);
  };

  const verifyCode = async () => {
    setCodeCheckLoading(true);
    setError("");
    const verified = await verifyEmailCode(email, code);
    if (verified !== true) {
      setError("Verification failed");
      setCodeCheckLoading(false);
      return;
    }
    setDataEntered("code");
    setCodeCheckLoading(false);
  };

  const handleResetPassword = async () => {
    setResetPasswordLoading(true);
    await resetPassword(email, newPassword);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-slate-800 border border-slate-500">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Reset Your Password
        </h2>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        {!dataEntered && (
          <div className="space-y-4">
            <div>
              <label className="block text-slate-300 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-3 py-2 border border-slate-500 text-slate-100 focus:outline-none"
                required
              />
            </div>

            <button
              onClick={handleSubmit}
              className="cursor-pointer w-full py-2 bg-blue-600 text-white border border-blue-600 hover:bg-blue-700"
            >
              {!loading ? "Reset Password" : "Resetting ..."}
            </button>
          </div>
        )}
        {dataEntered === "email" && (
          <div className="space-y-4">
            <p className="text-gray-300 text-center mb-2">
              Verification code has been sent to your email.
            </p>
            <div>
              <label className="block text-slate-300 mb-1">
                Verification Code
              </label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="12345"
                className="w-full px-3 py-2 border border-slate-500 text-slate-100 focus:outline-none"
                required
              />
            </div>
            <button
              onClick={verifyCode}
              className="cursor-pointer w-full py-2 bg-blue-600 text-white border border-blue-600 hover:bg-blue-700"
            >
              {!codeCheckLoading ? "Verify" : "Verifying ..."}
            </button>
          </div>
        )}
        {dataEntered === "code" && (
          <div className="space-y-4">
            <div>
              <label className="block text-slate-300 mb-1">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full px-3 py-2 border border-slate-500 text-slate-100 focus:outline-none"
                required
              />
            </div>
            <button
              onClick={handleResetPassword}
              className="cursor-pointer w-full py-2 bg-blue-600 text-white border border-blue-600 hover:bg-blue-700"
            >
              {!resetPasswordLoading ? "Reset Password" : "Resetting ..."}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default ForgotPassword;
