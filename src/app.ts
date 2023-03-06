import express, { Request, Response } from "express";
import mongoose from "mongoose";
import {User} from "./models/User.model";
import {IUser} from "./types/user.type";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/users",
    async (req: Request, res: Response): Promise<Response<IUser[]>> => {
      const users = await User.find();
       return res.json(users);
    });

app.post("/users", async (req: Request, res: Response): Promise<Response<IUser>> => {
  try {
    const body = req.body;
    const user = await User.create({...body});

    return res.status(201).json({
      message:"User Created",
      data: user,
    });
  } catch (e){
    console.log(e.message)
  }
});

// ============================
app.get('/users/:userId',async (req: Request, res: Response): Promise<Response<IUser>> => {
  const user = await User.findOne({email: "teste@gmail.com"})
  return res.json(user);
});


app.put('/users/:userId',async (req: Request, res: Response): Promise<Response<IUser>> => {
  const { userId } = req.params;
  const user = req.body;

  const updateUser = await User.updateOne({ _id: userId }, {...user});

  return res.status(200).json({
    message:"User updated",
    data:updateUser
  });
});


app.delete('/users/:userId',async (req: Request, res: Response): Promise<Response<IUser>> => {
  const { userId } = req.params;

  await User.deleteOne({ _id: userId });

  return res.status(200).json({
    message:"User deleted",

  });
});








console.log("hello");

const PORT = 5500;

app.listen(PORT, () => {
  mongoose.connect('mongodb://127.0.0.1:27017/test')
  console.log(`start${PORT}`);
});
