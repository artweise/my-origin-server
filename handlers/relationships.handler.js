import Relationship from '../models/Relationship.model.js';

const createRelationship = (relationship) => {
  return Relationship.create(relationship);
};

export const relationshipHandler = {
  createRelationship,
};
