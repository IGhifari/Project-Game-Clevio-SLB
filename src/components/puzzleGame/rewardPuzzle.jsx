import React from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import confetti from 'canvas-confetti'; // Opsional: efek visual

export default function RewardPuzzle() {
    const navigate = useNavigate();

    const handleClick = () => {
        confetti(); // Efek visual konfeti (tidak bersuara)
        Swal.fire({
            title: 'Terima Kasih!',
            text: 'Kamu luar biasa! Terima kasih sudah menyelesaikan puzzle ini.',
            icon: 'success',
            confirmButtonText: 'Kembali ke Menu',
            background: '#fff',
            customClass: {
                title: 'swal-title',
                content: 'swal-content',
                confirmButton: 'swal-confirm-button'
            }
        }).then(() => {
            navigate('/halamanlevel');
        });
    };

    return (
        <div style={{
            background: 'linear-gradient(135deg, #a5d6a7 0%, #81c784 100%)',
            minHeight: '100vh',
            padding: '40px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <div style={{
                background: 'rgba(255,255,255,0.95)',
                padding: '40px',
                borderRadius: '20px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                textAlign: 'center',
                maxWidth: '600px',
                width: '90%',
            }}>
                <div style={{
                    fontSize: '4rem',
                    marginBottom: '10px',
                }}>
                    🏆🎉✨
                </div>

                <h1 style={{
                    color: '#388e3c',
                    fontSize: '2.5rem',
                    marginBottom: '20px',
                    fontFamily: 'Comic Sans MS, cursive',
                }}>
                    Selamat!
                </h1>

                <div style={{
                    fontSize: '1.4rem',
                    color: '#2e7d32',
                    marginBottom: '30px',
                    fontFamily: 'Comic Sans MS, cursive',
                }}>
                    Kamu telah menyelesaikan semua level puzzle!
                </div>

                <div style={{
                    background: '#f1f8e9',
                    padding: '20px',
                    borderRadius: '15px',
                    marginBottom: '30px',
                }}>
                    <h2 style={{
                        color: '#2e7d32',
                        fontSize: '1.6rem',
                        marginBottom: '15px',
                        fontFamily: 'Comic Sans MS, cursive',
                    }}>
                        Penghargaanmu:
                    </h2>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '15px',
                        alignItems: 'center',
                        fontFamily: 'Comic Sans MS, cursive',
                        fontSize: '1.3rem',
                        color: '#1b5e20',
                    }}>
                        <div>🏅 Puzzle Master</div>
                        <div>⭐ Problem Solver</div>
                        <div>🎯 Pattern Expert</div>
                    </div>
                </div>

                <button
                    onClick={handleClick}
                    style={{
                        background: '#81c784',
                        color: 'white',
                        border: 'none',
                        padding: '15px 30px',
                        fontSize: '1.2rem',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        fontFamily: 'Comic Sans MS, cursive',
                        transition: 'transform 0.2s, background-color 0.2s',
                    }}
                >
                    Kembali ke Menu
                </button>
            </div>

            <style>
                {`
                    .swal-title {
                        font-family: "Comic Sans MS", cursive !important;
                        font-size: 32px !important;
                        color: #81c784 !important;
                    }
                    .swal-content {
                        font-family: "Comic Sans MS", cursive !important;
                        font-size: 20px !important;
                    }
                    .swal-confirm-button {
                        font-family: "Comic Sans MS", cursive !important;
                        font-size: 18px !important;
                        padding: 10px 30px !important;
                        background: #81c784 !important;
                    }
                `}
            </style>
        </div>
    );
}
