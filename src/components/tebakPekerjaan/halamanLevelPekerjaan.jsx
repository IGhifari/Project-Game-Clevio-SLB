import React, { useState, useEffect } from "react";
import pekerjaanbg from "../../assets/background/pekerjaanbg.png";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const maxLevel = Number(localStorage.getItem("pekerjaanLevelUnlocked") || 1);

const levels = [
  { number: 1, stars: 1, unlocked: true },  
  { number: 2, stars: 0, unlocked: maxLevel >= 2 },
  { number: 3, stars: 0, unlocked: maxLevel >= 3 },
  { number: 4, stars: 0, unlocked: maxLevel >= 4 },
  { number: 5, stars: 0, unlocked: maxLevel >= 5 },
  { number: 6, stars: 0, unlocked: maxLevel >= 6 },
  { number: 7, stars: 0, unlocked: maxLevel >= 7 },
  { number: 8, stars: 0, unlocked: maxLevel >= 8 },
  { number: 9, stars: 0, unlocked: maxLevel >= 9 },
  { number: 10, stars: 0, unlocked: maxLevel >= 10 },
];

export default function HalamanLevelPekerjaan() {
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Trigger fade in animation after component mounts
    setTimeout(() => {
      setIsPageLoaded(true);
    }, 100);
  }, []);

  const handleLevelClick = (level) => {
    if (level.unlocked) {
      setSelectedLevel(level.number);
      Swal.fire({
        title: `Level ${level.number}`,
        text: "Siap untuk bermain?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#ff5e57",
        cancelButtonColor: "#666",
        confirmButtonText: "Mulai",
        cancelButtonText: "Batal",
        background: "#fff",
        customClass: {
          title: "swal-title",
          content: "swal-content",
          confirmButton: "swal-confirm-button",
          cancelButton: "swal-cancel-button"
        }
      }).then((result) => {
        if (result.isConfirmed) {
          navigate(`/level${level.number}`);
          // Setelah setResult("benar");
          localStorage.setItem("pekerjaanLevelUnlocked", JSON.stringify(Math.max(2, Number(localStorage.getItem("pekerjaanLevelUnlocked") || 1) + 1)));
        }
      });
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${pekerjaanbg})`,
        backgroundSize: "cover",
        minHeight: "100vh",
        padding: "95px 0",
        position: "relative",
        opacity: isPageLoaded ? 1 : 0,
        transform: isPageLoaded ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.5s ease-in-out',
      }}
    >
      <div
        style={{
          background: "rgba(255,255,255,0.92)",
          borderRadius: 40,
          maxWidth: 900,
          margin: "0 auto",
          padding: 40,
          boxShadow: "0 12px 40px rgba(0,0,0,0.18)",
          border: "8px solid #ffb347",
          opacity: isPageLoaded ? 1 : 0,
          transform: isPageLoaded ? 'scale(1)' : 'scale(0.95)',
          transition: 'all 0.5s ease-in-out',
          transitionDelay: '0.2s',
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: 36,
            color: "#ff5e57",
            fontFamily: "Comic Sans MS, Comic Sans, cursive",
            fontSize: 44,
            letterSpacing: 2,
            textShadow: "2px 2px 0 #fff176, 4px 4px 0 #ffb347",
            opacity: isPageLoaded ? 1 : 0,
            transform: isPageLoaded ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.5s ease-in-out',
            transitionDelay: '0.3s',
          }}
        >
          Pilih Level
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: 32,
            marginBottom: 40,
            justifyItems: "center",
            opacity: isPageLoaded ? 1 : 0,
            transform: isPageLoaded ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.5s ease-in-out',
            transitionDelay: '0.4s',
          }}
        >
          {levels.map((level, index) => (
            <div
              key={level.number}
              onClick={() => handleLevelClick(level)}
              style={{
                background: level.unlocked
                  ? "linear-gradient(135deg, #fffde4 60%, #ffd54f 100%)"
                  : "linear-gradient(135deg, #e0e0e0 60%, #bdbdbd 100%)",
                border: "6px solid #ffb347",
                borderRadius: 32,
                width: 120,
                height: 160,
                textAlign: "center",
                position: "relative",
                boxShadow: level.unlocked
                  ? "0 8px 24px 0 #ffe082, 0 2px 8px #ffb347"
                  : "0 4px 12px 0 #bdbdbd",
                color: "#ff5e57",
                fontWeight: "bold",
                fontSize: 22,
                cursor: level.unlocked ? "pointer" : "not-allowed",
                opacity: level.unlocked ? (isPageLoaded ? 1 : 0) : 0.7,
                transform: isPageLoaded ? 'scale(1)' : 'scale(0.95)',
                transition: 'all 0.3s ease',
                transitionDelay: `${0.1 * index}s`,
                fontFamily: "Comic Sans MS, Comic Sans, cursive",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Hiasan atas */}
              <div
                style={{
                  position: "absolute",
                  top: 10,
                  left: 0,
                  right: 0,
                  display: "flex",
                  justifyContent: "center",
                  pointerEvents: "none",
                }}
              >
                <span style={{ fontSize: 28 }}>
                  {level.unlocked ? "🎈" : "💤"}
                </span>
              </div>
              {level.unlocked ? (
                <>
                  <div
                    style={{
                      background: "linear-gradient(135deg, #4fc3f7 60%, #81d4fa 100%)",
                      border: "4px solid #fff",
                      borderRadius: "50%",
                      width: 56,
                      height: 56,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 32,
                      color: "#fff",
                      margin: "32px auto 10px auto",
                      boxShadow: "0 2px 8px #81d4fa",
                    }}
                  >
                    {level.number}
                  </div>
                  <div style={{ marginTop: 8 }}>
                    <span
                      style={{
                        fontSize: 26,
                        margin: "0 2px",
                        filter: level.stars >= 1 ? "none" : "grayscale(1)",
                        textShadow: level.stars >= 1 ? "0 2px 4px #fff176" : "none",
                      }}
                    >
                      ⭐
                    </span>
                  </div>
                </>
              ) : (
                <div style={{ marginTop: 38 }}>
                  <span
                    role="img"
                    aria-label="locked"
                    style={{
                      fontSize: 38,
                      display: "block",
                      marginBottom: 10,
                    }}
                  >
                    🔒
                  </span>
                  <div>
                    <span
                      style={{
                        fontSize: 26,
                        margin: "0 2px",
                        filter: "grayscale(1)",
                      }}
                    >
                      ⭐
                    </span>
                  </div>
                </div>
              )}
              {/* Hiasan bawah */}
              <div
                style={{
                  position: "absolute",
                  bottom: 10,
                  left: 0,
                  right: 0,
                  display: "flex",
                  justifyContent: "center",
                  pointerEvents: "none",
                }}
              >
                <span style={{ fontSize: 22 }}>
                  {level.unlocked ? "🍭" : "💤"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tombol kembali ke halaman utama level */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: 24 }}>
        <button
          onClick={() => navigate("/halamanlevel")}
          style={{
            background: "#ffd600",
            border: "none",
            borderRadius: 16,
            padding: "14px 40px",
            fontWeight: "bold",
            fontSize: 20,
            cursor: "pointer",
            color: "#333",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            transition: "background 0.2s",
          }}
        >
          ⬅️ Kembali
        </button>
      </div>

      <style>
        {`
          .swal-title {
            font-family: "Comic Sans MS", cursive !important;
            font-size: 32px !important;
            color: #ff5e57 !important;
          }
          .swal-content {
            font-family: "Comic Sans MS", cursive !important;
            font-size: 20px !important;
          }
          .swal-confirm-button {
            font-family: "Comic Sans MS", cursive !important;
            font-size: 18px !important;
            padding: 10px 30px !important;
          }
          .swal-cancel-button {
            font-family: "Comic Sans MS", cursive !important;
            font-size: 18px !important;
            padding: 10px 30px !important;
          }
        `}
      </style>
    </div>
  );
}

