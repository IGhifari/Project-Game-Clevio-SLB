import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import ruangtamuBg from '../assets/background/ruangtamu.png';
import foto from '../assets/object/rumah/foto.png';
import meja from '../assets/object/rumah/meja.png';
import vas from '../assets/object/rumah/vas.png';
import CardObjectruangtamu from './objectRumah/cardObjectKamar';
import RuangTamuStar from './pointStar/rumahStar/ruangTamuStar';

import WaktuMain from './waktu/waktuMain';
export default function RumahMain() {
    const [mission, setMission] = useState('');
    const [showObjectCard, setShowObjectCard] = useState(false);
    const [foundObjects, setFoundObjects] = useState([]);
    const [timeLeft, setTimeLeft] = useState(30);
    // Data benda kamar
    const objectData = [
        { name: 'foto', image: foto },
        { name: 'meja', image: meja },
        { name: 'vas', image: vas },
    ];

    useEffect(() => {
        Swal.fire({
            title: '<span style="font-family: Comic Sans MS">Misi Kamu Hari Ini!</span>',
            html: `
                <div style="font-family: Comic Sans MS">
                    <p class="text-lg">Temukan benda-benda di kamarmu:</p>
                    <ul class="text-left mt-4 space-y-2">
                        <li>1. Cari bantal berwarna kuning ${foto}</li>
                        <li>2. Temukan buku di rak buku</li>
                        <li>3. Cari mainan di lemari</li>
                    </ul>
                </div>
            `,
            icon: 'info',
            confirmButtonText: 'Siap, Aku Mengerti!',
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
                backgroundImage: `url(${ruangtamuBg})`,
                imageRendering: 'pixelated'
            }}
        >
            
            <WaktuMain timeLeft={timeLeft} totalTime={30} />
            <RuangTamuStar foundObjects={foundObjects} />
            <img 
                src={foto}
                alt="foto"
                className="absolute cursor-pointer   transition-transform"
                style={{
                    top: '22%',    // Adjust these values to position the pillow
                    left: '6.1%',   // where you want it on the background
                    width: '130px', // Adjust size as needed
                    height: 'auto'  
                }}
                onClick={() => {
                    Swal.fire({
                        title: 'Hebat!',
                        text: 'Kamu menemukan foto!',
                        icon: 'success',
                        confirmButtonText: 'Oke!',
                        confirmButtonColor: '#4CAF50'
                    });
                }}
            />

            <img 
                src={meja}
                alt="meja"
                className="absolute cursor-pointer   transition-transform"
                style={{
                    top: '79%',    // Adjust these values to position the pillow
                    left: '40.7%',   // where you want it on the background
                    width: '300px', // Adjust size as needed
                    height: 'auto'  
                }}
                onClick={() => {
                    Swal.fire({
                        title: 'Hebat!',
                        text: 'Kamu menemukan Meja!',
                        icon: 'success',
                        confirmButtonText: 'Oke!',
                        confirmButtonColor: '#4CAF50'
                    });
                }}
            />
            <img 
                src={vas}
                alt="Bantal"
                className="absolute cursor-pointer   transition-transform"
                style={{
                    top: '65%',    // Adjust these values to position the pillow
                    left: '85%',   // where you want it on the background
                    width: '170px', // Adjust size as needed
                    height: 'auto'  
                }}
                onClick={() => {
                    Swal.fire({
                        title: 'Hebat!',
                        text: 'Kamu menemukan Vas!',
                        icon: 'success',
                        confirmButtonText: 'Oke!',
                        confirmButtonColor: '#4CAF50'
                    });
                }}
            />

            

            {/* Button to show object card */}
            <button
                onClick={() => setShowObjectCard(true)}
                className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
            > 
                📖 Lihat Benda yang dicari
            </button>

            {/* Render CardObjectKamar when showObjectCard is true */}
            {showObjectCard && (
                <CardObjectruangtamu 
                    data={objectData} 
                    onClose={() => setShowObjectCard(false)}
                />
            )}
        </div>
    );
}