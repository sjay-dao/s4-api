const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { initializeApp } = require('firebase/app');
const { getDatabase, ref, child, get, set, onValue, off } = require('firebase/database'); 

const app = express();
const port = 3001; // You can change this port

// Enable CORS
app.use(cors());

// Parse JSON request bodies
app.use(bodyParser.json());

// Replace with your actual Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDG7jCmN_7BDZB0FJv8XlhQbrjfAXJ5Xfg",
    authDomain: "ssss-a16e6.firebaseapp.com",
    databaseURL: "https://ssss-a16e6-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "ssss-a16e6",
    storageBucket: "ssss-a16e6.firebasestorage.app",
    messagingSenderId: "350473624117",
    appId: "1:350473624117:web:5216b63f7412a1b563af7c"
};

const appFirebase = initializeApp(firebaseConfig);
const dbRef = ref(getDatabase(appFirebase)); 

// GET all products
app.get('/api/products', async (req, res) => {
  try {
    const snapshot = await get(child(dbRef, 'products')); 
    if (snapshot.exists()) {
      const products = snapshot.val();
      res.json(products); 
      console.log(products + "- from backend");
    } else {
      res.status(404).json({ message: 'No products found' });
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// GET a single product by ID
app.get('/api/products/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const snapshot = await get(child(dbRef, `products/${productId}`)); 
    if (snapshot.exists()) {
      const product = snapshot.val();
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// POST a new product
app.post('/api/products', async (req, res) => {
  try {
    const newProduct = req.body; 
    const newProductRef = child(dbRef, `products/${Date.now()}`); 
    await set(newProductRef, newProduct);
    res.status(201).json(newProduct); 
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Failed to create product' });
  }
});

// PUT update an existing product
app.put('/api/products/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedProduct = req.body;
    const productRef = child(dbRef, `products/${productId}`);
    await set(productRef, updatedProduct);
    res.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// DELETE a product
app.delete('/api/products/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const productRef = child(dbRef, `products/${productId}`);
    await set(productRef, null); 
    res.json({ message: 'Product deleted' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});