import Swal from 'sweetalert2';
import { useState, useEffect } from 'react';
import animationVideo from "../assets/background/animationn.mp4"; // pastikan path benar

export default function HalamanAwal() {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showStars, setShowStars] = useState(false);
  const [showTransitionVideo, setShowTransitionVideo] = useState(false); // Tambahkan state ini
  const [isCardFalling, setIsCardFalling] = useState(false); // Tambahkan state ini

  useEffect(() => {
    // Menampilkan animasi bintang setelah komponen dimount
    setTimeout(() => {
      setShowStars(true);
    }, 500);
  }, []);

  const handlePlayClick = () => {
    setIsCardFalling(true); // Mulai animasi jatuh
    setTimeout(() => {
      setShowTransitionVideo(true); // Setelah animasi jatuh, tampilkan video
    }, 600); // Durasi animasi jatuh (ms), samakan dengan CSS
  };

  // Saat video transisi selesai, redirect ke halaman berikutnya
  const handleVideoEnd = () => {
    window.location.href = "/halamanlevel";
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
        localStorage.removeItem("pekerjaanLevelUnlocked"); // <-- tambahkan baris ini
        window.location.reload(); // <-- tambahkan baris ini

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
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: isTransitioning ? 0 : 1,
        transition: 'opacity 0.5s ease-in-out',
      }}
    >
      {/* Video Transisi */}
      {showTransitionVideo && (
        <video
          src={animationVideo}
          autoPlay
          onEnded={handleVideoEnd}
          className="absolute top-0 left-0 w-full h-full object-cover z-50"
          style={{ background: "#000" }}
        />
      )}

      {/* Sembunyikan konten utama saat transisi */}
      {!showTransitionVideo && (
        <>
          {/* Background Video */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
            style={{ pointerEvents: 'none' }}
          >
            <source src="../src/assets/background/menubg.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          

          {/* Animasi Bintang */}
          {showStars && (
            <>
              <div className="absolute top-1/4 left-1/4 animate-float z-10" style={{ animationDelay: '0s' }}>⭐</div>
              <div className="absolute top-1/3 right-1/3 animate-float z-10" style={{ animationDelay: '0.5s' }}>⭐</div>
              <div className="absolute bottom-1/4 left-1/3 animate-float z-10" style={{ animationDelay: '1s' }}>⭐</div>
              <div className="absolute bottom-1/3 right-1/4 animate-float z-10" style={{ animationDelay: '1.5s' }}>⭐</div>
            </>
          )}

          {/* Card tengah */}
          <div 
            className={`bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl py-10 flex flex-col items-center gap-8 max-w-xs sm:max-w-md z-10
              ${isCardFalling ? "fall-card" : ""}`}
            style={{
              transform: isTransitioning
                ? 'scale(0.95)'
                : isCardFalling
                ? 'translateY(120vh) scale(0.9)'
                : 'scale(1)',
              opacity: isTransitioning
                ? 0
                : isCardFalling
                ? 0
                : 1,
              transition: isCardFalling
                ? 'transform 0.6s cubic-bezier(.55,1.6,.53,.97), opacity 0.6s'
                : 'all 0.5s ease-in-out',
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
              🌟 Sehari Dirumah 🎈
            </h1>

            {/* Subtitle dengan emoji */}
            <p className=" text-gray-600 text-center flex items-center gap-2">
              <span className="text-2xl">🔍</span>
              Ayo cari benda, tebak profesi dan susun puzzle!!
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

            {/* Tombol Panduan Game dengan Slide */}
            <button
              onClick={() => {
                Swal.fire({
                  title: 'Panduan Game',
                  html: `
                    <div id="panduan-container" style="font-family: Comic Sans MS; font-size: 18px; text-align: left; min-width:260px;">
                      <!-- Slide 1 -->
                      <div class="panduan-slide" style="display:block; transition:opacity 0.4s; background:#fffde7; border-radius:16px; padding:16px;">
                        <div style="font-size:48px;text-align:center;">🎮</div>
                        <h3 style="color:#fbc02d;">Selamat Datang!</h3>
                        <p>Di game ini kamu akan mencari benda, menebak pekerjaan, dan menyusun puzzle. Yuk mulai!</p>
                      </div>

                      <!-- Slide 2 -->
                      <div class="panduan-slide" style="display:none; transition:opacity 0.4s; background:#ffe0ef; border-radius:16px; padding:16px;">
                        <div style="font-size:48px;text-align:center;">🔍</div>
                        <h3 style="color:#e91e63;">Temukan Barang (1)</h3>
                        <ul style="padding-left:1.2em;">
                          <li>Cari benda tersembunyi seperti bantal, boneka, atau lampu.</li>
                          <li>Gunakan pengamatanmu!</li>
                        </ul>
                      </div>

                      <!-- Slide 3 -->
                      <div class="panduan-slide" style="display:none; transition:opacity 0.4s; background:#ffe0ef; border-radius:16px; padding:16px;">
                        <div style="font-size:48px;text-align:center;">⭐</div>
                        <h3 style="color:#e91e63;">Temukan Barang (2)</h3>
                        <ul style="padding-left:1.2em;">
                          <li>Semakin cepat kamu menemukannya, semakin banyak bintang yang kamu dapat!</li>
                          <li>Tekan benda yang kamu temukan.</li>
                        </ul>
                      </div>

                      <!-- Slide 4 -->
                      <div class="panduan-slide" style="display:none; transition:opacity 0.4s; background:#e3f2fd; border-radius:16px; padding:16px;">
                        <div style="font-size:48px;text-align:center;">🧑‍🚒</div>
                        <h3 style="color:#2196f3;">Tebak Pekerjaan (1)</h3>
                        <ul style="padding-left:1.2em;">
                          <li>Baca soal dengan cermat.</li>
                          <li>Pilih gambar profesi yang sesuai.</li>
                        </ul>
                      </div>

                      <!-- Slide 5 -->
                      <div class="panduan-slide" style="display:none; transition:opacity 0.4s; background:#e3f2fd; border-radius:16px; padding:16px;">
                        <div style="font-size:48px;text-align:center;">🎯</div>
                        <h3 style="color:#2196f3;">Tebak Pekerjaan (2)</h3>
                        <ul style="padding-left:1.2em;">
                          <li>Jawaban yang benar akan membuka level selanjutnya!</li>
                          <li>Semangat mencoba ya!</li>
                        </ul>
                      </div>

                      <!-- Slide 6 -->
                      <div class="panduan-slide" style="display:none; transition:opacity 0.4s; background:#fff3e0; border-radius:16px; padding:16px;">
                        <div style="font-size:48px;text-align:center;">🧩</div>
                        <h3 style="color:#ff9800;">Puzzle</h3>
                        <ul style="padding-left:1.2em;">
                          <li>Susun potongan gambar menjadi utuh dengan cara menyeretnya.</li>
                          <li>Selesaikan puzzle dan dapatkan bintang!</li>
                        </ul>
                      </div>

                      <div id="panduan-progress" style="text-align:center;margin:12px 0 0 0;font-weight:bold;color:#333;">1 / 6</div>
                      <div style="text-align:center;margin-top:12px;">
                        <button id="prevPanduan" style="margin-right:12px;padding:6px 18px;border-radius:8px;border:none;background:#ffd600;font-weight:bold;cursor:pointer;transition:box-shadow 0.2s;">⬅️ Sebelumnya</button>
                        <button id="nextPanduan" style="padding:6px 18px;border-radius:8px;border:none;background:#ffd600;font-weight:bold;cursor:pointer;transition:box-shadow 0.2s;">Selanjutnya ➡️</button>
                      </div>
                    </div>
                  `,
                  showConfirmButton: false,
                  background: '#FFF9C4',
                  customClass: {
                    popup: 'relative' // tambahkan ini agar kita bisa posisikan tombol silang di luar
                  },
                  didOpen: () => {
                    let idx = 0;
                    const swalContainer = Swal.getPopup();

                    // Buat tombol silang ❌ di pojok kanan atas luar
                    const closeButton = document.createElement('button');
                    closeButton.innerHTML = '❌';
                    closeButton.style.position = 'absolute';
                    closeButton.style.top = '-16px';
                    closeButton.style.right = '-16px';
                    closeButton.style.background = 'white';
                    closeButton.style.color = 'white';
                    closeButton.style.border = 'none';
                    closeButton.style.borderRadius = '50%';
                    closeButton.style.width = '32px';
                    closeButton.style.height = '32px';
                    closeButton.style.fontSize = '16px';
                    closeButton.style.cursor = 'pointer';
                    closeButton.style.boxShadow = '0 2px 6px rgba(0,0,0,0.2)';
                    closeButton.onclick = () => Swal.close();
                    swalContainer.appendChild(closeButton);

                    const slides = swalContainer.querySelectorAll('.panduan-slide');
                    const prevBtn = swalContainer.querySelector('#prevPanduan');
                    const nextBtn = swalContainer.querySelector('#nextPanduan');
                    const progress = swalContainer.querySelector('#panduan-progress');

                    function showSlide(i) {
                      slides.forEach((slide, j) => {
                        slide.style.opacity = 0;
                        slide.style.display = 'none';
                        if (i === j) {
                          slide.style.display = 'block';
                          setTimeout(() => { slide.style.opacity = 1; }, 10);
                        }
                      });
                      progress.textContent = (i + 1) + ' / ' + slides.length;
                    }

                    prevBtn.onclick = () => {
                      idx = (idx + slides.length - 1) % slides.length;
                      showSlide(idx);
                    };
                    nextBtn.onclick = () => {
                      idx = (idx + 1) % slides.length;
                      showSlide(idx);
                    };

                    [prevBtn, nextBtn].forEach(btn => {
                      btn.onmouseenter = () => btn.style.boxShadow = '0 0 8px #ffd600';
                      btn.onmouseleave = () => btn.style.boxShadow = '';
                    });

                    function handleKey(e) {
                      if (e.key === "ArrowLeft") {
                        idx = (idx + slides.length - 1) % slides.length;
                        showSlide(idx);
                      }
                      if (e.key === "ArrowRight") {
                        idx = (idx + 1) % slides.length;
                        showSlide(idx);
                      }
                    }

                    document.addEventListener("keydown", handleKey);  
                    Swal.getPopup().addEventListener("swalClose", () => {
                      document.removeEventListener("keydown", handleKey);
                    });

                    showSlide(idx);
                  }
                });
              }}
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 cursor-pointer text-white text-lg rounded-full shadow-md transition-all transform hover:scale-105 hover:shadow-xl active:scale-95"
              style={{
                backgroundSize: '200% auto',
                animation: 'gradient 3s ease infinite',
              }}
            >
              📖 Panduan Game
            </button>

          </div>
        </>
      )}

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
          .fall-card {
            /* Optional: bisa pakai class ini jika ingin styling tambahan */
          }
        `}
      </style>
    </div>
  );
}
