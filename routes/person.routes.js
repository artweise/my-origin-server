import express from 'express';
import { personController } from '../controllers/person.controller.js';

const personRoutes = express.Router();

//  POST /api/person  -  Creates a new person in the family tree
personRoutes.post('/person', personController.createNewPerson);

// GET /api/person/:personId  -  Get one person in the family tree
personRoutes.get('/person/:personId', personController.getPersonById);

// PUT /api/person/:personId  -  Edit person details
personRoutes.put('/person/:personId', personController.editPerson);

// DELETE /api/person/:personId  -  Delete person
personRoutes.delete('/person/:personId', personController.deletePerson);

export default personRoutes;
