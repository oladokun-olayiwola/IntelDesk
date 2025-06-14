import { model, Schema } from "mongoose";

export interface IncidentInterface extends Document {
  status: 'pending' | 'in_progress' | 'completed';
  reported_by: string;
  title: string;
  description: string;
  location: Location;
  created_at: Date;
  updated_at: Date;
}

const IncidentSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {  // Fixed typo from 'desription'
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    reported_by: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "in_progress", "completed"],  // Fixed typo from "in_rogress"
        default: "pending",
    },
}, {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }  // Fixed typo from "update_at"
});

export const Incident = model<IncidentInterface>("Incident", IncidentSchema);