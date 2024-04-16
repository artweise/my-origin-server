import { personHandler } from '../handlers/person.handler.js';
import { ISODateRegex } from '../utils/date.utils.js';

const createNewPerson = async (req, res, next) => {
  const { firstName, lastName, gender, dateOfBirth, dateOfDeath } = req.body;

  const personToCreate = {
    firstName,
    lastName,
    gender,
    dateOfBirth,
    dateOfDeath,
  };

  try {
    const createdPerson = await personHandler.createPerson(personToCreate);
    res.status(200).json(createdPerson);
  } catch (error) {
    // In this case, we send error handling to the error handling middleware.
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
  // const userId = req.payload._id;
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
