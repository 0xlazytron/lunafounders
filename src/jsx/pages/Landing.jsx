import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import LunaLogo from "../../images/logo_luna.png";
import Ellipse from "../../images/Ellipse.png";
import Ellipse2 from "../../images/Ellipse2.png";
import Ellipse3 from "../../images/Ellipse3.png";
import Ellipse4 from "../../images/Ellipse4.png";
import MrLuna from "../../images/mrluna.svg";
import Solana from "../../images/solanacoin.png";
import GoldenCoin from "../../images/goldcoin.png";
import GoldHeart from "../../images/Gold-Heart.png";
import GoldSpade from "../../images/Gold-Spade.png";
import GoldDiamond from "../../images/Gold-Diamond.png";
import GoldWallet from "../../images/GoldWallet.png";
import GoldenClover from "../../images/GoldenClover.png";
import GoldSolana from "../../images/GoldSolana.png";
import GoldDollar from "../../images/GoldDollar.png";
import GoldNFT from "../../images/GoldNFT.png";
import GoldHeartCard from "../../images/GoldHeartCard.png";
import NFTCarousel from "../../jsx/components/Components/nft-carousel";
import GoldPaperPlane from "../../images/Gold-PaperPlane.png";
import PolaroidCardGrid from "../components/Components/landing-cards";
import useUserAllNftsStore from "../../store/userAllNfts";


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedCard, setExpandedCard] = useState(null);

  const toggleCard = (index) => {
    if (expandedCard === index) {
      setExpandedCard(null);
    } else {
      setExpandedCard(index);
    }
  };


    const { allNfts, fetchAllNfts } = useUserAllNftsStore();
    useEffect(() => {
      fetchAllNfts();
    }, [fetchAllNfts]);
  
    // take last three images
    const nftImages = Object.values(allNfts || {})
      .map(n => n.metadata.image)
      .slice(-3);


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
        "Create your account using the referral code. Get instant access to exclusive bonuses and start exploring the world of Luna Casino.",
    },
    {
      image: GoldNFT,
      title: "BUYING AN",
      subtitle: "NFT",
      content:
        "Purchase limited LunaFounder NFTs to unlock advanced features and receive monthly rewards. Gain digital ownership in LunaCasino and become part of a growing Web3 community on Solana.",
    },
  ];
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <div // ! DIV 1__________________________________________________________________________________________________________________________________________________________________________
        className="position-relative w-100"
        style={{
          minHeight: "100vh",
          backgroundColor: "#080C12",
          overflow: "hidden",
        }}
      >
        <div>
          {/* Ellipses */}
          <img
            src={Ellipse}
            alt="Decoration"
            className="position-absolute d-none d-md-block"
            style={{ top: 0, left: 0, zIndex: 0 }}
          />
          <img
            src={Ellipse2}
            alt="Decoration"
            className="position-absolute d-none d-md-block"
            style={{ bottom: 0, right: 0, zIndex: 0 }}
          />

          {/* Header */}
          <header
            className="d-flex justify-content-between align-items-center px-3 px-md-4 py-3"
            style={{ zIndex: 1, position: "relative" }}
          >
            <div className="d-flex align-items-center">
              <Image
                src={LunaLogo}
                alt="Luna Casino Logo"
                style={{ height: "clamp(40px, 6vw, 64px)" }}
              />
            </div>

            {/* Mobile Menu Button */}
            <button
              className="d-md-none bg-transparent border-0 text-white"
              onClick={toggleMenu}
              aria-label="Toggle navigation"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 12H21"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3 6H21"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3 18H21"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Desktop Navigation */}
            <nav className="d-none d-md-flex align-items-center gap-3 gap-lg-4">
              <a
                href="#how"
                className="text-white text-decoration-none fw-medium"
              >
                Wie Es Funktioniert
              </a>
              <a
                href="#buy"
                className="text-white text-decoration-none fw-medium"
              >
                Founder Minten
              </a>
              <a
                href="https://lunacasino.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-decoration-none fw-medium"
              >
                Casino
              </a>

              <a
                href="/faq"
                className="text-white text-decoration-none fw-medium"
              >
                FAQ
              </a>
            </nav>

            <div className="d-none d-md-flex align-items-center gap-2">
              <Button variant="" href="/login" size="sm" className="text-white">
                Log In
              </Button>
              <Button
                href="/register"
                className="text-white border-0"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #FFF69F, #D5A554)",
                  color: "#000",
                }}
              >
                Registrieren
              </Button>
            </div>
          </header>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div
              className="d-md-none position-absolute w-100 bg-dark p-3"
              style={{ zIndex: 10 }}
            >
              <nav className="d-flex flex-column gap-3">
                <a
                  href="#how"
                  className="text-white text-decoration-none fw-medium"
                  onClick={toggleMenu}
                >
                  Wie Es Funktioniert
                </a>
                <a
                  href="#buy"
                  className="text-white text-decoration-none fw-medium"
                  onClick={toggleMenu}
                >
                  Kaufen
                </a>
                <a
                  href="#sell"
                  className="text-white text-decoration-none fw-medium"
                  onClick={toggleMenu}
                >
                  Verkaufen
                </a>
                <a
                  href="#casino"
                  className="text-white text-decoration-none fw-medium"
                  onClick={toggleMenu}
                >
                  Casino
                </a>
                <a
                  href="#lotto"
                  className="text-white text-decoration-none fw-medium"
                  onClick={toggleMenu}
                >
                  Lotto
                </a>
              </nav>
              <div className="d-flex gap-2 mt-3">
                <Button
                  variant=""
                  href="/login"
                  size="sm"
                  className="text-white flex-grow-1"
                >
                  Log In
                </Button>

                <Button
                  className="text-white border-0 flex-grow-1"
                  href="/register"
                  onClick={() => {
                    console.log("Register Button Clicked");
                  }}
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, #FFF69F, #D5A554)",
                    color: "#000",
                  }}
                >
                  Registrieren
                </Button>
              </div>
            </div>
          )}

          {/* Hero Section */}
          <div className="d-flex flex-column justify-content-center align-items-center vh-100">
            <div className="h-100 d-flex flex-column flex-md-row align-items-center justify-content-between text-white px-3 px-md-4">
              {/* Left Text Content */}
              <div className="col-12 col-md-8 order-1 order-md-0 text-center text-md-start mt-5 mt-md-0">
                <h1
                  className="display-4 fw-bold mb-3"
                  style={{
                    fontFamily: "Krona One, sans-serif",
                    fontSize: "clamp(2rem, 5vw, 3.5rem)",
                  }}
                >
                  Willkommen <br />
                  bei{" "}
                  <span
                    style={{
                      background: "linear-gradient(to right, #FFD36E, #E79710)",
                      WebkitBackgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    Luna Founder
                  </span>
                </h1>

                <h2
                  className="h4 fw-lighter mb-3 display-6 d-block d-md-none"
                  style={{
                    fontStyle: "italic",
                    fontSize: "clamp(1rem, 2vw, 1.5rem)",
                  }}
                >
                  Dein Zugang zu passivem Einkommen durch <br />
                  NFTs und Online-Glücksspiel!
                </h2>

                <h2
                  className="h4 fw-lighter mb-3 display-6 d-none d-md-block"
                  style={{
                    fontStyle: "italic",
                    fontSize: "clamp(3rem, 2vw, 1.5rem)",
                  }}
                >
                  Dein Zugang zu passivem Einkommen durch <br />
                  NFTs und Online-Glücksspiel!
                </h2>

                <p
                  className="mb-4 fs-5"
                  style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)" }}
                >
                  Jetzt Anmelden und NFTs kaufen!
                </p>
                <div className="d-flex gap-3 justify-content-center justify-content-md-start">
                  <Button
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, #FFF69F, #D5A554)",
                      color: "#000",
                      border: "none",
                    }}
                  >
                    Registrieren
                  </Button>
                  <Button className="text-decoration-underline" variant="">
                    Wie es funktioniert
                  </Button>
                </div>

                <div className="d-flex flex-wrap gap-3 mt-5 justify-content-center justify-content-md-start">
                  <div className="d-flex gap-2 align-items-center">
                    <img
                      height={48}
                      src={GoldSpade}
                      alt="gold-spade"
                      style={{ height: "clamp(32px, 5vw, 48px)" }}
                    />
                    <p className="m-0">
                      Protected <br /> Payment Gateway
                    </p>
                  </div>

                  <div className="d-flex gap-2 align-items-center">
                    <img
                      height={48}
                      src={GoldDiamond}
                      alt="gold-diamond"
                      style={{ height: "clamp(32px, 5vw, 48px)" }}
                    />
                    <p className="m-0">
                      Easy <br /> to Use Platform
                    </p>
                  </div>

                  <div className="d-flex gap-2 align-items-center">
                    <img
                      height={48}
                      src={GoldHeart}
                      alt="gold-heart"
                      style={{ height: "clamp(32px, 5vw, 48px)" }}
                    />
                    <p className="m-0">
                      Fast
                      <br /> Bank Transfer
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-6 position-relative d-flex justify-content-center align-items-center order-0 order-md-1">
                <Image
                  src={MrLuna}
                  alt="Mr Luna"
                  fluid
                  style={{
                    maxHeight: "min(80vw, 600px)",
                    position: "relative",
                    zIndex: 1,
                  }}
                />
                <div
                  className="position-absolute d-flex justify-content-center align-items-center"
                  style={{
                    bottom: "30px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 2,
                    width: "100%",
                  }}
                >
                  <Image
                    src={Solana}
                    alt="Solana Coin"
                    className="mx-2 d-none d-md-block"
                    style={{
                      width: "min(50vw, 520px)",
                      transform: "translateY(80px) translateX(120px)",
                      zIndex: 3,
                    }}
                  />
                  <Image
                    src={GoldenCoin}
                    alt="Golden Coin"
                    className="d-none d-md-block"
                    style={{
                      width: "min(30vw, 300px)",
                      transform: "translateY(120px) translateX(-130px)",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div // ! DIV 2__________________________________________________________________________________________________________________________________________________________________________
        className="position-relative w-100 d-flex flex-column justify-content-center align-items-center"
        style={{
          minHeight: "100vh",
          backgroundColor: "#080C12",
          overflow: "hidden",
          padding: "20px",
          textAlign: "center",
        }}
      >
        {/* Ellipses - Only visible on larger screens */}
        <img
          src={Ellipse3}
          alt="Decoration"
          className="position-absolute d-none d-md-block"
          style={{
            top: 0,
            right: 0,
            zIndex: 0,
            maxWidth: "100%",
            height: "auto",
          }}
        />

        <div
          className="position-relative"
          style={{ zIndex: 1, maxWidth: "1200px" }}
        >
          <h1
            className="display-4 mb-3"
            style={{
              fontFamily: "Krona One, sans-serif",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              lineHeight: "1.2",
            }}
          >
            Dein{" "}
            <span
              style={{
                background: "linear-gradient(to right, #FFD36E, #E79710)",
                WebkitBackgroundClip: "text",
                color: "transparent",
                display: "inline",
              }}
            >
              Einstieg
            </span>{" "}
            mit Phantom <br className="d-none d-md-block" /> Wallet und NFTs
          </h1>
          <h6
            className="fw-light mx-auto"
            style={{
              maxWidth: "600px",
              fontSize: "clamp(0.875rem, 2vw, 1.25rem)",
            }}
          >
            Lade Phantom herunter, kaufe Solana (SOL) und mint dein erstes NFT-
            schnell und einfach!
          </h6>

          <div
            className="row justify-content-center g-4"
            style={{ maxWidth: "1200px" }}
          >
            {/* Card 1 */}
            <div className="col-md-6">
              <div className="d-flex align-items-start text-start p-4 rounded">
                <img
                  src={GoldWallet}
                  alt="Gold Heart"
                  className="me-4"
                  style={{ width: "60px", height: "60px" }}
                />
                <div>
                  <h3 className="h4 mb-3">
                    Phantom Wallet installieren & einrichten
                  </h3>
                  <p className="mb-0 fw-light">
                    Richten Sie Ihre Phantom Wallet schnell ein - entweder auf
                    Ihrem Handy oder PC, und starten sie thr Krypto- Abenteuer
                    sicher.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="col-md-6">
              <div className="d-flex align-items-start text-start p-4 rounded">
                <img
                  src={GoldSolana}
                  alt="Gold Heart"
                  className="me-4"
                  style={{ width: "60px", height: "60px" }}
                />
                <div>
                  <h3 className="h4 mb-3">Solana (SOL) kaufen</h3>
                  <p className="mb-0 fw-light">
                    Erwerben Sie Solana (SOL) über Börsen und transferieren Sie
                    diese in Ihre Phantom Wallet.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="col-md-6">
              <div className="d-flex align-items-start text-start p-4 rounded">
                <img
                  src={GoldDollar}
                  alt="Gold Heart"
                  className="me-4"
                  style={{ width: "60px", height: "60px" }}
                />
                <div>
                  <h3 className="h4 mb-3">NFTs minten</h3>
                  <p className="mb-0 fw-light">
                    Wählen Sie Ihre bevorzugte NFT-Kollektion und minten Sie Ihr
                    erstes NFT direkt in der Wallet.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 4 */}
            <div className="col-md-6">
              <div className="d-flex align-items-start text-start p-4 rounded">
                <img
                  src={GoldNFT}
                  alt="Gold Heart"
                  className="me-4"
                  style={{ width: "60px", height: "60px" }}
                />
                <div>
                  <h3 className="h4 mb-3">Passives Einkommen generieren</h3>
                  <p className="mb-0 fw-light">
                    Nutzen Sie Ihre NFTs, um passives Einkommen durch unser
                    Casino- und Lottosystem zu generieren.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div // ! DIV 3__________________________________________________________________________________________________________________________________________________________________________
        className="position-relative w-100 d-flex flex-column justify-content-center align-items-center"
        style={{
          backgroundColor: "#080C12",
          overflow: "hidden",
        }}
      >
        {/* Ellipses - Only visible on larger screens */}
        <img
          src={Ellipse4}
          alt="Decoration"
          className="position-absolute d-none d-md-block"
          style={{
            top: 0,
            left: 0,
            zIndex: 0,
            maxWidth: "100%",
            height: "auto",
          }}
        />

        {/* Main Content Container - Centered Vertically and Horizontally */}
        <div
          className="d-flex flex-column flex-lg-row justify-content-center align-items-center"
          style={{
            maxWidth: "1400px",
            width: "100%",
            zIndex: 1,
            gap: "60px",
          }}
        >
          {/* Text Content */}
          <div
            className="text-center text-lg-start"
            style={{
              maxWidth: "700px",
            }}
          >
            <h1
              className="text-white mb-5"
              style={{
                fontSize: "clamp(1rem, 2vw, 3.5rem)",
                fontWeight: "500",
                lineHeight: "1.3",
                fontFamily: "Krona One, sans-serif",
              }}
            >
              LunaFounder 5K NFT
            </h1>
            <div
              className="text-white text-start"
              style={{
                fontSize: "clamp(1rem, 2vw, 1rem)",
                lineHeight: "1.6",
                fontFamily: "Roboto, sans-serif",
              }}
            >
              <p>
                <strong>Deine Vorteile:</strong>
              </p>
              <ul className="ps-3" style={{ listStyleType: "disc" }}>
                <li className="mb-3">
                  <strong>
                    <i class="bi bi-dot"></i> 15 % Profitshare von LunaCasino
                  </strong>
                  <br />
                  Du erhältst monatlich einen Anteil an den Netto-Gewinnen von
                  LunaCasino – anteilig nach NFT-Wert.
                </li>
                <li className="mb-3">
                  <strong>
                    <i class="bi bi-dot"></i>Automatische Lotto-Tickets
                  </strong>
                  <br />
                  Jeden Monat bekommst du neue Tickets für LunaLotto – kostenlos
                  mintbar.
                </li>
                <li className="mb-3">
                  <strong>
                    <i class="bi bi-dot"></i>Streamline Power
                  </strong>
                  <br />
                  Ab 500 $ bist du in der <em>globalen Rangliste</em> für
                  Leader-Rewards.
                </li>
                <li className="mb-3">
                  <strong>
                    <i class="bi bi-dot"></i>Exklusive Zugänge
                  </strong>
                  <br />
                  VIP-Zugang zu Beta-Phasen, Events, Airdrops und mehr.
                </li>
                <li className="mb-3">
                  <strong>
                    <i class="bi bi-dot"></i>Wertentwicklung & Handel
                  </strong>
                  <br />
                  Deine NFTs sind <em>nach Abschluss des Verkaufs</em> auf dem
                  Solana-Marktplatz handelbar – limitiert & deflationär.
                </li>
              </ul>
            </div>
          </div>

          {/* Image - Larger */}
          <div
            className="d-flex justify-content-center"
            style={{
              maxWidth: "700px",
              width: "100%",
            }}
          >
            <img
              src={GoldHeartCard}
              alt="Golden Card"
              className="img-fluid"
              style={{
                maxHeight: "700px",
                width: "auto",
                height: "auto",
                maxWidth: "100%",
                objectFit: "contain",
              }}
            />
          </div>
          {/* <div
            className="d-flex justify-content-center"
            style={{
              maxWidth: "700px",
              width: "100%",
            }}
          >
            <video
              src={FiveKNFT}
              autoPlay
              loop
              muted
              playsInline
              className="img-fluid"
              style={{
                maxHeight: "700px",
                width: "auto",
                height: "auto",
                maxWidth: "100%",
                objectFit: "contain",
              }}
            />
          </div> */}
        </div>
      </div>

      <div // ! DIV 4__________________________________________________________________________________________________________________________________________________________________________
        className="position-relative w-100 py-5"
        style={{
          backgroundColor: "#080C12",
          overflow: "hidden",
        }}
      >
        <div>
          {/* Ellipses */}
          <img
            src={Ellipse}
            alt="Decoration"
            className="position-absolute d-none d-md-block"
            style={{ top: 0, left: 0, zIndex: 0 }}
          />

          <img
            src={Ellipse2}
            alt="Decoration"
            className="position-absolute d-none d-md-block"
            style={{ bottom: 0, right: 0, zIndex: 0 }}
          />

          <div>
            <h1
              className="text-center display-1"
              style={{
                fontFamily: "Krona One, sans-serif",
                background: "linear-gradient(to right, #D5A554, #E79710)",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              LUNA COLLECTIONS
            </h1>
                <NFTCarousel images={nftImages} className="max-w-4xl w-full" />
          </div>
        </div>
      </div>

      <div // ! DIV 5__________________________________________________________________________________________________________________________________________________________________________
        className="position-relative w-100 d-flex flex-column justify-content-center align-items-center"
        style={{
          minHeight: "100vh",
          backgroundColor: "#080C12",
          overflow: "hidden",
          padding: "20px",
          textAlign: "center",
        }}
      >
        {/* YouTube Video - Dikdörtgen Versiyon */}
        <div
          style={{
            width: "90%",
            maxWidth: "1200px",
            height: "60vh" /* Ekran yüksekliğinin %60'ı */,
            position: "relative",
            zIndex: 1,
            margin: "auto",
          }}
        >
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/M-hiZfIuyJw"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              borderRadius: "8px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
            }}
            loading="lazy"
            title="YouTube Video: Introduction to System" // Add a descriptive title
          ></iframe>
        </div>

        {/* Ellipses - Only visible on larger screens */}
        <img
          src={Ellipse3}
          alt="Decoration"
          className="position-absolute d-none d-md-block"
          style={{
            top: 0,
            right: 0,
            zIndex: 0,
            maxWidth: "100%",
            height: "auto",
          }}
        />
        <img
          src={Ellipse4}
          alt="Decoration"
          className="position-absolute d-none d-md-block"
          style={{
            top: 0,
            left: 0,
            zIndex: 0,
            maxWidth: "100%",
            height: "auto",
          }}
        />
      </div>

      <div
        className="container-fluid py-4 py-md-5"
        style={{
          backgroundColor: "#080C12",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <img
          src={Ellipse}
          alt="Decoration"
          className="position-absolute d-none d-md-block"
          style={{ top: -250, left: 0, zIndex: 0 }}
        />

        {/* <div className="row justify-content-center mb-4 mb-md-5">
          <div className="col-12 text-center">
            <h1
              className="text-white"
              style={{
                fontSize: "calc(1.5rem + 1vw)",
                fontFamily: "Krona One, sans-serif",
              }}
            >
              Invite your friend, earn exclusive bonuses!
            </h1>
          </div>
        </div> */}

        {/* <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div
              className="d-flex align-items-center px-3 px-md-4 py-3 rounded-pill shadow"
              style={{
                background: "linear-gradient(90deg, #FFD36E 0%, #A58141 100%)",
              }}
            >
              <div className="me-3">
                <img
                  src={GoldPaperPlane}
                  alt="Gold Paper Plane"
                  className="img-fluid"
                  style={{
                    width: "40px",
                    height: "auto",
                  }}
                />
              </div>

              <div className="flex-grow-1 text-center">
                <span
                  className="text-white fw-medium"
                  style={{
                    fontSize: "calc(1.2rem + 0.3vw)",
                  }}
                >
                  1111927372991
                </span>
              </div>

              <div className="ms-3">
                <i
                  className="bi bi-link-45deg text-white"
                  style={{
                    fontSize: "calc(1.5rem + 0.5vw)",
                  }}
                ></i>
              </div>
            </div>
          </div>
        </div> */}
        <div className="px-5">
          <PolaroidCardGrid />
        </div>

        <hr
          style={{
            width: "90%",
            height: "4px",
            border: "none",
            borderRadius: "2px",
            background: "linear-gradient(to right, #E79710, #FFD36E)",
            margin: "3rem auto 2rem auto",
          }}
        />

        <div className="text-center text-white px-3">
          <p
            style={{
              fontSize: "1rem",
              maxWidth: "800px",
              margin: "0 auto 1.5rem auto",
            }}
          >
            LunaLotto und LunaCasino sind innovative Plattformen, die die Welten
            des Online-Glücksspiels und der Blockchain-Technologie
            zusammenführen.
          </p>

          <div
            className="d-flex justify-content-center align-items-center mb-3 gap-3"
            style={{ fontSize: "1.5rem" }}
          >
            <i className="bi bi-facebook"></i>
            <i class="bi bi-twitter"></i>
            <i className="bi bi-instagram"></i>
          </div>

          <p className="mb-1" style={{ fontSize: "0.95rem" }}>
            © 2025 Copyright Lunalotto. All Rights Reserved
          </p>

          <div
            className="d-flex justify-content-center align-items-center gap-4"
            style={{ fontSize: "0.9rem" }}
          >
            <a href="/agb" className="text-white text-decoration-none">
              Allgemeine Geschäftsbedingungen (AGB)
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
