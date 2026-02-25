import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketContext";
import { useEffect } from "react";

const OnlineUsers = () => {
  const { socket, user, onlineUsers } = useSocket();
  const navigate = useNavigate();

  // Redirect to login page if not authenticated
  useEffect(() => {
    if (!user) navigate("/", { replace: true });
  }, [user, navigate]);

  // Filter out current user from the list
  const others = onlineUsers.filter(([id]) => id !== socket?.id);

  const handleSelectUser = (targetSocketId, targetUsername) => {
    navigate(`/chat/${targetSocketId}`, {
      state: { targetUsername },
    });
  };

  return (
    <div className="h-screen bg-gradient-to-b from-violet-950 to-slate-950 flex items-center justify-center font-sans">
      <div className="w-full max-w-md h-[85vh] flex flex-col rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(139,92,246,0.15)] border border-violet-800/30 bg-slate-900">
        {/* Header */}
        <div className="px-5 py-4 bg-slate-900/80 border-b border-violet-800/20 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-violet-600 flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-violet-600/30">
            {user?.name?.charAt(0)?.toUpperCase()}
          </div>
          <div className="flex-1">
            <h1 className="text-white font-semibold text-base leading-tight">
              Online Users
            </h1>
            <span className="text-violet-400 text-xs">
              {onlineUsers.length} online
            </span>
          </div>
        </div>

        {/* User List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {others.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <p className="text-slate-500 text-sm">
                No other users online yet.
              </p>
              <p className="text-slate-600 text-xs mt-1">
                Share the link and wait for someone to join!
              </p>
            </div>
          ) : (
            others.map(([socketId, name]) => (
              <button
                key={socketId}
                onClick={() => handleSelectUser(socketId, name)}
                className="w-full flex items-center gap-3 p-3 rounded-xl bg-slate-800/60 border border-slate-700/40 hover:border-violet-600/50 hover:bg-slate-800 transition cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-full bg-violet-600/80 flex items-center justify-center text-white text-sm font-bold group-hover:bg-violet-600 transition">
                  {name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 text-left">
                  <p className="text-white text-sm font-medium">{name}</p>
                  <p className="text-slate-500 text-xs">Tap to chat</p>
                </div>
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/40" />
              </button>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="px-5 py-3 border-t border-violet-800/20 bg-slate-900/80">
          <p className="text-slate-500 text-xs text-center">
            Logged in as <span className="text-violet-400 font-medium">{user?.name}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OnlineUsers;
