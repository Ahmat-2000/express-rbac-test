import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  key: {
    type: String,
    required: true,
    unique: true,
  },
  permissions: [{
    type: String,  // Will store permission keys
    ref: 'Permission'
  }]
}, { timestamps: true });

const RoleModel = mongoose.model('Role', roleSchema);
export default RoleModel; 