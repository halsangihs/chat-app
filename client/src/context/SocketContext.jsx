import { createContext, useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

export const SocketProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { name, email }
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

 
  const connectSocket = (email) => { 
    const newSocket = io(API_URL);

    newSocket.on("connect", () => {
      console.log("Socket connected:", newSocket.id);
      newSocket.emit("register", { email });
    });

    newSocket.on("disconnect", () => {
      console.log("Socket disconnected:", newSocket.id);
    });
    
    newSocket.on("force_disconnect", (reason) => {
      console.log("Force disconnected:", reason);
      newSocket.disconnect(); // prevent auto-reconnect
      alert(reason || "You have been disconnected because you logged in elsewhere.");
      setUser(null);
      setSocket(null);
      setOnlineUsers([]);
    });
    newSocket.on("online_users", (users) => {
      setOnlineUsers(users);
    });

    setSocket(newSocket);
  };

  // Disconnect socket on logout
  const disconnectSocket = () => {
    if (socket) {
      socket.disconnect();
      setSocket(null);
    }
    setOnlineUsers([]);
  };

  const login = async (email, password) => {
    const res = await fetch(`${API_URL}/home/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (data.success) {
      setUser(data.user);
      connectSocket(email); // socket connects HERE, only after login
    }
    return data;
  };

  const signup = async (name, email, password) => {
    const res = await fetch(`${API_URL}/home/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
     if (data.success) {
      setUser(data.user);
      connectSocket(email); // socket connects HERE, only after login
    }
    return data;
  };

  const logout = () => {
    setUser(null);
    disconnectSocket();
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (socket) socket.disconnect();
    };
  }, [socket]);

  return (
    <SocketContext.Provider
      value={{ socket, user, onlineUsers, login, signup, logout }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
