import { User } from '../models/user.js'
import {Conversation} from '../models/conversation.js'
import {Message} from '../models/message.js'
const onlineUsers = new Map();

export const socketServices = (io) => {
  io.on("connection", (socket) => {
    console.log("new user connected:", socket.id);

    socket.on("register", async ({ email }) => {
      try {
        const user = await User.findOne({ email });

        if (!user) return;

        const oldSocketId = user.socket_id;
        const wasActive = user.isActive && oldSocketId && oldSocketId !== socket.id;

        // Update DB FIRST before disconnecting old socket
        // This ensures the disconnect handler finds no user by the old socket_id
        user.socket_id = socket.id;
        user.isActive = true;
        await user.save();

        if (wasActive) {
          onlineUsers.delete(oldSocketId);
          const oldSocket = io.sockets.sockets.get(oldSocketId);
          if (oldSocket) {
            oldSocket.emit("force_disconnect", "Logged in from another device/tab");
            oldSocket.disconnect(true);
          }
        }

        onlineUsers.set(socket.id, user.name);
        console.log("User registered:", user.name);
        io.emit("online_users", [...onlineUsers.entries()]);
        
      } catch (err) {
        console.log("Register error:", err);
      }
    });

    socket.on("send_message",async({message, targetId})=>{
        const id= socket.id;
        const user=await User.find({socket_id:id})
        
    })
    

    socket.on("disconnect",async () => {
      const username = onlineUsers.get(socket.id);
      try {
        const user = await User.findOne({ socket_id: socket.id });
          if (user) {
            user.isActive = false;
            user.socket_id = null;
            await user.save();
          }
        } catch (err) {
        console.log("Disconnect error:", err);
      }
      console.log(`${username || socket.id} disconnected`);
      onlineUsers.delete(socket.id);

      io.emit("online_users", [...onlineUsers.entries()]);
    });
  });
};