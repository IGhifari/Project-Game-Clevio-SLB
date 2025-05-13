import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'animate.css';   

export default function RewardSekolah() {
    const [totalStars, setTotalStars] = useState(0);
    const [roomStars, setRoomStars] = useState({
        sekolahmain: 0,
        lapangansekolah: 0,
        perpustakaansekolah: 0
    });
    const [allCompleted, setAllCompleted] = useState(false);
    const navigate = useNavigate();

    const showCompletionMessage = () => {
        Swal.fire({
            title: '🎉 Selamat!',
            html: `
                <div class="text-lg">
                    <p><strong>Semua level sekolah telah selesai!</strong></p>
                    <p>🎮 Kamu telah menyelesaikan semua level!</p>
                </div>`,
            icon: 'success',
            confirmButtonText: 'Lanjutkan',
            confirmButtonColor: '#38b000'
        });
    };

    useEffect(() => {
        const sekolahmainStars = parseInt(localStorage.getItem('sekolahmain_stars')) || 0;
        const lapanganSekolahStars = parseInt(localStorage.getItem('lapangansekolah_stars')) || 0;
        const perpustakaanSekolahStars = parseInt(localStorage.getItem('perpustakaansekolah_stars')) || 0;

        setRoomStars({
            sekolahmain: sekolahmainStars,
            lapangansekolah: lapanganSekolahStars,
            perpustakaansekolah: perpustakaanSekolahStars
        });

        const total = sekolahmainStars + lapanganSekolahStars + perpustakaanSekolahStars;
        setTotalStars(total);

        if (total === 9) {
            setAllCompleted(true);
            showCompletionMessage();
        }
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-6 flex items-center justify-center">
            <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-8 border-4 border-blue-300 animate__animated animate__fadeInUp">
                <h1 className="text-4xl font-extrabold text-center mb-8 text-blue-600">
                    🏆 Ruang Penghargaan Sekolah
                </h1>

                <div className="space-y-6">
                    <div className="bg-blue-50 p-4 rounded-2xl shadow-inner border border-blue-200">
                        <h2 className="text-2xl font-bold mb-3 text-center text-blue-700">⭐ Bintang yang Terkumpul</h2>
                        <ul className="space-y-2 text-lg text-center">
                            <li>🏫 Kelas: <strong>{roomStars.sekolahmain} ⭐</strong></li>
                            <li>🏀 Lapangan: <strong>{roomStars.lapangansekolah} ⭐</strong></li>
                            <li>📚 Perpustakaan: <strong>{roomStars.perpustakaansekolah} ⭐</strong></li>
                        </ul>
                    </div>

                    <div className="text-center bg-purple-50 rounded-xl py-6 shadow-md border border-purple-200">
                        <h3 className="text-2xl font-semibold text-purple-600 mb-2">Total Bintang</h3>
                        <p className="text-5xl font-bold text-purple-500 animate__animated animate__pulse animate__infinite">
                            {totalStars} ⭐
                        </p>
                    </div>

                    {allCompleted && (
                        <div className="text-center">
                            <p className="text-green-600 text-lg font-semibold mb-4">
                                🎓 Semua Level Sekolah Selesai!
                            </p>
                            
                        </div>
                    )}

                    <div className="flex justify-center gap-4 mt-6">
                        <button
                            onClick={() => navigate('/halamanlevel')}
                            className="px-6 py-2 bg-blue-400 cursor-pointer hover:bg-blue-500 text-white rounded-full transition-all"
                        >
                            🔙 Kembali
                        </button>
                        {allCompleted && (
                            <button
                                onClick={() => navigate('/halamanLevelPekerjaan')}
                                className="px-6 py-2 bg-green-500 cursor-pointer hover:bg-green-600 text-white rounded-full transition-all "
                            >
                                🎮 Lanjut ke game berikutnya
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
