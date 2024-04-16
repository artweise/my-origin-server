import { treeHandler } from '../handlers/tree.handler.js';

const createFamilyTree = async (req, res) => {
  try {
    await treeHandler.initializeFamilyTree();
    res.status(200).json({ message: 'Family tree created successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create family tree.' });
  }
};

export const treeController = {
  createFamilyTree,
};
