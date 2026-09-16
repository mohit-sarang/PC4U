const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import all schemas
const { CPU, Motherboard, RAM, Storage, GPU, PSU, Cooler, Case } = require('./models/Component');

const app = express();
app.use(cors());
app.use(express.json());

const dbURI = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(dbURI);
    console.log(`✅ Success! MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Connection Failed: ${error.message}`);
    process.exit(1);
  }
};

connectDB();

// ------------------------------------
// THE MASSIVE SEED ROUTE (Developer Tool)
// ------------------------------------
app.get('/api/seed', async (req, res) => {
  try {
    // 1. Wipe the old database clean
    await Promise.all([
      CPU.deleteMany({}), Motherboard.deleteMany({}), RAM.deleteMany({}),
      Storage.deleteMany({}), GPU.deleteMany({}), PSU.deleteMany({}),
      Cooler.deleteMany({}), Case.deleteMany({})
    ]);

    // 2. Inject Phase 01: Platform
    await CPU.create([
      { name: 'RYZEN 7 7800X3D', brand: 'AMD', price: 35000, coreCount: 8, threadCount: 16, socketType: 'AM5', tdp: 120 },
      { name: 'CORE I9-14900K', brand: 'Intel', price: 54000, coreCount: 24, threadCount: 32, socketType: 'LGA1700', tdp: 253 },
      { name: 'RYZEN 5 7600X', brand: 'AMD', price: 21000, coreCount: 6, threadCount: 12, socketType: 'AM5', tdp: 105 }
    ]);
    
    await Motherboard.create([
      { name: 'ROG STRIX B650-A GAMING WIFI', brand: 'ASUS', price: 22500, socketType: 'AM5', formFactor: 'ATX', memoryType: 'DDR5' },
      { name: 'MAG Z790 TOMAHAWK WIFI', brand: 'MSI', price: 27000, socketType: 'LGA1700', formFactor: 'ATX', memoryType: 'DDR5' }
    ]);

    // 3. Inject Phase 02: Memory & Storage
    await RAM.create([
      { name: 'VENGEANCE RGB 32GB (2x16GB)', brand: 'Corsair', price: 11000, capacity: '32GB', speed: 'DDR5-6000' },
      { name: 'TRIDENT Z5 NEO 64GB (2x32GB)', brand: 'G.Skill', price: 21500, capacity: '64GB', speed: 'DDR5-6400' }
    ]);

    await Storage.create([
      { name: '990 PRO 2TB', brand: 'Samsung', price: 16500, capacity: '2TB', type: 'NVMe M.2' },
      { name: 'SN850X 1TB', brand: 'WD Black', price: 8500, capacity: '1TB', type: 'NVMe M.2' }
    ]);

    // 4. Inject Phase 03: GPU & Power
    await GPU.create([
      { name: 'GEFORCE RTX 4090 FOUNDERS', brand: 'NVIDIA', price: 165000, vram: '24GB', length: 304, tdp: 450 },
      { name: 'RADEON RX 7900 XTX', brand: 'Sapphire', price: 98000, vram: '24GB', length: 287, tdp: 355 },
      { name: 'GEFORCE RTX 4070 SUPER', brand: 'ASUS', price: 62000, vram: '12GB', length: 267, tdp: 220 }
    ]);

    await PSU.create([
      { name: 'RM850x SHIFT 850W', brand: 'Corsair', price: 12500, wattage: 850, efficiencyRating: '80+ Gold', formFactor: 'ATX' },
      { name: 'VERTEX GX-1200', brand: 'Seasonic', price: 21000, wattage: 1200, efficiencyRating: '80+ Gold', formFactor: 'ATX' }
    ]);

    // 5. Inject Phase 04: Infrastructure
    await Cooler.create([
      { name: 'KRAKEN ELITE 360', brand: 'NZXT', price: 25000, type: 'AIO Liquid', radiatorSize: 360 },
      { name: 'NH-D15 CHROMAX.BLACK', brand: 'Noctua', price: 9500, type: 'Air' }
    ]);

    await Case.create([
      { name: 'O11 DYNAMIC EVO', brand: 'Lian Li', price: 15500, formFactor: 'Mid Tower', motherboardSupport: ['ATX', 'Micro-ATX', 'E-ATX'] },
      { name: 'NORTH CHARCOAL BLACK', brand: 'Fractal Design', price: 13500, formFactor: 'Mid Tower', motherboardSupport: ['ATX', 'Micro-ATX'] }
    ]);

    res.status(201).json({ message: 'ARMORY FULLY STOCKED. ALL DATABANKS ONLINE.' });
    
  } catch (error) {
    console.error('Seeding Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// ------------------------------------
// THE PRODUCTION DATA ROUTE (React fetches here)
// ------------------------------------
app.get('/api/hardware/:category', async (req, res) => {
  try {
    const { category } = req.params;
    
    // A clean map linking the URL parameter to the correct MongoDB Model
    const modelMap = {
      cpu: CPU, mobo: Motherboard, ram: RAM, storage: Storage, 
      gpu: GPU, psu: PSU, cooler: Cooler, case: Case
    };

    const TargetModel = modelMap[category];
    
    if (!TargetModel) {
      return res.status(404).json({ error: 'Hardware category not found in databanks.' });
    }

    const components = await TargetModel.find();
    res.json(components);

  } catch (error) {
    console.error('Database query error:', error);
    res.status(500).json({ error: 'Failed to fetch hardware from databanks.' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});