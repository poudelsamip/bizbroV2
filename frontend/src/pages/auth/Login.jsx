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
      // setError(error.message || "Login Failed");
      // setVerificationError(error.message);
      if (error.message === "verificationError") {
        setVerificationError(
          `Your account is not verified. Please verify before continuing. Verification code has been sent to your email previously`
        );
        setStep(2);
      } else if (error.message === "invalidCredentials") {
        setError("invalid credentials");
      } else {
        setError(error.message || "login failed");
      }
    }
    setLoading(false);
  };

  const handleLoginWithGoogle = async () => {
    window.location.href = `${
      import.meta.env.VITE_BACKEND_URL
    }/api/auth/google`;
  };

  const handleVerifyCode = async () => {
    if (await verifyEmailCode(email, code)) {
      await login(email, password);
      navigate("/dashboard");
    } else {
      setVerificationError2("invalid verification code");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      {step === 1 && (
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-200 p-8 lg:p-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-600">Sign in to your account to continue</p>
          </div>

          <button
            onClick={handleLoginWithGoogle}
            className="flex items-center justify-center gap-3 w-full bg-white hover:bg-gray-50 border-2 border-gray-300 py-3 px-4 rounded-lg font-medium text-gray-700 transition-all mb-6 shadow-sm hover:shadow"
          >
            <FcGoogle size={24} />
            <span>Continue With Google</span>
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with email</span>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm text-center">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              />
            </div>

            <div className="flex items-center justify-end">
              <Link
                to="/forgotpassword"
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="cursor-pointer w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
            >
              {!loading ? "Sign In" : "Signing in..."}
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-600 hover:text-blue-700 font-semibold">
                Create account
              </Link>
            </p>
          </div>
        </div>
      )}
      {step === 2 && (
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-200 p-8 lg:p-10">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Verify Your Email
            </h2>
            <p className="text-gray-600 text-sm">
              Enter the verification code sent to your email
            </p>
          </div>
          
          <div className="space-y-5">
            {verificationError && (
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800 text-sm">
                {verificationError}
              </div>
            )}
            {verificationError2 && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {verificationError2}
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Verification Code
              </label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter verification code"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-center text-lg tracking-widest"
                required
              />
            </div>
            <button
              onClick={handleVerifyCode}
              className="cursor-pointer w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
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
