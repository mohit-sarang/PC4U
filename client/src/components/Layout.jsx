import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Layout({ children, build, progress, totalPrice, totalWattage, isFilterOpen }) {
  const location = useLocation();
  const navigate = useNavigate();
  const isPDP = location.pathname.startsWith('/product') || location.pathname.startsWith('/details');
  const isCart = location.pathname === '/cart' || location.pathname === '/summary' || location.pathname === '/checkout';

  const handleProceedToCart = () => {
    const selectedItems = Object.values(build).filter(item => item !== null && item !== undefined);
    try {
      localStorage.setItem('pc4u_cart', JSON.stringify(selectedItems));
      localStorage.setItem('pc4u_build', JSON.stringify(build));
    } catch (e) {
      console.error("Failed to save cart to localStorage", e);
    }
    navigate('/cart');
  };

  return (
    <div className={`w-full flex flex-col items-center overflow-x-hidden relative bg-white text-black ${isPDP ? 'h-screen overflow-hidden' : isCart ? 'min-h-screen pb-12' : 'min-h-screen pb-32'}`}>

      {/* Header */}
      <header className="w-full px-8 py-4 flex justify-between items-center border-b border-black sticky top-0 bg-white z-20">
        <div className="w-1/4 flex justify-start">
          <Link to="/" className="text-2xl md:text-3xl font-black tracking-tighter hover:opacity-60 transition-opacity uppercase">
            PC4U.
          </Link>
        </div>

        <div className="w-2/4 flex justify-center">
          <nav className="flex items-center gap-6 md:gap-8">
            <Link to="/" className="text-xs font-semibold tracking-wider text-black hover:opacity-50 transition-opacity uppercase">BUILD SPACE</Link>
            <button className="text-xs font-semibold tracking-wider text-black hover:opacity-50 transition-opacity uppercase">PRE-BUILTS</button>
            <Link to="/summary" className="text-xs font-semibold tracking-wider text-black hover:opacity-50 transition-opacity uppercase">REVIEW PC</Link>
          </nav>
        </div>

        <div className="w-1/4 flex justify-end items-center gap-6 md:gap-8">
          <div className="relative group py-2">
            <button className="text-xs font-semibold tracking-wider text-black group-hover:opacity-50 transition-opacity uppercase h-full cursor-pointer">PROFILE</button>

            {/* Profile Dropdown */}
            <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-black opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-out flex flex-col z-50">
              <button className="p-3 text-xs font-bold text-black hover:text-white hover:bg-black uppercase border-b border-black text-left transition-colors">SAVED BUILDS</button>
              <button className="p-3 text-xs font-bold text-black hover:text-white hover:bg-black uppercase border-b border-black text-left transition-colors">ORDER HISTORY</button>
              <button className="p-3 text-xs font-bold text-black hover:text-white hover:bg-black uppercase border-b border-black text-left transition-colors">ACCOUNT SETTINGS</button>
              <button className="p-3 text-xs font-bold text-black hover:text-white hover:bg-black uppercase text-left transition-colors">SIGN OUT</button>
            </div>
          </div>

          <button 
            onClick={() => navigate('/cart')} 
            className="text-xs font-semibold tracking-wider text-black hover:opacity-50 transition-opacity uppercase cursor-pointer"
          >
            CART [{Object.keys(build).length}]
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      {children}

      {/* Bottom Bar */}
      {!isFilterOpen && !isCart && (
        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-black py-4 px-8 md:px-12 z-40">
          <div className="max-w-6xl mx-auto flex justify-between items-center w-full">
            <div className="w-1/4 text-left">
              <span className="text-xs font-normal tracking-wide text-black uppercase">TOTAL: ₹{totalPrice.toLocaleString('en-IN')}</span>
            </div>
            <div className="w-1/2 flex justify-center">
              {progress === 100 ? (
                <button 
                  onClick={handleProceedToCart}
                  className="h-12 w-full max-w-xl border-2 border-black bg-black text-white text-xs font-black uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-colors duration-200 cursor-pointer"
                >
                  PROCEED TO CART
                </button>
              ) : (
                <div className="relative h-12 w-full max-w-xl border-2 border-black bg-white flex items-center justify-center overflow-hidden">
                  {/* The Black Fill */}
                  <div 
                    className="absolute top-0 left-0 h-full bg-black transition-all duration-500 ease-out" 
                    style={{ width: `${progress}%` }} 
                  />
                  
                  {/* The Blended Text */}
                  <span className="relative z-10 text-white mix-blend-difference text-xs font-black uppercase tracking-[0.2em] pointer-events-none">
                    PROGRESS {progress}%
                  </span>
                </div>
              )}
            </div>
            <div className="w-1/4 text-right">
              <span className="text-xs font-normal tracking-wide text-black uppercase">EST. WATTAGE: {totalWattage} W</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}