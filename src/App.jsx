import { useState } from 'react'
import './App.css'

function App() {
  const handlePlayClick = () => {
    // Add navigation or game start logic here
    console.log('Play button clicked')
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center" 
         style={{
           backgroundImage: "url('../src/assets/background/menubg.jpg')",
           backgroundSize: 'cover',
           backgroundPosition: 'center'
         }}>
      <div className="flex flex-col items-center gap-8">
        <h1 className="text-4xl font-bold text-white">Welcome to Game</h1>
        <button 
          onClick={handlePlayClick}
          className="transition-transform hover:scale-110"
        >
          <img 
            src="../src/assets/object/play.png" 
            alt="Play Button"
            className="w-32 h-32 cursor-pointer"
          />
        </button>
      </div>
    </div>
  )
}

export default App