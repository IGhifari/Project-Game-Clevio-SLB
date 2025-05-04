import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import kamarMandiRumahBg from '../assets/background/kamarmandiRumah.png';
import PastaGigi from '../assets/object/kamarMandiRumah/pastaGigi.png';
import kesetKamarMandi from '../assets/object/kamarMandiRumah/kesetKamarMandi.png';
import jendelaKamarMandi from '../assets/object/kamarMandiRumah/jendelaKamarMandi.png'
import CardObjectKamar from './objectRumah/cardObjectKamar';
import kamarStar from './pointStar/rumahStar/kamarStar';

export default function KamarMandiRumah() {
    const [mission, setMission] = useState('');
    const [showObjectCard, setShowObjectCard] = useState(false);
    const [foundObjects, setFoundObjects] = useState([]);

    const objectData = [
        { name: '🪥 Pasta Gigi', image: PastaGigi },
        { name: '🧼 Keset Kamar Mandi', image: kesetKamarMandi },
        { name: '🧴 Jendela Kamar Mandi', image: jendelaKamarMandi},
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

            if (foundObjects.length === 2) {
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
            title: '<span style="font-family: Comic Sans MS">Misi di Kamar Mandi!</span>',
            html: `
                <div style="font-family: Comic Sans MS">
                    <p class="text-lg">🔍 Temukan benda-benda di kamar mandi:</p>
                    <ul class="text-left mt-4 space-y-2">
                        <li>1. Cari sikat gigi</li>
                        <li>2. Temukan sabun mandi</li>
                        <li>3. Cari handuk</li>
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

    return (
        <div className="min-h-screen w-full bg-cover bg-center bg-no-repeat relative"
             style={{
                 backgroundImage: `url(${kamarMandiRumahBg})`,
                 imageRendering: 'pixelated'
             }}>
            
            <kamarStar foundObjects={foundObjects} />

            {/* Button to show object card */}
            <button
                onClick={() => setShowObjectCard(true)}
                className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
            >
                📖 Lihat Benda
            </button>

            {showObjectCard && (
                <CardObjectKamarMandi 
                    data={objectData} 
                    onClose={() => setShowObjectCard(false)}
                />
            )}
        </div>
    );
}