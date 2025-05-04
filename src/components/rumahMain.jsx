import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import rumahmainBg from '../assets/background/rumahMain.png';
import bantalRumah from '../assets/object/rumah/bantalRumah.png';
import lampuTidur from '../assets/object/rumah/lampuRumah.png';
import bonekaBebek from '../assets/object/rumah/bonekaBebekRumah.png';
import CardObjectKamar from './objectRumah/cardObjectKamar';
import RumahStar from './pointStar/rumahStar/rumahStar';

export default function RumahMain() {
    const [mission, setMission] = useState('');
    const [showObjectCard, setShowObjectCard] = useState(false);
    const [foundObjects, setFoundObjects] = useState([]);

    const objectData = [
        { name: '🟡 Bantal', image: bantalRumah },
        { name: '💡 Lampu Tidur', image: lampuTidur },
        { name: '🧸 Boneka Bebek', image: bonekaBebek },
    ];

    const handleObjectFound = (objectName) => {
        if (!foundObjects.includes(objectName)) {
            setFoundObjects([...foundObjects, objectName]);
            
            Swal.fire({
                title: '🎉 Hebat!',
                html: `<p style="font-size: 18px;">Kamu menemukan <strong>${objectName}!</strong></p>`,
                icon: 'success',
                confirmButtonText: '👍 Oke!',
                confirmButtonColor: '#4CAF50'
            });

            // Check if all objects are found
            if (foundObjects.length === 2) { // When finding the last object
                setTimeout(() => {
                    Swal.fire({
                        title: '🌟 Selamat! 🌟',
                        html: '<p style="font-size: 18px;">Kamu berhasil menemukan semua benda!</p>',
                        icon: 'success',
                        confirmButtonText: '🎉 Yeay!',
                        confirmButtonColor: '#4CAF50'
                    });
                }, 1000);
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
            }
        });
    }, []);

    return (
        <div
            className="min-h-screen w-full bg-cover bg-center bg-no-repeat relative"
            style={{
                backgroundImage: `url(${rumahmainBg})`,
                imageRendering: 'pixelated'
            }}
        >
            {/* Add RumahStar component */}
            <RumahStar foundObjects={foundObjects} />

            {/* Bantal */}
            <img
                src={bantalRumah}
                alt="Bantal"
                className="absolute cursor-pointer transition-transform hover:scale-105"
                style={{
                    top: '72%',
                    left: '72.5%',
                    width: '310px',
                    height: 'auto'
                }}
                onClick={() => handleObjectFound('🟡 Bantal')}
            />

            {/* Lampu Tidur */}
            <img
                src={lampuTidur}
                alt="Lampu Tidur"
                className="absolute cursor-pointer transition-transform hover:scale-105"
                style={{
                    top: '33.2%',
                    left: '85%',
                    width: '157px',
                    height: 'auto'
                }}
                onClick={() => handleObjectFound('💡 Lampu Tidur')}
            />

            {/* Boneka Bebek */}
            <img
                src={bonekaBebek}
                alt="Boneka Bebek"
                className="absolute cursor-pointer transition-transform hover:scale-105"
                style={{
                    top: '7.1%',
                    left: '46.6%',
                    width: '85px',
                    height: 'auto'
                }}
                onClick={() => handleObjectFound('🧸 Boneka Bebek')}
            />

            {/* Tombol lihat benda */}
            <button
                onClick={() => setShowObjectCard(true)}
                className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-full cursor-pointer shadow-lg hover:bg-blue-600 transition-colors"
            >
                📖 Lihat Benda yang Dicari
            </button>

            {/* Tampilkan kartu benda */}
            {showObjectCard && (
                <CardObjectKamar
                    data={objectData}
                    onClose={() => setShowObjectCard(false)}
                />
            )}
        </div>
    );
}
