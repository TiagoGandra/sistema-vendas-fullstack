import {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
} from '../models/productModel.js';

export const getProducts = async (req, res) => {
  try{
    const products = await getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({error: 'Failed to fetch products'});
  }
};

export const getProduct = async (req, res) => {
  try{
    const { id } = req.params;
    const product = await getProductById(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
};

export const createProduct =  async (req, res) => {
  try{
    const { name, price, amount } = req.body;
    const newProduct = await addProduct(name, price, amount);
    res.status(200).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create product' }); 
  }
};

export const updateProductDetails = async (req, res) => {
  try{
    const { id } = req.params;
    const { name, price, amount } = req.body;
    const updateProd = await updateProduct(id, name, price, amount);
    res.status(200).json(updateProd);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product' });
  }
};

export const deleteProductDetails = async (req, res) => {
  try{
    const { id } = req.params;
    const deleteProd = deleteProduct(id);
    res.status(200).json(deleteProd);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
};