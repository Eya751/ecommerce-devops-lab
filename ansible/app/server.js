const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

const MONGO_URL = process.env.MONGO_URL || 'mongodb://mongo:27017/ecommerce';

mongoose.connect(MONGO_URL)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB error:', err));

const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number
});
const Product = mongoose.model('Product', ProductSchema);

async function seedProducts() {
  const count = await Product.countDocuments();
  if (count === 0) {
    await Product.create([
      { name: 'Laptop', price: 1200 },
      { name: 'Phone', price: 800 }
    ]);
    console.log('Products seeded');
  }
}

app.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    let html = '<h1>E-Commerce Store</h1><ul>';
    products.forEach(p => {
      html += `<li>${p.name} $${p.price}</li>`;
    });
    html += '</ul>';
    res.send(html);
  } catch (err) {
    res.send('<h1>E-Commerce Store</h1><p>Loading...</p>');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  setTimeout(seedProducts, 5000);
});