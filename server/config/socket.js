import { Server } from "socket.io";
let io;

export const initSocket = (server) => {
     try {
    io = new Server(server, {
      cors: {
        origin: process.env.FRONTEND_URL,
      },
    });
    return io;
  } catch (error) {
    return console.error('[Socket.IO]: Error Initializing Io',error.message);
  }
};

 
