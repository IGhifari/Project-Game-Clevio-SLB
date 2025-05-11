import Swal from 'sweetalert2';
import { useState, useEffect } from 'react';

export default function HalamanAwal() {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showStars, setShowStars] = useState(false);

  useEffect(() => {
    // Menampilkan animasi bintang setelah komponen dimount
    setTimeout(() => {
      setShowStars(true);
    }, 500);
  }, []);

  const handlePlayClick = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      window.location.href = "/halamanlevel";
    }, 500);
  };

  const handleResetClick = () => {
    Swal.fire({
      title: 'Reset Progress?',
      html: `
        <div style="font-family: Comic Sans MS; font-size: 18px;">
          <p>Apakah kamu yakin ingin mereset semua progress?</p>
          <p>Semua bintang dan level yang sudah dibuka akan dihapus.</p>
        </div>
      `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Ya, Reset!',
      cancelButtonText: 'Batal',
      background: '#FFF9C4'
    }).then((result) => {
      if (result.isConfirmed) {
        // Reset semua localStorage
        localStorage.removeItem('rumahmain_stars');
        localStorage.removeItem('kamarmandi_stars');
        localStorage.removeItem('ruangtamu_stars');
        localStorage.removeItem('sekolahmain_stars');
        localStorage.removeItem('lapangansekolah_stars');
        localStorage.removeItem('perpustakaansekolah_stars');
        localStorage.removeItem('sekolahUnlocked');
        localStorage.removeItem('rumahmain_completed');
        localStorage.removeItem('kamarmandi_completed');
        localStorage.removeItem('ruangtamu_completed');
        localStorage.removeItem('sekolahmain_completed');
        localStorage.removeItem('lapangansekolah_completed');
        localStorage.removeItem('perpustakaansekolah_completed');

        Swal.fire({
          title: 'Berhasil!',
          text: 'Semua progress telah direset',
          icon: 'success',
          confirmButtonText: 'OK',
          background: '#FFF9C4'
        });
      }
    });
  };

  return (
    <div
      className="h-screen w-screen flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: "url('../src/assets/background/menubg.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: isTransitioning ? 0 : 1,
        transition: 'opacity 0.5s ease-in-out',
      }}
    >
      {/* Animasi Balon */}
      <img
        src="../src/assets/object/balon.gif"
        alt="Balon Pink"
        className="absolute top-0 left-20 w-100 h-100 animate-bounce-slow opacity-70"
        style={{
          opacity: isTransitioning ? 0 : 0.7,
          transition: 'opacity 0.5s ease-in-out',
        }}
      />
      <img
        src="../src/assets/object/balon.gif"
        alt="Balon Kuning"
        className="absolute top-1/3 right-20 w-100 h-100 animate-bounce-slow opacity-70"
        style={{
          opacity: isTransitioning ? 0 : 0.7,
          transition: 'opacity 0.5s ease-in-out',
        }}
      />

      {/* Animasi Bintang */}
      {showStars && (
        <>
          <div className="absolute top-1/4 left-1/4 animate-float" style={{ animationDelay: '0s' }}>⭐</div>
          <div className="absolute top-1/3 right-1/3 animate-float" style={{ animationDelay: '0.5s' }}>⭐</div>
          <div className="absolute bottom-1/4 left-1/3 animate-float" style={{ animationDelay: '1s' }}>⭐</div>
          <div className="absolute bottom-1/3 right-1/4 animate-float" style={{ animationDelay: '1.5s' }}>⭐</div>
        </>
      )}

      {/* Card tengah */}
      <div 
        className="bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl py-10 flex flex-col items-center gap-8 max-w-xs sm:max-w-md"
        style={{
          transform: isTransitioning ? 'scale(0.95)' : 'scale(1)',
          opacity: isTransitioning ? 0 : 1,
          transition: 'all 0.5s ease-in-out',
          border: '4px solid #ffd700',
          boxShadow: '0 0 20px rgba(255, 215, 0, 0.5)',
        }}
      >
        {/* Judul game dengan animasi */}
        <h1 
          className="text-4xl font-bold text-pink-600 text-center drop-shadow-md flex items-center gap-2"
          style={{
            animation: 'pulse 2s infinite',
            textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
          }}
        >
          🌟 Benda Ditempatku 🎈
        </h1>

        {/* Subtitle dengan emoji */}
        <p className="text-lg text-gray-600 text-center flex items-center gap-2">
          <span className="text-2xl">🔍</span>
          Ayo cari benda yang hilang di sekitarmu!
          <span className="text-2xl">🔍</span>
        </p>

        {/* Tombol Play dengan efek hover yang lebih menarik */}
        <button
          onClick={handlePlayClick}
          className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 cursor-pointer text-white text-xl rounded-full shadow-md transition-all transform hover:scale-105 hover:shadow-xl active:scale-95"
          style={{
            backgroundSize: '200% auto',
            animation: 'gradient 3s ease infinite',
          }}
        >
          🎮 Mulai Bermain
        </button>

        {/* Tombol Reset dengan efek hover yang lebih menarik */}
        <button
          onClick={handleResetClick}
          className="px-6 py-2 bg-gradient-to-r from-red-500 to-orange-500 cursor-pointer text-white text-lg rounded-full shadow-md transition-all transform hover:scale-105 hover:shadow-xl active:scale-95"
          style={{
            backgroundSize: '200% auto',
            animation: 'gradient 3s ease infinite',
          }}
        >
          🔄 Reset Progress
        </button>
      </div>

      {/* CSS Animations */}
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(10deg); }
            100% { transform: translateY(0) rotate(0deg); }
          }
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animate-float {
            animation: float 3s ease-in-out infinite;
            font-size: 2rem;
          }
        `}
      </style>
    </div>
  );
}
