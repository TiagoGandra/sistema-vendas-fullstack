import {
  getAllClients,
  getClientById,
  addClient,
  updateClient,
  deleteClient
} from '../models/clientModel.js';

export const getClients = async (req, res) => {
  try{
    const clients = await getAllClients();
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({error: 'Failed to fetch clients'});
  }
};

export const getClient = async (req, res) => {
  try{
    const { id } = req.params;
    const client = await getClientById(id);
    if (!client){
      return res.status(404).json({error: 'Client not found'});
    }
    res.status(200).json(client);
  } catch (error) {
    res.status(500).json({error: 'Failed to fetch client'});
  }
};

export const createClient = async (req, res) => {
  try{
    const { name, cpf, phone, address} = req.body;
    const newClient = await addClient(name, cpf, phone, address);
    res.status(200).json(newClient);
  } catch (error) {
    res.status(500).json({error: 'Failed to register client'});
  }
};

export const updateClientDetails = async (req, res) => {
  try{
    const { id } = req.params;
    const { name, cpf, phone, address} = req.body;
    const updtClient = await updateClient(id, name, cpf, phone, address);
    res.status(200).json(updtClient);
    console.log({id, name, cpf, phone, address});
  } catch (error) {
    res.status(500).json({error: 'Failed to update client'});
  }
};

export const deleteClientDetails = async (req, res) => {
  try{
    const { id } = req.params;
    const delClient = await deleteClient(id);
    res.status(200).json(delClient);
  } catch (error) {
    res.status(500).json({error: 'Failed to delete client'});
  }
};