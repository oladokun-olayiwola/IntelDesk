import { model, Schema, Document } from "mongoose";

// 1. First define the interface
interface IUser extends Document {
  fullName: string;
  password: string;
  role: 'supervisor' | 'officer' | 'admin' | 'citizen';
  rank?: string;
  assigned?: string;
  email: string;
}

// 2. Create the schema with proper typing
const UserSchema = new Schema<IUser>({
  fullName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["supervisor", "officer", "admin", "citizen"],
    required: true
  },
  rank: {
    type: String,
    required: function(this: IUser) { 
      return ['supervisor', 'officer'].includes(this.role); 
    }
  },
  assigned: {
    type: String,
    required: function(this: IUser) { 
      return ['supervisor', 'officer'].includes(this.role); 
    }
  },
  email: {
    type: String,
    required: true,
    unique: true
  }
});

// 3. Add pre-save hook with proper typing
UserSchema.pre<IUser>('save', function(next) {
  if (['supervisor', 'officer'].includes(this.role)) {
    if (!this.rank || !this.assigned) {
      throw new Error('Rank and assigned are required for officers/supervisors');
    }
  } else {
    // Explicitly mark as undefined to remove from document
    this.rank = undefined;
    this.assigned = undefined;
  }
  next();
});

// 4. Create and export the model
export const User = model<IUser>("User", UserSchema);

// import { model, Schema } from "mongoose";

// const UserSchema = new Schema({
//     fullName: {
//         type: String,
//         required: true,
//     },
//     password: {
//         type: String,
//         required: true,
//     },
//     role: {
//             type: String,
//             enum: ["supervisor", "officer", "admin", "citizen"]
//     },
//     rank: {
//         type: String,
//         // required: true,
//     },
//     assigned: {
//         type: String,
//         // required: true,
//     },
//     email: {
//         type: String,
//         required: true,
//     }
// })

// export const User =  model("Users", UserSchema);