import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import Meja from '../assets/object/perpustakaanSekolah/mejaBuku.png';
import hurufA from '../assets/object/perpustakaanSekolah/hurufA.png';
import Abjad from '../assets/object/perpustakaanSekolah/abjad.png'
import CardObjectPerpustakaan from './objectSekolah/cardObjectPerpustakaan';
import PerpustakaanStar from './pointStar/sekolahStar/perpustakaanStar';
import WaktuMain from './waktu/waktuMain';
import BgPerpustakaanSekolah from "../assets/background/perpustakaanSekolah.png"

export default function PerpustakaanSekolah () {
    const [mission, setMission] = useState('');
    const [showObjectCard, setShowObjectCard] = useState(false);
    const [foundObjects, setFoundObjects] = useState([]);
    const [timeLeft, setTimeLeft] = useState(30);
    const [isTimerStarted, setIsTimerStarted] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);

    const objectData = [
        { name: 'Meja', image: Meja },
        { name: 'Abjad', image: Abjad },
        { name: 'Huruf A', image: hurufA },
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
        localStorage.setItem('perpustakaansekolah_stars', starsEarned);
        localStorage.setItem('perpustakaansekolah_completed', 'true');

        // Cek apakah semua level sudah selesai
        const isSekolahMainCompleted = localStorage.getItem('sekolahmain_completed') === 'true';
        const isLapanganSekolahCompleted = localStorage.getItem('lapangansekolah_completed') === 'true';
        const isPerpustakaanSekolahCompleted = true; // Karena ini level terakhir

        const allLevelsCompleted = isSekolahMainCompleted && isLapanganSekolahCompleted && isPerpustakaanSekolahCompleted;

        Swal.fire({
            title: '🎉 Level Selesai!',
            html: `
                <div style="font-family: Comic Sans MS; font-size: 18px;">
                    <p>Kamu mendapatkan ${starsEarned} bintang!</p>
                    <p>${'⭐'.repeat(starsEarned)}</p>
                    <p class="mt-4">${allLevelsCompleted ? '🎉 Selamat! Kamu telah menyelesaikan semua level! Ayo lihat hadiahmu!' : 'Ayo lanjut ke level berikutnya!'}</p>
                </div>
            `,
            icon: 'success',
            confirmButtonText: allLevelsCompleted ? '🎁 Lihat Hadiah' : '➡️ Lanjut',
            confirmButtonColor: '#4CAF50'
        }).then((result) => {
            if (result.isConfirmed) {
                if (allLevelsCompleted) {
                    window.location.href = '/rewardSekolah';
                } else {
                    window.location.href = '/perpustakaanSekolah';
                }
            }
        });
    };

    return (
        <div 
            className="min-h-screen w-full bg-cover bg-center bg-no-repeat relative"
            style={{
                backgroundImage: `url(${BgPerpustakaanSekolah})`,
                imageRendering: 'pixelated'
            }}
        >
            <WaktuMain timeLeft={timeLeft} totalTime={30} />
            <PerpustakaanStar    foundObjects={foundObjects} />
            
            <img 
                src={hurufA}
                alt="hurufA"
                className="absolute cursor-pointer  transition-transform"
                style={{
                    top: '%',
                    left: '44%',
                    width: '135px',
                    height: 'auto'  
                }}
                onClick={() => handleObjectFound('Huruf A')}
            />

            <img 
                src={Abjad}
                alt="Abjad"
                className="absolute cursor-pointer  transition-transform"
                style={{
                    top: '11.9%',
                    left: '79.5%',
                    width: '148px',
                    height: 'auto'  
                }}
                onClick={() => handleObjectFound('Abjad')}
            />

            <img 
                src={Meja}
                alt="meja"
                className="absolute cursor-pointer  transition-transform"
                style={{
                    top: '75.5%',
                    left: '31.3%',
                    width: '250px',
                    height: 'auto'  
                }}
                onClick={() => handleObjectFound('Meja')}
            />

            <button
                onClick={() => setShowObjectCard(true)}
                className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
            > 
                📖 Lihat Benda yang Dicari
            </button>

            {showObjectCard && (
                <CardObjectPerpustakaan
                    data={objectData} 
                    onClose={() => setShowObjectCard(false)}
                />
            )}
        </div>
    )
}


