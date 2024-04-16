import { relationshipHandler } from '../handlers/relationship.handler.js';

const createNewRelationship = async (req, res) => {
  try {
    const { person1Id, person2Id, relationshipType } = req.body;

    // Validate the required fields
    if (!person1Id || !person2Id || !relationshipType) {
      return res
        .status(400)
        .json({ message: 'person1Id, person2Id, and relationshipType are required' });
    }

    // Create the relationship
    const relationship = await relationshipHandler.createRelationship({
      person1Id,
      person2Id,
      relationshipType,
    });

    res.status(201).json(relationship);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const relationshipController = {
  createNewRelationship,
};
