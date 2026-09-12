// server/models/Component.js
const mongoose = require('mongoose');

const baseOptions = {
  discriminatorKey: 'category', // The master key that defines the part type
  collection: 'components',     // Forces all parts into one unified collection
  timestamps: true
};

const componentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  imageURL: { type: String, required: false }, // Useful for your transparent renders
}, baseOptions);

const Component = mongoose.model('Component', componentSchema);

// The CPU specific fields
const cpuSchema = new mongoose.Schema({
  coreCount: { type: Number, required: true },
  threadCount: { type: Number, required: true },
  socketType: { type: String, required: true }, // Critical for MoBo compatibility
  tdp: { type: Number, required: true }         // Critical for PSU calculation
});

// The Motherboard specific fields
const motherboardSchema = new mongoose.Schema({
  socketType: { type: String, required: true }, 
  formFactor: { type: String, required: true }, // e.g., 'ATX', 'Mini-ITX'
  memoryType: { type: String, required: true }  // e.g., 'DDR5'
});

// Bind the specific schemas to the base Component model
const CPU = Component.discriminator('CPU', cpuSchema);
const Motherboard = Component.discriminator('Motherboard', motherboardSchema);

module.exports = { Component, CPU, Motherboard };