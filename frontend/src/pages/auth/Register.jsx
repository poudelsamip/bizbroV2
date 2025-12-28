import { useContext, useState } from "react";
import { Link } from "react-router-dom";
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
    setError("");

    try {
      if (!email || !password || !name) {
        setError("All fields are required");
        setLoading(false);
        return;
      }

      if (await sendVerificationCode(email, "register", name, password)) {
        setDataEntered(true);
      } else {
        setError("User with this email already exists");
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
      setError(error.response?.data?.message || "Registration failed");
    }

    setVerificationLoading(false);
  };

  const handleLoginWithGoogle = () => {
    window.location.href = `${
      import.meta.env.VITE_BACKEND_URL
    }/api/auth/google`;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      {!dataEntered ? (
        <div className="w-full max-w-sm bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="text-center mb-5">
            <h2 className="text-xl font-semibold text-gray-900">
              Create account
            </h2>
            <p className="text-sm text-gray-500">Get started with bizbro</p>
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
                Full name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

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

            <button
              type="submit"
              className="w-full py-2.5 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition"
            >
              {loading ? "loading..." : "Create account"}
            </button>
          </form>

          <p className="mt-4 text-center text-xs text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-medium hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      ) : (
        <div className="w-full max-w-sm bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="text-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Verify email
            </h2>
            <p className="text-xs text-gray-500">Code sent to</p>
            <p className="text-sm font-medium text-gray-900">{email}</p>
          </div>

          <div className="space-y-4">
            {error && (
              <div className="p-2 bg-red-50 border border-red-200 rounded-md text-xs text-red-700">
                {error}
              </div>
            )}

            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="123456"
              className="w-full px-3 py-2.5 border border-gray-200 rounded-md text-center text-sm tracking-widest focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />

            <button
              onClick={handleVerifyAndRegister}
              className="w-full py-2.5 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition"
            >
              {verificationLoading ? "Verifying..." : "Verify & Continue"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
