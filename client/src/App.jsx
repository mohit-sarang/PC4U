import React, { useState } from 'react';

// Reverted to the full list, with COOLING moved down to the infrastructure section
const BUILD_SLOTS = [
  { id: 'cpu', name: 'PROCESSOR' },
  { id: 'mobo', name: 'MOTHERBOARD' },
  { id: 'ram', name: 'MEMORY' },
  { id: 'gpu', name: 'GRAPHICS' },
  { id: 'storage', name: 'STORAGE' },
  { id: 'psu', name: 'POWER' },
  { id: 'cooler', name: 'COOLING' },
  { id: 'case', name: 'CHASSIS' },
];

const MOCK_CPUS = [
  { id: 1, name: 'RYZEN 7 7800X3D', price: '₹35,000' },
  { id: 2, name: 'CORE I5-13600K', price: '₹28,500' },
  { id: 3, name: 'RYZEN 5 7600X', price: '₹22,000' },
];

function App() {
  const userName = "Mohit";
  const [activeSlot, setActiveSlot] = useState(null);

  // ==========================================
  // VIEW 2: THE FULL-SCREEN SELECTION GRID
  // ==========================================
  if (activeSlot) {
    return (
      <div className="min-h-screen w-full flex flex-col bg-brutalBlack text-brutalWhite p-8">
        
        <header className="w-full flex justify-between items-center mb-24">
          <button 
            onClick={() => setActiveSlot(null)} 
            className="text-micro hover:text-gray-400 transition-colors cursor-pointer flex items-center gap-2"
          >
            <span className="text-lg">←</span> RETURN TO BUILD
          </button>
          <span className="text-micro">CART [ 0 ]</span>
        </header>

        <main className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 px-4">
          {MOCK_CPUS.map((cpu) => (
            <div key={cpu.id} className="flex flex-col group cursor-pointer">
              
              <div className="aspect-square w-full border border-dashed border-brutalGray flex items-center justify-center mb-6 group-hover:border-white transition-colors">
                <span className="text-micro text-gray-700 group-hover:text-gray-400 transition-colors">
                  TRANSPARENT_RENDER.PNG
                </span>
              </div>
              
              <div className="flex justify-between items-center w-full">
                <span className="text-micro font-bold">{cpu.name}</span>
                <span className="text-micro text-gray-500">{cpu.price}</span>
              </div>
              
            </div>
          ))}
        </main>
      </div>
    );
  }

  // ==========================================
  // VIEW 1: THE FULL ACTIVE BUILD LIST
  // ==========================================
  return (
    <div className="min-h-screen w-full flex flex-col items-center pb-20 overflow-x-hidden">
      
      <header className="w-full p-6 flex justify-between items-center border-b border-brutalGray sticky top-0 bg-brutalBlack z-10">
        <div className="w-1/3 flex justify-start">
          <h1 className="text-2xl font-bold tracking-tighter cursor-pointer hover:text-gray-400 transition-colors">PC4U.</h1>
        </div>
        <div className="w-1/3 flex justify-center">
          <nav className="flex items-center gap-8 px-8 py-3 border border-brutalGray rounded-full bg-brutalBlack">
            <button className="text-micro hover:text-white text-gray-500 transition-colors">Build</button>
            <button className="text-micro hover:text-white text-gray-500 transition-colors">Browse</button>
            <button className="text-micro hover:text-white text-gray-500 transition-colors">Gallery</button>
          </nav>
        </div>
        <div className="w-1/3 flex justify-end items-center gap-6">
          <button className="text-micro text-gray-500 hover:text-white transition-colors">SEARCH</button>
          <button className="text-micro text-gray-500 hover:text-white transition-colors">PROFILE</button>
          <button className="text-micro text-gray-500 hover:text-white transition-colors">CART [0]</button>
        </div>
      </header>

      <main className="w-full max-w-5xl mt-12 px-6">
        <div className="mb-12 border-b border-brutalGray pb-4 flex justify-between items-end">
          <div>
            {/* Locked-in typography block */}
            <h2 className="text-5xl font-bold tracking-tighter ">
              <span className="uppercase">{userName}!</span> 
              <span className="font-light"> Let's Build a PC4U </span> 
            </h2>
            <p className="text-micro text-gray-400 mt-2">SELECT COMPONENTS TO BEGIN.</p>
          </div>
          <div className="text-right pb-2">
            <span className="block text-micro text-gray-500">EST. WATTAGE: 0W</span>
            <span className="block text-micro text-gray-500 mt-1">TOTAL: ₹0</span>
          </div>
        </div>

        <div className="flex flex-col w-full border-t border-brutalGray">
          {BUILD_SLOTS.map((slot, index) => (
            <button 
              key={slot.id}
              onClick={() => setActiveSlot(slot)} 
              className="group flex flex-col md:flex-row justify-between items-start md:items-center p-6 border-b border-brutalGray transition-all duration-150 hover:bg-brutalWhite hover:text-brutalBlack text-left w-full cursor-pointer"
            >
              <div className="flex flex-col">
                <span className="text-micro text-gray-500 group-hover:text-brutalBlack transition-colors">
                  0{index + 1} // {slot.id.toUpperCase()}
                </span>
                <span className="text-3xl font-bold tracking-tight mt-1">{slot.name}</span>
              </div>
              <div className="mt-4 md:mt-0 text-right">
                <span className="block text-4xl font-light text-gray-500 group-hover:text-brutalBlack transition-colors">+</span>
              </div>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;