import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BUILD_SLOTS } from '../data/constants.jsx';

export default function SelectionPage({ setBuild }) {
  const { category } = useParams(); 
  const navigate = useNavigate();
  
  // NEW: State variables to handle the network request
  const [components, setComponents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const slotInfo = BUILD_SLOTS.find(s => s.id === category);

  // NEW: The actual bridge to your backend
  useEffect(() => {
    // 1. Set loading to true while we wait for the server
    setIsLoading(true);
    
    // 2. Fetch the data from your Express backend
    fetch(`http://localhost:5000/api/hardware/${category}`)
      .then(res => res.json())
      .then(data => {
        setComponents(data); // 3. Save the data to React state
        setIsLoading(false); // 4. Turn off the loading screen
      })
      .catch(err => {
        console.error("Failed to fetch hardware:", err);
        setIsLoading(false);
      });
  }, [category]); // This array tells React to re-run this if the URL category changes

  const handleSelect = (item) => {
    setBuild(prev => ({ ...prev, [category]: item }));
    navigate('/'); 
  };

  return (
    <main className="w-full max-w-7xl mx-auto flex-grow px-4 mt-8">
      <div className="w-full flex justify-between items-center mb-16 px-4">
        <button onClick={() => navigate('/')} className="text-micro hover:text-gray-400 transition-colors cursor-pointer flex items-center gap-2 uppercase">
          <span className="text-lg">←</span> RETURN TO BUILD SPACE
        </button>
        <span className="text-2xl font-bold tracking-tighter uppercase">{slotInfo?.name || category}</span>
      </div>

      {/* NEW: Brutalist Loading State */}
      {isLoading ? (
        <div className="w-full flex justify-center mt-32">
          <span className="text-micro text-gray-500 uppercase tracking-widest animate-pulse">
            [ ESTABLISHING UPLINK TO DATABASE... ]
          </span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {components.length > 0 ? components.map((item) => (
            <div key={item._id} onClick={() => handleSelect(item)} className="flex flex-col group cursor-pointer">
              <div className="aspect-square w-full border border-dashed border-brutalGray flex items-center justify-center mb-6 group-hover:border-white transition-colors">
                <span className="text-micro text-gray-700 group-hover:text-gray-400 transition-colors uppercase">TRANSPARENT_RENDER.PNG</span>
              </div>
              <div className="flex justify-between items-center w-full">
                <span className="text-micro font-bold uppercase">{item.name}</span>
                <span className="text-micro text-gray-500">₹{item.price.toLocaleString('en-IN')}</span>
              </div>
            </div>
          )) : (
            <div className="col-span-3 text-center text-gray-500 uppercase mt-32 tracking-widest">
              NO {category.toUpperCase()} COMPONENTS FOUND IN SERVER DATABANKS.
            </div>
          )}
        </div>
      )}
    </main>
  );
}