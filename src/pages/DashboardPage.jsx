import React, { Fragment, useContext, useEffect, useRef, useState } from "react";
import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";
import { Link } from "react-router-dom";
import { Button, Card, Dropdown, Nav, Row, Tab, Table } from "react-bootstrap";
import { letestBlog } from "../jsx/components/Karciz/Dashboard/HomePageData";
import { ThemeContext } from "../context/ThemeContext";
import userLogo from "../images/UserVector.png";
import solanaLogo from "../images/SolanaVector.png";
import LunaNFT from "../images/3DLunaNFT.png";
import userTop from "../images/user-top.png";
import userDown from "../images/user-down.png";
import dollarTop from "../images/dollar-top.png";
import dollarDown from "../images/dollar-down.png";
import NFTCarousel from "../jsx/components/Components/nft-carousel";
import useUserAllNftsStore from "../store/userAllNfts";
import { mintFromCandyMachine } from "../services/MintService";
import { useWallet } from "@solana/wallet-adapter-react";
import { toast } from "react-hot-toast";

const HomeSalesRevenueChart = loadable(() =>
  pMinDelay(
    import("../jsx/components/Karciz/Dashboard/HomeSalesRevenueChart"),
    1000
  )
);

function Dashboard() {
  const { changeBackground } = useContext(ThemeContext);
  const videoRefs = useRef([]);
  const wallet = useWallet();
  const [mintingStatus, setMintingStatus] = useState({
    loading: false,
    error: null,
    success: false,
    nftId: null
  });

  useEffect(() => {
    changeBackground({ value: "dark", label: "Dark" });
  }, [changeBackground]);

  const { allNfts, fetchAllNfts } = useUserAllNftsStore();
  useEffect(() => {
    videoRefs.current = videoRefs.current.slice(0, 7);
  }, []);

  // Play videos in sequence when loaded
  useEffect(() => {
    if (videoRefs.current.length > 0) {
      const order = [0, 6, 1, 5, 2, 4, 3];
      // Initial staggered play
      order.forEach((vidIdx, seqIdx) => {
        if (videoRefs.current[vidIdx]) {
          setTimeout(() => {
            const video = videoRefs.current[vidIdx];
            if (video)
              video.play().catch((e) => console.log("Video play error:", e));
          }, seqIdx * 100);
        }
      });

      // Loop each on end with 2s delay
      videoRefs.current.forEach((video) => {
        if (!video) return;
        video.addEventListener("ended", () => {
          setTimeout(() => {
            if (video)
              video.play().catch((e) => console.log("Video play error:", e));
          }, 2000);
        });
      });
    }
  }, [videoRefs.current]);

  useEffect(() => {
    fetchAllNfts().then((data) => console.log("Fetched NFTs:", data));
  }, []);

  // Extract NFT data for display
  const nftItems = Object.values(allNfts || {});

  // dynamically derive images from fetched NFTs (animation_url preferred over image)
  const nftImages = nftItems
    .slice(4, 7)
    .map(
      (nft) =>
        nft.metadata.animation_url || nft.metadata.image || "/placeholder.svg"
    );

  const handleMint = async (nft) => {
    if (!wallet.connected) {
      toast.error("Please connect your wallet first");
      return;
    }

    setMintingStatus({
      loading: true,
      error: null,
      success: false,
      nftId: null
    });

    try {
      const { mint, signature, metadata } = await mintFromCandyMachine(
        {
          publicKey: "5MYS3ZS4aUUM61qmLHqY5k6LY6gmkt429K9JAPA7Gmv5",
          authority: "FtDmv1nGYogeHtGmQaLBfzQ279WKMn3FeBnbhagP1Xpz",
          collectionMint: "AMT8NTPppueqZcpjw4VGKdjSL7phUx3GYkY1v7m3FgCo",
          version: 1,
        },
        wallet
      );

      setMintingStatus({
        loading: false,
        error: null,
        success: true,
        nftId: mint
      });

      // Refresh NFT list after successful mint
      await fetchAllNfts();
      
      toast.success("NFT minted successfully!");
      
    } catch (err) {
      console.error("Mint error:", err);
      setMintingStatus({
        loading: false,
        error: err.message || "Failed to mint NFT",
        success: false,
        nftId: null
      });
      
      toast.error(err.message || "Failed to mint NFT", {
        duration: 5000,
        position: "bottom-center",
      });
    }
  };

  return (
    <Fragment>
      <div className="row" style={{ zIndex: "-9" }}>
        <div className="col-xl-6 col-xxl-5 col-lg-6">
          <div className="card ticket-bx">
            <div className="card-body">
              <div className="d-sm-flex d-block pb-sm-3 align-items-end">
                <div className="me-auto pr-3 mb-2 mb-sm-0">
                  <span className="text-white fs-20 font-w200 d-block mb-sm-3 mb-2">
                    Ticket Solds Today
                  </span>
                  <h2 className="fs-40 text-white mb-0">
                    1,502<span className="fs-18 ms-2">pcs</span>
                  </h2>
                </div>
                <div className="p-3">
                  <div className="text-end mb-2 me-1 fw-light text-white">
                    Prize
                  </div>

                  <div className="d-flex justify-content-between bg-primary py-2 px-3 gap-5 rounded-3">
                    <div className="d-flex flex-column align-items-center p-2 me-3">
                      {/* User Logosu etrafında boşluk olduğu için p-2 verdim  */}
                      <img src={userLogo} alt="User" />
                      <p className="mb-0 mt-2 text-center">8</p>
                    </div>
                    <div className="d-flex flex-column align-items-center ms-3">
                      <img src={solanaLogo} alt="User" />
                      <p className="mb-0 mt-1 text-center">0.5</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="progress mt-3 mb-4" style={{ height: "15px" }}>
                <div
                  className="progress-bar-striped progress-bar-animated"
                  style={{ width: "86%", height: "15px" }}
                  role="progressbar"
                >
                  <span className="sr-only">86% Complete</span>
                </div>
              </div>
              <p className="fs-12">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad mini
              </p>
              <Link to={"#"} className="text-white">
                View detail
                <i className="las la-long-arrow-alt-right scale5 ms-3"></i>
              </Link>
            </div>
          </div>
        </div>
        <div className="col-xl-6 col-xxl-7 col-lg-6">
          <div className="row">
            <div className="col-sm-6 order-1 order-sm-1">
              <div
                className="card overflow-hidden py-5 px-3"
                style={{
                  backgroundImage: `url(${userTop})`,
                  backgroundPosition: "right bottom",
                  backgroundSize: "auto 50%",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div className="d-flex align-items-center">
                  <div className="flex-grow-1 px-2">
                    <div className="text-white">Firstline</div>
                    <hr className="w-75 my-1" />
                    <div className="fw-light">Count</div>
                  </div>

                  <div className="d-flex align-items-center justify-content-center px-3">
                    <strong className="display-6 text-red fw-bold">10</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-sm-6 order-3 order-sm-2">
              <div
                className="card overflow-hidden py-5 px-3"
                style={{
                  backgroundImage: `url(${dollarTop})`,
                  backgroundPosition: "right bottom",
                  backgroundSize: "auto 50%",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div className="d-flex align-items-center">
                  <div className="flex-grow-1 px-2">
                    <div className="text-white">Firstline</div>
                    <hr className="w-75 my-1" />
                    <div className="fw-light">Earnings</div>
                  </div>

                  <div className="d-flex align-items-center justify-content-center px-3">
                    <strong className="display-6 text-red fw-bold">120$</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-sm-6 order-2 order-sm-3">
              <div
                className="card overflow-hidden py-5 px-3"
                style={{
                  backgroundImage: `url(${userDown})`,
                  backgroundPosition: "right top",
                  backgroundSize: "auto 37%",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div className="d-flex align-items-center">
                  <div className="flex-grow-1 px-2">
                    <div className="text-white">Team</div>
                    <hr className="w-75 my-1" />
                    <div className="fw-light">Count</div>
                  </div>

                  <div className="d-flex align-items-center justify-content-center px-3">
                    <strong className="display-6 text-red fw-bold">150</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-sm-6 order-4 order-sm-4">
              <div
                className="card overflow-hidden py-5 px-3"
                style={{
                  backgroundImage: `url(${dollarDown})`,
                  backgroundPosition: "right top",
                  backgroundSize: "auto 50%",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div className="d-flex align-items-center">
                  <div className="flex-grow-1 px-2">
                    <div className="text-white">Team</div>
                    <hr className="w-75 my-1" />
                    <div className="fw-light">Count</div>
                  </div>

                  <div className="d-flex align-items-center justify-content-center px-3">
                    <strong className="display-6 text-red fw-bold">
                      1550$
                    </strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-12">
          {/* <HomeTabChart /> */}
          <div className="card" id="sales_revenue">
            <div className="card-header border-0 pb-0 d-sm-flex d-block">
              <div className="d-flex align-items-center">
                <h4 className="fs-20 mb-0">Sales Revenue</h4>
                <div
                  className="ms-4"
                  style={{
                    flexGrow: 1,
                    height: "20px",
                    border: "0",
                    borderLeft: "2px solid #ccc",
                  }}
                />
                <Dropdown>
                  <Dropdown.Toggle variant="">2025</Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="#">2024</Dropdown.Item>
                    <Dropdown.Item href="#">2023</Dropdown.Item>
                    <Dropdown.Item href="#">2022</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>

              <div className="custom-tab-1">
                <Tab.Container defaultActiveKey="today">
                  <Nav as="ul" className="nav-tabs">
                    <Nav.Item as="li">
                      <Nav.Link eventKey="month">Monthly</Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li">
                      <Nav.Link eventKey="week">Weekly</Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li">
                      <Nav.Link eventKey="day">Daily</Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Tab.Container>
              </div>
            </div>

            <div className="card-body custome-tooltip">
              {/* <div id="activity"></div> */}
              <HomeSalesRevenueChart />
            </div>
          </div>
        </div>

        <Row className="my-5">
          {/* Luna Collections heading */}
          <h1
            style={{
              background: "linear-gradient(to right, #D5A554, #E79710)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontFamily: '"Krona One", sans-serif',
            }}
            className="mb-2 text-center"
          >
            LUNA COLLECTIONS
          </h1>

          {/* NFT Videos Section - two rows */}
          <div
            className="d-flex justify-content-center flex-wrap mb-4"
            style={{ gap: "8px", rowGap: "4px" }}
          >
            {nftItems.slice(0, 4).map((nft, idx) => (
              <div key={idx} className="d-flex flex-column align-items-center">
                {nft.metadata.animation_url ? (
                  <video
                    ref={(el) => (videoRefs.current[idx] = el)}
                    muted
                    playsInline
                    loop
                    style={{
                      width: "200px",
                      height: "340px",
                      objectFit: "cover",
                    }}
                  >
                    <source
                      src={nft.metadata.animation_url}
                      type="video/webm"
                    />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img
                    src={nft.metadata.image || "/placeholder.svg"}
                    alt={`Luna NFT ${idx + 1}`}
                    style={{
                      width: "200px",
                      height: "340px",
                      objectFit: "cover",
                    }}
                  />
                )}
                <Button
                  size="sm"
                  className="mt-1 px-5 py-1"
                  style={{
                    background: "linear-gradient(to right, #f0f0f0,rgb(139, 137, 137))",
                    border: "none",
                    opacity: mintingStatus.loading ? 0.7 : 1,
                    cursor: mintingStatus.loading ? "not-allowed" : "pointer"
                  }}
                  onClick={() => handleMint(nft)}
                  disabled={mintingStatus.loading || !wallet.connected}
                >
                  {mintingStatus.loading ? (
                    <div className="d-flex align-items-center">
                      <div className="spinner-border spinner-border-sm me-2" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                      Minting...
                    </div>
                  ) : (
                    "Mint"
                  )}
                </Button>
                {mintingStatus.error && (
                  <small className="text-danger mt-1 text-center" style={{maxWidth: "200px"}}>
                    {mintingStatus.error}
                  </small>
                )}
              </div>
            ))}
          </div>

          <div
            className="d-flex justify-content-center flex-wrap mb-4"
            style={{ gap: "8px", rowGap: "4px" }}
          >
            {nftItems.slice(4, 7).map((nft, idx) => (
              <div key={idx} className="d-flex flex-column align-items-center">
                {nft.metadata.animation_url ? (
                  <video
                    ref={(el) => (videoRefs.current[idx + 4] = el)}
                    muted
                    playsInline
                    loop
                    style={{
                      width: "200px",
                      height: "340px",
                      objectFit: "cover",
                    }}
                  >
                    <source
                      src={nft.metadata.animation_url}
                      type="video/webm"
                    />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img
                    src={nft.metadata.image || "/placeholder.svg"}
                    alt={`Luna NFT ${idx + 5}`}
                    style={{
                      width: "200px",
                      height: "340px",
                      objectFit: "cover",
                    }}
                  />
                )}
                <Button
                  size="sm"
                  className="mt-1 px-5 py-1"
                  style={{
                    background: "linear-gradient(to right, #FFF69F, #D5A554)",
                    border: "none",
                  }}
                  onClick={() => handleMint(nft)}
                >
                  Mint
                </Button>
              </div>
            ))}
          </div>
        </Row>

        <div className="col-xl-12">
          <div className="card px-5">
            <div className="d-flex justify-content-between align-items-center flex-wrap">
              <div className="col-xl-8 col-12 col-lg-8 p-2">
                <NFTCarousel images={nftImages} className="max-w-4xl w-full" />
              </div>

              <div className="col-xl-3 col-12 col-lg-3">
                <div className="card shadow-lg">
                  <div className="card-header border-0 pb-0 ">
                    <h4 className="fs-20">Latest Sales</h4>
                  </div>
                  <div className="card-body">
                    {letestBlog.map((data, index) => (
                      <div
                        className="media pb-3 border-bottom mb-3 align-items-center"
                        key={index}
                      >
                        <span className="ticket-icon text-white me-3 display-6 bg-primary">
                          {data.title.charAt(0)}
                        </span>
                        <div className="media-body">
                          <h6 className="fs-16 mb-0">{data.title}</h6>
                          <div className="d-flex">
                            <span className="fs-14 me-auto">
                              {data.subtitle}
                            </span>
                            <span className="fs-14">{data.timeblog}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
export default Dashboard;
