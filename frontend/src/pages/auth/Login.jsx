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
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      {step === 1 && (
        <div className="w-full max-w-md p-8 bg-slate-800 border border-slate-500">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Welcome Back
          </h2>

          <button
            onClick={handleLoginWithGoogle}
            className="flex items-center justify-center gap-4 w-full bg-gray-300 hover:bg-gray-400 py-2 mb-4"
          >
            <FcGoogle size={25} />
            <span className="font-semibold">Continue With Google</span>
          </button>

          <p className="text-center text-white text-xl">---- OR ----</p>

          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
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

            <div>
              <label className="block text-slate-300 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                className="w-full px-3 py-2 border border-slate-500 text-slate-100 focus:outline-none"
                required
              />
            </div>

            <button
              type="submit"
              className="cursor-pointer w-full py-2 bg-blue-600 text-white border border-blue-600 hover:bg-blue-700"
            >
              {!loading ? "Login" : "logging in ..."}
            </button>
          </form>

          <div className="flex justify-between text-sm mt-1">
            <p className="">
              <Link
                to="/forgotpassword"
                className="text-blue-500 hover:underline"
              >
                Forgot Password ?
              </Link>
            </p>
            <p className="text-slate-400">
              Don’t have an account?{" "}
              <Link to="/register" className="text-blue-500 hover:underline">
                Register
              </Link>
            </p>
          </div>
        </div>
      )}
      {step === 2 && (
        <div className="w-full max-w-md p-8 bg-slate-800 border border-slate-500">
          <div className="space-y-4">
            <p className="text-gray-300 text-center mb-2">
              {verificationError}
            </p>
            <p className="text-red-500 text-center mb-2">
              {verificationError2}
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
              onClick={handleVerifyCode}
              className="cursor-pointer w-full py-2 bg-blue-600 text-white border border-blue-600 hover:bg-blue-700"
            >
              verify
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
