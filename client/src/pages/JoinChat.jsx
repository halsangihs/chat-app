import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketContext";

const JoinChat = () => {
  const [name, setName] = useState("");
  const { register } = useSocket();
  const navigate = useNavigate();

  const handleJoin = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    register(name.trim());
    navigate("/users");
  };

  return (
    <div className="h-screen bg-gradient-to-b from-violet-950 to-slate-950 flex items-center justify-center font-sans">
      <form
        onSubmit={handleJoin}
        className="flex flex-col items-center gap-5 bg-slate-900 border border-violet-800/30 rounded-2xl p-10 shadow-[0_0_40px_rgba(139,92,246,0.15)]"
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
        <h1 className="text-white text-2xl font-bold">Join ChatRoom</h1>
        <p className="text-slate-400 text-sm -mt-3">
          Enter your name to get started
        </p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name..."
          className="bg-slate-800 border border-slate-700/50 text-white text-sm rounded-xl px-4 py-3 placeholder-slate-500 outline-none focus:border-violet-600 transition w-72"
          autoFocus
        />
        <button
          type="submit"
          className="w-72 bg-violet-600 hover:bg-violet-500 text-white px-6 py-3 rounded-xl text-sm font-semibold transition active:scale-95"
        >
          Join Chat
        </button>
      </form>
    </div>
  );
};

export default JoinChat;
