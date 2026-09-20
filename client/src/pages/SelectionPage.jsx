import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BUILD_SLOTS } from '../data/constants.jsx';

export default function SelectionPage({ setBuild }) {
  const { category } = useParams(); 
  const navigate = useNavigate();
  
  // State variables to handle the network request
  const [components, setComponents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('asc');
  const slotInfo = BUILD_SLOTS.find(s => s.id === category);

  // The actual bridge to your backend
  useEffect(() => {
    setIsLoading(true);
    
    fetch(`http://localhost:5000/api/hardware/${category}`)
      .then(res => res.json())
      .then(data => {
        setComponents(data); 
        setIsLoading(false); 
      })
      .catch(err => {
        console.error("Failed to fetch hardware:", err);
        setIsLoading(false);
      });
  }, [category]); 

  const handleSelect = (item) => {
    // Teleport to the details page and pass the item data
    navigate(`/details/${category}/${item._id}`, { state: { item } }); 
  };

  // Toggle function for the button
  const toggleSort = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  // Create a sorted copy of the components array before rendering
  const sortedComponents = [...components].sort((a, b) => {
    return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
  });

  return (
    <main className="w-full flex-grow px-8 lg:px-12 mt-8">
      
      {/* DIRECTORY BREADCRUMB & CONTROLS STRIP */}
      <div className="w-full flex flex-col md:flex-row justify-between items-center mb-8 border-b border-brutalGray pb-4 gap-4">
        
        {/* Left Side: Heavy Bold Breadcrumb */}
        <div className="flex items-center gap-3 uppercase tracking-tighter">
          <button 
            onClick={() => navigate('/')} 
            className="text-xl md:text-2xl font-bold text-gray-500 hover:text-brutalWhite transition-colors cursor-pointer"
          >
            BUILD SPACE
          </button>
          
          <span className="text-xl md:text-2xl text-gray-700 font-light">/</span>
          
          <h1 className="text-xl md:text-2xl font-bold text-brutalWhite leading-none mt-[2px]">
            {slotInfo?.name || category}
          </h1>
        </div>

        {/* Right Side: Centered Typography Controls */}
        <div className="flex items-center gap-6 shrink-0">
          <button className="text-sm text-gray-500 hover:text-white transition-colors cursor-pointer uppercase">
            FILTER
          </button>
          
          <button 
            onClick={toggleSort}
            className="text-sm text-gray-500 hover:text-white transition-colors cursor-pointer uppercase flex items-center gap-2"
          >
            <span>SORT : PRICE</span>
            <span className="text-[10px] transform -translate-y-[1px]">
              {sortOrder === 'asc' ? '▲' : '▼'}
            </span>
          </button>
        </div>

      </div>
      
      {isLoading ? (
        <div className="w-full flex justify-center mt-32">
          <span className="text-micro text-gray-500 uppercase tracking-widest animate-pulse">
            [ ESTABLISHING UPLINK TO DATABASE... ]
          </span>
        </div>
      ) : (
        /* TIGHTER GRID SPACING */
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-x-6 gap-y-10">
          
          {sortedComponents.length > 0 ? sortedComponents.map((item) => (
            <div key={item._id} onClick={() => handleSelect(item)} className="flex flex-col group cursor-pointer">
               
{/* 4:3 IMAGE BOX (SOLID WHITE, NO BORDER, FULL COLOR) */}
              <div className="aspect-[4/3] w-full flex items-center justify-center relative overflow-hidden bg-white p-4">
                {item.imageURL ? (
                  <img 
                    src={item.imageURL} 
                    alt={item.name} 
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <span className="text-xs text-gray-300 group-hover:text-black transition-colors uppercase text-center font-bold">
                    TRANSPARENT_RENDER.PNG<br/>
                    <span className="text-[10px]">[ DATA MISSING ]</span>
                  </span>
                )}
              </div>
              
              {/* JUSTIFIED NAME & PRICE ROW */}
              <div className="flex justify-between items-baseline w-full gap-3 px-1 mt-4">
                <span className="text-sm font-medium uppercase truncate" title={item.name}>
                  {item.name}
                </span>
                <span className="text-sm text-gray-500 shrink-0">
                  ₹{item.price.toLocaleString('en-IN')}
                </span>
              </div>
              
            </div>
          )) : (
            <div className="col-span-full text-center text-gray-500 uppercase mt-32 tracking-widest">
              NO {category.toUpperCase()} COMPONENTS FOUND IN SERVER DATABANKS.
            </div>
          )}
        </div>
      )}
    </main>
  );
}