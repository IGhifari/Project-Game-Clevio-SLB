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
import Level6 from './components/tebakPekerjaan/levelPekerjaan/level6';
import Level7 from './components/tebakPekerjaan/levelPekerjaan/level7';
import Level8 from './components/tebakPekerjaan/levelPekerjaan/level8';
import Level9 from './components/tebakPekerjaan/levelPekerjaan/level9';
import Level10 from './components/tebakPekerjaan/levelPekerjaan/level10';
import Puzzle from './components/puzzleGame/puzzle';
import Puzzle2 from './components/puzzleGame/puzzle2';
import Puzzle3 from './components/puzzleGame/puzzle3';
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
        <Route path="/level6" element={<Level6 />} />
        <Route path="/level7" element={<Level7 />} />
        <Route path="/level8" element={<Level8 />} />
        <Route path="/level9" element={<Level9 />} />
        <Route path="/level10" element={<Level10 />} />
        <Route path='/puzzlegame' element={<Puzzle/>}></Route>
        <Route path='/puzzlegame2' element={<Puzzle2/>}></Route>
        <Route path='/puzzlegame3' element={<Puzzle3/>}></Route>

        {/* Tambahkan route lainnya sesuai kebutuhan */}

      </Routes>
    </BrowserRouter>
  )
}

export default App