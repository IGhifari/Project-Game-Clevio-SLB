import React from "react";
import pekerjaanbg from "../../assets/background/pekerjaanbg.png";

const levels = [
  { number: 1, stars: 3, unlocked: true },
  { number: 2, stars: 2, unlocked: true },
  { number: 3, stars: 1, unlocked: true },
  { number: 4, stars: 0, unlocked: false },
  { number: 5, stars: 0, unlocked: false },
  { number: 6, stars: 0, unlocked: false },
  { number: 7, stars: 0, unlocked: false },
  { number: 8, stars: 0, unlocked: false },
  { number: 9, stars: 0, unlocked: false },
  { number: 10, stars: 0, unlocked: false },
];

export default function HalamanLevelPekerjaan() {
  return (
    <div
      style={{
        backgroundImage: `url(${pekerjaanbg})`,
        backgroundSize: "cover",
        minHeight: "100vh",
        padding: "40px 0",
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
          }}
        >
          {levels.map((level) => (
            <div
              key={level.number}
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
                opacity: level.unlocked ? 1 : 0.7,
                transition: "transform 0.2s",
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
                    {[1, 2, 3].map((star) => (
                      <span
                        key={star}
                        style={{
                          fontSize: 26,
                          margin: "0 2px",
                          filter: star <= level.stars ? "none" : "grayscale(1)",
                          textShadow: star <= level.stars ? "0 2px 4px #fff176" : "none",
                        }}
                      >
                        ⭐
                      </span>
                    ))}
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
                    {[1, 2, 3].map((star) => (
                      <span
                        key={star}
                        style={{
                          fontSize: 26,
                          margin: "0 2px",
                          filter: "grayscale(1)",
                        }}
                      >
                        ⭐
                      </span>
                    ))}
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
        <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
          <button
            style={{
              background: "linear-gradient(90deg, #ffb347 60%, #ff5e57 100%)",
              color: "#fff",
              border: "none",
              borderRadius: 22,
              padding: "18px 56px",
              fontWeight: "bold",
              fontSize: 28,
              cursor: "pointer",
              boxShadow: "0 2px 12px #ffb347",
              fontFamily: "Comic Sans MS, Comic Sans, cursive",
              letterSpacing: 1,
              marginTop: 8,
            }}
          >
            Start
          </button>
        </div>
      </div>
    </div>
  );
}

