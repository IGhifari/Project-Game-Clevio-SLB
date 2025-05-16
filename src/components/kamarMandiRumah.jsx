import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import kamarMandiRumahBg from '../assets/background/kamarmandiRumah.png';
import PastaGigi from '../assets/object/kamarMandiRumah/pastaGigi.png';
import kesetKamarMandi from '../assets/object/kamarMandiRumah/kesetKamarMandi.png';
import jendelaKamarMandi from '../assets/object/kamarMandiRumah/jendelaKamarMandi.png';
import CardObjectKamarMandi from './objectRumah/cardObjectKamarMandi';
import KamarStar from './pointStar/rumahStar/kamarStar';
import WaktuMain from './waktu/waktuMain';
import ButtonKembaliTemukanBenda from './buttonKembali/buttonKembaliTemukanBenda';
export default function KamarMandiRumah() {
    const [mission, setMission] = useState('');
    const [showObjectCard, setShowObjectCard] = useState(false);
    const [foundObjects, setFoundObjects] = useState([]);
    const [timeLeft, setTimeLeft] = useState(30); // Waktu dalam detik
    const [isGameOver, setIsGameOver] = useState(false);
    const [isMissionShown, setIsMissionShown] = useState(false); // Tambahkan state ini

    const objectData = [
        { name: '🪥 Pasta GiGi', image: PastaGigi },
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
                <div style="font-family: Comic Sans MS; font-size: 18px;">
                    <p style="margin-bottom: 10px;">👀 Ayo cari benda-benda di kamar mandimu:</p>
                    <ul style="text-align: left; margin-top: 20px;">
                        <li>🪥 Cari Pasta Gigi</li>
                        <li>🛁 Temukan keset</li>
                        <li>🚪 Cari jendela</li>
                    </ul>
                     <p style="margin-top: 20px;">🎯 Tekan benda jika kamu menemukannya!</p>
                </div>
            `,
            icon: 'info',
            confirmButtonText: 'Siap, Aku Mengerti!',
            confirmButtonColor: '#4CAF50',
            background: '#FFF9C4',
        }).then((result) => {
            if (result.isConfirmed) {
                setMission('Temukan benda-benda di kamar mandi');
                setIsMissionShown(true); // Aktifkan timer setelah Swal ditutup
            }
        });
    }, []);

    // Sistem waktu
    useEffect(() => {
        if (isMissionShown && timeLeft > 0) { // Timer hanya berjalan jika misi sudah ditampilkan
            const timer = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else if (timeLeft === 0 && !isGameOver) {
            setIsGameOver(true);
            showVictoryCard(foundObjects.length); // Tampilkan kartu berdasarkan jumlah bintang
        }
    }, [isMissionShown, timeLeft, isGameOver]);

    const showVictoryCard = (starsEarned) => {
        // Save stars for this stage
        localStorage.setItem('kamarmandi_stars', starsEarned);
        localStorage.setItem('kamarmandi_completed', 'true');

        Swal.fire({
            title: '🎉 Level Selesai!',
            html: `
                <div style="font-family: Comic Sans MS; font-size: 18px;">
                    <p>Kamu mendapatkan ${starsEarned} bintang!</p>
                    <p>${'⭐'.repeat(starsEarned)}</p>
                    <p class="mt-4">Ayo lanjut ke Ruang Tamu!</p>
                </div>
            `,
            icon: 'success',
            confirmButtonText: '➡️ Lanjut ke Ruang Tamu',
            confirmButtonColor: '#4CAF50'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = '/ruangtamu';
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

            <ButtonKembaliTemukanBenda/>

            {/* Sikat Gigi */}
            <img
                src={PastaGigi}
                alt="Sikat Gigi"
                className="absolute cursor-pointer transition-transform "
                style={{
                    top: '47%',
                    left: '19.3%',
                    width: '70px',
                    height: 'auto'
                }}
                onClick={() => handleObjectFound('Pasta GiGi')}
            />

            {/* Keset */}
            <img
                src={kesetKamarMandi}
                alt="Keset"
                className="absolute cursor-pointer transition-transform "
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
                className="absolute cursor-pointer transition-transform "
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