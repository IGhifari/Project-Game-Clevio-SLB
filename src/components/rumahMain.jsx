import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import rumahmainBg from '../assets/background/rumahMain.png';
import bantalRumah from '../assets/object/rumah/bantalRumah.png';
import lampuTidur from '../assets/object/rumah/lampuRumah.png';
import bonekaBebek from '../assets/object/rumah/bonekaBebekRumah.png';
import CardObjectKamar from './objectRumah/cardObjectKamar';
import RumahStar from './pointStar/rumahStar/rumahStar';
import WaktuMain from './waktu/waktuMain';
import ButtonKembaliTemukanBenda from './buttonKembali/buttonKembaliTemukanBenda';
export default function RumahMain() {
    const [mission, setMission] = useState('');
    const [showObjectCard, setShowObjectCard] = useState(false);
    const [foundObjects, setFoundObjects] = useState([]);
    const [timeLeft, setTimeLeft] = useState(30);
    const [isTimerStarted, setIsTimerStarted] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);

    const objectData = [
        { name: '🟡 Bantal', image: bantalRumah },
        { name: '💡 Lampu Tidur', image: lampuTidur },
        { name: '🧸 Boneka', image: bonekaBebek },
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
                // Simpan progres ke localStorage
                localStorage.setItem('rumahmain_completed', 'true');
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
                        <li>🧸 Cari boneka</li>
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
        // Save stars for this stage
        localStorage.setItem('rumahmain_stars', starsEarned);
        localStorage.setItem('rumahmain_completed', 'true');

        Swal.fire({
            title: '🎉 Level Selesai!',
            html: `
                <div style="font-family: Comic Sans MS; font-size: 18px;">
                    <p>Kamu mendapatkan ${starsEarned} bintang!</p>
                    <p>${'⭐'.repeat(starsEarned)}</p>
                    <p class="mt-4">Ayo lanjut ke Kamar Mandi!</p>
                </div>
            `,
            icon: 'success',
            confirmButtonText: '➡️ Lanjut ke Kamar Mandi',
            confirmButtonColor: '#4CAF50'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = '/kamarMandiRumah';
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
            <WaktuMain timeLeft={timeLeft} totalTime={30} />
            <RumahStar foundObjects={foundObjects} />
            <ButtonKembaliTemukanBenda/>

            <img src={bantalRumah} alt="Bantal" className="absolute cursor-pointer "
                style={{ top: '71%', left: '72.5%', width: '310px' }}
                onClick={() => handleObjectFound('🟡 Bantal')} />
            <img src={lampuTidur} alt="Lampu Tidur" className="absolute cursor-pointer "
                style={{ top: '34.5%', left: '85%', width: '160px' }}
                onClick={() => handleObjectFound('💡 Lampu Tidur')} />
            <img src={bonekaBebek} alt="Boneka Bebek" className="absolute cursor-pointer "
                style={{ top: '10.3%', left: '46.6%', width: '85px' }}
                onClick={() => handleObjectFound('🧸 Boneka')} />

            <button onClick={() => setShowObjectCard(true)}
                className="fixed bottom-4 cursor-pointer right-4 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-600">
                📖 Lihat Benda yang Dicari
            </button>

            {showObjectCard && (
                <CardObjectKamar
                    data={objectData}
                    onClose={() => setShowObjectCard(false)}
                />
            )}
        </div>
    );
}
