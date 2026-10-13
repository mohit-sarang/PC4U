import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BUILD_SLOTS } from '../data/constants';

export default function BuildSpace({ build, setBuild }) {
  const userName = "Mohit";
  const navigate = useNavigate();

  // Prevents the row click from firing when removing an item
  const handleRemove = (e, slotId) => {
    e.stopPropagation();
    setBuild(prev => {
      const newBuild = { ...prev };
      delete newBuild[slotId];
      return newBuild;
    });
  };

  return (
    <main className="w-full flex-grow pb-32 bg-white text-black flex flex-col items-center">
      {/* Container matching image reference */}
      <div className="w-full max-w-5xl mx-auto px-6 md:px-8 mt-12 mb-8 text-left">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-black flex items-baseline gap-3">
          <span className="uppercase whitespace-nowrap">{userName}!</span>
          <span className="font-light normal-case">Let’s Build a PC4U</span>
        </h1>
      </div>

      {/* COMPONENT DIRECTORY LIST */}
      <div className="w-full max-w-5xl mx-auto px-6 md:px-8 flex flex-col">
        <div className="w-full border-t border-black">
          {BUILD_SLOTS.map((slot) => {
            const isSelected = build[slot.id];
            const slotLabel = slot.id === 'ram' ? 'RAM' : slot.name;

            return (
              <div 
                key={slot.id}
                onClick={() => {
                  if (isSelected) {
                    const productId = build[slot.id]._id || build[slot.id].id;
                    navigate(`/product/${productId}`, { state: { item: build[slot.id] } });
                  } else {
                    navigate(`/select/${slot.id}`);
                  }
                }} 
                className={`group flex items-center border-b border-black text-left w-full cursor-pointer transition-all duration-200 ease-out hover:bg-neutral-50 px-4 md:px-6 ${
                  isSelected ? 'min-h-[140px] py-6' : 'h-[90px]'
                }`}
              >
                {isSelected ? (
                  /* ======================================= */
                  /* ITEM SELECTED STATE (MATCHING REFERENCE)*/
                  /* ======================================= */
                  <div className="w-full flex items-center justify-between gap-6">
                    {/* Left: Square Thumbnail & 3-Tier Typography */}
                    <div className="flex items-center gap-6 md:gap-8">
                      {/* Crisp Square Image Box */}
                      <div className="w-28 h-28 md:w-32 md:h-32 bg-white flex items-center justify-center p-3 md:p-4 border border-black shrink-0 transition-transform duration-200 group-hover:scale-105">
                        {build[slot.id].imageURL ? (
                          <img 
                            src={build[slot.id].imageURL} 
                            alt={build[slot.id].name} 
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <span className="text-xs font-black text-black">N/A</span>
                        )}
                      </div>

                      {/* 3-Tier Typography Stack */}
                      <div className="flex flex-col justify-center">
                        {/* 1. Category Label */}
                        <span className="text-xs md:text-sm font-bold text-gray-400 uppercase tracking-wider leading-none">
                          {slotLabel}
                        </span>

                        {/* 2. Brand Name */}
                        <span className="text-2xl md:text-3xl font-black text-black leading-tight mt-1.5 capitalize">
                          {build[slot.id].brand}
                        </span>

                        {/* 3. Model Name */}
                        <span className="text-2xl md:text-3xl font-black text-black uppercase leading-tight mt-0.5">
                          {build[slot.id].name}
                        </span>
                      </div>
                    </div>

                    {/* Right: Price & Trash Can Icon */}
                    <div className="flex items-center gap-6 md:gap-8 shrink-0 ml-auto">
                      <span className="text-xl md:text-2xl font-black tracking-tight text-black">
                        ₹{build[slot.id].price.toLocaleString('en-IN')}
                      </span>
                      <button 
                        onClick={(e) => handleRemove(e, slot.id)}
                        title="Remove component"
                        className="text-black hover:text-red-600 transition-all duration-200 p-1 hover:scale-110 active:scale-95 cursor-pointer"
                      >
                        <svg className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 6h18" />
                          <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                          <line x1="10" y1="11" x2="10" y2="17" />
                          <line x1="14" y1="11" x2="14" y2="17" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ) : (
                  /* ======================================= */
                  /* EMPTY SLOT STATE                        */
                  /* ======================================= */
                  <div className="w-full flex justify-between items-center">
                    <div className="flex flex-col justify-center">
                      <span className="text-2xl md:text-3xl font-black tracking-tight uppercase text-black">
                        {slotLabel}
                      </span>
                    </div>
                    <div className="text-right flex items-center ml-auto">
                      <span className="text-3xl md:text-4xl font-light text-gray-400 group-hover:text-black transition-colors duration-200">
                        +
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}