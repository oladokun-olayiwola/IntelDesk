import { model, Schema } from "mongoose";


export interface IncidentInterface extends Document {
  status: 'open' | 'in_progress' | 'closed';
  reported_by: string;
  title: string;
  description: string;
  location: Location;
  createdAt: Date;
  updatedAt: Date;
}

const IncidentSchema = new Schema({
    title: {
        type: String,
    },
    desription: {
        type: String,
        required: true,
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
        enum: ["pending", "in_rogress", "completed"],
        default: "pending",
    },

}, {
    timestamps: {createdAt: "created_at", updatedAt: "update_at"}
})

export const Incident = model<IncidentInterface>("Incident", IncidentSchema)