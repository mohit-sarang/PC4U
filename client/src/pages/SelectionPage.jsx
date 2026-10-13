import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BUILD_SLOTS } from '../data/constants.jsx';

export default function SelectionPage({ setBuild, isFilterOpen, setIsFilterOpen }) {
  const { category } = useParams();
  const navigate = useNavigate();

  // State variables to handle the network request and UI
  const [components, setComponents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('asc');
  const [localFilterOpen, setLocalFilterOpen] = useState(false);
  const isOpen = isFilterOpen !== undefined ? isFilterOpen : localFilterOpen;
  const setIsOpen = setIsFilterOpen || setLocalFilterOpen;
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [maxPrice, setMaxPrice] = useState(200000);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

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
    const matchesSearch = !searchQuery ||
      (item.name && item.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.brand && item.brand.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesBrand && matchesPrice && matchesSearch;
  });

  const sortedComponents = [...filteredComponents].sort((a, b) => {
    return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
  });

  return (
    <main className="w-full flex-grow px-8 lg:px-12 mt-8 relative">

      {/* DIRECTORY BREADCRUMB & CONTROLS STRIP */}
      <div className="w-full flex flex-col md:flex-row justify-between items-center mb-8 border-b border-gray-300 pb-4 gap-4">

        {/* Left Side: Heavy Bold Breadcrumb */}
        <div className="flex items-center gap-3 uppercase tracking-tighter">
          <button
            onClick={() => navigate('/')}
            className="text-xl md:text-2xl font-bold text-gray-500 hover:text-black transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            BUILD SPACE
          </button>

          <span className="text-xl md:text-2xl text-gray-400 font-light">/</span>

          <h1 className="text-xl md:text-2xl font-bold text-black leading-none mt-[2px]">
            {slotInfo?.name || category}
          </h1>
        </div>

        {/* Right Side: Centered Typography Controls */}
        <div className="flex items-center gap-4 shrink-0">
          {/* SEARCH Button / Expanding Input */}
          {isSearchOpen ? (
            <div className="flex items-center border border-black bg-white transition-all duration-150">
              <input
                type="text"
                autoFocus
                placeholder="SEARCH..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-3 py-2 text-xs font-bold uppercase bg-white text-black outline-none w-36 md:w-48 placeholder-gray-400"
              />
              <button
                onClick={() => {
                  setSearchQuery('');
                  setIsSearchOpen(false);
                }}
                className="px-2.5 py-2 text-xs font-bold text-gray-500 hover:text-black hover:bg-neutral-100 cursor-pointer"
                title="Close search"
              >
                ✕
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsSearchOpen(true)}
              className="text-xs font-bold uppercase flex items-center gap-2 px-3 py-2 cursor-pointer bg-white text-black border border-gray-300 hover:bg-black hover:text-white hover:border-black transition-colors duration-150"
            >
              <span>SEARCH</span>
              {searchQuery && (
                <span className="w-2 h-2 rounded-full bg-current"></span>
              )}
            </button>
          )}

          <button
            onClick={() => setIsOpen(true)}
            className="text-xs font-bold uppercase flex items-center gap-2 px-3 py-2 cursor-pointer bg-white text-black border border-gray-300 hover:bg-black hover:text-white hover:border-black transition-colors duration-150"
          >
            <span>FILTER</span>
            {selectedBrands.length > 0 && (
              <span className="w-2 h-2 rounded-full bg-current"></span>
            )}
          </button>

          <button
            onClick={toggleSort}
            className="text-xs font-bold uppercase flex items-center gap-2 px-3 py-2 cursor-pointer bg-white text-black border border-gray-300 hover:bg-black hover:text-white hover:border-black transition-colors duration-150"
          >
            <span>SORT : PRICE</span>
            <span className="text-[10px] transform -translate-y-[1px]">
              {sortOrder === 'asc' ? '▼' : '▲'}
            </span>
          </button>
        </div>

      </div>

      {isLoading ? (
        <div className="w-full flex justify-center mt-32">
          <span className="text-xs text-gray-500 uppercase tracking-widest animate-pulse">
            [ ESTABLISHING UPLINK TO DATABASE... ]
          </span>
        </div>
      ) : (
        /* TIGHTER GRID SPACING */
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-x-6 gap-y-10">

          {sortedComponents.length > 0 ? sortedComponents.map((item) => (
            <div
              key={item._id}
              onClick={() => handleSelect(item)}
              className="relative flex flex-col justify-between border border-gray-300 bg-white transition-all duration-75 ease-in group hover:border-2 hover:border-black cursor-pointer p-4 hover:p-[15px]"
            >
              {/* 1. Top-Left Brand Tag */}
              <span className="absolute top-0 left-0 bg-black text-white text-[10px] font-black px-2 py-1 uppercase tracking-[0.2em] z-10">
                {item.brand}
              </span>

              {/* 4:3 IMAGE BOX */}
              <div className="aspect-[4/3] w-full flex items-center justify-center relative overflow-hidden bg-white p-2">
                {item.imageURL ? (
                  <img
                    src={item.imageURL}
                    alt={item.name}
                    className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <span className="text-xs text-gray-400 group-hover:text-black transition-colors uppercase text-center font-bold">
                    TRANSPARENT_RENDER.PNG<br />
                    <span className="text-[10px]">[ DATA MISSING ]</span>
                  </span>
                )}
              </div>

              {/* 3. Typography Alignment (Bottom Row without internal dividing line) */}
              <div className="flex justify-between items-end mt-4 w-full">
                <span className="text-sm font-black uppercase tracking-tight max-w-[60%]" title={item.name}>
                  {item.name}
                </span>
                <span className="text-lg font-black shrink-0">
                  ₹{item.price.toLocaleString('en-IN')}
                </span>
              </div>

            </div>
          )) : (
            <div className="col-span-full text-center text-gray-500 uppercase mt-32 tracking-widest text-sm font-bold">
              NO {category.toUpperCase()} COMPONENTS MATCH YOUR ACTIVE PARAMETERS.
            </div>
          )}
        </div>
      )}

      {/* ========================================= */}
      {/*       FILTER SIDEBAR (LIGHT MODE)         */}
      {/* ========================================= */}

      {/* BACKDROP OVERLAY */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
      />

      {/* SLIDING FILTER DRAWER (LIGHT MODE) */}
      <aside
        className={`fixed top-0 right-0 h-full w-80 sm:w-96 bg-white text-black border-l border-gray-300 z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* HEADER */}
        <div className="p-6 border-b border-gray-300 flex justify-between items-center">
          <span className="text-xl tracking-widest uppercase font-black text-black">
            FILTERS
          </span>
          <button
            onClick={() => setIsOpen(false)}
            className="text-xl font-black text-black hover:text-gray-500 transition-colors p-1 cursor-pointer leading-none"
            title="Close Filters"
          >
            ✕
          </button>
        </div>

        {/* FILTER CONTROLS */}
        <div className="flex-1 p-6 overflow-y-auto space-y-8">

          {/* BRAND FILTER */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest">BRAND</h3>
              {selectedBrands.length > 0 && (
                <button
                  onClick={() => setSelectedBrands([])}
                  className="text-[10px] text-gray-500 hover:text-black underline cursor-pointer uppercase transition-colors"
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
                          className="peer appearance-none w-4 h-4 border border-gray-400 checked:bg-black checked:border-black transition-colors cursor-pointer"
                        />
                        <svg className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <span className="text-xs font-bold text-gray-700 group-hover:text-black transition-colors uppercase tracking-wider">
                        {brand}
                      </span>
                    </label>
                  );
                })
              ) : (
                <span className="text-xs text-gray-400 uppercase font-bold">NO BRANDS DETECTED</span>
              )}
            </div>
          </div>

          {/* BUDGET FILTER */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest">MAX PRICE</h3>
              <span className="text-sm font-black text-black">₹{maxPrice.toLocaleString('en-IN')}</span>
            </div>

            <input
              type="range"
              min="0"
              max="200000"
              step="2500"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-black h-1 bg-gray-200 appearance-none cursor-pointer"
            />

            <div className="flex justify-between text-xs text-gray-400 font-bold mt-2">
              <span>₹0</span>
              <span>₹200,000</span>
            </div>
          </div>

        </div>

        {/* FOOTER ACTIONS */}
        <div className="p-6 border-t border-gray-300 space-y-3 bg-white">
          <button
            onClick={() => setIsOpen(false)}
            className="w-full py-3.5 text-xs tracking-widest uppercase transition-all duration-200 bg-black text-white font-black hover:bg-gray-800 cursor-pointer"
          >
            APPLY FILTERS ({filteredComponents.length})
          </button>

          <button
            onClick={resetFilters}
            className="w-full py-2.5 text-xs tracking-widest uppercase transition-all duration-200 bg-white text-gray-500 font-bold hover:text-black border border-gray-300 hover:border-black cursor-pointer"
          >
            CLEAR FILTERS
          </button>
        </div>

      </aside>
    </main>
  );
}