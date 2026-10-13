export const BUILD_SLOTS = [
  { id: 'cpu', name: 'PROCESSOR' },
  { id: 'mobo', name: 'MOTHERBOARD' },
  { id: 'ram', name: 'MEMORY' },
  { id: 'storage', name: 'STORAGE' },
  { id: 'gpu', name: 'GRAPHICS CARD' },
  { id: 'psu', name: 'POWER SUPPLY' },
  { id: 'case', name: 'CASE' },
  { id: 'cooler', name: 'COOLING' },
];

export const MOCK_DB = {
  cpu: [
    { id: 1, name: 'RYZEN 7 7800X3D', price: 35000, wattage: 120 },
    { id: 2, name: 'CORE I5-13600K', price: 28500, wattage: 181 },
    { id: 3, name: 'RYZEN 5 7600X', price: 22000, wattage: 105 },
  ]
};