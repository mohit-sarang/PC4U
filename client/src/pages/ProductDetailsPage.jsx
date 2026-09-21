import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { BUILD_SLOTS } from '../data/constants.jsx';

export default function ProductDetailsPage({ setBuild }) {
  // Added 'id' to params so we can fetch the item if the page is refreshed
  const { category, id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Initialize state with router data if available
  const [item, setItem] = useState(location.state?.item || null);
  const [isLoading, setIsLoading] = useState(!item);

  const slotInfo = BUILD_SLOTS.find(s => s.id === category);

  // FALLBACK FETCH: If someone refreshes the page and loses the memory state, grab it from the DB
  useEffect(() => {
    if (!item && id) {
      fetch(`http://localhost:5000/api/hardware/${category}/${id}`)
        .then(res => res.json())
        .then(data => {
          setItem(data);
          setIsLoading(false);
        })
        .catch(err => {
          console.error("Failed to fetch item:", err);
          navigate(`/select/${category}`); // Only kick them out if the DB fetch actually fails
        });
    }
  }, [category, id, item, navigate]);

  // The actual equip function
  const handleEquip = () => {
    setBuild(prev => ({ ...prev, [category]: item }));
    navigate('/');
  };

  if (isLoading) {
    return (
      <div className="w-full flex-grow flex justify-center items-center mt-32">
        <span className="text-sm text-gray-500 uppercase tracking-widest font-mono animate-pulse">
          [ DECRYPTING_HARDWARE_DATA... ]
        </span>
      </div>
    );
  }

  if (!item) return null;

  return (
    <main className="w-full max-w-7xl mx-auto flex-grow px-4 mt-6">
      
    {/* 3-LEVEL UNIFORM BREADCRUMB */}
      <div className="w-full flex items-center mb-12 px-2 border-b border-brutalGray pb-6 gap-3 uppercase tracking-tighter overflow-hidden">
        <button 
          onClick={() => navigate('/')} 
          className="text-xl md:text-2xl font-bold text-gray-500 hover:text-white transition-colors cursor-pointer shrink-0"
        >
          BUILD SPACE
        </button>
        
        <span className="text-xl md:text-2xl text-gray-700 font-light">/</span>
        
        <button 
          onClick={() => navigate(`/select/${category}`)} 
          className="text-xl md:text-2xl font-bold text-gray-500 hover:text-white transition-colors cursor-pointer shrink-0"
        >
          {slotInfo?.name || category}
        </button>
        
        <span className="text-xl md:text-2xl text-gray-700 font-light">/</span>
        
        <h1 className="text-xl md:text-2xl font-bold text-white truncate" title={item.name}>
          {item.name}
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* LEFT: SOLID WHITE IMAGE RENDERER */}
        <div className="aspect-square w-full bg-white flex items-center justify-center p-8 relative overflow-hidden">
          {item.imageURL ? (
            <img 
              src={item.imageURL} 
              alt={item.name} 
              className="w-full h-full object-contain"
            />
          ) : (
            <span className="text-sm text-gray-300 uppercase tracking-widest text-center font-bold font-mono">
              HIGH_RES_RENDER_<br/>{item._id}.PNG
            </span>
          )}
        </div>

        {/* RIGHT: SPECIFICATIONS & TERMINAL EQUIP */}
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-6xl font-black uppercase tracking-tighter leading-none mb-2 text-white">{item.brand}</h2>
            <h3 className="text-3xl text-gray-400 font-bold uppercase tracking-tight mb-8">{item.name}</h3>
            
            <div className="w-full border-t border-gray-800 pt-6 mb-8">
              <div className="flex justify-between items-center mb-6">
                <span className="text-sm font-bold text-gray-500 tracking-widest uppercase">Price</span>
                <span className="text-2xl font-bold tracking-tighter text-white">₹{item.price.toLocaleString('en-IN')}</span>
              </div>
              
              <h4 className="text-sm font-bold text-gray-500 tracking-widest uppercase mb-4 border-b border-gray-800 pb-2">Technical Specifications</h4>
              
              <ul className="flex flex-col gap-3">
                {/* Dynamically filtering out React/MongoDB keys to just show specs */}
                {Object.entries(item)
                  .filter(([key]) => !['_id', 'name', 'brand', 'price', '__v', 'imageURL', 'createdAt', 'updatedAt', 'category'].includes(key))
                  .map(([key, value]) => (
                    <li key={key} className="flex justify-between border-b border-dashed border-gray-800 pb-2">
                      <span className="text-sm text-gray-400 uppercase tracking-wider">{key.replace(/([A-Z])/g, ' $1')}</span>
                      <span className="text-sm font-bold uppercase text-white text-right max-w-[60%]">
                        {/* Safeguard: Checks if value is an array (like case motherboard sizes) and joins them */}
                        {Array.isArray(value) ? value.join(' / ') : value}
                      </span>
                    </li>
                ))}
              </ul>
            </div>
          </div>

          <button 
            onClick={handleEquip}
            className="w-full bg-white text-black font-black text-2xl uppercase tracking-tighter py-6 hover:bg-gray-300 transition-colors"
          >
            ADD TO CART
          </button>
        </div>
      </div>
    </main>
  );
}