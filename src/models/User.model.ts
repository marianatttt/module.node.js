import { model, Schema } from "mongoose";
import {EGenders} from "../src/enums";



const userSchema = new Schema ({
    name:{
        type: String,
    },
    email:{
        type: String,
        unique: true,
        required: [true, "email is required"],
        trim:true,
        lowercase:true
    },
    password:{
        type: String,
        required: [true, "password is required"]
    },
    gender:{
        type: String,
        enum: EGenders
    }
},{
    versionKey:false,
    timestamps:true
})

export const User = model ("user", userSchema);