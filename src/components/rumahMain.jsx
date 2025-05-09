import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import rumahmainBg from '../assets/background/rumahMain.png';
import bantalRumah from '../assets/object/rumah/bantalRumah.png';
import lampuTidur from '../assets/object/rumah/lampuRumah.png';
import bonekaBebek from '../assets/object/rumah/bonekaBebekRumah.png';
import CardObjectKamar from './objectRumah/cardObjectKamar';
import RumahStar from './pointStar/rumahStar/rumahStar';
import WaktuMain from './waktu/waktuMain';

export default function RumahMain() {
    const [mission, setMission] = useState('');
    const [showObjectCard, setShowObjectCard] = useState(false);
    const [foundObjects, setFoundObjects] = useState([]);
    const [timeLeft, setTimeLeft] = useState(30); // Timer awal, tapi tidak dimulai dulu
    const [isTimerStarted, setIsTimerStarted] = useState(false); // Untuk kontrol mulai waktu
    const [isGameOver, setIsGameOver] = useState(false);

    const objectData = [
        { name: '🟡 Bantal', image: bantalRumah },
        { name: '💡 Lampu Tidur', image: lampuTidur },
        { name: '🧸 Boneka Bebek', image: bonekaBebek },
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

            if (updatedFoundObjects.length === 3) {
                setTimeLeft(-1); // hentikan waktu
                showVictoryCard(3);
            }
        }
    };

    useEffect(() => {
        Swal.fire({
            title: '<span style="font-family: Comic Sans MS; font-size: 22px;">📜 Misi Kamu Hari Ini!</span>',
            html: `
                <div style="font-family: Comic Sans MS; font-size: 18px;">
                    <p style="margin-bottom: 10px;">👀 Ayo cari benda-benda di kamarmu:</p>
                    <ul style="text-align: left;">
                        <li>🟡 Cari bantal berwarna kuning</li>
                        <li>💡 Cari lampu tidur</li>
                        <li>🧸 Cari boneka bebek</li>
                    </ul>
                    <p style="margin-top: 20px;">🎯 Tekan benda jika kamu menemukannya!</p>
                </div>
            `,
            icon: 'info',
            confirmButtonText: '✅ Siap!',
            confirmButtonColor: '#4CAF50',
            background: '#FFF9C4',
            showClass: {
                popup: 'animate__animated animate__bounceIn'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                setMission('Temukan benda-benda di kamar');
                setIsTimerStarted(true); // Mulai waktu
                setTimeLeft(30); // Reset waktu ke 30 detik
            }
        });
    }, []);

    // Timer countdown
    useEffect(() => {
        if (isTimerStarted && timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else if (timeLeft === 0 && !isGameOver) {
            setIsGameOver(true);
            showVictoryCard(foundObjects.length);
        }
    }, [isTimerStarted, timeLeft, isGameOver]);

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
            showCancelButton: starsEarned > 0,
            confirmButtonText: starsEarned === 0 ? '🔄 Ulang Stage' : '➡️ Lanjut Stage',
            cancelButtonText: '🔄 Ulang Stage',
            confirmButtonColor: '#4CAF50',
            cancelButtonColor: '#FF5722',
        }).then((result) => {
            if (result.isConfirmed && starsEarned > 0) {
                window.location.href = '/kamarMandiRumah'; // Ganti sesuai stage selanjutnya
            } else {
                window.location.reload();
            }
        });
    };

    return (
        <div
            className="min-h-screen w-full bg-cover bg-center bg-no-repeat relative"
            style={{
                backgroundImage: `url(${rumahmainBg})`,
                imageRendering: 'pixelated'
            }}
        >
            {/* Timer */}
            <WaktuMain timeLeft={timeLeft} totalTime={30} />

            {/* Bintang */}
            <RumahStar foundObjects={foundObjects} />

            {/* Bantal */}
            <img
                src={bantalRumah}
                alt="Bantal"
                className="absolute cursor-pointer transition-transform hover:scale-105"
                style={{ top: '71%', left: '72.5%', width: '310px', height: 'auto' }}
                onClick={() => handleObjectFound('🟡 Bantal')}
            />

            {/* Lampu Tidur */}
            <img
                src={lampuTidur}
                alt="Lampu Tidur"
                className="absolute cursor-pointer transition-transform hover:scale-105"
                style={{ top: '34.5%', left: '85%', width: '160px', height: 'auto' }}
                onClick={() => handleObjectFound('💡 Lampu Tidur')}
            />

            {/* Boneka Bebek */}
            <img
                src={bonekaBebek}
                alt="Boneka Bebek"
                className="absolute cursor-pointer transition-transform hover:scale-105"
                style={{ top: '10.3%', left: '46.6%', width: '85px', height: 'auto' }}
                onClick={() => handleObjectFound('🧸 Boneka Bebek')}
            />

            {/* Tombol lihat benda */}
            <button
                onClick={() => setShowObjectCard(true)}
                className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-full cursor-pointer shadow-lg hover:bg-blue-600 transition-colors"
            >
                📖 Lihat Benda yang Dicari
            </button>

            {/* Kartu daftar benda */}
            {showObjectCard && (
                <CardObjectKamar
                    data={objectData}
                    onClose={() => setShowObjectCard(false)}
                />
            )}
        </div>
    );
}
