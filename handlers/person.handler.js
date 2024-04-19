import Person from '../models/Person.model.js';

const createPerson = async ({
  firstName,
  lastName,
  gender,
  dateOfBirth,
  dateOfDeath,
  familyTree,
}) => {
  try {
    const newPerson = await Person.create({
      firstName,
      lastName,
      gender,
      dateOfBirth,
      dateOfDeath,
      familyTree, // Assign the familyTree ID to the new person
    });

    return newPerson; // Return the newly created person
  } catch (error) {
    console.error('Error creating person:', error);
    throw error;
  }
};

const getPeopleByTreeId = (familyTreeId) => {
  return Person.find({ familyTree: familyTreeId }).populate('familyTree');
};

const getPersonById = (personId) => {
  return Person.findById(personId);
};

const editPersonById = (personId, updatedPerson) => {
  return Person.findByIdAndUpdate(personId, updatedPerson, {
    new: true,
  });
};

const deletePersonById = (personId) => {
  return Person.findByIdAndDelete(personId);
};

export const personHandler = {
  createPerson,
  getPeopleByTreeId,
  getPersonById,
  editPersonById,
  deletePersonById,
};
