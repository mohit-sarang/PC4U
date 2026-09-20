import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// 1. Data Import
import { BUILD_SLOTS } from './data/constants.jsx';

// 2. Component Imports
import Layout from './components/Layout.jsx';
import BuildSpace from './pages/BuildSpace.jsx';
import SelectionPage from './pages/SelectionPage.jsx';

import ProductDetailsPage from './pages/ProductDetailsPage';

export default function App() {
  const [build, setBuild] = useState({});
  
  const progress = Math.round((Object.keys(build).length / BUILD_SLOTS.length) * 100);
  const totalPrice = Object.values(build).reduce((sum, item) => sum + (item.price || 0), 0);
  const totalWattage = Object.values(build).reduce((sum, item) => sum + (item.wattage || item.tdp || 0), 0);

  return (
    <BrowserRouter>
      <Layout build={build} progress={progress} totalPrice={totalPrice} totalWattage={totalWattage}>
        <Routes>
          <Route path="/" element={<BuildSpace build={build} />} />
          <Route path="/select/:category" element={<SelectionPage setBuild={setBuild} />} />
          <Route path="/details/:category/:id" element={<ProductDetailsPage setBuild={setBuild} />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}