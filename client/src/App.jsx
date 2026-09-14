import React from 'react';

function App() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center">
      
      {/* Brutalist Header */}
      <header className="w-full p-6 flex justify-between items-center fixed top-0 left-0 border-b border-brutalGray">
        <h1 className="text-2xl font-bold tracking-tighter">PC4U.</h1>
        <span className="text-micro text-gray-500">SYSTEM OFFLINE // UI ONLINE</span>
      </header>

      {/* Main Canvas Area */}
      <main className="mt-32 text-center">
        <h2 className="text-4xl tracking-tight mb-4 uppercase">The Canvas is Ready.</h2>
        <p className="text-micro text-gray-400">Tailwind is injected and manual override successful.</p>
      </main>

    </div>
  );
}

export default App;