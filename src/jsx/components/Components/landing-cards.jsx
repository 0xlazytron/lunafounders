import { useState, useEffect, useRef } from "react";
import GoldNFT from "../../../images/GoldNFT.png";
import GoldWallet from "../../../images/GoldWallet.png";
import GoldenClover from "../../../images/GoldenClover.png";

export default function CardComponent() {
  const [expandedCard, setExpandedCard] = useState(null);
  const [originalPosition, setOriginalPosition] = useState({ top: 0, left: 0 });
  const [originalSize, setOriginalSize] = useState({ width: 0, height: 0 });
  const [modalStyle, setModalStyle] = useState({});
  const [isAnimating, setIsAnimating] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);

  const cards = [
    {
      image: GoldWallet,
      title: "DOWNLOADING",
      subtitle: "PHANTOM WALLET",
      content:
        "Download Phantom wallet to securely store and manage your crypto assets. Connect it to our platform for seamless transactions and rewards tracking.",
    },
    {
      image: GoldenClover,
      title: "SIGNING UP",
      subtitle: "FOR LUNA CASINO",
      content:
        "Create your account using a referral code to get immediate access to LunaFounder. As a new user, you can purchase NFTs and participate in the LunaLotto system right away.",
    },
    {
      image: GoldNFT,
      title: "BUYING AN",
      subtitle: "NFT",
      content:
        "Purchase limited LunaFounder NFTs to unlock advanced features and receive monthly rewards. Gain digital ownership in LunaCasino and become part of a growing Web3 community on Solana.",
    },
  ];

  const openModal = (index) => {
    const cardElement = document.getElementById(`card-${index}`);
    const rect = cardElement.getBoundingClientRect();

    setOriginalPosition({
      top: rect.top,
      left: rect.left,
    });

    setOriginalSize({
      width: rect.width,
      height: rect.height,
    });

    setModalStyle({
      position: "fixed",
      top: rect.top + "px",
      left: rect.left + "px",
      width: rect.width + "px",
      height: rect.height + "px",
      zIndex: 1050,
      transform: "scale(1)",
      transition: "all 0.4s ease",
    });

    setIsAnimating(true);
    setExpandedCard(index);

    setTimeout(() => {
      const centerTop = Math.max(20, (window.innerHeight - 500) / 2);
      const centerLeft =
        (window.innerWidth - Math.min(600, Math.max(350, rect.width * 1.2))) /
        2;

      setModalStyle({
        position: "fixed",
        top: centerTop + "px",
        left: centerLeft + "px",
        width: Math.min(600, Math.max(350, rect.width * 1.2)) + "px",
        height: "auto",
        zIndex: 1050,
        transform: "scale(1)",
        transition: "all 0.4s ease",
      });

      setTimeout(() => {
        setShowContent(true);
        setIsAnimating(false);
      }, 300);
    }, 50);
  };

  const closeModal = () => {
    setShowContent(false);
    setIsAnimating(true);

    setTimeout(() => {
      setModalStyle({
        position: "fixed",
        top: originalPosition.top + "px",
        left: originalPosition.left + "px",
        width: originalSize.width + "px",
        height: originalSize.height + "px",
        zIndex: 1050,
        transform: "scale(1)",
        transition: "all 0.4s ease",
      });

      setTimeout(() => {
        setExpandedCard(null);
        setIsAnimating(false);
      }, 400);
    }, 100);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && expandedCard !== null) {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [expandedCard, originalPosition, originalSize]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(e.target) &&
        expandedCard !== null &&
        !isAnimating &&
        closeButtonRef.current !== e.target
      ) {
        closeModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [expandedCard, isAnimating]);

  const toggleCard = (index) => {
    if (expandedCard === index) {
      closeModal();
    } else if (expandedCard === null) {
      openModal(index);
    }
  };

  return (
    <div
      className="container-fluid py-5"
      style={{ backgroundColor: "#080C12" }}
    >
      <div className="row mb-4 ps-4 ps-md-5">
        <div className="col-12">
          <h2
            className="text-white ms-3 display-1"
            style={{
              fontFamily: "Krona One, sans-serif",
              background: "linear-gradient(to right, #D5A554, #E79710)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            How to ?
          </h2>
        </div>
      </div>

      <div className="row row-cols-1 row-cols-md-3 g-4 px-4 px-md-5">
        {cards.map((card, index) => (
          <div className="col my-4 g-5" key={index}>
            <div
              id={`card-${index}`}
              className="position-relative "
              style={{
                transition: "all 0.4s ease",
                zIndex: 1,
              }}
            >
              {/* Polaroid style cards */}
              <div
                onClick={() => toggleCard(index)}
                style={{
                  borderRadius: "1px",
                  overflow: "hidden",
                  cursor: "pointer",
                  boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
                  borderTop: "20px solid #E1B964",
                  borderLeft: "20px solid #E1B964",
                  borderRight: "20px solid #E1B964",
                  borderBottom: "none",
                  height: "270px",
                }}
              >
                {/* Image area */}
                <div
                  style={{
                    width: "100%",
                    height: "180px",
                    backgroundColor: "#080C12",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "2px solid #E1B964",
                    borderTop: "none",
                    borderLeft: "none",
                    borderRight: "none",
                  }}
                >
                  <img
                    src={card.image}
                    alt={card.title}
                    className="img-fluid"
                    style={{
                      maxHeight: "150px",
                      maxWidth: "150px",
                      padding: "10px",
                    }}
                  />
                </div>

                {/* Title area */}
                <div
                  className="text-center text-white py-3 px-2"
                  style={{
                    backgroundColor: "#E1B964",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "Arial, sans-serif",
                      fontWeight: "bold",
                    }}
                  >
                    {card.title}
                  </div>
                  <div
                    style={{
                      fontFamily: "Arial, sans-serif",
                      fontWeight: "bold",
                    }}
                  >
                    {card.subtitle}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Overlay */}
      {expandedCard !== null && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.7)",
            zIndex: 1040,
            opacity: isAnimating ? 0 : 1,
            transition: "opacity 0.4s ease",
          }}
        />
      )}

      {/* Modal Card */}
      {expandedCard !== null && (
        <div
          ref={modalRef}
          style={{ ...modalStyle, boxShadow: "0 10px 30px rgba(0,0,0,0.5)" }}
        >
          {/* Close button */}
          <button
            ref={closeButtonRef}
            onClick={closeModal}
            style={{
              position: "absolute",
              top: "-15px",
              right: "-15px",
              backgroundColor: "#080C12",
              color: "white",
              borderRadius: "50%",
              width: "30px",
              height: "30px",
              border: "2px solid #E1B964",
              cursor: "pointer",
              zIndex: 1060,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "16px",
              fontWeight: "bold",
              padding: 0,
            }}
          >
            ✕
          </button>

          {/* Polaroid style modal card */}
          <div
            style={{
              borderRadius: "1px",
              overflow: "hidden",
              borderTop: "20px solid #E1B964",
              borderLeft: "20px solid #E1B964",
              borderRight: "20px solid #E1B964",
              borderBottom: "none",
            }}
          >
            {/* Image and content area */}
            <div
              style={{
                width: "100%",
                minHeight: "280px", // Increased height for content
                backgroundColor: "#080C12",
                position: "relative", // For absolute positioning of icon
                border: "2px solid #E1B964",
                borderTop: "none",
                borderLeft: "none",
                borderRight: "none",
                padding: "1rem",
              }}
            >
              {/* Content area */}
              {showContent && (
                <div
                  className="text-white d-flex flex-column justify-content-center align-items-center text-center"
                  style={{
                    opacity: showContent ? 1 : 0,
                    transition: "opacity 0.3s ease",
                    fontFamily: "Krona One, sans-serif",
                    fontSize: "18px",
                    lineHeight: "1.7",
                    color: "#ffffff",
                    padding: "1.5rem",
                    borderRadius: "8px",
                    maxWidth: "500px",
                    margin: "0 auto",
                  }}
                >
                  {cards[expandedCard].content}

                  {/* Eğer Phantom Wallet kartıysa linki göster */}
                  {cards[expandedCard].title === "DOWNLOADING" && (
                    <a
                      href="https://phantom.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        textDecoration: "underline",
                        color: "#ffffff",
                        marginTop: "1rem",
                        fontSize: "16px",
                      }}
                    >
                      Connect your Phantom Wallet
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Title area */}
            <div
              className="text-center text-white py-3 px-2"
              style={{
                backgroundColor: "#E1B964",
              }}
            >
              <div
                style={{
                  fontFamily: "Arial, sans-serif",
                  fontWeight: "bold",
                }}
              >
                {cards[expandedCard].title}
              </div>
              <div
                style={{
                  fontFamily: "Arial, sans-serif",
                  fontWeight: "bold",
                }}
              >
                {cards[expandedCard].subtitle}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
