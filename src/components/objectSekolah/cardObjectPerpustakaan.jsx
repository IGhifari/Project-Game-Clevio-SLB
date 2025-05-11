
import React from "react";


export default function CardObjectPerpustakaan ({data, onClose}) {
    return(
    <div className="fixed inset-0 bg-black/50 flex items-center  justify-center z-50 animate__animated animate__fadeIn">
            <div  className="bg-white rounded-xl p-6  mx-4 shadow-2xl animate__animated animate__bounceIn">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-blue-600">Koleksi Benda</h2>
                    <button 
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 text-2xl font-bold cursor-pointer"
                    >
                        ×
                    </button>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                    {data.map((item, index) => (
                        <div 
                            key={index} 
                            className="bg-gray-50 rounded-lg p-4 text-center hover:shadow-md transition-shadow"
                        >
                            <img 
                                src={item.image} 
                                alt={item.name}
                                className="w-24 h-24 object-contain mx-auto mb-3"
                            />
                            <p className="font-medium text-gray-800 text-lg">{item.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>  
    )
}