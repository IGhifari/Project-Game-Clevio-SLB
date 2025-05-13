import React, { useState, useEffect } from "react";

// Import gambar card dan background
import bgLevel from "../../../assets/background/levelb.png";
import imgKoki from "../../../assets/object/pekerjaan/koki.png";
import imgPetani from "../../../assets/object/pekerjaan/petani.png";
import imgPerawat from "../../../assets/object/pekerjaan/perawat.png";
import ButtonKembaliStage2 from "../../buttonKembali/buttonKembaliStage2";
const cards = [
  {
    id: 1,
    img: imgKoki,
    name: "Koki",
  },
  {
    id: 2,
    img: imgPetani,
    name: "Petani",
  },
  {
    id: 3,
    img: imgPerawat,
    name: "Perawat",
  },
];

export default function Level9() {
  const [result, setResult] = useState(null);
  const [timeLeft, setTimeLeft] = useState(20);

  useEffect(() => {
    if (!result && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
    if (!result && timeLeft === 0) {
      setResult("waktuHabis");
    }
  }, [result, timeLeft]);

  const handleChoose = (card) => {
    if (card.name === "Koki") {
      setResult("benar");
      // Unlock level 10
      localStorage.setItem(
        "pekerjaanLevelUnlocked",
        JSON.stringify(
          Math.max(10, Number(localStorage.getItem("pekerjaanLevelUnlocked") ))
        )
      );
    } else {
      setResult("salah");
    }
  };

  const handleNextStage = () => {
    window.location.href = "/level10";
  };

  const handleHome = () => {
    window.location.href = "/halamanlevelpekerjaan";
  };

  const handleRetry = () => {
    setResult(null);
    setTimeLeft(20);
  };

  return (
    <div
      className="level9-bg"
      style={{
        backgroundImage: `url(${bgLevel})`,
        backgroundSize: "cover",
        minHeight: "100vh",
        padding: "40px 0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <ButtonKembaliStage2/>
      <div
        style={{
          background: "rgba(255,255,255,0.92)",
          borderRadius: 36,
          boxShadow: "0 8px 32px rgba(0,0,0,0.13)",
          padding: "60px 32px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 90,
          maxWidth: 900,
          width: "90vw",
          minHeight: 500,
          justifyContent: "center",
        }}
      >
        {/* Timer */}
        {!result && (
          <div
            style={{
              fontSize: 22,
              fontWeight: "bold",
              color: timeLeft <= 5 ? "#b71c1c" : "#333",
              marginBottom: 16,
              letterSpacing: 1,
              background: "#fffbe6",
              borderRadius: 12,
              padding: "8px 24px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
            }}
          >
            ⏰ Waktu: {timeLeft} detik
          </div>
        )}

        {/* Main Card */}
        {!result && (
          <>
            <div
              style={{
                fontSize: 32,
                fontWeight: "bold",
                marginBottom: 32,
                color: "#2d2d2d",
                letterSpacing: 1,
                textAlign: "center",
              }}
            >
              Manakah yang koki?
            </div>
            <div
              className="cards-container"
              style={{
                display: "flex",
                justifyContent: "center",
                gap: 40,
                flexWrap: "wrap",
                width: "100%",
              }}
            >
              {cards.map((card) => (
                <div
                  key={card.id}
                  className="card-pekerjaan"
                  style={{
                    background: "#fff",
                    borderRadius: 24,
                    boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                    width: 240,
                    textAlign: "center",
                    padding: 32,
                    position: "relative",
                    transition: "transform 0.2s",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "12px 0",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.07)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  <img
                    src={card.img}
                    alt={card.name}
                    style={{
                      width: 180,
                      height: 180,
                      objectFit: "contain",
                      marginBottom: 20,
                      borderRadius: "50%",
                      background: "#f7f7f7",
                      display: "block",
                      marginLeft: "auto",
                      marginRight: "auto",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
                    }}
                  />
                  <button
                    style={{
                      background: "#ffd600",
                      border: "none",
                      borderRadius: 12,
                      padding: "10px 28px",
                      fontWeight: "bold",
                      fontSize: 18,
                      cursor: "pointer",
                      color: "#333",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                      transition: "background 0.2s",
                    }}
                    onMouseDown={(e) => (e.currentTarget.style.background = "#e0b800")}
                    onMouseUp={(e) => (e.currentTarget.style.background = "#ffd600")}
                    onClick={() => handleChoose(card)}
                  >
                    Pilih
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Victory Screen */}
        {result === "benar" && (
          <div
            style={{
              marginTop: 36,
              padding: "40px 48px",
              borderRadius: 24,
              background: "#d4ffdf",
              color: "#1b7e2c",
              fontWeight: "bold",
              fontSize: 28,
              boxShadow: "0 4px 16px rgba(0,0,0,0.10)",
              textAlign: "center",
              minWidth: 320,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 24,
            }}
          >
            <div>🎉 Victory! Jawaban Benar!</div>
            <div style={{ display: "flex", gap: 16 }}>
              <button
                style={{
                  background: "#ffd600",
                  border: "none",
                  borderRadius: 12,
                  padding: "12px 32px",
                  fontWeight: "bold",
                  fontSize: 20,
                  cursor: "pointer",
                  color: "#333",
                  marginRight: 8,
                }}
                onClick={handleNextStage}
              >
                Lanjut Stage
              </button>
              <button
                style={{
                  background: "#fff",
                  border: "2px solid #ffd600",
                  borderRadius: 12,
                  padding: "12px 32px",
                  fontWeight: "bold",
                  fontSize: 20,
                  cursor: "pointer",
                  color: "#333",
                }}
                onClick={handleHome}
              >
                Ke Home
              </button>
            </div>
          </div>
        )}

        {/* Lose Screen */}
        {(result === "salah" || result === "waktuHabis") && (
          <div
            style={{
              marginTop: 36,
              padding: "40px 48px",
              borderRadius: 24,
              background: "#ffd6d6",
              color: "#b71c1c",
              fontWeight: "bold",
              fontSize: 28,
              boxShadow: "0 4px 16px rgba(0,0,0,0.10)",
              textAlign: "center",
              minWidth: 320,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 24,
            }}
          >
            <div>
              {result === "waktuHabis"
                ? "⏰ Waktu Habis! Kamu Kalah!"
                : "❌ Jawaban Salah!"}
            </div>
            <div style={{ display: "flex", gap: 16 }}>
              <button
                style={{
                  background: "#ffd600",
                  border: "none",
                  borderRadius: 12,
                  padding: "12px 32px",
                  fontWeight: "bold",
                  fontSize: 20,
                  cursor: "pointer",
                  color: "#333",
                  marginRight: 8,
                }}
                onClick={handleRetry}
              >
                Coba Lagi
              </button>
              <button
                style={{
                  background: "#fff",
                  border: "2px solid #ffd600",
                  borderRadius: 12,
                  padding: "12px 32px",
                  fontWeight: "bold",
                  fontSize: 20,
                  cursor: "pointer",
                  color: "#333",
                }}
                onClick={handleHome}
              >
                Ke Home
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}