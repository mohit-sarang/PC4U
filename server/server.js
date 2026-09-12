const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import your schemas (Make sure your models/Component.js file exists!)
const { CPU, Motherboard } = require('./models/Component');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // This allows Express to read JSON data

// Database Connection
const dbURI = process.env.MONGODB_URI;

if (!dbURI) {
  throw new Error('MONGODB_URI is missing from server/.env');
}

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(dbURI);
    console.log(`✅ Success! MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`❌ Connection Failed!`);
    console.error(`Error Details: ${error.message}`);
    process.exit(1);
  }
};

connectDB();

// ------------------------------------
// ROUTES
// ------------------------------------

// Your existing test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is communicating perfectly!' });
});

// The Seed Route
app.post('/api/seed', async (req, res) => {
  try {
    await CPU.deleteMany({});
    await Motherboard.deleteMany({});

    const testCPU = await CPU.create({
      name: 'Ryzen 7 7800X3D',
      brand: 'AMD',
      price: 35000,
      imageURL: 'https://example.com/7800x3d.png',
      coreCount: 8,
      threadCount: 16,
      socketType: 'AM5',
      tdp: 120
    });

    const testMobo = await Motherboard.create({
      name: 'ROG STRIX B650-A GAMING WIFI',
      brand: 'ASUS',
      price: 22500,
      imageURL: 'https://example.com/b650a.png',
      socketType: 'AM5',
      formFactor: 'ATX',
      memoryType: 'DDR5'
    });

    res.status(201).json({
      message: 'Database seeded successfully!',
      data: [testCPU, testMobo]
    });
    
  } catch (error) {
    console.error('Seeding Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// ------------------------------------
// START SERVER
// ------------------------------------
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});