import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Slider from 'react-slick';
import backgroundImage from '../assets/background/levelchoiche.png';
import rumahImage from '../assets/background/cardrumah.png';
import sekolahImage from '../assets/background/cardsekolah.png';
import lockIcon from '../assets/object/gembok.png';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function HalamanLevel() {
    const [isRumahCompleted, setIsRumahCompleted] = useState(false);
    const navigate = useNavigate();
    const sliderRef = useRef(null); // Referensi untuk slider

    const handleLevelSelection = (level) => {
        if (level === 'Di Rumah') {
            Swal.fire({
                title: 'Level Dipilih!',
                text: `Anda memilih level: ${level}`,
                icon: 'success',
                confirmButtonText: 'Ayo Mulai!',
            }).then(() => {
                setIsRumahCompleted(true); // Tandai level "Di Rumah" selesai
                navigate('/rumahmain'); // Arahkan ke halaman Rumah
            });
        } else if (level === 'Sekolah' && isRumahCompleted) {
            Swal.fire({
                title: 'Level Dipilih!',
                text: `Anda memilih level: ${level}`,
                icon: 'success',
                confirmButtonText: 'Ayo Mulai!',
            }).then(() => {
                navigate('/sekolahmain'); // Arahkan ke halaman Sekolah
            });
        } else {
            Swal.fire({
                title: 'Level Terkunci!',
                text: 'Selesaikan level "Di Rumah" terlebih dahulu untuk membuka level ini.',
                icon: 'warning',
                confirmButtonText: 'OK',
            });
        }
    };

    // Tombol Kustom untuk Navigasi
    const CustomNextArrow = ({ onClick }) => (
        <button
            onClick={onClick}
            style={{
                position: 'absolute',
                top: '50%',
                right: '10px',
                transform: 'translateY(-50%)',
                backgroundColor: '#ffcc00',
                border: 'none',
                borderRadius: '50%',
                width: '50px',
                height: '50px',
                cursor: 'pointer',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                zIndex: 1,
            }}
        >
            ➡️
        </button>
    );

    const CustomPrevArrow = ({ onClick }) => (
        <button
            onClick={onClick}
            style={{
                position: 'absolute',
                top: '50%',
                left: '10px',
                transform: 'translateY(-50%)',
                backgroundColor: '#ffcc00',
                border: 'none',
                borderRadius: '50%',
                width: '50px',
                height: '50px',
                cursor: 'pointer',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                zIndex: 1,
            }}
        >
            ⬅️
        </button>
    );

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <CustomNextArrow />, // Tombol Next
        prevArrow: <CustomPrevArrow />, // Tombol Prev
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

    return (
        <div
            style={{
                backgroundImage: `url(${backgroundImage})`,
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
            }}
        >
            
            <Slider ref={sliderRef} {...settings} style={{ width: '90%' }}>
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
                TEBAK PEKERJAAN
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
            </Slider>
        </div>
    );
}