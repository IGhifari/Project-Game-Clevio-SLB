export default function HalamanAwal() {
  const handlePlayClick = () => {
    window.location.href = "/halamanlevel";
  };

  return (
    <div
      className="h-screen w-screen flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: "url('../src/assets/background/menubg.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Animasi Balon */}
      <img
        src="../src/assets/object/balon.gif"
        alt="Balon Pink"
        className="absolute top-0 left-20 w-100 h-100 animate-bounce-slow opacity-70"
      />
      <img
        src="../src/assets/object/balon.gif"
        alt="Balon Kuning"
        className="absolute top-1/3 right-20 w-100 h-100 animate-bounce-slow opacity-70"
      />

      {/* Card tengah */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl px-8 py-10 sm:px-12 sm:py-12 flex flex-col items-center gap-8 max-w-xs sm:max-w-md transform transition-transform hover:scale-105 hover:shadow-2xl animate-fade-in">
        {/* Judul game */}
        <h1 className="text-4xl font-bold text-pink-600 text-center drop-shadow-md flex items-center gap-2">
          🌟 Benda Ditempatku 🎈
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-gray-600 text-center">
          Ayo cari benda yang hilang di sekitarmu!
        </p>

        {/* Tombol Play */}
        <button
          onClick={handlePlayClick}
          className="px-8 py-4 bg-pink-500 hover:bg-pink-600 text-white text-xl rounded-full shadow-md transition-all transform hover:scale-105 hover:shadow-xl active:scale-95"
        >
          Mulai Bermain
        </button>
      </div>
    </div>
  );
}
