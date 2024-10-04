// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Correctly define your MongoDB connection URL
const mongoUrl = 'mongodb+srv://nivas654pownraj:Suji1707@cluster0.iscea.mongodb.net/myDatabase?retryWrites=true&w=majority';

// Connect to MongoDB
mongoose.connect(mongoUrl)
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log('Failed to connect to MongoDB:', err));

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Define a schema for the product
const productSchema = new mongoose.Schema({
    productId: String,
    productName: String,
    productPrice: Number,
    dateAdded: { type: Date, default: Date.now }
});

// Create a model
const Product = mongoose.model('Product', productSchema, 'products'); // 'products' is the collection name

// Endpoint to add product to the cart
app.post('/add-to-cart', async (req, res) => {
    const { productId, productName, productPrice } = req.body;

    const newProduct = new Product({
        productId,
        productName,
        productPrice
    });

    try {
        await newProduct.save();
        res.status(200).send('Product added to cart successfully!');
    } catch (err) {
        console.error('Error saving to database:', err);
        res.status(500).send('Failed to add product to cart');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
