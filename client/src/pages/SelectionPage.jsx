import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BUILD_SLOTS } from '../data/constants.jsx';

export default function SelectionPage({ setBuild }) {
  const { category } = useParams(); 
  const navigate = useNavigate();
  
  // State variables to handle the network request and UI
  const [components, setComponents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('asc');
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [maxPrice, setMaxPrice] = useState(200000);

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

  // Toggle function for the sort button
  const toggleSort = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  // Toggle individual brand selection
  const handleBrandToggle = (brand) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  // Reset active filters
  const resetFilters = () => {
    setSelectedBrands([]);
    setMaxPrice(200000);
  };

  // Extract unique brands present in current category
  const availableBrands = [...new Set(components.map(c => c.brand).filter(Boolean))];

  // Filter and sort pipeline
  const filteredComponents = components.filter(item => {
    const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(item.brand);
    const matchesPrice = item.price <= maxPrice;
    return matchesBrand && matchesPrice;
  });

  const sortedComponents = [...filteredComponents].sort((a, b) => {
    return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
  });

  return (
    <main className="w-full flex-grow px-8 lg:px-12 mt-8 relative">
      
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
          <button 
            onClick={() => setIsTerminalOpen(true)}
            className="text-sm text-gray-500 hover:text-white transition-colors cursor-pointer uppercase flex items-center gap-2"
          >
            <span>FILTER</span>
            {selectedBrands.length > 0 && (
              <span className="w-2 h-2 rounded-full bg-white"></span>
            )}
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
          <span className="text-micro text-gray-500 uppercase tracking-widest animate-pulse font-mono">
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
                  <span className="text-xs text-gray-300 group-hover:text-black transition-colors uppercase text-center font-bold font-mono">
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
            <div className="col-span-full text-center text-gray-500 uppercase mt-32 tracking-widest font-mono text-sm">
              NO {category.toUpperCase()} COMPONENTS MATCH YOUR ACTIVE PARAMETERS.
            </div>
          )}
        </div>
      )}

      {/* ========================================= */}
      {/*       SIDE TERMINAL (OFF-CANVAS)          */}
      {/* ========================================= */}
      
      {/* BACKDROP OVERLAY */}
      <div 
        className={`fixed inset-0 bg-black/70 z-40 transition-opacity duration-300 ${isTerminalOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsTerminalOpen(false)}
      />

      {/* SLIDING TERMINAL DRAWER */}
      <aside 
        className={`fixed top-0 right-0 h-full w-80 sm:w-96 bg-black border-l border-brutalGray z-50 transform transition-transform duration-300 ease-in-out font-mono flex flex-col ${isTerminalOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* TERMINAL HEADER */}
        <div className="p-6 border-b border-brutalGray flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 animate-pulse"></span>
            <span className="text-white text-xL tracking-widest uppercase font-bold">
              FILTERS
            </span>
          </div>
          <button 
            onClick={() => setIsTerminalOpen(false)} 
            className="text-gray-500 hover:text-white transition-colors text-sm font-bold tracking-wider"
          >
            [ESC]
          </button>
        </div>

        {/* FILTER CONTROLS */}
        <div className="flex-1 p-6 overflow-y-auto space-y-8">
          
          {/* DYNAMIC BRAND FILTER */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xs text-gray-500 uppercase tracking-widest">Target_Manufacturer</h3>
              {selectedBrands.length > 0 && (
                <button 
                  onClick={() => setSelectedBrands([])}
                  className="text-[10px] text-gray-400 hover:text-white underline cursor-pointer uppercase"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="space-y-3">
              {availableBrands.length > 0 ? (
                availableBrands.map((brand) => {
                  const isChecked = selectedBrands.includes(brand);
                  return (
                    <label key={brand} className="flex items-center space-x-3 cursor-pointer group">
                      <div className="relative flex items-center justify-center">
                        <input 
                          type="checkbox" 
                          checked={isChecked}
                          onChange={() => handleBrandToggle(brand)}
                          className="peer appearance-none w-4 h-4 border border-gray-600 checked:bg-white checked:border-white transition-colors cursor-pointer"
                        />
                        <svg className="absolute w-3 h-3 text-black opacity-0 peer-checked:opacity-100 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <span className="text-xs text-gray-400 group-hover:text-white transition-colors uppercase tracking-wider">
                        {brand}
                      </span>
                    </label>
                  );
                })
              ) : (
                <span className="text-xs text-gray-600 uppercase">NO BRANDS DETECTED</span>
              )}
            </div>
          </div>

          {/* BUDGET FILTER */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xs text-gray-500 uppercase tracking-widest">Max_Ceiling</h3>
              <span className="text-xs text-white">₹{maxPrice.toLocaleString('en-IN')}</span>
            </div>
            
            <input 
              type="range" 
              min="0"
              max="200000"
              step="2500"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-white h-1 bg-gray-800 appearance-none cursor-pointer"
            />
            
            <div className="flex justify-between text-[10px] text-gray-600 mt-2">
              <span>₹0</span>
              <span>₹200,000</span>
            </div>
          </div>

        </div>

        {/* TERMINAL FOOTER ACTIONS */}
        <div className="p-6 border-t border-brutalGray space-y-3 bg-black">
          <button 
            onClick={() => setIsTerminalOpen(false)}
            className="w-full bg-white text-black py-3 text-xs font-bold tracking-widest uppercase hover:bg-gray-200 transition-colors cursor-pointer"
          >
            APPLY_FILTERS ({filteredComponents.length})
          </button>
          
          <button 
            onClick={resetFilters}
            className="w-full border border-gray-800 text-gray-500 py-2 text-[10px] tracking-widest uppercase hover:text-white hover:border-gray-600 transition-colors cursor-pointer"
          >
            RESET_DEFAULTS
          </button>
        </div>
        
      </aside>
    </main>
  );
}