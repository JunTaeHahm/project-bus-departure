import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import BusPage from '@pages/BusPage';
import Home from '@pages/Home';

const App = () => {
  return (
    <div id='app'>
      <Routes>
        <Route index element={<Home />} />
        <Route path='/*' element={<Navigate to='/' />} />
        <Route path='/:bus' element={<BusPage />} />
      </Routes>
    </div>
  );
};

export default App;
//prtest
