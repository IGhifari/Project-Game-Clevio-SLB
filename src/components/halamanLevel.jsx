import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Slider from 'react-slick';
import backgroundImage from '../assets/background/levelchoiche.png';
import pekerjaanbg from '../assets/background/pekerjaanbg.png'; // Tambahkan ini
import rumahImage from '../assets/background/cardrumah.png';
import sekolahImage from '../assets/background/cardsekolah.png';
import lockIcon from '../assets/object/gembok.png';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Puzzle from '../assets/background/puzzle.png'
import animationReserve from "../assets/background/Animationreverse.mp4"; // Pastikan path benar

export default function HalamanLevel() {
    const [isRumahCompleted, setIsRumahCompleted] = useState(false);
    const [slideIndex, setSlideIndex] = useState(0); // Tambahkan state ini
    const [isPageLoaded, setIsPageLoaded] = useState(false);
    const [showReserveAnimation, setShowReserveAnimation] = useState(false);
    const navigate = useNavigate();
    const sliderRef = useRef(null); // Referensi untuk slider

    useEffect(() => {
        // Trigger fade in animation after component mounts
        setTimeout(() => {
            setIsPageLoaded(true);
        }, 100);

        // Cek apakah semua level rumah sudah selesai
        const rumahmainStars = parseInt(localStorage.getItem('rumahmain_stars')) || 0;
        const kamarmandiStars = parseInt(localStorage.getItem('kamarmandi_stars')) || 0;
        const ruangtamuStars = parseInt(localStorage.getItem('ruangtamu_stars')) || 0;

        const totalStars = rumahmainStars + kamarmandiStars + ruangtamuStars;
        
        // Jika total bintang 9 (3 level x 3 bintang), maka level sekolah terbuka
        if (totalStars === 9) {
            setIsRumahCompleted(true);
            localStorage.setItem('sekolahUnlocked', 'true');
        } else {
            const unlocked = localStorage.getItem('sekolahUnlocked') === 'true';
            setIsRumahCompleted(unlocked);
        }
    }, []);

    const handleLevelSelection = (level) => {
        if (level === 'Di Rumah') {
            Swal.fire({
                title: 'Level Dipilih!',
                text: `Yeayy, Kamu memilih level: ${level}`,
                icon: 'success',
                confirmButtonText: 'Ayo Mulai!',
            }).then(() => {
                navigate('/rumahmain');
            });
        } else if (level === 'Sekolah' && isRumahCompleted) {
            Swal.fire({
                title: 'Level Dipilih!',
                text: `Yeayy, kamu memilih level: ${level}`,
                icon: 'success',
                confirmButtonText: 'Ayo Mulai!',
            }).then(() => {
                navigate('/sekolahmain');
            });
        } else {
            Swal.fire({
                title: 'Level Terkunci!',
                html: `
                    <div style="font-family: Comic Sans MS; font-size: 18px;">
                        <p>Selesaikan semua level di Rumah terlebih dahulu!</p>
                        <p>Kumpulkan 9 bintang untuk membuka level Sekolah.</p>
                    </div>
                `,
                icon: 'warning',
                confirmButtonText: 'OK',
            });
        }
    };

    const CustomNextArrow = (props) => {
        const { onClick, className, style } = props;
        return (
            <div
                className={className}
                onClick={onClick}
                style={{
                    ...style,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    right: '10px',
                    zIndex: 2,
                    backgroundColor: '#ffcc00',
                    borderRadius: '50%',
                    width: '50px',
                    height: '50px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                }}
            >
                ➡️
            </div>
        );
    };
    
    const CustomPrevArrow = (props) => {
        const { onClick, className, style } = props;
        return (
            <div
                className={className}
                onClick={onClick}
                style={{
                    ...style,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    left: '10px',
                    zIndex: 2,
                    backgroundColor: '#ffcc00',
                    borderRadius: '50%',
                    width: '50px',
                    height: '50px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                }}
            >
                ⬅️
            </div>
        );
    };
    

    const settings = {
        dots: true,
        infinite: true, // ubah dari false ke true
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <CustomNextArrow />,
        prevArrow: <CustomPrevArrow />,
        afterChange: (current) => setSlideIndex(current),
    };
    

    // Fungsi untuk menangani input keyboard
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (sliderRef.current) {
                if (event.key === 'ArrowRight') {
                    sliderRef.current.slickNext(); // Pindah ke slide berikutnya
                } else if (event.key === 'ArrowLeft') {
                    sliderRef.current.slickPrev(); // Pindah ke slide sebelumnya
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    // Handler untuk tombol kembali
    const handleBackToMenu = () => {
        setShowReserveAnimation(true);
    };

    // Handler saat video selesai
    const handleReserveVideoEnd = () => {
        navigate('/');
    };

    return (
        <div
            style={{
                backgroundImage: `url(${
                    slideIndex === 1 
                        ? pekerjaanbg 
                        : slideIndex === 2 
                            ? Puzzle 
                            : backgroundImage
                })`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '20px',
                textAlign: 'center',
                width: '100%',
                transition: 'background-image 0.5s, opacity 0.5s ease-in-out',
                opacity: isPageLoaded ? 1 : 0,
            }}
        >
            {/* Video animasi reserve */}
            {showReserveAnimation && (
                <video
                    src={animationReserve}
                    autoPlay
                    onEnded={handleReserveVideoEnd}
                    className="absolute top-0 left-0 w-full h-full object-cover z-50"
                    style={{ background: "#000" }}
                />
            )}

            {/* Konten utama hanya tampil jika animasi belum muncul */}
            {!showReserveAnimation && (
                <>
                    <Slider ref={sliderRef} {...settings} style={{ width: '90%', opacity: isPageLoaded ? 1 : 0, transform: isPageLoaded ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.5s ease-in-out' }}>
                        {/* Slide 1: Pilih Level */}
                        <div>
                            <h1
                        style={{
                            color: '#fff',
                            fontSize: '3rem',
                            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
                            fontFamily: "'Comic Sans MS', cursive, sans-serif",
                            marginBottom: '20px',
                        }}
                    >
                        TEMUKAN BARANG
                    </h1>
                            <div
                                style={{
                                    display: 'flex',
                                    gap: '350px',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    width: '75%',
                                    marginTop: '20px',
                                    flexWrap: 'wrap',
                                    marginLeft: '180px',
                                }}
                            >
                                {/* Card untuk level "Di Rumah" */}
                                <div
                                    style={{
                                        backgroundColor: '#fff',
                                        borderRadius: '15px',
                                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                                        padding: '20px',
                                        textAlign: 'center',
                                        flex: 1,
                                        maxWidth: '45%',
                                    }}
                                >
                                    <img
                                        src={rumahImage}
                                        alt="Di Rumah"
                                        style={{
                                            width: '100%',
                                            borderRadius: '10px',
                                            marginBottom: '10px',
                                        }}
                                    />
                                    <button
                                        onClick={() => handleLevelSelection('Di Rumah')}
                                        style={{
                                            backgroundColor: '#ffcc00',
                                            border: 'none',
                                            borderRadius: '10px',
                                            padding: '10px 20px',
                                            fontSize: '16px',
                                            cursor: 'pointer',
                                            fontFamily: "'Comic Sans MS', cursive, sans-serif",
                                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                                        }}
                                    >
                                        Pilih Rumah
                                    </button>
                                </div>

                                {/* Card untuk level "Sekolah" */}
                                <div
                                    style={{
                                        backgroundColor: '#fff',
                                        borderRadius: '15px',
                                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                                        padding: '20px',
                                        textAlign: 'center',
                                        flex: 1,
                                        maxWidth: '45%',
                                        position: 'relative',
                                    }}
                                >
                                    <img
                                        src={sekolahImage}
                                        alt="Sekolah"
                                        style={{
                                            width: '100%',
                                            borderRadius: '10px',
                                            marginBottom: '10px',
                                            filter: isRumahCompleted ? 'none' : 'grayscale(100%)',
                                        }}
                                    />
                                    {!isRumahCompleted && (
                                        <img
                                            src={lockIcon}
                                            alt="Terkunci"
                                            style={{
                                                position: 'absolute',
                                                top: '50%',
                                                left: '50%',
                                                transform: 'translate(-50%, -50%)',
                                                width: '600px',
                                                height: '200px',
                                                opacity: 0.8,
                                            }}
                                        />
                                    )}
                                    <button
                                        onClick={() => handleLevelSelection('Sekolah')}
                                        style={{
                                            backgroundColor: isRumahCompleted ? '#00ccff' : '#ccc',
                                            border: 'none',
                                            borderRadius: '10px',
                                            padding: '10px 20px',
                                            fontSize: '16px',
                                            cursor: isRumahCompleted ? 'pointer' : 'not-allowed',
                                            fontFamily: "'Comic Sans MS', cursive, sans-serif",
                                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                                        }}
                                        disabled={!isRumahCompleted}
                                    >
                                        Pilih Sekolah
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Slide 2: Tebak Pekerjaan */}
                        <div
                            style={{
                                background: 'rgba(20, 20, 40, 0.85)',
                                borderRadius: '20px',
                                padding: '40px 0',
                                margin: '0 auto',
                                width: '90%',
                                boxShadow: '0 8px 24px rgba(0,0,0,0.7)',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <h1
                                style={{
                                    color: '#ffe066',
                                    fontSize: '3rem',
                                    textShadow: '2px 2px 8px rgba(0,0,0,0.9)',
                                    fontFamily: "'Comic Sans MS', cursive, sans-serif",
                                    marginBottom: '32px',
                                }}
                            >
                                TEBAK PEKERJAAN
                            </h1>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: '100%',
                                }}
                            >
                                {/* Card tunggal dengan tombol Play */}
                                <div
                                    style={{
                                        backgroundColor: '#fff',
                                        borderRadius: '18px',
                                        boxShadow: '0 6px 18px rgba(0,0,0,0.25)',
                                        padding: '36px 48px',
                                        textAlign: 'center',
                                        maxWidth: '340px',
                                        width: '100%',
                                        margin: '0 auto',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                    }}
                                >
                                    <img
                                        src={pekerjaanbg}
                                        alt="Tebak Pekerjaan"
                                        style={{
                                            width: '180px',
                                            height: '120px',
                                            objectFit: 'cover',
                                            borderRadius: '12px',
                                            marginBottom: '24px',
                                            boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
                                        }}
                                    />
                                    <h2
                                        style={{
                                            color: '#222',
                                            fontFamily: "'Comic Sans MS', cursive, sans-serif",
                                            fontSize: '1.7rem',
                                            marginBottom: '18px',
                                            letterSpacing: 1,
                                        }}
                                    >
                                        Mulai Tebak Pekerjaan
                                    </h2>
                                    <button
                                        onClick={() => {
                                            // Tambahkan efek fade out
                                            const button = document.querySelector('.play-button');
                                            button.style.opacity = '0';
                                            button.style.transform = 'scale(0.95)';
                                            
                                            // Tunggu animasi selesai sebelum navigasi
                                            setTimeout(() => {
                                                navigate('/halamanlevelpekerjaan');
                                            }, 300);
                                        }}
                                        className="play-button"
                                        style={{
                                            background: 'linear-gradient(90deg, #ffb347 60%, #ff5e57 100%)',
                                            color: '#fff',
                                            border: 'none',
                                            borderRadius: '12px',
                                            padding: '14px 44px',
                                            fontWeight: 'bold',
                                            fontSize: '1.3rem',
                                            cursor: 'pointer',
                                            boxShadow: '0 2px 12px #ffb347',
                                            fontFamily: "'Comic Sans MS', cursive, sans-serif",
                                            letterSpacing: 1,
                                            marginTop: '8px',
                                            transition: 'all 0.3s ease-in-out',
                                        }}
                                    >
                                        Play
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Slide 3: Puzzle Game */}
                        <div
                            style={{
                                background: 'rgba(40, 20, 60, 0.85)',
                                borderRadius: '20px',
                                padding: '40px 0',
                                margin: '0 auto',
                                width: '90%',
                                boxShadow: '0 8px 24px rgba(0,0,0,0.7)',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <h1
                                style={{
                                    color: '#a5d6a7',
                                    fontSize: '3rem',
                                    textShadow: '2px 2px 8px rgba(0,0,0,0.9)',
                                    fontFamily: "'Comic Sans MS', cursive, sans-serif",
                                    marginBottom: '32px',
                                }}
                            >
                                PUZZLE GAME
                            </h1>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: '100%',
                                }}
                            >
                                <div
                                    style={{
                                        backgroundColor: '#fff',
                                        borderRadius: '18px',
                                        boxShadow: '0 6px 18px rgba(0,0,0,0.25)',
                                        padding: '36px 48px',
                                        textAlign: 'center',
                                        maxWidth: '340px',
                                        width: '100%',
                                        margin: '0 auto',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                    }}
                                >
                                    <img
                                        src={Puzzle}
                                        alt="Puzzle Game"
                                        style={{
                                            width: '180px',
                                            height: '120px',
                                            objectFit: 'cover',
                                            borderRadius: '12px',
                                            marginBottom: '24px',
                                            boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
                                        }}
                                    />
                                    <h2
                                        style={{
                                            color: '#222',
                                            fontFamily: "'Comic Sans MS', cursive, sans-serif",
                                            fontSize: '1.7rem',
                                            marginBottom: '18px',
                                            letterSpacing: 1,
                                        }}
                                    >
                                        Mulai Puzzle Game
                                    </h2>
                                    <button
                                        onClick={() => navigate('/puzzlegame')}
                                        style={{
                                            background: 'linear-gradient(90deg, #a5d6a7 60%, #81c784 100%)',
                                            color: '#fff',
                                            border: 'none',
                                            borderRadius: '12px',
                                            padding: '14px 44px',
                                            fontWeight: 'bold',
                                            fontSize: '1.3rem',
                                            cursor: 'pointer',
                                            boxShadow: '0 2px 12px #a5d6a7',
                                            fontFamily: "'Comic Sans MS', cursive, sans-serif",
                                            letterSpacing: 1,
                                            marginTop: '8px',
                                            transition: 'all 0.3s ease',
                                        }}
                                    >
                                        Play
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Slider>
                    <div className='pt-8'>
                        <button 
                            onClick={handleBackToMenu}
                            className='bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full 
                                        shadow-lg transition-all duration-300 transform hover:scale-105
                                        font-comic-sans text-lg cursor-pointer'
                            style={{
                                fontFamily: "'Comic Sans MS', cursive, sans-serif",
                            }}
                        >
                            🏠 Kembali ke Menu Utama
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}