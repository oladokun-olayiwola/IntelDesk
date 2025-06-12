import { model, Schema } from "mongoose";

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
            type: String,
            enum: ["supervisor", "officer", "admin", "citizen"]
    },
    rank: {
        type: String,
        required: true,
    },
    assigned: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    }
})

export const User =  model("Users", UserSchema);