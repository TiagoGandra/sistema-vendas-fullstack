import { initializeDB } from "../config/db.js";

export const getAllProducts = async () => {
  const db = await initializeDB();
  return await db.all('SELECT * FROM products');
};


export const getProductById = async (id) => {
  const db = await initializeDB();
  return await db.get('SELECT * FROM products WHERE id = ?', id)
};

export const addProduct = async(name, price, amount) => {
  const db = await initializeDB();
  const result = await db.run(
    'INSERT INTO products (name, price, amount) VALUES (?, ?, ?)',
    name, 
    price,
    amount
  );

  return {id: result.lastID};
};

export const updateProduct = async (id, name, price, amount) => {
  const db = await initializeDB();
  await db.run(
    'UPDATE products SET name = ?, price = ?, amount = ? WHERE id = ?',
    name, 
    price, 
    amount,
    id
  );
  return { id };
};

export const deleteProduct = async (id) => {
  const db = await initializeDB();
  await db.run('DELETE FROM products WHERE id = ?', id);
  return { id };
};