import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import puzzleBg2 from '../../assets/background/puzzle2.png'; // Pastikan file ini ada di folder assets
import ButtonKembaliPuzzle from '../buttonKembali/buttonKembaliPuzzle';
export default function Puzzle2() {
    const [pieces, setPieces] = useState([]);
    const [slots, setSlots] = useState([]);
    const [draggedPiece, setDraggedPiece] = useState(null);
    const [isCompleted, setIsCompleted] = useState(false);
    const navigate = useNavigate();
    const puzzleSize = 2;

    useEffect(() => {
        showStartGamePopup();
        const newPieces = Array.from({ length: puzzleSize * puzzleSize }, (_, i) => ({
            id: i,
            correctPosition: i,
            currentPosition: null,
            image: puzzleBg2,
            backgroundPosition: `${(i % 2) * 100}% ${Math.floor(i / 2) * 100}%`,
        }));

        const shuffledPieces = [...newPieces].sort(() => Math.random() - 0.5);
        setPieces(shuffledPieces);

        const newSlots = Array.from({ length: puzzleSize * puzzleSize }, (_, i) => ({
            id: i,
            occupied: false,
            pieceId: null
        }));
        setSlots(newSlots);
    }, []);

    const showStartGamePopup = () => {
        Swal.fire({
            title: '🧩 Level 2 - Mari Bermain Puzzle!',
            html: `
                <div style="font-family: 'Comic Sans MS'">
                    <p>Susun potongan gambar dengan benar</p>
                    <p>Petunjuk:</p>
                    <ul style="text-align: left; margin-top: 10px;">
                        <li>✨ Drag & Drop potongan puzzle</li>
                        <li>✨ Lihat gambar asli sebagai panduan</li>
                        <li>✨ Klik potongan untuk mengembalikan</li>
                    </ul>
                </div>
            `,
            confirmButtonText: '🎮 Mulai Level 2!',
            confirmButtonColor: '#81c784',
            background: '#fff3e0',
            showClass: {
                popup: 'animate__animated animate__bounceIn'
            }
        });
    };

    const handleDragStart = (e, piece) => {
        setDraggedPiece(piece);
        e.dataTransfer.setData('text/plain', piece.id);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDrop = (e, slotId) => {
        e.preventDefault();
        if (!draggedPiece) return;

        const targetSlot = slots.find(slot => slot.id === slotId);
        const existingPieceId = targetSlot?.pieceId;

        const updatedPieces = pieces.map(piece => {
            if (piece.id === draggedPiece.id) {
                return { ...piece, currentPosition: slotId };
            }
            if (piece.id === existingPieceId) {
                return { ...piece, currentPosition: null };
            }
            return piece;
        });

        const updatedSlots = slots.map(slot => {
            if (slot.id === slotId) {
                return {
                    ...slot,
                    occupied: true,
                    pieceId: draggedPiece.id
                };
            }
            if (slot.pieceId === draggedPiece.id) {
                return {
                    ...slot,
                    occupied: false,
                    pieceId: null
                };
            }
            return slot;
        });

        setPieces(updatedPieces);
        setSlots(updatedSlots);
        setDraggedPiece(null);

        const allPiecesPlaced = updatedPieces.every(piece => piece.currentPosition !== null);
        
        if (allPiecesPlaced) {
            const isPuzzleComplete = updatedPieces.every(piece => {
                const slot = updatedSlots.find(s => s.pieceId === piece.id);
                return slot && slot.id === piece.correctPosition;
            });

            if (isPuzzleComplete) {
                setIsCompleted(true);
                Swal.fire({
                    title: 'Selamat!',
                    text: 'Yeayy, kamu berhasil menyelesaikan puzzle!',
                    icon: 'success',
                    confirmButtonText: 'Lanjutkan',
                    background: '#fff',
                    customClass: {
                        title: 'swal-title',
                        content: 'swal-content',
                        confirmButton: 'swal-confirm-button'
                    }
                }).then(() => {
                    navigate('/puzzlegame3'); // Akan diarahkan ke puzzle3
                });
            }
        }
    };

    const handleRemovePiece = (slotId) => {
        const pieceToRemove = slots.find((slot) => slot.id === slotId)?.pieceId;
        if (!pieceToRemove) return;

        const updatedPieces = pieces.map((piece) => {
            if (piece.id === pieceToRemove) {
                return { ...piece, currentPosition: null };
            }
            return piece;
        });

        const updatedSlots = slots.map((slot) => ({
            ...slot,
            occupied: slot.id === slotId ? false : slot.occupied,
            pieceId: slot.id === slotId ? null : slot.pieceId,
        }));

        setPieces(updatedPieces);
        setSlots(updatedSlots);
    };

    return (
        <div style={{
            background: 'linear-gradient(135deg, #81c784 0%, #4caf50 100%)',
            minHeight: '100vh',
            padding: '40px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Decorative elements */}
            <div className="puzzle-decorations">
                {Array.from({ length: 20 }).map((_, i) => (
                    <div
                        key={i}
                        className="puzzle-piece-decoration"
                        style={{
                            position: 'absolute',
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            width: '30px',
                            height: '30px',
                            background: 'rgba(255, 255, 255, 0.1)',
                            transform: `rotate(${Math.random() * 360}deg)`,
                            borderRadius: '5px',
                            animation: `float ${5 + Math.random() * 5}s infinite ease-in-out`
                        }}
                    />
                ))}
            </div>

            <ButtonKembaliPuzzle />
            
            <h1 style={{
                color: '#fff',
                fontSize: '3rem',
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                marginBottom: '40px',
                fontFamily: 'Comic Sans MS, cursive',
                animation: 'bounce 2s infinite'
            }}>
                🧩 Puzzle Game Level 2
            </h1>

            <div style={{
                display: 'flex',
                gap: '40px',
                alignItems: 'flex-start',
            }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: '10px',
                        padding: '20px',
                        background: 'rgba(255,255,255,0.9)',
                        borderRadius: '15px',
                        boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                    }}>
                        {pieces.map((piece) => (
                            !piece.currentPosition && (
                                <div
                                    key={piece.id}
                                    draggable
                                    onDragStart={(e) => handleDragStart(e, piece)}
                                    style={{
                                        width: '150px',
                                        height: '150px',
                                        backgroundImage: `url(${piece.image})`,
                                        backgroundSize: '200% 200%',
                                        backgroundPosition: piece.backgroundPosition,
                                        border: '2px solid #fff',
                                        borderRadius: '8px',
                                        cursor: 'move',
                                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                        transition: 'transform 0.2s',
                                    }}
                                />
                            )
                        ))}
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: '10px',
                        padding: '20px',
                        background: 'rgba(255,255,255,0.9)',
                        borderRadius: '15px',
                        boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                    }}>
                        {slots.map((slot) => (
                            <div
                                key={slot.id}
                                onDragOver={handleDragOver}
                                onDrop={(e) => handleDrop(e, slot.id)}
                                style={{
                                    width: '150px',
                                    height: '150px',
                                    border: '2px dashed #81c784',
                                    borderRadius: '8px',
                                    backgroundColor: slot.occupied ? 'transparent' : 'rgba(129,199,132,0.1)',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    position: 'relative',
                                }}
                            >
                                {slot.occupied && pieces.find(p => p.id === slot.pieceId) && (
                                    <div
                                        draggable
                                        onDragStart={(e) => handleDragStart(e, pieces.find(p => p.id === slot.pieceId))}
                                        onClick={() => handleRemovePiece(slot.id)}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            backgroundImage: `url(${pieces.find(p => p.id === slot.pieceId).image})`,
                                            backgroundSize: '200% 200%',
                                            backgroundPosition: pieces.find(p => p.id === slot.pieceId).backgroundPosition,
                                            borderRadius: '6px',
                                            cursor: 'move',
                                        }}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                }}>
                    {/* Gambar referensi */}
                    <div style={{
                        background: 'rgba(255,255,255,0.9)',
                        padding: '20px',
                        borderRadius: '15px',
                        boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                        <h3 style={{
                            color: '#81c784',
                            fontSize: '1.5rem',
                            fontFamily: 'Comic Sans MS, cursive',
                        }}>
                            Gambar Asli
                        </h3>
                        <img 
                            src={puzzleBg2} 
                            alt="Gambar Asli"
                            style={{
                                width: '300px',
                                height: '300px',
                                objectFit: 'cover',
                                borderRadius: '6px',
                            }}
                        />
                    </div>

                    {/* Petunjuk Main */}
                    <div style={{
                        background: '#fff',
                        padding: '15px 20px',
                        borderRadius: '15px',
                        fontFamily: 'Comic Sans MS, cursive',
                        color: '#4caf50',
                        fontSize: '1.1rem',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                        lineHeight: 1.8,
                        maxWidth: '400px'
                    }}>
                        <h4 style={{ margin: 0, fontSize: '1.2rem', color: '#388e3c' }}>🧑‍🏫 Cara Bermain</h4>
                        <ul style={{ paddingLeft: '20px', marginTop: '10px' }}>
                            <li>👆 Klik dan tahan potongan gambar</li>
                            <li>➡️ Geser ke kotak kosong</li>
                            <li>🔍 Lihat gambar asli sebagai panduan</li>
                            <li>🔄 Klik potongan untuk mengembalikan</li>
                            <li>🎉 Susun semua agar jadi gambar utuh!</li>
                        </ul>
                    </div>
                    <div style={{ marginTop: '20px' }}>
                        <button
                            className="cursor-pointer"
                            style={{
                                padding: '12px 24px',
                                fontSize: '1rem',
                                backgroundColor: '#81c784',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '8px',
                                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                                fontFamily: 'Comic Sans MS, cursive',
                                transition: 'all 0.3s ease',
                                cursor: 'pointer'
                            }}
                            onClick={() => navigate('/puzzlegame')}
                            onMouseOver={(e) => {
                                e.currentTarget.style.backgroundColor = '#66bb6a';
                                e.currentTarget.style.transform = 'scale(1.05)';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.backgroundColor = '#81c784';
                                e.currentTarget.style.transform = 'scale(1)';
                            }}
                        >
                            ⬅️ Kembali ke Level Sebelumnya
                        </button>
                    </div>

                </div>
            </div>

            <style>
                {`
                    @keyframes float {
                        0%, 100% { transform: translateY(0) rotate(0deg); }
                        50% { transform: translateY(-20px) rotate(180deg); }
                    }
                    @keyframes bounce {
                        0%, 100% { transform: translateY(0); }
                        50% { transform: translateY(-10px); }
                    }
                    .puzzle-piece-decoration {
                        pointer-events: none;
                        z-index: 0;
                    }
                    .puzzle-piece:hover {
                        transform: scale(1.05);
                        box-shadow: 0 8px 16px rgba(0,0,0,0.2);
                    }
                    .puzzle-slot {
                        transition: all 0.3s ease;
                    }
                    .puzzle-slot:hover {
                        background-color: rgba(129,199,132,0.2);
                    }
                    .swal2-popup {
                        font-family: 'Comic Sans MS', cursive;
                        border-radius: 20px;
                    }
                    .swal2-title {
                        color: #4caf50 !important;
                    }
                `}
            </style>
        </div>
    );
}