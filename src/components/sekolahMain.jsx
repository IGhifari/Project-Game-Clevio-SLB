
import React from 'react';
import sekolahmainBg from '../assets/background/sekolahMain.jpg';

export default function RumahMain() {
    return(
        <>
            <div 
                        className="min-h-screen w-full bg-cover bg-center bg-no-repeat relative"
                        style={{
                            backgroundImage: `url(${sekolahmainBg})`,
                            imageRendering: 'pixelated'
                        }}
                    >
                        <div className="container mx-auto p-4">
                            {/* <h1 className="text-3xl font-bold text-white mb-4">
                                Benda di Kamar
                            </h1> */}
                            
                            {/* Content container */}
                            <div className="bg-white/80 rounded-lg p-4 backdrop-blur-sm">
                                {/* Add your interactive elements here */}
                            </div>
                        </div>
                    </div>
        </>
    )
}