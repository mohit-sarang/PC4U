import React from 'react';
import { Link } from 'react-router-dom';

export default function Layout({ children, build, progress, totalPrice, totalWattage }) {
  return (
    <div className="min-h-screen w-full flex flex-col items-center pb-32 overflow-x-hidden relative bg-brutalBlack text-brutalWhite">
      
      <header className="w-full px-6 flex justify-between items-center border-b border-brutalGray sticky top-0 bg-brutalBlack z-20">
        <div className="w-1/3 flex justify-start py-6">
          <Link to="/" className="text-2xl font-bold tracking-tighter hover:text-gray-400 transition-colors">
            PC4U.
          </Link>
        </div>
        
        <div className="w-1/3 flex justify-center py-6">
          <nav className="flex items-center gap-8 px-8 py-3 border border-brutalGray rounded-full bg-brutalBlack">
            <Link to="/" className="text-micro hover:text-white text-gray-500 transition-colors uppercase">BUILD SPACE</Link>
            <button className="text-micro hover:text-white text-gray-500 transition-colors uppercase">PRE-BUILDS</button>
            <button className="text-micro hover:text-white text-gray-500 transition-colors uppercase">GUIDE</button>
          </nav>
        </div>
        
        <div className="w-1/3 flex justify-end items-center gap-6">
          <button className="text-micro text-gray-500 hover:text-white transition-colors uppercase">SEARCH</button>
          
          <div className="relative group py-6">
            <button className="text-micro text-gray-500 group-hover:text-white transition-colors uppercase h-full cursor-pointer">PROFILE</button>
            <div className="absolute right-0 top-full w-48 bg-brutalBlack border border-brutalGray opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 flex flex-col z-50">
              <button className="p-4 text-micro text-gray-500 hover:text-brutalBlack hover:bg-brutalWhite transition-colors uppercase border-b border-brutalGray text-left">SAVED BUILDS</button>
              <button className="p-4 text-micro text-gray-500 hover:text-brutalBlack hover:bg-brutalWhite transition-colors uppercase border-b border-brutalGray text-left">ORDER HISTORY</button>
              <button className="p-4 text-micro text-gray-500 hover:text-brutalBlack hover:bg-brutalWhite transition-colors uppercase border-b border-brutalGray text-left">ACCOUNT SETTINGS</button>
              <button className="p-4 text-micro text-gray-500 hover:text-brutalBlack hover:bg-brutalWhite transition-colors uppercase text-left">SIGN OUT</button>
            </div>
          </div>

          <button className="text-micro text-gray-500 hover:text-white transition-colors uppercase">CART [{Object.keys(build).length}]</button>
        </div>
      </header>

      {children}

      <div className="fixed bottom-0 left-0 w-full bg-brutalBlack border-t border-brutalGray p-6 z-40">
        <div className="max-w-5xl mx-auto flex justify-between items-center w-full">
          <div className="w-1/4 text-left">
            <span className="block text-micro text-gray-500 uppercase tracking-widest">TOTAL: ₹{totalPrice.toLocaleString('en-IN')}</span>
          </div>
          <div className="w-1/2 flex justify-center">
            <div className="h-10 w-full max-w-lg border border-brutalGray rounded-full relative overflow-hidden bg-brutalBlack flex items-center">
              <div className="absolute top-0 left-0 h-full bg-white rounded-full transition-all duration-500 ease-out" style={{ width: `${progress}%` }} />
              {progress === 0 && (
                <span className="absolute inset-0 flex items-center justify-center text-xs text-gray-500 uppercase tracking-widest z-10 pointer-events-none">SELECT COMPONENTS TO BEGIN.</span>
              )}
            </div>
          </div>
          <div className="w-1/4 text-right">
            <span className="block text-micro text-gray-500 uppercase tracking-widest">EST. WATTAGE: {totalWattage}W</span>
          </div>
        </div>
      </div>
    </div>
  );
}