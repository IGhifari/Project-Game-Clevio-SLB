import { useState, useEffect } from 'react';
import React from 'react';
import sekolahmainBg from '../assets/background/sekolahMain.jpg';
import jamSekolah from '../assets/object/classSekolah/jamClass.png';
import papanTulis from '../assets/object/classSekolah/papanTulisClass.png';
import bukuClass from '../assets/object/classSekolah/bukuClass.png';
import CardObjectKelas from './objectSekolah/cardObjectKelas';
import Swal from 'sweetalert2';
import ClassStar from './pointStar/sekolahStar/classStar';
import WaktuMain from './waktu/waktuMain';
import ButtonKembaliTemukanBenda from './buttonKembali/buttonKembaliTemukanBenda';
export default function SekolahMain() {
    const [mission, setMission] = useState('');
    const [showObjectCard, setShowObjectCard] = useState(false);
    const [foundObjects, setFoundObjects] = useState([]);
    const [timeLeft, setTimeLeft] = useState(30);
    const [isTimerStarted, setIsTimerStarted] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);
    const objectData = [
        { name: 'Jam Dinding', image: jamSekolah},
        { name: 'Papan Tulis', image: papanTulis },
        { name: 'Buku Di rak', image:  bukuClass},
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
                localStorage.setItem('sekolahmain_completed', 'true');
                showVictoryCard(3);
            }
        }
    };

    useEffect(() => {
        Swal.fire({
            title: '<span style="font-family: Comic Sans MS; font-size: 22px;">📜 Misi Kamu Hari Ini!</span>',
            html: `
                <div style="font-family: Comic Sans MS; font-size: 18px;">
                    <p style="margin-bottom: 10px;">👀 Ayo cari benda-benda di kelas:</p>
                    <ul style="text-align: left;">
                        <li>⏰ Cari jam dinding</li>
                        <li>📝 Cari papan tulis</li>
                        <li>📚 Cari buku di rak</li>
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
                setMission('Temukan benda-benda di kelas');
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
        localStorage.setItem('sekolahmain_stars', starsEarned);
        localStorage.setItem('sekolahmain_completed', 'true');

        Swal.fire({
            title: '🎉 Level Selesai!',
            html: `
                <div style="font-family: Comic Sans MS; font-size: 18px;">
                    <p>Kamu mendapatkan ${starsEarned} bintang!</p>
                    <p>${'⭐'.repeat(starsEarned)}</p>
                    <p class="mt-4">Ayo lanjut ke Lapangan Sekolah!</p>
                </div>
            `,
            icon: 'success',
            confirmButtonText: '➡️ Lanjut ke Lapangan Sekolah',
            confirmButtonColor: '#4CAF50'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = '/lapanganSekolah';
            }
        });
    };

    return (
        <div
            className="min-h-screen w-full bg-cover bg-center bg-no-repeat relative"
            style={{
                backgroundImage: `url(${sekolahmainBg})`,
                imageRendering: 'pixelated'
            }}
        >
            <WaktuMain timeLeft={timeLeft} totalTime={30} />
            <ClassStar foundObjects={foundObjects} />
            <ButtonKembaliTemukanBenda/>
            <img
                src={jamSekolah}
                alt="Jam"
                className="absolute cursor-pointer "
                style={{
                    top: '14.5%',
                    left: '82%',
                    width: '200px',
                    height: 'auto'
                }}
                onClick={() => handleObjectFound('⏰ Jam Dinding')}
            />

            <img
                src={papanTulis}
                alt="Papan Tulis"
                className="absolute cursor-pointer "
                style={{
                    top: '22%',
                    left: '54%',
                    width: '400px',
                    height: 'auto'
                }}
                onClick={() => handleObjectFound('📝 Papan Tulis')}
            />

            <img
                src={bukuClass}
                alt="Buku"
                className="absolute cursor-pointer "
                style={{
                    top: '51.8%',
                    left: '88.7%',
                    width: '115px',
                    height: 'auto'
                }}
                onClick={() => handleObjectFound('📚 Buku Di rak')}
            />

            <button
                onClick={() => setShowObjectCard(true)}
                className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-600"
            >
                📖 Lihat Benda yang Dicari
            </button>

            {showObjectCard && (
                <CardObjectKelas
                    data={objectData}
                    onClose={() => setShowObjectCard(false)}
                />
            )}
        </div>
    );
}