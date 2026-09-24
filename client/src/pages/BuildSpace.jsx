import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BUILD_SLOTS } from '../data/constants';

export default function BuildSpace({ build, setBuild }) {
  const userName = "Mohit";
  const navigate = useNavigate();

  // Prevents the row click from firing when you just want to remove an item
  const handleRemove = (e, slotId) => {
    e.stopPropagation();
    setBuild(prev => {
      const newBuild = { ...prev };
      delete newBuild[slotId];
      return newBuild;
    });
  };

  return (
    <main className="w-full max-w-5xl mt-16 px-6 flex-grow pb-20 bg-white text-black">
      {/* CHANGED: border-brutalGray to border-black, thickened to border-b-2 */}
      <div className="mb-8 border-b-2 border-black pb-12 flex flex-col w-full">
        <div className="flex flex-col mb-4">
          <h2 className="text-5xl font-black tracking-tighter">
            <span className="uppercase">{userName}!</span> 
            <span className="font-light"> Let's Build a PC4U </span> 
          </h2>
        </div>
      </div>

      {/* COMPONENT DIRECTORY LIST */}
      <div className="flex flex-col w-full border-t-2 border-black">
        {BUILD_SLOTS.map((slot) => {
          const isSelected = build[slot.id];

          return (
            <React.Fragment key={slot.id}>
              {slot.phase && (
                <div className="w-full pt-8 pb-2 bg-gray-50 px-2 border-b border-black">
                  <span className="text-micro text-gray-800 font-bold tracking-widest uppercase">
                    {slot.phase}
                  </span>
                </div>
              )}
              
              {/* CHANGED: hover:bg-black hover:text-white, transition-none for instant harsh snap */}
              <div 
                onClick={() => navigate(`/select/${slot.id}`)} 
                className={`group flex flex-col md:flex-row justify-between items-start md:items-center p-6 border-black transition-none hover:bg-black hover:text-white text-left w-full cursor-pointer ${slot.phase ? 'border-y' : 'border-b'}`}
              >
                {isSelected ? (
                  /* ======================================= */
                  /* ITEM SELECTED STATE                     */
                  /* ======================================= */
                  <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    
                    {/* Left: Thumbnail & Name */}
                    <div className="flex items-center gap-6">
                      {/* CHANGED: border-black for thumbnail box */}
                      <div className="w-16 h-16 bg-white flex items-center justify-center p-1 border-2 border-black shrink-0">
                        {build[slot.id].imageURL ? (
                          <img 
                            src={build[slot.id].imageURL} 
                            alt={build[slot.id].name} 
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <span className="text-[8px] font-black text-black">N/A</span>
                        )}
                      </div>
                      <div className="flex flex-col justify-center">
                        <span className="text-3xl font-black tracking-tight uppercase group-hover:text-white">{slot.name}</span>
                        <span className="text-xs text-gray-500 mt-1 group-hover:text-gray-300 uppercase font-bold tracking-widest">
                          {build[slot.id].brand} // {build[slot.id].name}
                        </span>
                      </div>
                    </div>

                    {/* Right: Price & Drop Controls */}
                    <div className="flex items-center gap-6 w-full md:w-auto justify-end">
                      <span className="text-xl font-black tracking-tighter group-hover:text-white">
                        ₹{build[slot.id].price.toLocaleString('en-IN')}
                      </span>
                      {/* CHANGED: High contrast Drop button that inverts on hover */}
                      <button 
                        onClick={(e) => handleRemove(e, slot.id)}
                        className="text-[10px] font-bold tracking-widest text-black hover:text-white uppercase p-2 border border-black hover:bg-red-600 transition-none group-hover:border-white group-hover:text-white group-hover:hover:bg-red-500"
                      >
                        Drop
                      </button>
                      <span className="block text-4xl font-light text-black group-hover:text-white">
                        ✓
                      </span>
                    </div>

                  </div>
                ) : (
                  /* ======================================= */
                  /* EMPTY SLOT STATE                        */
                  /* ======================================= */
                  <>
                    <div className="flex flex-col justify-center">
                      <span className="text-3xl font-black tracking-tight uppercase group-hover:text-white">{slot.name}</span>
                    </div>
                    <div className="mt-4 md:mt-0 text-right flex items-center gap-4">
                      <span className="block text-4xl font-light text-gray-400 group-hover:text-white">
                        +
                      </span>
                    </div>
                  </>
                )}
              </div>
            </React.Fragment>
          );
        })}
      </div>

      {/* ======================================= */
      /* FINALIZATION CONTROLS                   */
      /* ======================================= */}
      <div className="mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col">
          <span className="text-gray-500 font-bold text-xs tracking-widest uppercase">
            Active Components: {Object.keys(build).length} / {BUILD_SLOTS.length}
          </span>
          <span className="text-sm font-black text-black uppercase mt-1">
            System Initialization Ready
          </span>
        </div>
        
        {/* CHANGED: Solid black button, white text */}
        <button 
          onClick={() => navigate('/summary')}
          disabled={Object.keys(build).length === 0}
          className="w-full md:w-auto px-12 py-6 bg-black text-white font-black text-xl md:text-2xl uppercase tracking-tighter hover:bg-gray-800 transition-none disabled:opacity-30 disabled:cursor-not-allowed border-2 border-black"
        >
          [ COMPILE FINAL BUILD ]
        </button>
      </div>

    </main>
  );
}