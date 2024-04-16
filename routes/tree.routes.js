import express from 'express';
import { treeController } from '../controllers/tree.controller.js';

const treeRoutes = express.Router();

// Route to create the family tree
treeRoutes.post('/create-family-tree', treeController.createFamilyTree);

export default treeRoutes;
