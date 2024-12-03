import express from 'express';
import { createClient, deleteClientDetails, getClient, getClients, updateClientDetails } from '../controllers/clientController.js';

const clientRouter = express.Router();

clientRouter.get('/', getClients);
clientRouter.get('/:id', getClient);
clientRouter.post('/', createClient);
clientRouter.put('/:id', updateClientDetails);
clientRouter.delete('/:id', deleteClientDetails);

export default clientRouter;