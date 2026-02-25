import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSocket } from "../context/SocketContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useSocket();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Please fill in all fields");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const data = await login(email, password);
    //   console.log(data.message)
      if (data.success) {
        navigate("/users");
      } else {
        setError(data.message);
      }
    } catch {
        // console.log(error)
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-b from-violet-950 to-slate-950 flex items-center justify-center font-sans">
      <form
        onSubmit={handleLogin}
        className="flex flex-col items-center gap-5 bg-slate-900 border border-violet-800/30 rounded-2xl p-10 shadow-[0_0_40px_rgba(139,92,246,0.15)] w-full max-w-sm mx-4"
      >
        <div className="w-16 h-16 rounded-full bg-violet-600 flex items-center justify-center shadow-lg shadow-violet-600/30 mb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </div>
        <h1 className="text-white text-2xl font-bold">Welcome Back</h1>
        <p className="text-slate-400 text-sm -mt-3">
          Log in to continue chatting
        </p>

        {error && (
          <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-2 w-72 text-center">
            {error}
          </p>
        )}

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="bg-slate-800 border border-slate-700/50 text-white text-sm rounded-xl px-4 py-3 placeholder-slate-500 outline-none focus:border-violet-600 transition w-72"
          autoFocus
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="bg-slate-800 border border-slate-700/50 text-white text-sm rounded-xl px-4 py-3 placeholder-slate-500 outline-none focus:border-violet-600 transition w-72"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-72 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl text-sm font-semibold transition active:scale-95"
        >
          {loading ? "Logging in..." : "Log In"}
        </button>
        <p className="text-slate-400 text-sm">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-violet-400 hover:text-violet-300 font-medium transition"
          >
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
