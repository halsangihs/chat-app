import express from "express"
import { createServer } from "http";
import { Server } from "socket.io"
import { initSocket } from './config/socket.js';
import {socketServices} from './utils/socketServices.js'
import cors from "cors"
import { connection } from './connection.js'

import {router} from './routes/user.js'

import dotenv from 'dotenv';
dotenv.config();

const app = express();

const url=process.env.DB_URL
connection(url)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.log("error : ", err);
  });


app.use(cors({
    origin: process.env.FRONTEND_URL
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

app.use("/home",router)

const httpServer = createServer(app);
const io = initSocket(httpServer);
socketServices(io);

const port=process.env.PORT || 3000

httpServer.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})


