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
import Reward from './components/reward/rewardRumah'
import HalamanLevelPekerjaan from './components/tebakPekerjaan/halamanLevelPekerjaan';
import RewardSekolah from './components/reward/rewardSekolah';
import Level1 from './components/tebakPekerjaan/levelPekerjaan/level1';
import Level2 from './components/tebakPekerjaan/levelPekerjaan/level2';
import Level3 from './components/tebakPekerjaan/levelPekerjaan/level3';
import Level4 from './components/tebakPekerjaan/levelPekerjaan/level4';
import Level5 from './components/tebakPekerjaan/levelPekerjaan/level5';
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
        <Route path='/rewardSekolah' element={<RewardSekolah/>}></Route>
        <Route path="/halamanLevelPekerjaan" element={<HalamanLevelPekerjaan />} /> 
        <Route path="/level1" element={<Level1 />} />
        <Route path="/level2" element={<Level2 />} />
        <Route path="/level3" element={<Level3 />} />
        <Route path="/level4" element={<Level4 />} />
        <Route path="/level5" element={<Level5 />} />

        {/* Tambahkan route lainnya sesuai kebutuhan */}

      </Routes>
    </BrowserRouter>
  )
}

export default App