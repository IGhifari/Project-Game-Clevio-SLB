import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HalamanAwal from './components/halamanAwal';
import HalamanLevel from './components/halamanLevel';
import RumahMain from './components/rumahMain';
import SekolahMain from './components/sekolahMain';
import Ruangtamu from './components/ruangtamu';
import KamarMandiRumah from './components/kamarMandiRumah';
import PerpustakaanSekolah from './components/perpustakaanSekolah';
import LapanganSekolah from './components/lapanganSekolah';
import Reward from './components/reward/reward';
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HalamanAwal />} />
        <Route path="/halamanlevel" element={<HalamanLevel />} />
        <Route path="/rumahmain" element={<RumahMain />} />
        <Route path="/sekolahmain" element={<SekolahMain />} />
        <Route path="/ruangtamu" element={<Ruangtamu />} />
        <Route path="/kamarMandiRumah" element={<KamarMandiRumah />} />
        <Route path="/perpustakaanSekolah" element={<PerpustakaanSekolah />} />
        <Route path="/lapanganSekolah" element={<LapanganSekolah />} />
        <Route path="/reward" element={<Reward />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App