// Tetap seperti sebelumnya
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import puzzleBg from '../../assets/background/puzzle.png';
import ButtonKembaliPuzzle from '../buttonKembali/buttonKembaliPuzzle';

export default function Puzzle() {
    const [pieces, setPieces] = useState([]);
    const [slots, setSlots] = useState([]);
    const [draggedPiece, setDraggedPiece] = useState(null);
    const [isCompleted, setIsCompleted] = useState(false);
    const navigate = useNavigate();
    const puzzleSize = 2;

    const showStartGamePopup = () => {
        Swal.fire({
            title: '🧩 Mari Bermain Puzzle!',
            html: `
                <div style="font-family: 'Comic Sans MS'">
                    <p>Susun potongan gambar dengan benar</p>
                    <p>Petunjuk:</p>
                    <ul style="text-align: left; margin-top: 10px;">
                        <li>✨ Seret (drag) potongan ke tempatnya</li>
                        <li>✨ Lihat gambar asli di sebelah kanan</li>
                        <li>✨ Klik potongan untuk kembalikan</li>
                    </ul>
                </div>
            `,
            confirmButtonText: '🎮 Mulai Main!',
            confirmButtonColor: '#81c784',
            background: '#fff3e0',
            showClass: {
                popup: 'animate__animated animate__bounceIn'
            }
        });
    };

    useEffect(() => {
        showStartGamePopup();

        const newPieces = Array.from({ length: puzzleSize * puzzleSize }, (_, i) => ({
            id: i,
            correctPosition: i,
            currentPosition: null,
            image: puzzleBg,
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

    const handleDragStart = (e, piece) => {
        setDraggedPiece(piece);
        e.dataTransfer.setData('text/plain', piece.id);
        e.dataTransfer.effectAllowed = 'move';

        const dragImage = e.target.cloneNode(true);
        dragImage.style.opacity = '0.5';
        document.body.appendChild(dragImage);
        e.dataTransfer.setDragImage(dragImage, 75, 75);
        setTimeout(() => document.body.removeChild(dragImage), 0);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDrop = (e, slotId) => {
        e.preventDefault();
        if (!draggedPiece) return;

        const oldSlotId = slots.find(slot => slot.pieceId === draggedPiece.id)?.id;
        const existingPieceId = slots.find(slot => slot.id === slotId)?.pieceId;

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
            if (slot.id === oldSlotId) {
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
                    navigate('/puzzlegame2');
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
                🧩 Mini Puzzle Game
            </h1>

            <div style={{
                display: 'flex',
                gap: '40px',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
            }}>
                {/* Area puzzle */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {/* Potongan puzzle */}
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
                            piece.currentPosition === null && (
                                <div
                                    key={piece.id}
                                    draggable
                                    onDragStart={(e) => handleDragStart(e, piece)}
                                    onDragEnd={() => setDraggedPiece(null)}
                                    style={{
                                        width: '150px',
                                        height: '150px',
                                        backgroundImage: `url(${piece.image})`,
                                        backgroundSize: '200% 200%',
                                        backgroundPosition: piece.backgroundPosition,
                                        border: '2px solid #fff',
                                        borderRadius: '8px',
                                        cursor: 'move',
                                        transition: 'all 0.2s ease',
                                        opacity: draggedPiece?.id === piece.id ? 0.5 : 1,
                                    }}
                                />
                            )
                        ))}
                    </div>

                    {/* Slot tempat menaruh potongan */}
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

                {/* Area kanan: referensi + petunjuk */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                }}>
                    <div style={{
                        background: 'rgba(255,255,255,0.9)',
                        padding: '20px',
                        borderRadius: '15px',
                        boxShadow: '0 6px 12px rgba(0,0,0,0.1)',
                    }}>
                        <h3 style={{ fontFamily: 'Comic Sans MS', marginBottom: '10px' }}>Gambar Referensi</h3>
                        <img
                            src={puzzleBg}
                            alt="Gambar Referensi"
                            style={{ width: '300px', height: '300px', objectFit: 'cover', borderRadius: '10px' }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}