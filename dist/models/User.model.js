"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const user_type_1 = require("../types/user.type");
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        required: [true, "email is required"],
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, "password is required"]
    },
    gender: {
        type: String,
        enum: user_type_1.EGenders
    }
});
exports.User = (0, mongoose_1.model)("user", userSchema);
