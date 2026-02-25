import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSocket } from "../context/SocketContext";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup } = useSocket();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password.trim()) {
      setError("Please fill in all fields");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const data = await signup(name, email, password);
      if (data.success) {
         navigate("/users");
      } else {
        setError(data.message);
      }
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-b from-violet-950 to-slate-950 flex items-center justify-center font-sans">
      <form
        onSubmit={handleSignup}
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
              d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
            />
          </svg>
        </div>
        <h1 className="text-white text-2xl font-bold">Create Account</h1>
        <p className="text-slate-400 text-sm -mt-3">
          Sign up to start chatting
        </p>

        {error && (
          <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-2 w-72 text-center">
            {error}
          </p>
        )}

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
          className="bg-slate-800 border border-slate-700/50 text-white text-sm rounded-xl px-4 py-3 placeholder-slate-500 outline-none focus:border-violet-600 transition w-72"
          autoFocus
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="bg-slate-800 border border-slate-700/50 text-white text-sm rounded-xl px-4 py-3 placeholder-slate-500 outline-none focus:border-violet-600 transition w-72"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password (min 6 characters)"
          className="bg-slate-800 border border-slate-700/50 text-white text-sm rounded-xl px-4 py-3 placeholder-slate-500 outline-none focus:border-violet-600 transition w-72"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-72 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl text-sm font-semibold transition active:scale-95"
        >
          {loading ? "Creating account..." : "Sign Up"}
        </button>
        <p className="text-slate-400 text-sm">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-violet-400 hover:text-violet-300 font-medium transition"
          >
            Log In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
