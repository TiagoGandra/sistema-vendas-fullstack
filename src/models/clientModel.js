import { initializeDB } from "../config/db.js";

export const getAllClients = async() => {
  const db = await initializeDB();
  return await db.all('SELECT * FROM clients');
};

export const getClientById = async (id) => {
  const db = await initializeDB();
  return await db.get('SELECT * FROM clients WHERE id = ?', id);
};

export const addClient = async (name, cpf, phone, address) => {
  const db = await initializeDB();
  const result = await db.run(
    'INSERT INTO clients (name, cpf, phone, address) VALUES (?, ?, ?, ?)',
    name,
    cpf, 
    phone,
    address
  );
  return {id: result.lastID};
};

export const updateClient = async (id, name, cpf, phone, address) => {
  const db = await initializeDB();
  await db.run(
    'UPDATE clients SET name = ?, cpf = ?, phone = ?, address = ? WHERE id = ?',
    name, 
    cpf,
    phone,
    address
  );
  return { id };
};

export const deleteClient = async (id) => {
  const db = await initializeDB();
  await db.run('DELETE FROM clients WHERE id = ?', id);
  return { id };
};

