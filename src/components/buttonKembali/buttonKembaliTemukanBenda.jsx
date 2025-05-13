
import React from "react"
import { useNavigate } from "react-router-dom"


export default function ButtonKembaliTemukanBenda () {
    const navigate = useNavigate();

    return(
        <button
            onClick={() => {

                    navigate('/halamanlevel');
                
            }}
            className="back-button"
            style={{
                position: 'fixed',
                top: '20px',
                left: '81%',
                backgroundColor: '#81c784',
                color: 'white',
                border: 'none',
                borderRadius: '50px',
                padding: '12px 24px',
                fontSize: '16px',
                fontFamily: 'Comic Sans MS, cursive',
                cursor: 'pointer',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
            }}
            onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.05)';
                e.target.style.backgroundColor = '#66bb6a';
            }}
            onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.backgroundColor = '#81c784';
            }}
        >
            🏠 Kembali ke halaman Level
        </button>
    )
}