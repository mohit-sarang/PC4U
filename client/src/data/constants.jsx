export const BUILD_SLOTS = [
  { id: 'cpu', name: 'PROCESSOR', phase: 'PHASE 01 / PLATFORM' },
  { id: 'mobo', name: 'MOTHERBOARD' },
  { id: 'ram', name: 'MEMORY', phase: 'PHASE 02 / MEMORY & STORAGE' },
  { id: 'storage', name: 'STORAGE' },
  { id: 'gpu', name: 'GRAPHICS CARD', phase: 'PHASE 03 / GPU & POWER' },
  { id: 'psu', name: 'POWER SUPPLY' },
  { id: 'cooler', name: 'COOLING', phase: 'PHASE 04 / INFRASTRUCTURE' },
  { id: 'case', name: 'CASE' },
];

export const MOCK_DB = {
  cpu: [
    { id: 1, name: 'RYZEN 7 7800X3D', price: 35000, wattage: 120 },
    { id: 2, name: 'CORE I5-13600K', price: 28500, wattage: 181 },
    { id: 3, name: 'RYZEN 5 7600X', price: 22000, wattage: 105 },
  ]
};