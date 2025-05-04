import React from 'react';


export default function HalamanAwal() {
  const handlePlayClick = () => {
      window.location.href = "/halamanlevel";
  } 

  const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
          handlePlayClick();
      }
  }

  // Add useEffect to add event listener when component mounts
  React.useEffect(() => {
      window.addEventListener('keydown', handleKeyPress);
      
      // Cleanup listener when component unmounts
      return () => {
          window.removeEventListener('keydown', handleKeyPress);
      };
  }, []);

  return (
      <div className="h-screen w-screen flex items-center justify-center" 
           style={{
             backgroundImage: "url('../src/assets/background/menubg.jpg')",
             backgroundSize: 'cover',
             backgroundPosition: 'center'
           }}>
        <div className="flex flex-col items-center gap-8">
          <h1 className="text-4xl font-bold text-green-300" style={{fontFamily : 'Comic Sans MS'}}>Welcome to Game Benda Ditempatku</h1>
          <button 
            onClick={handlePlayClick}
            className="transition-transform hover:scale-110"
            tabIndex={0}
          >
            <img 
              src="../src/assets/object/play.png" 
              alt="Play Button"
              className="w-32 h-32 cursor-pointer"
            />
          </button>
          <p className="text-black text-lg mt-4">Press click Enter or Press to Start</p>
        </div>
      </div>
  )
}