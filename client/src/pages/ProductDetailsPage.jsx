import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { BUILD_SLOTS } from '../data/constants.jsx';

export default function ProductDetailsPage({ setBuild }) {
  const { category } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  // We grab the exact hardware item that was passed from the SelectionPage
  const item = location.state?.item;
  const slotInfo = BUILD_SLOTS.find(s => s.id === category);

  // If someone refreshes the page and loses the memory state, send them back
  if (!item) {
    navigate(`/select/${category}`);
    return null;
  }

  // The actual equip function
  const handleEquip = () => {
    setBuild(prev => ({ ...prev, [category]: item }));
    navigate('/');
  };

  return (
    <main className="w-full max-w-7xl mx-auto flex-grow px-4 mt-6">
      
    {/* 3-LEVEL UNIFORM BREADCRUMB */}
      <div className="w-full flex items-center mb-12 px-2 border-b border-brutalGray pb-6 gap-3 uppercase tracking-tighter overflow-hidden">
        <button 
          onClick={() => navigate('/')} 
          className="text-xl md:text-2xl font-bold text-gray-500 hover:text-brutalWhite transition-colors cursor-pointer shrink-0"
        >
          BUILD SPACE
        </button>
        
        <span className="text-xl md:text-2xl text-gray-700 font-light">/</span>
        
        <button 
          onClick={() => navigate(`/select/${category}`)} 
          className="text-xl md:text-2xl font-bold text-gray-500 hover:text-brutalWhite transition-colors cursor-pointer shrink-0"
        >
          {slotInfo?.name || category}
        </button>
        
        <span className="text-xl md:text-2xl text-gray-700 font-light">/</span>
        
        <h1 className="text-xl md:text-2xl font-bold text-brutalWhite truncate" title={item.name}>
          {item.name}
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* LEFT: MASSIVE IMAGE PLACEHOLDER */}
        <div className="aspect-square w-full border border-dashed border-brutalGray flex items-center justify-center p-8">
           <span className="text-sm text-gray-700 uppercase tracking-widest text-center">
             HIGH_RES_RENDER_<br/>{item._id}.PNG
           </span>
        </div>

        {/* RIGHT: SPECIFICATIONS & TERMINAL EQUIP */}
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-6xl font-black uppercase tracking-tighter leading-none mb-2">{item.brand}</h2>
            <h3 className="text-3xl text-gray-400 font-bold uppercase tracking-tight mb-8">{item.name}</h3>
            
            <div className="w-full border-t border-brutalGray pt-6 mb-8">
              <div className="flex justify-between items-center mb-6">
                <span className="text-sm font-bold text-gray-500 tracking-widest uppercase">Price</span>
                <span className="text-2xl font-bold tracking-tighter">₹{item.price.toLocaleString('en-IN')}</span>
              </div>
              
              <h4 className="text-sm font-bold text-gray-500 tracking-widest uppercase mb-4 border-b border-brutalGray pb-2">Technical Specifications</h4>
              
              <ul className="flex flex-col gap-3">
                {/* Dynamically filtering out React/MongoDB keys to just show specs */}
                {Object.entries(item)
                  .filter(([key]) => !['_id', 'name', 'brand', 'price', '__v', 'imageURL', 'createdAt', 'updatedAt', 'category'].includes(key))
                  .map(([key, value]) => (
                    <li key={key} className="flex justify-between border-b border-dashed border-gray-800 pb-2">
                      <span className="text-sm text-gray-400 uppercase tracking-wider">{key.replace(/([A-Z])/g, ' $1')}</span>
                      <span className="text-sm font-bold uppercase">{value}</span>
                    </li>
                ))}
              </ul>
            </div>
          </div>

          <button 
            onClick={handleEquip}
            className="w-full bg-brutalWhite text-black font-black text-2xl uppercase tracking-tighter py-6 hover:bg-gray-300 transition-colors"
          >
            [ INITIALIZE & EQUIP COMPONENT ]
          </button>
        </div>
      </div>
    </main>
  );
}