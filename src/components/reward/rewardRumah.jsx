import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Reward() {
    const [stars, setStars] = useState({
        rumah: 0,
        kamarMandi: 0,
        ruangTamu: 0
    });
    const [sekolahUnlocked, setSekolahUnlocked] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Ambil bintang dari localStorage
        const rumahStars = parseInt(localStorage.getItem('rumahStars')) || 0;
        const kamarMandiStars = parseInt(localStorage.getItem('kamarMandiStars')) || 0;
        const ruangTamuStars = parseInt(localStorage.getItem('ruangTamuStars')) || 0;

        const totalStars = rumahStars + kamarMandiStars + ruangTamuStars;

        // Simpan state
        setStars({
            rumah: rumahStars,
            kamarMandi: kamarMandiStars,
            ruangTamu: ruangTamuStars
        });

        // Cek apakah Sekolah dibuka
        if (totalStars >= 9) {
            setSekolahUnlocked(true);
            localStorage.setItem('sekolahUnlocked', 'true');
        }
    }, []);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-yellow-100 p-6 font-sans text-center">
            <h1 className="text-3xl font-bold mb-6">🎁 Halaman Reward</h1>

            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
                <h2 className="text-xl mb-4 font-semibold">Bintang yang Kamu Dapatkan:</h2>
                <ul className="text-left space-y-2 text-lg">
                    <li>🏠 Rumah Main: {stars.rumah} ⭐</li>
                    <li>🚿 Kamar Mandi: {stars.kamarMandi} ⭐</li>
                    <li>🛋️ Ruang Tamu: {stars.ruangTamu} ⭐</li>
                </ul>

                <div className="mt-6">
                    <p className="text-lg font-semibold">
                        Total: {stars.rumah + stars.kamarMandi + stars.ruangTamu} ⭐
                    </p>

                    {sekolahUnlocked ? (
                        <div className="mt-4">
                            <p className="text-green-600 font-bold">🎓 Level Sekolah Telah Terbuka!</p>
                            <button 
                                onClick={() => navigate('/level')}
                                className="mt-3 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full"
                            >
                                Ke Halaman Level
                            </button>
                        </div>
                    ) : (
                        <p className="text-red-500 mt-4">Selesaikan semua lokasi untuk membuka level Sekolah.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
