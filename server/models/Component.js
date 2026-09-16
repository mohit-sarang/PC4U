const mongoose = require('mongoose');

const baseComponentFields = {
  name: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  imageURL: { type: String },
};

// 1. CPU
const cpuSchema = new mongoose.Schema({
  ...baseComponentFields,
  coreCount: Number,
  threadCount: Number,
  socketType: String,
  tdp: Number, // Thermal Design Power (Wattage)
});

// 2. Motherboard
const motherboardSchema = new mongoose.Schema({
  ...baseComponentFields,
  socketType: String,
  formFactor: String,
  memoryType: String,
});

// 3. RAM
const ramSchema = new mongoose.Schema({
  ...baseComponentFields,
  capacity: String, // e.g., '32GB (2 x 16GB)'
  speed: String, // e.g., 'DDR5-6000'
});

// 4. Storage
const storageSchema = new mongoose.Schema({
  ...baseComponentFields,
  capacity: String, // e.g., '2TB'
  type: String, // e.g., 'NVMe M.2'
});

// 5. GPU
const gpuSchema = new mongoose.Schema({
  ...baseComponentFields,
  vram: String,
  length: Number, // in mm
  tdp: Number, 
});

// 6. Power Supply (PSU)
const psuSchema = new mongoose.Schema({
  ...baseComponentFields,
  wattage: Number,
  efficiencyRating: String,
  formFactor: String,
});

// 7. Cooler
const coolerSchema = new mongoose.Schema({
  ...baseComponentFields,
  type: String, // e.g., 'AIO Liquid', 'Air'
  radiatorSize: Number, // e.g., 360, 240 (if AIO)
});

// 8. Case
const caseSchema = new mongoose.Schema({
  ...baseComponentFields,
  formFactor: String, // e.g., 'Mid Tower'
  motherboardSupport: [String],
});

module.exports = {
  CPU: mongoose.model('CPU', cpuSchema),
  Motherboard: mongoose.model('Motherboard', motherboardSchema),
  RAM: mongoose.model('RAM', ramSchema),
  Storage: mongoose.model('Storage', storageSchema),
  GPU: mongoose.model('GPU', gpuSchema),
  PSU: mongoose.model('PSU', psuSchema),
  Cooler: mongoose.model('Cooler', coolerSchema),
  Case: mongoose.model('Case', caseSchema),
};