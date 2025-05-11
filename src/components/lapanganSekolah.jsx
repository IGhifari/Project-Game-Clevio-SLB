import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import lapanganBg from '../assets/background/lapanganSekolah.png';
import bunga from '../assets/object/lapangan_sekolah/bunga.png';
import basket from '../assets/object/lapangan_sekolah/basket.png';
import ayunan from '../assets/object/lapangan_sekolah/ayunan.png';
import CardObjectlapangan from './objectSekolah/cardObjectlapangan';

export default function RumahMain() {
    const [mission, setMission] = useState('');
    const [showObjectCard, setShowObjectCard] = useState(false);

    // Data benda kamar
    const objectData = [
        { name: 'bunga', image: bunga },
        { name: 'basket', image: basket },
        { name: 'ayunan', image: ayunan },
    ];

    useEffect(() => {
        Swal.fire({
            title: '<span style="font-family: Comic Sans MS">Misi Kamu Hari Ini!</span>',
            html: `
                <div style="font-family: Comic Sans MS">
                    <p class="text-lg">Temukan benda-benda di kamarmu:</p>
                    <ul class="text-left mt-4 space-y-2">
                        <li>1. Cari bantal berwarna kuning ${bunga  }</li>
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
                backgroundImage: `url(${lapanganBg})`,
                imageRendering: 'pixelated'
            }}
        >
            
            <img 
                src={bunga}
                alt="bunga"
                className="absolute cursor-pointer   transition-transform"
    
                style={{
                    top: '41.2%',    // Adjust these values to position the pillow
                    left: '5%',   // where you want it on the background
                    width: '130px', // Adjust size as needed
                    height: 'auto'  
                }}
                onClick={() => {
                    Swal.fire({
                        title: 'Hebat!',
                        text: 'Kamu menemukan bunga!',
                        icon: 'success',
                        confirmButtonText: 'Oke!',
                        confirmButtonColor: '#4CAF50'
                    });
                }}
            />

            <img 
                src={basket}
                alt="basket"
                className="absolute cursor-pointer   transition-transform"
              
                style={{
                    top: '79.2%',    // Adjust these values to position the pillow
                    left: '3.8%',   // where you want it on the background
                    width: '83px', // Adjust size as needed
                    height: 'auto'  
                }}
                onClick={() => {
                    Swal.fire({
                        title: 'Hebat!',
                        text: 'Kamu menemukan bola basket!',
                        icon: 'success',
                        confirmButtonText: 'Oke!',
                        confirmButtonColor: '#4CAF50'
                    });
                }}
            />
            <img 
                src={ayunan}
                alt="ayunan"
                className="absolute cursor-pointer   transition-transform"
             
                style={{
                    top: '37.4%',    // Adjust these values to position the pillow
                    left: '88.3%',   // where you want it on the background
                    width: '180px', // Adjust size as needed
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
                <CardObjectlapangan 
                    data={objectData} 
                    onClose={() => setShowObjectCard(false)}
                />
            )}
        </div>
    );
}