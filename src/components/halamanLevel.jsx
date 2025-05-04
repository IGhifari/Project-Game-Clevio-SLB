import React from 'react';
import Swal from 'sweetalert2'; // Import SweetAlert2
import backgroundImage from '../assets/background/levelchoiche.png'; // Pastikan path ke gambar sesuai
import rumahImage from '../assets/background/cardrumah.png'; // Gambar untuk level "Di Rumah"
import sekolahImage from '../assets/background/cardsekolah.png'; // Gambar untuk level "Sekolah"
import '../App.css'
export default function HalamanLevel() {

        const handleLevelSelection = (level) => {
            const isRumah = level === 'Di Rumah'; // Cek apakah level yang dipilih adalah "Di Rumah"
            Swal.fire({
                title: `<span style="font-family: 'Comic Sans MS'">Hebat! Kamu Pilih Level ${level}!</span>`,
                html: `
                  <div style="font-family: 'Comic Sans MS'">
                    <p style="font-size: 1.2em">Ayo belajar nama-nama benda di <b>${level}</b> 🧠✨</p>
                    <p style="font-size: 1em; margin-top: 10px">Siap cari dan temukan bersama? 👀</p>
                  </div>
                `,
                icon: 'success',
                iconColor: isRumah ? '#ffcc00' : '#00ccff',
                confirmButtonText: 'Ayo Mulai!',
                cancelButtonText: 'Batal',
                showCancelButton: true,
                confirmButtonColor: isRumah ? '#ffcc00' : '#00ccff',
                cancelButtonColor: '#d33',
                showClass: {
                  popup: 'animate__animated animate__bounceIn'
                },
                hideClass: {
                  popup: 'animate__animated animate__bounceOut'
                },
                background: '#fff3e6',
                customClass: {
                  title: 'sweet-title',
                  confirmButton: 'sweet-button',
                  cancelButton: 'sweet-button-cancel'
                }
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location.href = isRumah ? "/rumahmain" : "/sekolahmain";
                }
              });
              
        };

    return (
        <div
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '20px',
                textAlign: 'center',
                width: '100%', // Memenuhi lebar layar
                overflow: 'hidden', // Menghindari scroll
                position: 'relative', // Untuk mengatur posisi elemen di dalam
                zIndex: 1, // Menempatkan elemen di atas background
            }}
        >
            <h1
                style={{
                    color: '#fff',
                    fontSize: '3rem',
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
                    fontFamily: "'Comic Sans MS', cursive, sans-serif",
                    marginBottom: '20px',
                    
                }}
            >
                Pilih Level
            </h1>
            <div
                style={{
                    display: 'flex',
                    gap: '400px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '75%', // Memenuhi lebar layar
                    marginTop: '20px',
                    flexWrap: 'wrap', // Membuat card fleksibel
                  
                    
                }}
            >
                {/* Card untuk level "Di Rumah" */}
                <div
                    style={{
                        backgroundColor: '#fff',
                        borderRadius: '15px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                        padding: '20px',
                        textAlign: 'center',
                        flex: 1, // Membuat card fleksibel
                        maxWidth: '45%', // Membatasi ukuran maksimum
                    }}
                >
                    <img
                        src={rumahImage}
                        alt="Di Rumah"
                        style={{
                            width: '100%',
                            borderRadius: '10px',
                            marginBottom: '10px',
                        }}
                    />
                    <button
                        onClick={() => handleLevelSelection('Di Rumah')}
                        style={{
                            backgroundColor: '#ffcc00',
                            border: 'none',
                            borderRadius: '10px',
                            padding: '10px 20px',
                            fontSize: '16px',
                            cursor: 'pointer',
                            fontFamily: "'Comic Sans MS', cursive, sans-serif",
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                        }}
                        className='hover:scale-105 transition-transform'
                    >
                        Pilih Rumah
                    </button>
                </div>

                {/* Card untuk level "Sekolah" */}
                <div
                    style={{
                        backgroundColor: '#fff',
                        borderRadius: '15px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                        padding: '20px',
                        textAlign: 'center',
                        flex: 1, // Membuat card fleksibel
                        maxWidth: '45%', // Membatasi ukuran maksimum
                    }}
                >
                    <img
                        src={sekolahImage}
                        alt="Sekolah"
                        style={{
                            width: '100%',
                            borderRadius: '10px',
                            marginBottom: '10px',
                        }}
                    />
                    <button
                        onClick={() => handleLevelSelection('Sekolah')}
                        style={{
                            backgroundColor: '#00ccff',
                            border: 'none',
                            borderRadius: '10px',
                            padding: '10px 20px',
                            fontSize: '16px',
                            cursor: 'pointer',
                            fontFamily: "'Comic Sans MS', cursive, sans-serif",
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                        }}
                        className='hover:scale-105 transition-transform'
                    >
                        Pilih Sekolah
                    </button>
                </div>
            </div>
        </div>
    );
}