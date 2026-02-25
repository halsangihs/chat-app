import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useSocket } from "../context/SocketContext";

const Chat = () => {
  const { targetId } = useParams();
  const location = useLocation();
  const targetUsername = location.state?.targetUsername || "User";

  const { socket, user } = useSocket();
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const endRef = useRef(null);

  // Redirect to login page if not authenticated
  useEffect(() => {
    if (!user) navigate("/", { replace: true });
  }, [user, navigate]);

  useEffect(() => {
    const handleReceive = (data) => {
      // Only show messages fro
      // m the user we're chatting with
      
      if (data.socketId === targetId) {
        setChat((prev) => [...prev, { ...data, type: "received" }]);
      }
    };

    socket.on("receive_message", handleReceive);
    return () => socket.off("receive_message", handleReceive);
  }, [socket, targetId]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    setChat((prev) => [
      ...prev,
      { username: "You", message, type: "sent" },
    ]);
    socket.emit("send_message", { message, targetId });
    setMessage("");
  };

  return (
    <div className="h-screen bg-gradient-to-b from-violet-950 to-slate-950 flex items-center justify-center font-sans">
      <div className="w-full max-w-md h-[85vh] flex flex-col rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(139,92,246,0.15)] border border-violet-800/30 bg-slate-900">
        {/* Header */}
        <div className="px-5 py-4 bg-slate-900/80 border-b border-violet-800/20 flex items-center gap-3">
          <button
            onClick={() => navigate("/users")}
            className="text-slate-400 hover:text-white transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <div className="w-9 h-9 rounded-full bg-violet-600 flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-violet-600/30">
            {targetUsername.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-white font-semibold text-base leading-tight">
              {targetUsername}
            </h1>
            <span className="text-emerald-400 text-xs">online</span>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {chat.length === 0 && (
            <p className="text-slate-600 text-sm text-center mt-32">
              Say hi to {targetUsername}...
            </p>
          )}
          {chat.map((msg, i) => (
            <div
              key={i}
              className={`flex ${
                msg.type === "sent" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`text-sm px-4 py-2.5 max-w-[75%] break-words ${
                  msg.type === "sent"
                    ? "bg-violet-600 text-white rounded-2xl rounded-br-sm"
                    : "bg-slate-800 border border-slate-700/50 text-slate-200 rounded-2xl rounded-bl-sm"
                }`}
              >
                {msg.type === "received" && (
                  <p className="text-violet-400 text-xs font-semibold mb-1">
                    {msg.username}
                  </p>
                )}
                {msg.message}
              </div>
            </div>
          ))}
          <div ref={endRef} />
        </div>

        {/* Input */}
        <form
          onSubmit={sendMessage}
          className="p-3 border-t border-violet-800/20 bg-slate-900/80 flex gap-2"
        >
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message..."
            className="flex-1 bg-slate-800 border border-slate-700/50 text-white text-sm rounded-xl px-4 py-2.5 placeholder-slate-500 outline-none focus:border-violet-600 transition"
            autoFocus
          />
          <button
            type="submit"
            className="bg-violet-600 hover:bg-violet-500 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition active:scale-95"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
