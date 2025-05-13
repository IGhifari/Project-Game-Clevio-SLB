import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'animate.css';
import cardSekolah from "../../assets/background/cardsekolah.png";
export default function Reward() {
    const [totalStars, setTotalStars] = useState(0);
    const [roomStars, setRoomStars] = useState({
        rumahmain: 0,
        kamarmandi: 0,
        ruangtamu: 0
    });
    const [sekolahUnlocked, setSekolahUnlocked] = useState(false);
    const navigate = useNavigate();

    const showCompletionMessage = () => {
        Swal.fire({
            title: '🎉 Hebat!',
            html: `
                <div class="text-lg">
                    <p><strong>Semua bintang telah terkumpul!</strong></p>
                    <p>🏫 Level Sekolah Siap Dimainkan!</p>
                </div>`,
            icon: 'success',
            confirmButtonText: 'Lanjutkan',
            confirmButtonColor: '#38b000'
        });
    };

    useEffect(() => {
        const rumahmainStars = parseInt(localStorage.getItem('rumahmain_stars')) || 0;
        const kamarMandiStars = parseInt(localStorage.getItem('kamarmandi_stars')) || 0;
        const ruangTamuStars = parseInt(localStorage.getItem('ruangtamu_stars')) || 0;

        setRoomStars({
            rumahmain: rumahmainStars,
            kamarmandi: kamarMandiStars,
            ruangtamu: ruangTamuStars
        });

        const total = rumahmainStars + kamarMandiStars + ruangTamuStars;
        setTotalStars(total);

        if (total === 9) {
            localStorage.setItem('sekolahUnlocked', 'true');
            setSekolahUnlocked(true);
            showCompletionMessage();
        } else {
            const unlocked = localStorage.getItem('sekolahUnlocked') === 'true';
            setSekolahUnlocked(unlocked);
        }
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-100 to-yellow-100 p-6 flex items-center justify-center">
            <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-8 border-4 border-yellow-300 animate__animated animate__fadeInUp">
                <h1 className="text-4xl font-extrabold text-center mb-8 text-yellow-600">
                    🏆 Ruang Penghargaan
                </h1>

                <div className="space-y-6">
                    <div className="bg-yellow-50 p-4 rounded-2xl shadow-inner border border-yellow-200">
                        <h2 className="text-2xl font-bold mb-3 text-center text-yellow-700">⭐ Bintang yang Terkumpul</h2>
                        <ul className="space-y-2 text-lg text-center">
                            <li>🏠 Kamar Tidur: <strong>{roomStars.rumahmain} ⭐</strong></li>
                            <li>🚿 Kamar Mandi: <strong>{roomStars.kamarmandi} ⭐</strong></li>
                            <li>🛋️ Ruang Tamu: <strong>{roomStars.ruangtamu} ⭐</strong></li>
                        </ul>
                    </div>

                    <div className="text-center bg-pink-50 rounded-xl py-6 shadow-md border border-pink-200">
                        <h3 className="text-2xl font-semibold text-pink-600 mb-2">Total Bintang</h3>
                        <p className="text-5xl font-bold text-pink-500 animate__animated animate__pulse animate__infinite">
                            {totalStars} ⭐
                        </p>
                    </div>

                    {sekolahUnlocked && (
                        <div className="text-center">
                            <p className="text-green-600 text-lg font-semibold mb-4">
                                🎓 Level Sekolah Sudah Terbuka!
                            </p>
                            <img
                                src={cardSekolah}
                                alt="Sekolah Terbuka"
                                className="mx-auto w-32 h-32 animate__animated animate__bounceIn"
                            />
                        </div>
                    )}

                    <div className="flex justify-center gap-4 mt-6">
                        <button
                            onClick={() => navigate('/halamanlevel')}
                            className="px-3 py-1 bg-blue-400 cursor-pointer hover:bg-blue-500 text-white rounded-full transition-all"
                        >
                            🔙 Kembali ke halaman level
                        </button>
                        {sekolahUnlocked && (
                            <button
                                onClick={() => navigate('/sekolahmain')}
                                className="px-6 py-2 bg-green-500 cursor-pointer hover:bg-green-600 text-white rounded-full transition-all  "
                            >
                                🚀 Mulai Sekolah
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
