import express from 'express';
import cors from 'cors';
import { initializeDB } from './src/config/db.js';
import productRouter from './src/routes/productRoute.js';
import clientRouter from './src/routes/clientRoute.js';


const app = express();
const PORT = 3000;

app.use(cors());

app.use(express.json());

app.use('/products', productRouter);
app.use('/clients', clientRouter);

(async ()=> {
  try{
    await initializeDB();
    console.log('Database initialized');
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to initialize the database: ', error);
  }
})();