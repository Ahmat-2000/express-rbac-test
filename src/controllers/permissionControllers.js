import PermissionModel from '../models/permissionModel.js';

const getPermissions = async (req, res) => {
  const permissions = await PermissionModel.find();
  res.status(200).json(permissions);
};

const createPermission = async (req, res) => {
  try {
    const { key, description } = req.body;
    const permission = await PermissionModel.create({ key, description });
    res.status(201).json(permission);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

const updatePermission = async (req, res) => {

};

const deletePermission = async (req, res) => {

};

const permissionControllers = { 
  getPermissions, 
  createPermission, 
  updatePermission, 
  deletePermission 
};

export default permissionControllers;