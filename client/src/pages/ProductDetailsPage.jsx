import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { BUILD_SLOTS } from '../data/constants.jsx';

export default function ProductDetailsPage({ build = {}, setBuild }) {
  const { category: categoryParam, id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Initialize state with router data if available
  const [item, setItem] = useState(location.state?.item || null);
  const [isLoading, setIsLoading] = useState(!item);

  const category = categoryParam || location.state?.item?.category || (item && item.category) || Object.keys(build || {}).find(cat => (build[cat]?._id === id || build[cat]?.id === id));
  const slotInfo = BUILD_SLOTS.find(s => s.id === category);

  // FALLBACK FETCH: If someone refreshes the page and loses the memory state, grab it from the DB
  useEffect(() => {
    if (!item && id) {
      const endpoint = category 
        ? `http://localhost:5000/api/hardware/${category}/${id}`
        : `http://localhost:5000/api/hardware/item/${id}`;

      fetch(endpoint)
        .then(res => res.json())
        .then(data => {
          setItem(data);
          setIsLoading(false);
        })
        .catch(err => {
          console.error("Failed to fetch item:", err);
          if (category) {
            navigate(`/select/${category}`);
          } else {
            navigate('/');
          }
        });
    }
  }, [category, id, item, navigate]);

  // Check if product is equipped in current build
  const isEquipped = Boolean(
    item && (
      (category && (build?.[category]?._id === item._id || build?.[category]?.id === item._id || build?.[category]?.name === item.name)) ||
      Object.values(build || {}).some(b => (b?._id && b._id === item._id) || (b?.name && b.name === item.name))
    )
  );

  // The actual equip function
  const handleEquip = () => {
    const targetCategory = category || item?.category;
    if (targetCategory && item) {
      setBuild(prev => ({ ...prev, [targetCategory]: item }));
      navigate('/');
    }
  };

  if (isLoading) {
    return (
      <div className="w-full flex-grow flex justify-center items-center mt-32">
        <span className="text-xs text-gray-500 uppercase tracking-widest animate-pulse font-bold">
          [ ESTABLISHING HARDWARE UPLINK... ]
        </span>
      </div>
    );
  }

  if (!item) return null;

  return (
    <main className="w-full flex-grow px-8 lg:px-12 flex-1 h-screen overflow-hidden flex flex-col pt-8 pb-28 relative">
      
      {/* DIRECTORY BREADCRUMB STRIP (EXACT MATCH WITH SELECTION PAGE) */}
      <div className="w-full flex items-center mb-8 border-b border-gray-300 pb-4 gap-3 uppercase tracking-tighter shrink-0">
        <button 
          onClick={() => navigate('/')} 
          className="text-xl md:text-2xl font-bold text-gray-500 hover:text-black transition-colors cursor-pointer shrink-0"
        >
          BUILD SPACE
        </button>
        
        <span className="text-xl md:text-2xl text-gray-400 font-light">/</span>
        
        {category && (
          <>
            <button 
              onClick={() => navigate(`/select/${category}`)} 
              className="text-xl md:text-2xl font-bold text-gray-500 hover:text-black transition-colors cursor-pointer shrink-0"
            >
              {slotInfo?.name || category}
            </button>
            
            <span className="text-xl md:text-2xl text-gray-400 font-light">/</span>
          </>
        )}
        
        <h1 className="text-xl md:text-2xl font-bold text-black truncate" title={item.name}>
          {item.name}
        </h1>
      </div>

      {/* INTERNAL CONTENT CONTAINER (FLEX-1 UN-SCROLLABLE) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 flex-1 min-h-0 items-stretch">
        
        {/* LEFT: SOLID WHITE IMAGE RENDERER */}
        <div className="w-full h-full max-h-[520px] bg-white flex items-center justify-center p-8 relative overflow-hidden border-2 border-black">
          {item.imageURL ? (
            <img 
              src={item.imageURL} 
              alt={item.name} 
              className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
            />
          ) : (
            <span className="text-xs text-gray-400 uppercase tracking-widest text-center font-bold">
              TRANSPARENT_RENDER.PNG<br/>
              <span className="text-[10px]">[ DATA MISSING ]</span>
            </span>
          )}
        </div>

        {/* RIGHT: SPECIFICATIONS & EQUIP */}
        <div className="flex flex-col justify-between h-full max-h-[520px] overflow-hidden">
          <div className="overflow-y-auto pr-3">
            <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-2 text-black">
              {item.brand}
            </h2>
            <h3 className="text-2xl md:text-3xl text-gray-600 font-bold uppercase tracking-tight mb-6">
              {item.name}
            </h3>
            
            <div className="w-full border-t border-gray-300 pt-4 mb-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-bold text-gray-500 tracking-widest uppercase">Price</span>
                <span className="text-3xl font-black tracking-tighter text-black">₹{item.price.toLocaleString('en-IN')}</span>
              </div>
              
              <h4 className="text-sm font-bold text-gray-500 tracking-widest uppercase mb-3 border-b border-gray-200 pb-2">Technical Specifications</h4>
              
              <ul className="flex flex-col gap-2.5">
                {/* Dynamically filtering out metadata keys to show specs */}
                {Object.entries(item)
                  .filter(([key]) => !['_id', 'name', 'brand', 'price', '__v', 'imageURL', 'createdAt', 'updatedAt', 'category'].includes(key))
                  .map(([key, value]) => (
                    <li key={key} className="flex justify-between border-b border-dashed border-gray-200 pb-1.5">
                      <span className="text-xs md:text-sm text-gray-500 uppercase tracking-wider">{key.replace(/([A-Z])/g, ' $1')}</span>
                      <span className="text-xs md:text-sm font-bold uppercase text-black text-right max-w-[60%]">
                        {Array.isArray(value) ? value.join(' / ') : value}
                      </span>
                    </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 3 & 4. ACTION BUTTON WITH SELECTED STATE */}
          <div className="pt-4 shrink-0">
            {isEquipped ? (
              <button 
                disabled
                className="w-full bg-white text-gray-400 border-2 border-gray-300 py-4 text-xl md:text-2xl font-black uppercase tracking-wider cursor-default pointer-events-none"
              >
                SELECTED
              </button>
            ) : (
              <button 
                onClick={handleEquip}
                className="w-full bg-black text-white border-2 border-black py-4 text-xl md:text-2xl font-black uppercase tracking-wider hover:bg-white hover:text-black transition-colors duration-150 cursor-pointer"
              >
                ADD TO CART
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}