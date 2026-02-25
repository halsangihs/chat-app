import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SocketProvider } from "./context/SocketContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import OnlineUsers from "./pages/OnlineUsers";
import Chat from "./pages/Chat";

function App() {
  return (
    <SocketProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/users" element={<OnlineUsers />} />
          <Route path="/chat/:targetId" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </SocketProvider>
  );
}

export default App;