import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

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
      if (await sendVerificationCode(email, "register")) {
        setDataEntered(true);
      } else {
        setError("error");
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

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      {!dataEntered ? (
        <div className="w-full max-w-md p-8 bg-slate-800 border border-slate-500">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Create Account
          </h2>

          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-slate-300 mb-1">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
                className="w-full px-3 py-2 border border-slate-500 text-slate-100 focus:outline-none"
                required
              />
            </div>

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
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          <p className="mt-4 text-slate-400 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
      ) : (
        <div className="w-full max-w-md p-8 bg-slate-800 border border-slate-500">
          <p className="text-gray-200 text-center text-xl">
            A verification email has been sent to
          </p>
          <p className="text-gray-200 text-center mb-4 text-xl">{email}</p>
          <div>
            <label className="block text-slate-300 mb-1">
              Verification Code
            </label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="123456"
              className="w-full px-3 py-2 border border-slate-500 text-slate-100 focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            onClick={handleVerifyAndRegister}
            className="mt-4 cursor-pointer w-full py-2 bg-blue-600 text-white border border-blue-600 hover:bg-blue-700"
          >
            {!verificationLoading ? "Verify" : "Verifying ..."}
          </button>
        </div>
      )}
    </div>
  );
};

export default Register;
