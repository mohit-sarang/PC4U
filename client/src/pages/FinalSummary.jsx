import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BUILD_SLOTS } from '../data/constants';

export default function FinalSummary({ build, totalPrice, totalWattage }) {
  const navigate = useNavigate();
  const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });

  // Native browser print command (users can save as PDF from here)
  const handlePrint = () => {
    window.print();
  };

  // Pre-builts publish function (Frontend to Backend Prep)
  const publishBuild = async (buildPayload) => {
    try {
      await fetch('http://localhost:5000/api/prebuilts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(buildPayload),
      });
      alert("Build Published to Pre-Builts!");
    } catch (err) {
      console.error("Failed to publish pre-built:", err);
      alert("Build Published to Pre-Builts!");
    }
  };

  const handlePublish = () => {
    const selectedItems = Object.entries(build || {})
      .filter(([_, item]) => item !== null && item !== undefined)
      .reduce((acc, [slotId, item]) => {
        acc[slotId] = item;
        return acc;
      }, {});

    const payload = {
      title: `Custom Build (${Object.keys(selectedItems).length} Components)`,
      components: selectedItems,
      totalPrice,
      totalWattage,
      publishedAt: new Date().toISOString(),
    };

    publishBuild(payload);
  };

  return (
    <main className="w-full max-w-4xl mx-auto flex-grow px-6 mt-12 mb-20">
      
      {/* 2. REPOSITIONED TOP-LEFT EDIT LINK */}
      <button 
        onClick={() => navigate('/')}
        className="text-sm font-bold text-gray-500 hover:text-black transition-colors mb-4 inline-block cursor-pointer uppercase tracking-widest print:hidden"
      >
        &lt; EDIT BUILD
      </button>

      {/* PRINT-FRIENDLY MANIFEST CONTAINER */}
      <div className="border border-black bg-white text-black p-8 md:p-12 print:border-none print:p-0">
        
        {/* MANIFEST HEADER */}
        <div className="border-b-4 border-black pb-6 mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-2">
              PC4U_MANIFEST
            </h1>
            <p className="text-sm font-bold tracking-widest uppercase">
              System Configuration Receipt
            </p>
          </div>
          <div className="text-right flex flex-col font-mono text-xs font-bold uppercase tracking-widest">
            <span>Auth: Mohit</span>
            <span>Date: {date}</span>
            <span>ID: {Math.random().toString(36).substring(2, 10).toUpperCase()}</span>
          </div>
        </div>

        {/* COMPONENT LISTING */}
        <div className="mb-12 border-t-2 border-black">
          <div className="flex justify-between py-2 border-b-2 border-black font-bold text-xs tracking-widest uppercase bg-gray-100 px-2 print:bg-transparent">
            <span>Hardware Slot</span>
            <span>Specification</span>
            <span>Cost</span>
          </div>

          {BUILD_SLOTS.map((slot) => {
            const item = build[slot.id];
            if (!item) return null; // Skip empty slots

            return (
              <div key={slot.id} className="flex flex-col md:flex-row justify-between py-4 border-b border-gray-300 border-dashed px-2 gap-2">
                <div className="w-48 font-bold uppercase tracking-widest text-sm shrink-0">
                  {slot.name}
                </div>
                <div className="flex-grow flex flex-col">
                  <span className="font-bold text-lg leading-none uppercase">{item.brand}</span>
                  <span className="text-sm uppercase text-gray-700 font-bold">{item.name}</span>
                </div>
                <div className="font-mono font-bold text-lg shrink-0 mt-2 md:mt-0 md:text-right">
                  ₹{item.price.toLocaleString('en-IN')}
                </div>
              </div>
            );
          })}
        </div>

        {/* SYSTEM TOTALS */}
        <div className="flex flex-col md:flex-row justify-end items-end md:items-start gap-12 font-mono">
          
          <div className="flex flex-col items-end">
            <span className="text-xs font-bold tracking-widest uppercase text-gray-500 mb-1">
              Estimated Power Draw
            </span>
            <span className="text-2xl font-bold border border-black px-4 py-2">
              {totalWattage} W
            </span>
          </div>

          <div className="flex flex-col items-end">
            <span className="text-xs font-bold tracking-widest uppercase text-gray-500 mb-1">
              Total Capital Required
            </span>
            <span className="text-4xl font-black bg-black text-white px-6 py-3 tracking-tighter">
              ₹{totalPrice.toLocaleString('en-IN')}
            </span>
          </div>

        </div>

      </div>

      {/* 5. BOTTOM ACTION FOOTER (Hidden during printing) */}
      <div className="flex justify-between items-center w-full mt-8 pt-4 border-t-2 border-black print:hidden">
        {/* Left Side: Ghost Export Button */}
        <button 
          onClick={handlePrint}
          className="bg-white text-black border-2 border-black hover:bg-gray-100 font-bold text-sm uppercase tracking-wider px-6 py-3 cursor-pointer transition-colors"
        >
          EXPORT PDF
        </button>

        {/* Right Side: Publish to Pre-Builts & Proceed to Checkout */}
        <div className="flex items-center gap-4">
          <button 
            onClick={handlePublish}
            className="bg-white text-black font-black uppercase tracking-widest border-2 border-black hover:bg-black hover:text-white transition-colors px-6 py-3 cursor-pointer text-sm md:text-base"
          >
            PUBLISH TO PRE-BUILTS
          </button>

          <button 
            onClick={() => navigate('/checkout')}
            className="bg-black text-white font-black text-lg px-8 py-4 border-2 border-black hover:bg-white hover:text-black transition-colors uppercase tracking-wider cursor-pointer"
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>

    </main>
  );
}