import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (error) {
      setError(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-slate-800 border border-slate-500">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Welcome Back
        </h2>
        <p className="text-gray-400 text-center bg-gray-700">
          for preloaded data :
        </p>
        <p className="text-gray-400 text-center bg-gray-700">
          Email : demo.user@gmail.com
        </p>
        <p className="text-gray-400 text-center bg-gray-700">
          Password : Demo@123
        </p>
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
            Login
          </button>
        </form>

        <p className="mt-4 text-slate-400 text-center">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
