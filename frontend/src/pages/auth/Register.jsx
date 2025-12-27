import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [verificationLoading, setVerificationLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const [code, setCode] = useState("");
  const [dataEntered, setDataEntered] = useState(false);

  const { sendVerificationCode, register, regError } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!email || !password || !name) {
        setError("All fields are required");
        return;
      }
      if (await sendVerificationCode(email, "register", name, password)) {
        setDataEntered(true);
      } else {
        setError("User with this email already exists");
        setLoading(false);
        return;
      }
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed");
    }
    setLoading(false);
  };

  const handleVerifyAndRegister = async () => {
    setVerificationLoading(true);
    setError("");
    try {
      await register(name, email, password, code);
      setError(regError);
    } catch (error) {
      setError(error.response?.data?.message || "Registration Failed");
    }
    setVerificationLoading(false);
  };

  const handleLoginWithGoogle = async () => {
    window.location.href = `${
      import.meta.env.VITE_BACKEND_URL
    }/api/auth/google`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      {!dataEntered ? (
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-200 p-8 lg:p-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Create Account
            </h2>
            <p className="text-gray-600">Get started with BizBro today</p>
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
              <span className="px-2 bg-white text-gray-500">Or sign up with email</span>
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
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              />
            </div>

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
                placeholder="Create a strong password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              />
            </div>

            <button
              type="submit"
              className="cursor-pointer w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 hover:text-blue-700 font-semibold">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-200 p-8 lg:p-10">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Verify Your Email
            </h2>
            <p className="text-gray-600 text-sm mb-2">
              A verification email has been sent to
            </p>
            <p className="text-gray-900 font-medium">{email}</p>
            <p className="text-gray-500 text-xs mt-2">
              Please check your inbox and enter the code below
            </p>
          </div>
          
          <div className="space-y-5">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
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
                placeholder="Enter 6-digit code"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-center text-lg tracking-widest"
                required
              />
            </div>
            <button
              type="submit"
              onClick={handleVerifyAndRegister}
              className="cursor-pointer w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
            >
              {!verificationLoading ? "Verify & Complete Registration" : "Verifying..."}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
