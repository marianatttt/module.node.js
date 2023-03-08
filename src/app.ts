
import express, {NextFunction, Request, Response} from "express";
import mongoose from "mongoose";


import {userRouter} from "./routers/user.router";
import {IError} from "./types/common.types";
import {configs} from "./configs/config";


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);

app.use((err:IError, req:Request, res:Response, next: NextFunction)=>{

  const status = err.status || 500;

  return res.status(status).json({
  message: err.message,
    status,
});
})


app.listen(configs.PORT, async () => {
  await mongoose.connect(configs.DB_URL);
  console.log(`start${configs.PORT}`);
});
