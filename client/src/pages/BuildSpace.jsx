import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BUILD_SLOTS } from '../data/constants';

export default function BuildSpace({ build }) {
  const userName = "Mohit";
  const navigate = useNavigate();

  return (
    <main className="w-full max-w-5xl mt-16 px-6 flex-grow">
      <div className="mb-8 border-b border-brutalGray pb-12 flex flex-col w-full">
        <div className="flex flex-col mb-4">
          <h2 className="text-5xl font-bold tracking-tighter">
            <span className="uppercase">{userName}!</span> 
            <span className="font-light"> Let's Build a PC4U </span> 
          </h2>
        </div>
      </div>

      <div className="flex flex-col w-full">
        {BUILD_SLOTS.map((slot) => (
          <React.Fragment key={slot.id}>
            {slot.phase && (
              <div className="w-full pt-8 pb-2">
                <span className="text-micro text-gray-500 tracking-widest uppercase">{slot.phase}</span>
              </div>
            )}
            <button 
              onClick={() => navigate(`/select/${slot.id}`)} 
              className={`group flex flex-col md:flex-row justify-between items-start md:items-center p-6 border-brutalGray transition-all duration-150 hover:bg-brutalWhite hover:text-brutalBlack text-left w-full cursor-pointer ${slot.phase ? 'border-y' : 'border-b'}`}
            >
              <div className="flex flex-col justify-center">
                <span className="text-3xl font-bold tracking-tight uppercase">{slot.name}</span>
                {build[slot.id] && (
                  <span className="text-micro text-gray-500 mt-1 group-hover:text-brutalBlack transition-colors uppercase">
                    SELECTED: {build[slot.id].name}
                  </span>
                )}
              </div>
              <div className="mt-4 md:mt-0 text-right flex items-center gap-4">
                <span className="block text-4xl font-light text-gray-500 group-hover:text-brutalBlack transition-colors">
                  {build[slot.id] ? '✓' : '+'}
                </span>
              </div>
            </button>
          </React.Fragment>
        ))}
      </div>
    </main>
  );
}