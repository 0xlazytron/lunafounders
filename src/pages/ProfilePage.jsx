import React, { useEffect, useRef } from "react";
import useUserAllNftsStore from "../store/userAllNfts";
import { Button, Card, Col, Row, Table } from "react-bootstrap";
import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";
import CreditCard from "../images/credit_card.png";
import MrLuna3 from "../images/MRLuna3.png";

const RevenueChart = loadable(() =>
  pMinDelay(import("../jsx/components/Karciz/EventPage/RevenueChart"), 1000)
);
const TicketChart = loadable(() =>
  pMinDelay(import("../jsx/components/Karciz/EventPage/TicketChart"), 1000)
);

const ProfilePage = () => {
  const nfts = [
    {
      nftName: "CyberPunk #12345",
      date: "23/03/07",
      price: "$12.00",
      status: "Completed",
    },
    // ... other nft data
  ];

  const { allNfts, fetchAllNfts } = useUserAllNftsStore();
  console.log(allNfts)
  
  // Create an array of refs for each possible video
  const videoRefs = useRef([]);
  
  // Set up refs when component mounts
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
            if (video) video.play().catch(e => console.log("Video play error:", e));
          }, seqIdx * 100);
        }
      });
      
      // Loop each on end with 2s delay
      videoRefs.current.forEach(video => {
        if (!video) return;
        video.addEventListener("ended", () => {
          setTimeout(() => {
            if (video) video.play().catch(e => console.log("Video play error:", e));
          }, 2000);
        });
      });
    }
  }, [videoRefs.current]);

  useEffect(() => {
    fetchAllNfts().then(data => console.log("Fetched NFTs:", data));
  }, []);
  
  // Extract NFT data for display
  const nftItems = Object.values(allNfts || {});

  return (
    <div className="container-fluid">
      {/* Profile section */}
      <Row className="my-5 justify-content-center">
        <Col xs={12} className="text-center">
          <div className="d-flex align-items-center justify-content-center flex-column flex-md-row gap-3">
            <div
              className="rounded-circle overflow-hidden mb-2 mb-md-0"
              style={{ width: "80px", height: "80px", flexShrink: 0 }}
            >
              <img
                src={MrLuna3 || "/placeholder.svg"}
                alt="David Luna"
                className="w-100 h-100 object-fit-cover"
              />
            </div>
            <h1 className="display-6 fw-bold mb-0">David Luna</h1>
          </div>
        </Col>
      </Row>

      {/* Wallet stats section */}
      <Row className="my-4 g-4">
        <Col xs={12} sm={6} lg={3}>
          <Card className="h-100 overflow-hidden" style={{ minHeight: "100px" }}>
            <div className="card-header border-0 pb-0">
              <div>
                <p className="mb-2">Your Wallet Balance</p>
                <h3 className="mb-0 fs-24 font-w600">$124,136</h3>
              </div>
            </div>
            <div className="card-body p-0">
              <div className="col-7 px-0 offset-5 mt-widget" style={{ pointerEvents: "none" }}>
                <RevenueChart />
              </div>
            </div>
          </Card>
        </Col>
        {/* Other stat cards */}
        <Col xs={12} sm={6} lg={3}>
          <Card className="h-100 overflow-hidden" style={{ minHeight: "100px" }}>
            <div className="card-header border-0 pb-0">
              <div>
                <p className="mb-2">First Line Earnings</p>
                <h3 className="mb-0 fs-24 font-w600">639 Pcs</h3>
              </div>
            </div>
            <div className="card-body p-0">
              <div className="col-7 px-0 offset-5 mt-widget" style={{ pointerEvents: "none" }}>
                <TicketChart />
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={12} sm={6} lg={3}>
          <Card className="h-100 overflow-hidden bg-image bg-danger" style={{ minHeight: "100px" }}>
            <div className="card-header border-0">
              <div>
                <p className="mb-2 text-light">Team Earnings</p>
                <h3 className="mb-0 fs-24 font-w600 text-white">25 Left</h3>
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={12} sm={6} lg={3}>
          <Card
            className="h-100 overflow-hidden position-relative"
            style={{
              backgroundImage: `linear-gradient(to bottom, #b03636, rgba(0, 0, 0, 0.5)), url(${CreditCard})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              minHeight: "100px",
            }}
          >
            <div className="card-header border-0 pb-0">
              <div className="position-absolute top-0 start-0 p-3">
                <p className="mb-2 text-light">Credit Card Form</p>
              </div>
            </div>
            <div className="card-body p-0">
              <div className="col-7 px-0 offset-5 mt-widget"></div>
            </div>
          </Card>
        </Col>
      </Row>

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
        <div className="d-flex justify-content-center flex-wrap mb-4" style={{ gap: "8px", rowGap: "4px" }}>
          {nftItems.slice(0, 4).map((nft, idx) => (
            <div key={idx} className="d-flex flex-column align-items-center">
              {nft.metadata.animation_url ? (
                <video
                  ref={el => videoRefs.current[idx] = el}
                  muted
                  playsInline
                  loop
                  style={{ width: "200px", height: "340px", objectFit: "cover" }}
                >
                  <source src={nft.metadata.animation_url} type="video/webm" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img
                  src={nft.metadata.image || "/placeholder.svg"}
                  alt={`Luna NFT ${idx + 1}`}
                  style={{ width: "200px", height: "340px", objectFit: "cover" }}
                />
              )}
              <Button
                size="sm"
                className="mt-1 px-5 py-1"
                style={{
                  background: "linear-gradient(to right, #f0f0f0,rgb(139, 137, 137))",
                  border: "none"
                }}
              >
                Mint
              </Button>
            </div>
          ))}
        </div>

        <div className="d-flex justify-content-center flex-wrap mb-4" style={{ gap: "8px", rowGap: "4px" }}>
          {nftItems.slice(4, 7).map((nft, idx) => (
            <div key={idx} className="d-flex flex-column align-items-center">
              {nft.metadata.animation_url ? (
                <video
                  ref={el => videoRefs.current[idx] = el}
                  muted
                  playsInline
                  loop
                  style={{ width: "200px", height: "340px", objectFit: "cover" }}
                >
                  <source src={nft.metadata.animation_url} type="video/webm" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img
                  src={nft.metadata.image || "/placeholder.svg"}
                  alt={`Luna NFT ${idx + 1}`}
                  style={{ width: "200px", height: "340px", objectFit: "cover" }}
                />
              )}
              <Button
                size="sm"
                className="mt-1 px-5 py-1"
                style={{
                  background: "linear-gradient(to right, #FFF69F, #D5A554)",
                  border: "none"
                }}
              >
                Mint
              </Button>
            </div>
          ))}
        </div>
        
        {/* Your NFTs Section */}
        <h2 className="display-6 fw-bold mb-4">Your NFTs</h2>
        <Card
          style={{
            background: "rgba(33, 37, 41, 1)",
            border: "1px solid rgba(55, 55, 55, 1)",
            borderRadius: "12px",
          }}
        >
          <Card.Body>
            <Table>
              <thead>
                <tr>
                  <th style={{ color: "rgba(255,255,255,0.5)" }}>NFT</th>
                  <th style={{ color: "rgba(255,255,255,0.5)" }}>Join Date</th>
                  <th style={{ color: "rgba(255,255,255,0.5)" }}>Price</th>
                </tr>
              </thead>
              <tbody>
                {nfts.map((nft, index) => (
                  <tr
                    key={index}
                    style={{
                      borderBottom: "1px solid rgba(55, 55, 55, 1)",
                    }}
                  >
                    <td className="text-white">{nft.nftName}</td>
                    <td className="text-white-50">{nft.date}</td>
                    <td className="text-danger">{nft.price}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Row>

      {/* Mint Button */}
      <Row className="my-5">
        <Col xs={12} className="text-center position-relative" style={{ zIndex: 1 }}>
          <Button
            className="btn-lg fw-semibold px-5 py-3"
            style={{
              background: "linear-gradient(to bottom, rgba(255, 246, 159, 1), rgba(213, 165, 84, 1))",
              border: "none",
              color: "#fff",
              borderRadius: "30px",
            }}
          >
            Mint New NFTs
          </Button>
        </Col>
      </Row>

      {/* Referrals Section */}
      <Row>
        <Col xs={12}>
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3">
            <div>
              <h2 className="display-6 fw-bold mb-2">Your Referrals</h2>
              <p className="text-white-50 mb-0">0 direct referrals</p>
            </div>
          </div>
          <Card
            style={{
              background: "rgba(33, 37, 41, 1)",
              border: "1px solid rgba(55, 55, 55, 1)",
              borderRadius: "12px",
            }}
          >
            <Card.Body className="p-0 p-sm-3">
              <div className="table-responsive">
                <Table variant="dark" borderless className="mb-0">
                  <thead>
                    <tr>
                      <th style={{ color: "rgba(255,255,255,0.5)" }}>Date</th>
                      <th style={{ color: "rgba(255,255,255,0.5)" }}>NFT name</th>
                      <th style={{ color: "rgba(255,255,255,0.5)" }}>Price</th>
                      <th style={{ color: "rgba(255,255,255,0.5)" }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {nfts.map((nft, index) => (
                      <tr
                        key={index}
                        style={{
                          borderBottom: "1px solid rgba(55, 55, 55, 1)",
                        }}
                      >
                        <td className="text-white">{nft.date}</td>
                        <td className="text-white">{nft.nftName}</td>
                        <td className="text-white">{nft.price}</td>
                        <td>
                          <span
                            className={`badge ${
                              nft.status === "Completed"
                                ? "bg-primary"
                                : "bg-secondary"
                            }`}
                          >
                            {nft.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProfilePage;