import React from 'react';
import { Link } from 'react-router-dom';

export default function Layout({ children, build, progress, totalPrice, totalWattage }) {
  return (
    <div className="min-h-screen w-full flex flex-col items-center pb-32 overflow-x-hidden relative bg-white text-black">
      
      {/* CHANGED: Header to bg-white, thickened bottom border to black */}
      <header className="w-full px-6 flex justify-between items-center border-b-2 border-black sticky top-0 bg-white z-20">
        <div className="w-1/3 flex justify-start py-6">
          <Link to="/" className="text-3xl font-black tracking-tighter hover:opacity-50 transition-none uppercase">
            PC4U.
          </Link>
        </div>
        
        <div className="w-1/3 flex justify-center py-6">
          {/* CHANGED: Removed rounded-full, border-2 border-black, snappy hover states */}
          <nav className="flex items-center gap-8 px-8 py-3 border-2 border-black bg-white">
            <Link to="/" className="text-xs font-bold hover:text-black text-gray-500 transition-none uppercase tracking-widest">BUILD SPACE</Link>
            <button className="text-xs font-bold hover:text-black text-gray-500 transition-none uppercase tracking-widest">PRE-BUILDS</button>
            <button className="text-xs font-bold hover:text-black text-gray-500 transition-none uppercase tracking-widest">GUIDE</button>
          </nav>
        </div>
        
        <div className="w-1/3 flex justify-end items-center gap-6">
          <button className="text-xs font-bold text-gray-500 hover:text-black transition-none uppercase tracking-widest">SEARCH</button>
          
          <div className="relative group py-6">
            <button className="text-xs font-bold text-gray-500 group-hover:text-black transition-none uppercase tracking-widest h-full cursor-pointer">PROFILE</button>
            
            {/* CHANGED: Dropdown is stark white with black borders, hovers invert to black */}
            <div className="absolute right-0 top-full w-48 bg-white border-2 border-black opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-none flex flex-col z-50">
              <button className="p-4 text-xs font-bold text-black hover:text-white hover:bg-black transition-none uppercase border-b border-black text-left">SAVED BUILDS</button>
              <button className="p-4 text-xs font-bold text-black hover:text-white hover:bg-black transition-none uppercase border-b border-black text-left">ORDER HISTORY</button>
              <button className="p-4 text-xs font-bold text-black hover:text-white hover:bg-black transition-none uppercase border-b border-black text-left">ACCOUNT SETTINGS</button>
              <button className="p-4 text-xs font-bold text-black hover:text-white hover:bg-black transition-none uppercase text-left">SIGN OUT</button>
            </div>
          </div>

          <button className="text-xs font-bold text-gray-500 hover:text-black transition-none uppercase tracking-widest">CART [{Object.keys(build).length}]</button>
        </div>
      </header>

      {/* Main Content Area */}
      {children}

      {/* CHANGED: Bottom bar to bg-white, thick top border */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t-2 border-black p-6 z-40">
        <div className="max-w-5xl mx-auto flex justify-between items-center w-full">
          <div className="w-1/4 text-left">
            <span className="block text-xs font-black text-black uppercase tracking-widest">TOTAL: ₹{totalPrice.toLocaleString('en-IN')}</span>
          </div>
          <div className="w-1/2 flex justify-center">
            
            {/* CHANGED: Removed rounded-full, made it a sharp rectangle with black fill */}
            <div className="h-10 w-full max-w-lg border-2 border-black relative overflow-hidden bg-white flex items-center">
              <div className="absolute top-0 left-0 h-full bg-black transition-all duration-500 ease-out" style={{ width: `${progress}%` }} />
              
              {progress === 0 && (
                <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-black uppercase tracking-widest z-10 pointer-events-none">
                  SELECT COMPONENTS TO BEGIN.
                </span>
              )}
            </div>

          </div>
          <div className="w-1/4 text-right">
            <span className="block text-xs font-black text-black uppercase tracking-widest">EST. WATTAGE: {totalWattage}W</span>
          </div>
        </div>
      </div>
    </div>
  );
}