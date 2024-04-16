import { personHandler } from '../handlers/person.handler.js';
import { relationshipHandler } from '../handlers/relationships.handler.js';
import { treeHandler } from '../handlers/tree.handler.js';

const createNewPerson = async (req, res, next) => {
  try {
    // Extract person data from request body
    const { firstName, lastName, gender, dateOfBirth, dateOfDeath, person1Id, relationshipType } =
      req.body;

    // Validate if person1Id and relationshipType are provided
    if (!person1Id || !relationshipType) {
      return res.status(400).json({ message: 'person1Id and relationshipType are required' });
    }

    // Create the new person
    const newPerson = await personHandler.createPerson({
      firstName,
      lastName,
      gender,
      dateOfBirth,
      dateOfDeath,
    });

    // If the person is successfully created, add them to the family tree
    if (newPerson) {
      // Add the new person to the family tree
      const updatedTree = await treeHandler.addMemberToFamilyTree(newPerson._id);

      // Validate if relationshipType is provided and is one of the allowed values
      const validRelationshipTypes = ['ParentChild', 'Spouse', 'Sibling'];
      if (!validRelationshipTypes.includes(relationshipType)) {
        return res.status(400).json({
          message:
            'Invalid or missing relationshipType. Valid values are ParentChild, Spouse, or Sibling',
        });
      }

      // Create a relationship between the new person and the specified person
      await relationshipHandler.createRelationship({
        person1Id,
        person2Id: newPerson._id,
        relationshipType,
      });

      // Send a success response with both the new person and relationship
      res.status(201).json({ newPerson, newRelationship, updatedTree });
    } else {
      // Send a success response with only the new person (no relationship)
      res.status(201).json({ newPerson });
    }
  } catch (error) {
    // Handle errors
    next(error);
  }
};

const getPersonById = async (req, res, next) => {
  const { personId } = req.params;
  try {
    const person = await personHandler.getPersonById(personId);
    res.status(200).json(person);
  } catch (error) {
    // In this case, we send error handling to the error handling middleware.
    next(error);
  }
};

const editPerson = async (req, res, next) => {
  const { personId } = req.params;

  const { firstName, lastName, gender, dateOfBirth, dateOfDeath } = req.body;

  const personData = {
    firstName,
    lastName,
    gender,
    dateOfBirth,
    dateOfDeath,
  };
  try {
    const updatedPerson = await personHandler.editPersonById(personId, personData);
    res.status(200).json(updatedPerson);
  } catch (error) {
    // In this case, we send error handling to the error handling middleware.
    next(error);
  }
};

const deletePerson = async (req, res, next) => {
  const { personId } = req.params;
  try {
    await personHandler.deletePersonById(personId);
    res.status(200).json({ message: 'Person was deleted successfully' });
  } catch (error) {
    console.log('Error while deleting a person');
    // In this case, we send error handling to the error handling middleware.
    next(error);
  }
};

export const personController = {
  createNewPerson,
  getPersonById,
  editPerson,
  deletePerson,
};
