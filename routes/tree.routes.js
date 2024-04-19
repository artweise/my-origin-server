import express from 'express';
import { treeController } from '../controllers/tree.controller.js';

const treeRoutes = express.Router();

// POST /api/familytree - Route to create a new family tree
treeRoutes.post('/familytree', treeController.createFamilyTree);

// GET /api/familytrees - Get all family trees
treeRoutes.get('/familytrees', treeController.getAllFamilyTrees);

// GET /api/familytrees/:treeId -  Get single family tree
treeRoutes.get('/familytrees/:treeId', treeController.getFamilyTreeById);

export default treeRoutes;
