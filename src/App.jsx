import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HalamanAwal from './components/halamanAwal';
import HalamanLevel from './components/halamanLevel';
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HalamanAwal />} />
        <Route path="/halamanlevel" element={<HalamanLevel />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App