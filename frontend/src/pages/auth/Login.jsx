import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [code, setCode] = useState("");
  const [verificationError, setVerificationError] = useState("");
  const [verificationError2, setVerificationError2] = useState("");
  const navigate = useNavigate();
  const { login, verifyEmailCode } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
    } catch (error) {
      if (error.message === "verificationError") {
        setVerificationError(
          "Your account is not verified. Please verify before continuing. Verification code has been sent to your email previously."
        );
        setStep(2);
      } else if (error.message === "invalidCredentials") {
        setError("Invalid credentials");
      } else {
        setError(error.message || "Login failed");
      }
    }
    setLoading(false);
  };

  const handleLoginWithGoogle = () => {
    window.location.href = `${
      import.meta.env.VITE_BACKEND_URL
    }/api/auth/google`;
  };

  const handleVerifyCode = async () => {
    if (await verifyEmailCode(email, code)) {
      await login(email, password);
      navigate("/dashboard");
    } else {
      setVerificationError2("Invalid verification code");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      {step === 1 && (
        <div className="w-full max-w-sm bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="text-center mb-5">
            <h2 className="text-xl font-semibold text-gray-900">Sign in</h2>
            <p className="text-sm text-gray-500">Welcome back</p>
          </div>

          <button
            onClick={handleLoginWithGoogle}
            className="flex items-center justify-center gap-2 w-full border border-gray-200 py-2.5 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition mb-4"
          >
            <FcGoogle size={20} />
            Continue with Google
          </button>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-2 text-gray-400">or</span>
            </div>
          </div>

          {error && (
            <div className="mb-3 p-2 bg-red-50 border border-red-200 rounded-md text-xs text-red-700 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            <div className="flex justify-end">
              <Link
                to="/forgotpassword"
                className="text-xs text-blue-600 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition"
            >
              {!loading ? "Sign In" : "Signing in..."}
            </button>
          </form>

          <p className="mt-4 text-center text-xs text-gray-500">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 font-medium hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      )}

      {step === 2 && (
        <div className="w-full max-w-sm bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="text-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Email Verification
            </h2>
            <p className="text-xs text-gray-500">
              Enter the code sent to your email
            </p>
          </div>

          <div className="space-y-4">
            {verificationError && (
              <div className="p-2 bg-yellow-50 border border-yellow-200 rounded-md text-xs text-yellow-800">
                {verificationError}
              </div>
            )}

            {verificationError2 && (
              <div className="p-2 bg-red-50 border border-red-200 rounded-md text-xs text-red-700">
                {verificationError2}
              </div>
            )}

            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="123456"
              className="w-full px-3 py-2.5 border border-gray-200 rounded-md text-center text-sm tracking-widest focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />

            <button
              onClick={handleVerifyCode}
              className="w-full py-2.5 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition"
            >
              Verify & Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
