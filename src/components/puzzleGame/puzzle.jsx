import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import puzzleBg from '../../assets/background/puzzle.png'; // Gambar latar belakang puzzle

export default function Puzzle() {
    const [pieces, setPieces] = useState([]);
    const [slots, setSlots] = useState([]);
    const [draggedPiece, setDraggedPiece] = useState(null);
    const [isCompleted, setIsCompleted] = useState(false);
    const navigate = useNavigate();
    const puzzleSize = 2; // Ukuran puzzle 2x2

    // Inisialisasi puzzle
    useEffect(() => {
        const newPieces = Array.from({ length: puzzleSize * puzzleSize }, (_, i) => ({
            id: i,
            correctPosition: i,
            currentPosition: null,
            image: puzzleBg,
            backgroundPosition: `${(i % puzzleSize) * 50}% ${Math.floor(i / puzzleSize) * 50}%`, // Menentukan posisi background potongan puzzle
        }));

        // Acak posisi potongan
        const shuffledPieces = [...newPieces].sort(() => Math.random() - 0.5);
        setPieces(shuffledPieces);

        // Buat slot kosong
        const newSlots = Array.from({ length: puzzleSize * puzzleSize }, (_, i) => ({
            id: i,
            occupied: false,
            pieceId: null
        }));
        setSlots(newSlots);
    }, []);

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

        // Update posisi potongan
        const updatedPieces = pieces.map(piece => {
            if (piece.id === draggedPiece.id) {
                return { ...piece, currentPosition: slotId };
            }
            return piece;
        });

        // Update status slot
        const updatedSlots = slots.map(slot => ({
            ...slot,
            occupied: slot.id === slotId,
            pieceId: slot.id === slotId ? draggedPiece.id : slot.pieceId
        }));

        setPieces(updatedPieces);
        setSlots(updatedSlots);
        setDraggedPiece(null);

        // Cek apakah semua potongan sudah di slot
        const allPiecesPlaced = updatedPieces.every(piece => piece.currentPosition !== null);
        
        if (allPiecesPlaced) {
            // Cek apakah semua potongan berada di posisi yang benar sesuai gambar asli
            const isPuzzleComplete = updatedPieces.every(piece => {
                const slot = updatedSlots.find(s => s.pieceId === piece.id);
                return slot && slot.id === piece.correctPosition;
            });

            if (isPuzzleComplete) {
                setIsCompleted(true);
                Swal.fire({
                    title: 'Selamat!',
                    text: 'Anda berhasil menyelesaikan puzzle!',
                    icon: 'success',
                    confirmButtonText: 'Lanjutkan',
                    background: '#fff',
                    customClass: {
                        title: 'swal-title',
                        content: 'swal-content',
                        confirmButton: 'swal-confirm-button'
                    }
                }).then(() => {
                    navigate('/halamanlevel');
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
            background: 'linear-gradient(135deg, #a5d6a7 0%, #81c784 100%)',
            minHeight: '100vh',
            padding: '40px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            <h1 style={{
                color: '#fff',
                fontSize: '2.5rem',
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                marginBottom: '40px',
                fontFamily: 'Comic Sans MS, cursive',
            }}>
                Puzzle Game
            </h1>

            <div style={{
                display: 'flex',
                gap: '40px',
                alignItems: 'flex-start',
            }}>
                {/* Area puzzle */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                }}>
                    {/* Area potongan puzzle */}
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
                                        backgroundSize: '200% 200%', // Ukuran latar belakang disesuaikan
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

                    {/* Area slot puzzle */}
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
                                            backgroundSize: '200% 200%', // Ukuran latar belakang disesuaikan
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

                {/* Gambar referensi */}
                <div style={{
                    background: 'rgba(255,255,255,0.9)',
                    padding: '20px',
                    borderRadius: '15px',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '10px',
                }}>
                    <h3 style={{
                        color: '#81c784',
                        fontSize: '1.5rem',
                        fontFamily: 'Comic Sans MS, cursive',
                        margin: '0',
                    }}>
                        Gambar Asli
                    </h3>
                    <img 
                        src={puzzleBg} 
                        alt="Referensi Puzzle"
                        style={{
                            width: '300px',
                            height: '300px',
                            objectFit: 'cover',
                            borderRadius: '8px',
                            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                        }}
                    />
                </div>
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
