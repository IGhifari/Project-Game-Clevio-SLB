import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HalamanAwal from './components/halamanAwal';
import HalamanLevel from './components/halamanLevel';
import RumahMain from './components/rumahMain';
import SekolahMain from './components/sekolahMain';
<<<<<<< HEAD

import Ruangtamu from './components/ruangtamu';
import KamarMandiRumah from './components/kamarMandiRumah';

=======
import KamarMandiRumah from './components/kamarMandiRumah';
import Ruangtamu from './components/ruangtamu';
>>>>>>> 182b4463da79c91ebbcf98f60fe496d0fa1a8ab6
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HalamanAwal />} />
        <Route path="/halamanlevel" element={<HalamanLevel />} />
        <Route path="/rumahmain" element={<RumahMain />} />
        <Route path="/sekolahmain" element={<SekolahMain />} />
<<<<<<< HEAD

        <Route path="/ruangtamu" element={<Ruangtamu />} />

        <Route path="/kamarMandiRumah" element={<KamarMandiRumah />} />
-
=======
        <Route path="/kamarMandiRumah" element={<KamarMandiRumah />} />
        <Route path="/ruangtamu" element={<Ruangtamu />} />
>>>>>>> 182b4463da79c91ebbcf98f60fe496d0fa1a8ab6
        {/* Add more routes as needed */}
      </Routes>
    </BrowserRouter>
  )
}

export default App