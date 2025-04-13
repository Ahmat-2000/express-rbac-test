import express from 'express';
import permissionControllers from '../controllers/permissionControllers.js';

const permissionRouter = express.Router();

permissionRouter.get('/', permissionControllers.getPermissions);
permissionRouter.post('/', permissionControllers.createPermission);
permissionRouter.put('/:id', permissionControllers.updatePermission);
permissionRouter.delete('/:id', permissionControllers.deletePermission);

export default permissionRouter;