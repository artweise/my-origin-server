import { treeHandler } from '../handlers/tree.handler.js';
import Tree from '../models/Tree.model.js';

const createFamilyTree = async (req, res) => {
  try {
    await treeHandler.initializeFamilyTree();
    res.status(200).json({ message: 'Family tree created successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create family tree.' });
  }
};

// Get all family trees
const getAllFamilyTrees = async (req, res) => {
  try {
    // Retrieve all family trees from the database
    const familyTrees = await Tree.find();

    // Send the family trees as a response
    res.status(200).json(familyTrees);
  } catch (error) {
    // Handle errors
    console.error('Error retrieving family trees:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getFamilyTreeById = async (req, res, next) => {
  const { treeId } = req.params;
  try {
    const familyTree = await treeHandler.getFamilyTreeById(treeId);
    res.json(familyTree);
  } catch (error) {
    // In this case, we send error handling to the error handling middleware.
    next(error);
  }
};

export const treeController = {
  createFamilyTree,
  getAllFamilyTrees,
  getFamilyTreeById,
};
