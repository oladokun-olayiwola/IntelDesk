import { model, Schema, Document, Types } from "mongoose";

// Location type definition
interface Location {
  type: 'Point';
  coordinates: [number, number];
  address?: string;
}

export interface IncidentInterface extends Document {
  status: 'pending' | 'in_progress' | 'completed';
  reported_by: Types.ObjectId;
  title: string;
  description: string;
  address: Location | string | string[]; // Can be GeoJSON or string address
  created_at: Date;
  updated_at: Date;
}

const IncidentSchema = new Schema<IncidentInterface>({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    minlength: [10, 'Description should be at least 10 characters']
  },
  address: {
    type: Schema.Types.Mixed, // Can store either GeoJSON or string
    required: [true, 'Location is required'],
    validate: {
      validator: function(loc: any) {
        // Validate either GeoJSON Point or string address
        return (
          (typeof loc === 'string') || 
          (loc?.type === 'Point' && Array.isArray(loc.coordinates))
        );
      },
      message: 'Location must be either a valid address string or GeoJSON Point'
    }
  },
  reported_by: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, 'Reporter ID is required'],
    immutable: true // Cannot be changed after creation
  },
  status: {
    type: String,
    enum: {
      values: ["pending", "in_progress", "completed"],
      message: 'Status must be either pending, in_progress, or completed'
    },
    default: "pending"
  }
}, {
  timestamps: { 
    createdAt: "created_at", 
    updatedAt: "updated_at" 
  },
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Add text index for search
IncidentSchema.index({ title: 'text', description: 'text' });

// For GeoJSON queries if using coordinates
IncidentSchema.index({ location: '2dsphere' });

export const Incident = model<IncidentInterface>("Incident", IncidentSchema);