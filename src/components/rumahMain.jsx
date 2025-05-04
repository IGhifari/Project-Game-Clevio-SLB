import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import rumahmainBg from '../assets/background/rumahMain.png';
import bantalRumah from '../assets/object/rumah/bantalRumah.png';
import lampuTidur from '../assets/object/rumah/lampuRumah.png';
import bonekaBebek from '../assets/object/rumah/bonekaBebekRumah.png';
import CardObjectKamar from './objectRumah/cardObjectKamar';

export default function RumahMain() {
    const [mission, setMission] = useState('');
    const [showObjectCard, setShowObjectCard] = useState(false);

    // Data benda kamar
    const objectData = [
        { name: 'Bantal', image: bantalRumah },
        { name: 'Lampu Tidur', image: lampuTidur },
        { name: 'Boneka Bebek', image: bonekaBebek },
    ];

    useEffect(() => {
        Swal.fire({
            title: '<span style="font-family: Comic Sans MS">Misi Kamu Hari Ini!</span>',
            html: `
                <div style="font-family: Comic Sans MS">
                    <p class="text-lg">Temukan benda-benda di kamarmu:</p>
                    <ul class="text-left mt-4 space-y-2">
                        <li>1. Cari bantal berwarna kuning ${bantalRumah}</li>
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
                backgroundImage: `url(${rumahmainBg})`,
                imageRendering: 'pixelated'
            }}
        >
            {/* Add bantal image */}
            <img 
                src={bantalRumah}
                alt="Bantal"
                className="absolute cursor-pointer   transition-transform"
                style={{
                    top: '72%',    // Adjust these values to position the pillow
                    left: '72.5%',   // where you want it on the background
                    width: '310px', // Adjust size as needed
                    height: 'auto'  
                }}
                onClick={() => {
                    Swal.fire({
                        title: 'Hebat!',
                        text: 'Kamu menemukan bantal!',
                        icon: 'success',
                        confirmButtonText: 'Oke!',
                        confirmButtonColor: '#4CAF50'
                    });
                }}
            />

            <img 
                src={lampuTidur}
                alt="Bantal"
                className="absolute cursor-pointer   transition-transform"
                style={{
                    top: '33.2%',    // Adjust these values to position the pillow
                    left: '85%',   // where you want it on the background
                    width: '157px', // Adjust size as needed
                    height: 'auto'  
                }}
                onClick={() => {
                    Swal.fire({
                        title: 'Hebat!',
                        text: 'Kamu menemukan Lampu Tidur!',
                        icon: 'success',
                        confirmButtonText: 'Oke!',
                        confirmButtonColor: '#4CAF50'
                    });
                }}
            />
            <img 
                src={bonekaBebek}
                alt="Bantal"
                className="absolute cursor-pointer   transition-transform"
                style={{
                    top: '7.1%',    // Adjust these values to position the pillow
                    left: '46.6%',   // where you want it on the background
                    width: '85px', // Adjust size as needed
                    height: 'auto'  
                }}
                onClick={() => {
                    Swal.fire({
                        title: 'Hebat!',
                        text: 'Kamu menemukan Lampu Tidur!',
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
                <CardObjectKamar 
                    data={objectData} 
                    onClose={() => setShowObjectCard(false)}
                />
            )}
        </div>
    );
}