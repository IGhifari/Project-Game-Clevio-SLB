import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import ruangtamuBg from '../assets/background/ruangtamu.png';
import foto from '../assets/object/rumah/foto.png';
import meja from '../assets/object/rumah/meja.png';
import vas from '../assets/object/rumah/vas.png';
import CardObjectruangtamu from './objectRumah/cardObjectKamar';
import RuangTamuStar from './pointStar/rumahStar/ruangTamuStar';
import WaktuMain from './waktu/waktuMain';
import ButtonKembaliTemukanBenda from './buttonKembali/buttonKembaliTemukanBenda';
export default function RuangTamuMain() {
    const [mission, setMission] = useState('');
    const [showObjectCard, setShowObjectCard] = useState(false);
    const [foundObjects, setFoundObjects] = useState([]);
    const [timeLeft, setTimeLeft] = useState(null); // Timer belum jalan
    const [isGameOver, setIsGameOver] = useState(false);

    const objectData = [
        { name: '🖼️ Foto', image: foto },
        { name: '🪑 Meja', image: meja },
        { name: '🌸 Vas', image: vas },
    ];

    // Tampilkan misi saat pertama kali masuk
    useEffect(() => {
        Swal.fire({
            title: '<span style="font-family: Comic Sans MS; font-size: 22px;">📜 Misi Kamu Hari Ini!</span>',
            html: `
                <div style="font-family: Comic Sans MS">
                    <p class="text-lg">👀 Ayo cari benda-benda di ruang tamu:</p>
                    <ul class="text-left mt-4 space-y-2">
                        <li>🖼️ Cari foto</li>
                        <li>🪑 Temukan meja</li>
                        <li>🌸 Cari vas bunga</li>
                    </ul>
                    <p style="margin-top: 20px;">🎯 Tekan benda jika kamu menemukannya!</p>
                </div>
            `,
            icon: 'info',
            confirmButtonText: '✅ Siap!',
            confirmButtonColor: '#4CAF50',
            background: '#FFF9C4',
        }).then((result) => {
            if (result.isConfirmed) {
                setMission('Temukan benda di ruang tamu');
                setTimeLeft(30); // Waktu mulai setelah user klik Siap
            }
        });
    }, []);

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else if (timeLeft === 0 && !isGameOver) {
            setIsGameOver(true);
            showVictoryCard(foundObjects.length);
        }
    }, [timeLeft, isGameOver]);

    const handleObjectFound = (objectName) => {
        if (!foundObjects.includes(objectName)) {
            const updated = [...foundObjects, objectName];
            setFoundObjects(updated);

            Swal.fire({
                title: '🎉 Hebat!',
                html: `<p style="font-size: 18px;">Kamu menemukan <strong>${objectName}</strong>!</p>`,
                icon: 'success',
                confirmButtonText: '👍 Oke!',
                confirmButtonColor: '#4CAF50'
            });

            if (updated.length === 3) {
                setTimeLeft(-1);
                // Simpan ke localStorage
                localStorage.setItem('ruangTamuStars', 3);
                showVictoryCard(3);
            }
        }
    };

    const showVictoryCard = (starsEarned) => {
        // Save stars for this stage
        localStorage.setItem('ruangtamu_stars', starsEarned);
        localStorage.setItem('ruangtamu_completed', 'true');

        const totalStars = 
            parseInt(localStorage.getItem('rumahmain_stars') || 0) +
            parseInt(localStorage.getItem('kamarmandi_stars') || 0) +
            starsEarned;

        Swal.fire({
            title: '🎉 Semua Level Selesai!',
            html: `
                <div style="font-family: Comic Sans MS; font-size: 18px;">
                    <p>Kamu mendapatkan ${starsEarned} bintang di level ini!</p>
                    <p>${'⭐'.repeat(starsEarned)}</p>
                    <p class="mt-4">Total bintang: ${totalStars} ⭐</p>
                </div>
            `,
            icon: 'success',
            confirmButtonText: '🎁 Lihat Hadiah',
            confirmButtonColor: '#4CAF50'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = '/reward';
            }
        });
    };

    return (
        <div 
            className="min-h-screen w-full bg-cover bg-center bg-no-repeat relative"
            style={{
                backgroundImage: `url(${ruangtamuBg})`,
                imageRendering: 'pixelated'
            }}
        >
            {timeLeft !== null && (
                <WaktuMain timeLeft={timeLeft} totalTime={30} />
            )}

            <RuangTamuStar foundObjects={foundObjects} />

            <ButtonKembaliTemukanBenda/>

            {/* FOTO */}
            <img 
                src={foto}
                alt="foto"
                className="absolute cursor-pointer transition-transform "
                style={{ top: '22%', left: '6.1%', width: '130px' }}
                onClick={() => handleObjectFound('🖼️ Foto')}
            />

            {/* MEJA */}
            <img 
                src={meja}
                alt="meja"
                className="absolute cursor-pointer transition-transform "
                style={{ top: '79%', left: '40.7%', width: '300px' }}
                onClick={() => handleObjectFound('🪑 Meja')}
            />

            {/* VAS */}
            <img 
                src={vas}
                alt="Vas"
                className="absolute cursor-pointer transition-transform "
                style={{ top: '63.5%', left: '87.9%', width: '186px' }}
                onClick={() => handleObjectFound('🌸 Vas')}
            />

            {/* TOMBOL LIHAT */}
            <button
                onClick={() => setShowObjectCard(true)}
                className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
            > 
                📖 Lihat Benda yang Dicari
            </button> 

            {showObjectCard && (
                <CardObjectruangtamu 
                    data={objectData} 
                    onClose={() => setShowObjectCard(false)}
                />
            )}
        </div>
    );
}
