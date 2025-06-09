import { Schema } from "mongoose";

const IncidentSchema = new Schema({
    title: {
        type: String,
    },
    desription: {
        type: String,
    },
    location: {
        type: String,
    },
    reported_by: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    status: {
        type: String,
    },

}, {
    timestamps: {createdAt: "created_at", updatedAt: "update_at"}
})