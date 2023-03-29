
import express, {NextFunction, Request, Response} from "express";
import mongoose from "mongoose";
import fileUploader from "express-fileupload";

import {userRouter} from "./routers";
import {configs} from "./configs";
import {authRouter} from "./routers";
import {IError} from "./types";
import {cronRunner} from "./crons";


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUploader());

app.use("/users", userRouter);
app.use("/auth", authRouter);



app.use((err:IError, req:Request, res:Response, next: NextFunction)=>{

  const status = err.status || 500;

  return res.status(status).json({
  message: err.message,
    status,
});
})


app.listen(configs.PORT, async () => {
  await mongoose.connect(configs.DB_URL);
  cronRunner();
  console.log(`start${configs.PORT}`);
});
