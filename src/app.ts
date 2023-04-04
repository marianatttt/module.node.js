// import {locale} from "dayjs";

import {Server, Socket} from "socket.io";
const http = require('http')

import * as swaggerUi from "swagger-ui-express";

import express, {NextFunction, Request, Response} from "express";
import mongoose from "mongoose";
import fileUploader from "express-fileupload";

import {userRouter} from "./routers";
import {configs} from "./configs";
import {authRouter} from "./routers";
import {IError} from "./types";
import {cronRunner} from "./crons";
import * as swaggerJson from "./utils/swagger.json"


const app = express();
const server = http.createServer(app)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUploader());

const io = new Server(server, {
  cors: {
    origin:"*",
  },
  });

io.on('connection', async (socket:Socket) => {

  // console.log(socket.handshake.auth.token)
const sockets = await io.fetchSockets();

sockets.forEach((socket)=>{
  console.log(socket.id);

})

  /** Send to particular client */
  // socket.emit('message', {message: 'hello'})

  /** Send to all client */
  // io.emit('user:connected',{message: 'user connected'})

  /** Send to all client without sender */
  // socket.broadcast.emit('user:connected',{message: 'user connected'})

  socket.on('message:send',(text)=>{
  io.emit('message:get', text)
  })

  // socket.on('disconnect', ()=>{
  //   console.log(`${socket.id} disconnect`)
  // })
  //
  // socket.on('join:room', ({roomId})=>{
  //   socket.join(roomId)
  //
  //   socket
  //       .to(roomId)
  //       .emit('user:joined', {socketId:socket.id, action:'Joined'})
  // })
  //   socket.on('leave:room', ({roomId})=>{
  //     socket.leave(roomId);
  //     socket.to(roomId).emit('user:leave',{socketId:socket.id, action:'Leave'} )
  //   })
})





app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerJson))



app.use((err:IError, req:Request, res:Response, next: NextFunction)=>{

  const status = err.status || 500;

  return res.status(status).json({
  message: err.message,
    status,
});
})


server.listen(configs.PORT, async () => {
  await mongoose.connect(configs.DB_URL);
  cronRunner();
  console.log(`start${configs.PORT}`);
});
