import { model, Schema } from "mongoose";
import {EGenders, EUserStatus} from "../enums";




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
    age:{
        type: String,
        required: false,
    },
    gender:{
        type: String,
        enum: EGenders
    },
    status: {
        type: String,
        enum: EUserStatus,
        default: EUserStatus.inactive,
    },

},{
    versionKey:false,
    timestamps:true
})

export const User = model ("user", userSchema);