import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import lapanganBg from '../assets/background/lapanganSekolah.png';
import bunga from '../assets/object/lapangan_sekolah/bunga.png';
import basket from '../assets/object/lapangan_sekolah/basket.png';
import ayunan from '../assets/object/lapangan_sekolah/ayunan.png';
import CardObjectlapangan from './objectSekolah/cardObjectlapangan';
import LapanganStar from './pointStar/sekolahStar/lapanganStar';
import WaktuMain from './waktu/waktuMain';
import ButtonKembaliTemukanBenda from './buttonKembali/buttonKembaliTemukanBenda';
export default function LapanganSekolah() {
    const [mission, setMission] = useState('');
    const [showObjectCard, setShowObjectCard] = useState(false);
    const [foundObjects, setFoundObjects] = useState([]);
    const [timeLeft, setTimeLeft] = useState(30);
    const [isTimerStarted, setIsTimerStarted] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);

    const objectData = [
        { name: '🌸 Bunga', image: bunga },
        { name: '🏀 Bola Basket', image: basket },
        { name: '🪑 Ayunan', image: ayunan },
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
                setTimeLeft(-1);
                localStorage.setItem('lapangansekolah_completed', 'true');
                showVictoryCard(3);
            }
        }
    };

    useEffect(() => {
        Swal.fire({
            title: '<span style="font-family: Comic Sans MS; font-size: 22px;">📜 Misi Kamu Hari Ini!</span>',
            html: `
                <div style="font-family: Comic Sans MS; font-size: 18px;">
                    <p style="margin-bottom: 10px;">👀 Ayo cari benda-benda di lapangan:</p>
                    <ul style="text-align: left;">
                        <li>🌸 Cari bunga</li>
                        <li>🏀 Cari bola basket</li>
                        <li>🪑 Cari ayunan</li>
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
                setMission('Temukan benda-benda di lapangan');
                setIsTimerStarted(true);
                setTimeLeft(30);
            }
        });
    }, []);

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
        localStorage.setItem('lapangansekolah_stars', starsEarned);
        localStorage.setItem('lapangansekolah_completed', 'true');

        Swal.fire({
            title: '🎉 Level Selesai!',
            html: `
                <div style="font-family: Comic Sans MS; font-size: 18px;">
                    <p>Kamu mendapatkan ${starsEarned} bintang!</p>
                    <p>${'⭐'.repeat(starsEarned)}</p>
                    <p class="mt-4">Ayo lanjut ke level berikutnya!</p>
                </div>
            `,
            icon: 'success',
            confirmButtonText: '➡️ Lanjut',
            confirmButtonColor: '#4CAF50'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = '/perpustakaanSekolah';
            }
        });
    };

    return (
        <div 
            className="min-h-screen w-full bg-cover bg-center bg-no-repeat relative"
            style={{
                backgroundImage: `url(${lapanganBg})`,
                imageRendering: 'pixelated'
            }}
        >
            <WaktuMain timeLeft={timeLeft} totalTime={30} />
            <LapanganStar foundObjects={foundObjects} />
            <ButtonKembaliTemukanBenda/>
            <img 
                src={bunga}
                alt="bunga"
                className="absolute cursor-pointer transition-transform"
                style={{
                    top: '41.2%',
                    left: '5%',
                    width: '130px',
                    height: 'auto'  
                }}
                onClick={() => handleObjectFound('🌸 Bunga')}
            />

            <img 
                src={basket}
                alt="basket"
                className="absolute cursor-pointer transition-transform"
                style={{
                    top: '79.2%',
                    left: '3.8%',
                    width: '83px',
                    height: 'auto'  
                }}
                onClick={() => handleObjectFound('🏀 Bola Basket')}
            />

            <img 
                src={ayunan}
                alt="ayunan"
                className="absolute cursor-pointer transition-transform"
                style={{
                    top: '37.4%',
                    left: '88.3%',
                    width: '180px',
                    height: 'auto'  
                }}
                onClick={() => handleObjectFound('🪑 Ayunan')}
            />

            <button
                onClick={() => setShowObjectCard(true)}
                className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
            > 
                📖 Lihat Benda yang Dicari
            </button>

            {showObjectCard && (
                <CardObjectlapangan 
                    data={objectData} 
                    onClose={() => setShowObjectCard(false)}
                />
            )}
        </div>
    );
}