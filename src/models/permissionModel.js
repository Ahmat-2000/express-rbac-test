import mongoose from "mongoose";

const permissionSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  key: {
    type: String,
    required: true,
    unique: true,
  }
}, { timestamps: true });

const PermissionModel = mongoose.model('Permission', permissionSchema);
export default PermissionModel; 