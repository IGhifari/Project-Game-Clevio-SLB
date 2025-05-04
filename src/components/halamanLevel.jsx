import React from 'react';
import Swal from 'sweetalert2'; // Import SweetAlert2
import backgroundImage from '../assets/background/levelchoiche.png'; // Pastikan path ke gambar sesuai
import rumahImage from '../assets/background/cardrumah.png'; // Gambar untuk level "Di Rumah"
import sekolahImage from '../assets/background/cardsekolah.png'; // Gambar untuk level "Sekolah"

export default function HalamanLevel() {
    const handleLevelSelection = (level) => {
        Swal.fire({
            title: 'Level Dipilih!',
            text: `Anda memilih level: ${level}`,
            icon: 'success',
            confirmButtonText: 'Ayo Mulai!',
        });
        // Tambahkan logika navigasi atau aksi lainnya di sini
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
                    >
                        Pilih Sekolah
                    </button>
                </div>
            </div>
        </div>
    );
}