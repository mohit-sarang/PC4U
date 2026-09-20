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
// 2. Inject Phase 01: Platform (16 CPUs)
    await CPU.create([
      { name: 'RYZEN 9 7950X3D', brand: 'AMD', price: 62000, imageURL:'https://m.media-amazon.com/images/I/616VM20+AzL._AC_SX679_.jpg', coreCount: 16, threadCount: 32, socketType: 'AM5', tdp: 120 },
      { name: 'RYZEN 9 7950X', brand: 'AMD', price: 52000,imageURL:'https://m.media-amazon.com/images/I/616VM20+AzL._AC_SX679_.jpg', coreCount: 16, threadCount: 32, socketType: 'AM5', tdp: 170 },
      { name: 'RYZEN 9 7900X', brand: 'AMD', price: 41000,imageURL:'https://m.media-amazon.com/images/I/616VM20+AzL._AC_SX679_.jpg', coreCount: 12, threadCount: 24, socketType: 'AM5', tdp: 170 },
      { name: 'RYZEN 7 7800X3D', brand: 'AMD', price: 35000,imageURL:'https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T3/images/I/51hfER1cZVL._SL1500_.jpg', coreCount: 8, threadCount: 16, socketType: 'AM5', tdp: 120 },
      { name: 'RYZEN 7 7700X', brand: 'AMD', price: 29000,imageURL:'https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T3/images/I/51hfER1cZVL._SL1500_.jpg', coreCount: 8, threadCount: 16, socketType: 'AM5', tdp: 105 },
      { name: 'RYZEN 5 7600X', brand: 'AMD', price: 21000, imageURL:'https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T3/images/I/61h39mKsSBL._SL1500_.jpg', coreCount: 6, threadCount: 12, socketType: 'AM5', tdp: 105 },
      { name: 'RYZEN 5 7600', brand: 'AMD', price: 18500, imageURL:'https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T3/images/I/61h39mKsSBL._SL1500_.jpg', coreCount: 6, threadCount: 12, socketType: 'AM5', tdp: 65 },
      { name: 'RYZEN 7 5800X3D', brand: 'AMD', price: 27000,imageURL:'https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T3/images/I/51hfER1cZVL._SL1500_.jpg', coreCount: 8, threadCount: 16, socketType: 'AM4', tdp: 105 },
      { name: 'CORE I9-14900K', brand: 'Intel', price: 54000, imageURL:'https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T3/images/I/61My4F2-XUL._SL1500_.jpg', coreCount: 24, threadCount: 32, socketType: 'LGA1700', tdp: 253 },
      { name: 'CORE I7-14700K', brand: 'Intel', price: 38000, imageURL: 'https://rukminim2.flixcart.com/image/1494/1494/xif0q/processor/n/i/3/-original-imagngzvfmhyzw3u.jpeg?q=90', coreCount: 20, threadCount: 28, socketType: 'LGA1700', tdp: 253 },
      { name: 'CORE I5-14600K', brand: 'Intel', price: 29000, imageURL: 'https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T3/images/I/41NgKlCJOzL._SY300_SX300_QL70_FMwebp_.jpg', coreCount: 14, threadCount: 20, socketType: 'LGA1700', tdp: 181 },
      { name: 'CORE I9-13900K', brand: 'Intel', price: 49000, imageURL:'https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T3/images/I/61My4F2-XUL._SL1500_.jpg', coreCount: 24, threadCount: 32, socketType: 'LGA1700', tdp: 253 },
      { name: 'CORE I7-13700K', brand: 'Intel', price: 34000, imageURL: 'https://rukminim2.flixcart.com/image/1494/1494/xif0q/processor/n/i/3/-original-imagngzvfmhyzw3u.jpeg?q=90', coreCount: 16, threadCount: 24, socketType: 'LGA1700', tdp: 253 },
      { name: 'CORE I5-13600K', brand: 'Intel', price: 26500, imageURL: 'https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T3/images/I/41NgKlCJOzL._SY300_SX300_QL70_FMwebp_.jpg', coreCount: 14, threadCount: 20, socketType: 'LGA1700', tdp: 181 },
      { name: 'CORE I5-13400F', brand: 'Intel', price: 18000, imageURL: 'https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T3/images/I/41NgKlCJOzL._SY300_SX300_QL70_FMwebp_.jpg', coreCount: 10, threadCount: 16, socketType: 'LGA1700', tdp: 148 },
      { name: 'CORE I3-13100F', brand: 'Intel', price: 10500, imageURL:'https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T3/images/I/51rW5sHx+2L._SX679_.jpg', coreCount: 4, threadCount: 8, socketType: 'LGA1700', tdp: 89 }
    ]);
    
await Motherboard.create([
      { name: 'ROG CROSSHAIR X670E HERO', brand: 'ASUS', price: 65000, imageURL: 'https://storage-asset.msi.com/global/picture/image/feature/mb/PRO-B760/pro-b760-p-wifi-ddr4/msi-pro-b790-p-wifi-ddr4-hero-block03.png', socketType: 'AM5', formFactor: 'ATX', memoryType: 'DDR5' },
      { name: 'X670 AORUS ELITE AX', brand: 'GIGABYTE', price: 29000, imageURL: 'https://static.gigabyte.com/StaticFile/Image/Global/f224ac30e30bec632a392ddd3f78a707/Product/34940', socketType: 'AM5', formFactor: 'ATX', memoryType: 'DDR5' },
      { name: 'ROG STRIX B650-A GAMING WIFI', brand: 'ASUS', price: 22500, imageURL: 'https://m.media-amazon.com/images/I/81qAIrrfrgL.jpg', socketType: 'AM5', formFactor: 'ATX', memoryType: 'DDR5' },
      { name: 'B650 TOMAHAWK WIFI', brand: 'MSI', price: 19000, imageURL: 'https://m.media-amazon.com/images/I/71X3-JpWlAL.jpg', socketType: 'AM5', formFactor: 'ATX', memoryType: 'DDR5' },
      { name: 'PRO B650M-A WIFI', brand: 'MSI', price: 15000, imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlBX9uZywW2OmYAcGPaKCu9uZGErEECvolQgpQATcDcw&s', socketType: 'AM5', formFactor: 'Micro-ATX', memoryType: 'DDR5' },
      { name: 'B550 AORUS ELITE AX V2', brand: 'GIGABYTE', price: 14000, imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVIm9gsikJ4MipGlYgw7Qc7AVVqB6g3kUw4XkbMFgzXw&s=10', socketType: 'AM4', formFactor: 'ATX', memoryType: 'DDR4' },
      { name: 'ROG MAXIMUS Z790 DARK HERO', brand: 'ASUS', price: 68000, imageURL: 'https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T3/images/I/81rX0VhoStL._SX679_.jpg', socketType: 'LGA1700', formFactor: 'ATX', memoryType: 'DDR5' },
      { name: 'Z790 AORUS PRO X', brand: 'GIGABYTE', price: 38000, imageURL: 'https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T3/images/I/81WPA9f1QPL._SX679_.jpg', socketType: 'LGA1700', formFactor: 'ATX', memoryType: 'DDR5' },
      { name: 'MAG Z790 TOMAHAWK WIFI', brand: 'MSI', price: 27000, imageURL: 'https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T3/images/I/71Aeeb-E7nL._SY450_.jpg', socketType: 'LGA1700', formFactor: 'ATX', memoryType: 'DDR5' },
      { name: 'TUF GAMING Z790-PLUS WIFI', brand: 'ASUS', price: 24000, imageURL: 'https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T3/images/I/61wk8tJ+PBL._SY450_.jpg', socketType: 'LGA1700', formFactor: 'ATX', memoryType: 'DDR5' },
      { name: 'B760M AORUS ELITE AX', brand: 'GIGABYTE', price: 16500, imageURL: 'https://dlcdnwebimgs.asus.com/gain/F17834FA-586C-40FA-A2AD-24D07A3431A0/w717/h525/fwebp', socketType: 'LGA1700', formFactor: 'Micro-ATX', memoryType: 'DDR5' },
      { name: 'PRO B760-P WIFI DDR4', brand: 'MSI', price: 13500, imageURL: 'https://dlcdnwebimgs.asus.com/gain/8E88DC59-A399-4385-8BCB-C3877F4EB746/w717/h525/fwebp', socketType: 'LGA1700', formFactor: 'ATX', memoryType: 'DDR4' }
    ]);

    // 3. Inject Phase 02: Memory & Storage
await RAM.create([
      { name: 'DOMINATOR TITANIUM 64GB (2x32GB)', brand: 'Corsair', price: 28000, imageURL: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSQdOoT2iktsCXoPQfzaSPQBo9aexfb12Zf1X73TiOF0pD42igaoFa85er_mznhWCiOjKYJVyY9veG4XZv-kQyu-nrEzqZ3EQ', capacity: '64GB', speed: 'DDR5-6600' },
      { name: 'TRIDENT Z5 NEO RGB 64GB (2x32GB)', brand: 'G.Skill', price: 24500, imageURL: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSaaxvZdkoSY-Rx4cRDQLwzIrTf_5Jnmb_Kp0VxStJSza_EL6zOTULcvtYddWrOctoh56h5hkSGn7eWuUFV-YxMHc6SOJFK', capacity: '64GB', speed: 'DDR5-6000' },
      { name: 'VENGEANCE RGB 32GB (2x16GB)', brand: 'Corsair', price: 12500, imageURL: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcS9Ccg_bazheWWSmyQ2FE6V_w1ov1AsdcFOoACgmfcMFY1pv6pzInRIpA85RsFwqiPaJ0nfQrHGIObyPxmZQbZESPhcpD_L4R4jciz7Pf2gN31609iIezNXu6g', capacity: '32GB', speed: 'DDR5-6400' },
      { name: 'FLARE X5 32GB (2x16GB)', brand: 'G.Skill', price: 10500, imageURL: 'https://m.media-amazon.com/images/I/61gD0yqG+AL.jpg', capacity: '32GB', speed: 'DDR5-6000' },
      { name: 'FURY BEAST 32GB (2x16GB)', brand: 'Kingston', price: 11000, imageURL: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRHqDTDm9HeoTGSiUhcNSzmxWUZzpU7qz6GCxT3YdCBL6SN1n4YJzWVM96xpvx0fHY3aAjcTSWm3lfClXSns9vdB346zdrR58k0oGnRXfQ2wRqjZj80JCPQ', capacity: '32GB', speed: 'DDR5-5600' },
      { name: 'VENGEANCE LPX 32GB (2x16GB)', brand: 'Corsair', price: 7500, imageURL: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTl6-8RlyTSFZxH8thWLHXIiAnWHnoSdGR1wY7H7ZIOkOWMZ5GqFvmUasxCdi8Abej2jB6nW3BiOuWqr7JgnCLpOjicwelU3iORjWS8h1U-OB-aEZFziUjLwkg', capacity: '32GB', speed: 'DDR4-3600' },
      { name: 'RIPJAWS V 16GB (2x8GB)', brand: 'G.Skill', price: 4500, imageURL: 'https://m.media-amazon.com/images/I/618SEnJR1nL.jpg', capacity: '16GB', speed: 'DDR4-3200' }
    ]);
    
await Storage.create([
      { name: 'T700 2TB GEN5', brand: 'Crucial', price: 28000, imageURL: 'https://m.media-amazon.com/images/I/61tC4+J1VPL.jpg', capacity: '2TB', type: 'NVMe M.2 Gen5' },
      { name: '990 PRO 4TB', brand: 'Samsung', price: 32000, imageURL: 'https://m.media-amazon.com/images/I/81PjT-8-e3L.jpg', capacity: '4TB', type: 'NVMe M.2 Gen4' },
      { name: '990 PRO 2TB', brand: 'Samsung', price: 16500, imageURL: 'https://m.media-amazon.com/images/I/81PjT-8-e3L._AC_SL1500_.jpg', capacity: '2TB', type: 'NVMe M.2 Gen4' },
      { name: 'SN850X 2TB', brand: 'WD Black', price: 15500, imageURL: 'https://m.media-amazon.com/images/I/61r-vEDa07L._AC_SL1500_.jpg', capacity: '2TB', type: 'NVMe M.2 Gen4' },
      { name: 'KC3000 1TB', brand: 'Kingston', price: 8000, imageURL: 'https://m.media-amazon.com/images/I/71rIe+wBqDL._AC_SL1500_.jpg', capacity: '1TB', type: 'NVMe M.2 Gen4' },
      { name: '970 EVO PLUS 1TB', brand: 'Samsung', price: 6500, imageURL: 'https://m.media-amazon.com/images/I/81x-sO5JmeL._AC_SL1500_.jpg', capacity: '1TB', type: 'NVMe M.2 Gen3' },
      { name: 'MX500 2TB', brand: 'Crucial', price: 11000, imageURL: 'https://m.media-amazon.com/images/I/81r1s6ySgwL._AC_SL1500_.jpg', capacity: '2TB', type: 'SATA SSD' },
      { name: 'BARRACUDA 4TB', brand: 'Seagate', price: 8500, imageURL: 'https://m.media-amazon.com/images/I/719h9mN+2oL._AC_SL1500_.jpg', capacity: '4TB', type: 'HDD 7200RPM' }
    ]);

// 4. Inject Phase 03: GPU & Power (16 GPUs)
await GPU.create([
      { name: 'GEFORCE RTX 4090 FOUNDERS', brand: 'NVIDIA', price: 165000, imageURL: 'https://m.media-amazon.com/images/I/71R2J5F2oQL._AC_SL1500_.jpg', vram: '24GB', length: 304, tdp: 450 },
      { name: 'ROG STRIX RTX 4090 OC', brand: 'ASUS', price: 185000, imageURL: 'https://m.media-amazon.com/images/I/81LGNtqRtwL._AC_SL1500_.jpg', vram: '24GB', length: 357, tdp: 450 },
      { name: 'GEFORCE RTX 4080 SUPER', brand: 'NVIDIA', price: 95000, imageURL: 'https://m.media-amazon.com/images/I/81B4BfOEDPL._AC_SL1500_.jpg', vram: '16GB', length: 310, tdp: 320 },
      { name: 'TUF GAMING RTX 4080 SUPER', brand: 'ASUS', price: 102000, imageURL: 'https://m.media-amazon.com/images/I/8140J2m1-UL._AC_SL1500_.jpg', vram: '16GB', length: 348, tdp: 320 },
      { name: 'GEFORCE RTX 4070 TI SUPER', brand: 'GIGABYTE', price: 78000, imageURL: 'https://m.media-amazon.com/images/I/71YF9P1vWPL._AC_SL1500_.jpg', vram: '16GB', length: 300, tdp: 285 },
      { name: 'GEFORCE RTX 4070 SUPER', brand: 'MSI', price: 62000, imageURL: 'https://m.media-amazon.com/images/I/71yG+QZc6LL._AC_SL1500_.jpg', vram: '12GB', length: 267, tdp: 220 },
      { name: 'GEFORCE RTX 4060 TI', brand: 'ZOTAC', price: 38000, imageURL: 'https://m.media-amazon.com/images/I/71S8-lFDBuL._AC_SL1500_.jpg', vram: '8GB', length: 225, tdp: 160 },
      { name: 'GEFORCE RTX 4060', brand: 'GIGABYTE', price: 29000, imageURL: 'https://m.media-amazon.com/images/I/71g8R3-L3pL._AC_SL1500_.jpg', vram: '8GB', length: 200, tdp: 115 },
      { name: 'RADEON RX 7900 XTX NITRO+', brand: 'Sapphire', price: 105000, imageURL: 'https://m.media-amazon.com/images/I/81t3Ym6lHFL._AC_SL1500_.jpg', vram: '24GB', length: 320, tdp: 420 },
      { name: 'RADEON RX 7900 XTX', brand: 'XFX', price: 98000, imageURL: 'https://m.media-amazon.com/images/I/71nBNYtLZZL._AC_SL1500_.jpg', vram: '24GB', length: 287, tdp: 355 },
      { name: 'RADEON RX 7900 XT', brand: 'PowerColor', price: 75000, imageURL: 'https://m.media-amazon.com/images/I/71TDUoVqGML._AC_SL1500_.jpg', vram: '20GB', length: 276, tdp: 315 },
      { name: 'RADEON RX 7900 GRE', brand: 'ASRock', price: 54000, imageURL: 'https://m.media-amazon.com/images/I/81O5eT722YL._AC_SL1500_.jpg', vram: '16GB', length: 269, tdp: 260 },
      { name: 'RADEON RX 7800 XT', brand: 'Sapphire', price: 49000, imageURL: 'https://m.media-amazon.com/images/I/71D0YnO2S8L._AC_SL1500_.jpg', vram: '16GB', length: 280, tdp: 263 },
      { name: 'RADEON RX 7700 XT', brand: 'GIGABYTE', price: 42000, imageURL: 'https://m.media-amazon.com/images/I/71vR4s2v0ZL._AC_SL1500_.jpg', vram: '12GB', length: 260, tdp: 245 },
      { name: 'RADEON RX 7600', brand: 'MSI', price: 26000, imageURL: 'https://m.media-amazon.com/images/I/81P2h0h4lYL._AC_SL1500_.jpg', vram: '8GB', length: 210, tdp: 165 },
      { name: 'ARC A770', brand: 'Intel', price: 28000, imageURL: 'https://m.media-amazon.com/images/I/71yX7p-mPPL._AC_SL1500_.jpg', vram: '16GB', length: 268, tdp: 225 }
    ]);

await PSU.create([
      { name: 'DARK POWER PRO 13 1600W', brand: 'be quiet!', price: 38000, imageURL: 'https://m.media-amazon.com/images/I/71Xm5rG0VPL._AC_SL1500_.jpg', wattage: 1600, efficiencyRating: '80+ Titanium', formFactor: 'ATX 3.0' },
      { name: 'HX1500i 1500W', brand: 'Corsair', price: 32000, imageURL: 'https://m.media-amazon.com/images/I/71x4-F2v-bL._AC_SL1500_.jpg', wattage: 1500, efficiencyRating: '80+ Platinum', formFactor: 'ATX 3.0' },
      { name: 'VERTEX GX-1200 1200W', brand: 'Seasonic', price: 21000, imageURL: 'https://m.media-amazon.com/images/I/71YJ0vQ2m8L._AC_SL1500_.jpg', wattage: 1200, efficiencyRating: '80+ Gold', formFactor: 'ATX 3.0' },
      { name: 'RM1000x SHIFT 1000W', brand: 'Corsair', price: 18500, imageURL: 'https://m.media-amazon.com/images/I/71wKj63WomL._AC_SL1500_.jpg', wattage: 1000, efficiencyRating: '80+ Gold', formFactor: 'ATX 3.0' },
      { name: 'RM850x SHIFT 850W', brand: 'Corsair', price: 12500, imageURL: 'https://m.media-amazon.com/images/I/71wKj63WomL._AC_SL1500_.jpg', wattage: 850, efficiencyRating: '80+ Gold', formFactor: 'ATX 3.0' },
      { name: 'FOCUS GX-850', brand: 'Seasonic', price: 11500, imageURL: 'https://m.media-amazon.com/images/I/71N0sQo1a+L._AC_SL1500_.jpg', wattage: 850, efficiencyRating: '80+ Gold', formFactor: 'ATX' },
      { name: 'RM750e 750W', brand: 'Corsair', price: 9500, imageURL: 'https://m.media-amazon.com/images/I/71wKj63WomL._AC_SL1500_.jpg', wattage: 750, efficiencyRating: '80+ Gold', formFactor: 'ATX 3.0' },
      { name: 'CX650M 650W', brand: 'Corsair', price: 6500, imageURL: 'https://m.media-amazon.com/images/I/71V2M9Wz4sL._AC_SL1500_.jpg', wattage: 650, efficiencyRating: '80+ Bronze', formFactor: 'ATX' }
    ]);

    // 5. Inject Phase 04: Infrastructure
await Cooler.create([
      { name: 'RYUJIN III 360 ARGB', brand: 'ASUS', price: 32000, imageURL: 'https://m.media-amazon.com/images/I/81N0sQo1a+L._AC_SL1500_.jpg', type: 'AIO Liquid', radiatorSize: 360 },
      { name: 'KRAKEN ELITE 360 RGB', brand: 'NZXT', price: 28000, imageURL: 'https://m.media-amazon.com/images/I/71YJ0vQ2m8L._AC_SL1500_.jpg', type: 'AIO Liquid', radiatorSize: 360 },
      { name: 'LIQMAXFLO 360', brand: 'Enermax', price: 14000, imageURL: 'https://m.media-amazon.com/images/I/71Xm5rG0VPL._AC_SL1500_.jpg', type: 'AIO Liquid', radiatorSize: 360 },
      { name: 'KRAKEN 240', brand: 'NZXT', price: 13500, imageURL: 'https://m.media-amazon.com/images/I/71x4-F2v-bL._AC_SL1500_.jpg', type: 'AIO Liquid', radiatorSize: 240 },
      { name: 'NH-D15 CHROMAX.BLACK', brand: 'Noctua', price: 10500, imageURL: 'https://m.media-amazon.com/images/I/81b0U3Kx22L._AC_SL1500_.jpg', type: 'Air Cooler', radiatorSize: null },
      { name: 'DARK ROCK PRO 5', brand: 'be quiet!', price: 9500, imageURL: 'https://m.media-amazon.com/images/I/71V2M9Wz4sL._AC_SL1500_.jpg', type: 'Air Cooler', radiatorSize: null },
      { name: 'AK620 ZERO DARK', brand: 'DeepCool', price: 6500, imageURL: 'https://m.media-amazon.com/images/I/71N0sQo1a+L._AC_SL1500_.jpg', type: 'Air Cooler', radiatorSize: null },
      { name: 'PEERLESS ASSASSIN 120 SE', brand: 'Thermalright', price: 3500, imageURL: 'https://m.media-amazon.com/images/I/71wKj63WomL._AC_SL1500_.jpg', type: 'Air Cooler', radiatorSize: null }
    ]);

await Case.create([
      { name: 'ODYSSEY X', brand: 'Lian Li', price: 45000, imageURL: 'https://m.media-amazon.com/images/I/71YJ0vQ2m8L._AC_SL1500_.jpg', formFactor: 'Full Tower', motherboardSupport: ['EEB', 'E-ATX', 'ATX'] },
      { name: 'ROG HYPERION GR701', brand: 'ASUS', price: 38000, imageURL: 'https://m.media-amazon.com/images/I/81N0sQo1a+L._AC_SL1500_.jpg', formFactor: 'Full Tower', motherboardSupport: ['E-ATX', 'ATX', 'Micro-ATX'] },
      { name: 'NV7', brand: 'Phanteks', price: 21000, imageURL: 'https://m.media-amazon.com/images/I/71Xm5rG0VPL._AC_SL1500_.jpg', formFactor: 'Full Tower', motherboardSupport: ['E-ATX', 'ATX', 'Micro-ATX'] },
      { name: 'O11 DYNAMIC EVO XL', brand: 'Lian Li', price: 22000, imageURL: 'https://m.media-amazon.com/images/I/71x4-F2v-bL._AC_SL1500_.jpg', formFactor: 'Full Tower', motherboardSupport: ['E-ATX', 'ATX', 'Micro-ATX'] },
      { name: 'O11 VISION', brand: 'Lian Li', price: 14500, imageURL: 'https://m.media-amazon.com/images/I/71wKj63WomL._AC_SL1500_.jpg', formFactor: 'Mid Tower', motherboardSupport: ['E-ATX', 'ATX', 'Micro-ATX'] },
      { name: 'H9 FLOW', brand: 'NZXT', price: 15500, imageURL: 'https://m.media-amazon.com/images/I/71V2M9Wz4sL._AC_SL1500_.jpg', formFactor: 'Mid Tower', motherboardSupport: ['ATX', 'Micro-ATX', 'Mini-ITX'] },
      { name: 'NORTH CHARCOAL BLACK', brand: 'Fractal Design', price: 13500, imageURL: 'https://m.media-amazon.com/images/I/81b0U3Kx22L._AC_SL1500_.jpg', formFactor: 'Mid Tower', motherboardSupport: ['ATX', 'Micro-ATX', 'Mini-ITX'] },
      { name: '4000D AIRFLOW', brand: 'Corsair', price: 8500, imageURL: 'https://m.media-amazon.com/images/I/71wKj63WomL._AC_SL1500_.jpg', formFactor: 'Mid Tower', motherboardSupport: ['E-ATX', 'ATX', 'Micro-ATX'] },
      { name: 'TERRA', brand: 'Fractal Design', price: 16500, imageURL: 'https://m.media-amazon.com/images/I/71x4-F2v-bL._AC_SL1500_.jpg', formFactor: 'Small Form Factor', motherboardSupport: ['Mini-ITX'] }
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