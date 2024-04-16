import Person from '../models/Person.model.js';

const createPerson = (person) => {
  return Person.create(person);
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
  getPersonById,
  editPersonById,
  deletePersonById,
};
