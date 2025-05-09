import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import kamarMandiRumahBg from '../assets/background/kamarmandiRumah.png';
import PastaGigi from '../assets/object/kamarMandiRumah/pastaGigi.png';
import kesetKamarMandi from '../assets/object/kamarMandiRumah/kesetKamarMandi.png';
import jendelaKamarMandi from '../assets/object/kamarMandiRumah/jendelaKamarMandi.png';
import CardObjectKamarMandi from './objectRumah/cardObjectKamarMandi';
import KamarStar from './pointStar/rumahStar/kamarStar';
import WaktuMain from './waktu/waktuMain';

export default function KamarMandiRumah() {
    const [mission, setMission] = useState('');
    const [showObjectCard, setShowObjectCard] = useState(false);
    const [foundObjects, setFoundObjects] = useState([]);
    const [timeLeft, setTimeLeft] = useState(30); // Waktu dalam detik
    const [isGameOver, setIsGameOver] = useState(false);

    const objectData = [
        { name: '🪥 Sikat Gigi', image: PastaGigi },
        { name: '🧼 Keset', image: kesetKamarMandi },
        { name: '🧴 Jendela', image: jendelaKamarMandi },
    ];

    const handleObjectFound = (objectName) => {
        if (!foundObjects.includes(objectName)) {
            const updatedFoundObjects = [...foundObjects, objectName];
            setFoundObjects(updatedFoundObjects);

            Swal.fire({
                title: '🎉 Hebat!',
                html: `<p style="font-size: 18px;">Kamu menemukan <strong>${objectName}!</strong></p>`,
                icon: 'success',
                confirmButtonText: '👍 Oke!',
                confirmButtonColor: '#4CAF50'
            });

            // Jika semua objek ditemukan (3 bintang), hentikan waktu dan tampilkan kartu kemenangan
            if (updatedFoundObjects.length === 3) {
                setTimeLeft(-1); // Hentikan waktu dengan nilai khusus
                showVictoryCard(3); // Tampilkan kartu kemenangan dengan 3 bintang
            }
        }
    };

    useEffect(() => {
        Swal.fire({
            title: '<span style="font-family: Comic Sans MS">Misi di Kamar Mandi!</span>',
            html: `
                <div style="font-family: Comic Sans MS">
                    <p class="text-lg">🔍 Temukan benda-benda di kamar mandi:</p>
                    <ul class="text-left mt-4 space-y-2">
                        <li>1. Cari sikat gigi</li>
                        <li>2. Temukan keset</li>
                        <li>3. Cari jendela</li>
                    </ul>
                </div>
            `,
            icon: 'info',
            confirmButtonText: 'Siap, Aku Mengerti!',
            confirmButtonColor: '#4CAF50',
            background: '#FFF9C4',
        }).then((result) => {
            if (result.isConfirmed) {
                setMission('Temukan benda-benda di kamar mandi');
            }
        });
    }, []);

    // Sistem waktu
    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else if (timeLeft === 0 && !isGameOver) {
            setIsGameOver(true);
            showVictoryCard(foundObjects.length); // Tampilkan kartu berdasarkan jumlah bintang
        }
    }, [timeLeft, isGameOver]);

    const showVictoryCard = (starsEarned) => {
        let title = starsEarned === 0 ? '⏰ Game Over!' : '🎉 Victory!';
        let message =
            starsEarned === 0
                ? '<p style="font-size: 18px;">Sayang sekali, kamu tidak mendapatkan bintang.</p>'
                : `<p style="font-size: 18px;">Kamu mendapatkan ${starsEarned} bintang!</p>`;
        let starIcons = '⭐'.repeat(starsEarned);

        Swal.fire({
            title: title,
            html: `
                <div style="font-family: Comic Sans MS; font-size: 18px;">
                    ${message}
                    <p>${starIcons}</p>
                </div>
            `,
            icon: starsEarned === 0 ? 'error' : 'success',
            showCancelButton: starsEarned > 0, // Tombol ulang hanya muncul jika bintang > 0
            confirmButtonText: starsEarned === 0 ? '🔄 Ulang Stage' : '➡️ Lanjut Stage',
            cancelButtonText: '🔄 Ulang Stage',
            confirmButtonColor: '#4CAF50',
            cancelButtonColor: '#FF5722',
        }).then((result) => {
            if (result.isConfirmed && starsEarned > 0) {
                // Logika untuk melanjutkan ke stage berikutnya
                window.location.href = '/ruangtamu'; // Ganti dengan URL stage berikutnya
            } else {
                // Logika untuk mengulang stage ini
                window.location.reload();
            }
        });
    };

    return (
        <div
            className="min-h-screen w-full bg-cover bg-center bg-no-repeat relative"
            style={{
                backgroundImage: `url(${kamarMandiRumahBg})`,
                imageRendering: 'pixelated'
            }}
        >
            {/* Timer di tengah atas */}
            <WaktuMain timeLeft={timeLeft} totalTime={30} />

            {/* KamarStar component */}
            <KamarStar foundObjects={foundObjects} />

            {/* Sikat Gigi */}
            <img
                src={PastaGigi}
                alt="Sikat Gigi"
                className="absolute cursor-pointer transition-transform hover:scale-105"
                style={{
                    top: '47%',
                    left: '19.3%',
                    width: '70px',
                    height: 'auto'
                }}
                onClick={() => handleObjectFound('🪥 Sikat Gigi')}
            />

            {/* Keset */}
            <img
                src={kesetKamarMandi}
                alt="Keset"
                className="absolute cursor-pointer transition-transform hover:scale-105"
                style={{
                    top: '82%',
                    left: '37%',
                    width: '255px',
                    height: 'auto'
                }}
                onClick={() => handleObjectFound('🧼 Keset')}
            />

            {/* Jendela */}
            <img
                src={jendelaKamarMandi}
                alt="Jendela"
                className="absolute cursor-pointer transition-transform hover:scale-105"
                style={{
                    top: '7.1%',
                    left: '31.6%',
                    width: '175px',
                    height: 'auto'
                }}
                onClick={() => handleObjectFound('🧴 Jendela')}
            />

            {/* Tombol lihat benda */}
            <button
                onClick={() => setShowObjectCard(true)}
                className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-full cursor-pointer shadow-lg hover:bg-blue-600 transition-colors"
            >
                📖 Lihat Benda
            </button>

            {/* Tampilkan kartu benda */}
            {showObjectCard && (
                <CardObjectKamarMandi
                    data={objectData}
                    onClose={() => setShowObjectCard(false)}
                />
            )}
        </div>
    );
}