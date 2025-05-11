import React from "react";

// Import gambar card dan background
import bgLevel from "../../../assets/background/levelb.png";
import imgMog from "../../../assets/background/levelb.png";
import imgLtoo from "../../../assets/background/levelb.png";
import imgAtou from "../../../assets/background/levelb.png";

const cards = [
  {
    id: 1,
    name: "MOG",
    img: imgMog,
  },
  {
    id: 2,
    name: "LTOO",
    img: imgLtoo,
  },
  {
    id: 3,
    name: "ATOU",
    img: imgAtou,
  },
];

const Level1 = () => {
  return (
    <div
      className="level1-bg"
      style={{
        backgroundImage: `url(${bgLevel})`,
        backgroundSize: "cover",
        minHeight: "100vh",
        padding: "40px 0",
      }}
    >
      <div className="cards-container" style={{ display: "flex", justifyContent: "center", gap: 32 }}>
        {cards.map((card) => (
          <div key={card.id} className="card-pekerjaan" style={{
            background: "#fff",
            borderRadius: 24,
            boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
            width: 220,
            textAlign: "center",
            padding: 24,
            position: "relative"
          }}>
            <img
              src={card.img}
              alt={card.name}
              style={{ width: 120, height: 120, objectFit: "contain", marginBottom: 16 }}
            />
            <h3 style={{ margin: "8px 0 16px", fontSize: 22, color: "#1a1a1a" }}>{card.name}</h3>
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
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
              }}
            >
              Pilih
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Level1;



