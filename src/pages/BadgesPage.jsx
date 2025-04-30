import React, { useState } from "react";
import { Card, Table, Modal, Button } from "react-bootstrap";

import star1 from "../images/yildiz1.png";
import star3 from "../images/yildiz3.png";
import star4 from "../images/yildiz4.png";
import star5 from "../images/yildiz5.png";
import star6 from "../images/yildiz6.png";

const ranks = [
  {
    name: "Lucky Star",
    description: "0 USD - 100 USD",
    icon: star1,
    style: {
      background: "rgba(33, 37, 41, 1)",
      border: "1px solid rgba(231, 151, 16, 1)",
      boxShadow: "0 0 10px rgba(231, 151, 16, 0.1)",
    },
  },
  {
    name: "High Roller",
    description: "100 USD - 500 USD",
    icon: star6,
    style: {
      background: "rgba(25, 28, 31, 1)",
      border: "1px solid rgba(55, 55, 55, 1)",
    },
  },
  {
    name: "Jackpot Master",
    description: "500 USD - 1000 USD",
    icon: star3,
    style: {
      background: "rgba(25, 28, 31, 1)",
      border: "1px solid rgba(55, 55, 55, 1)",
    },
  },
  {
    name: "Royal Arch",
    description: "1000 USD - 5000 USD",
    icon: star4,
    style: {
      background: "rgba(25, 28, 31, 1)",
      border: "1px solid rgba(55, 55, 55, 1)",
    },
  },
  {
    name: "Golden Tycoon",
    description: "5000 USD+",
    icon: star5,
    style: {
      background: "rgba(25, 28, 31, 1)",
      border: "1px solid rgba(55, 55, 55, 1)",
    },
  },
];

const rankLevels = [
  {
    id: "1",
    user: "User",
    wallet: "wallet-g1",
    score: "5000",
    mail: "user@mail.com",
  },
  {
    id: "2",
    user: "User",
    wallet: "wallet-g2",
    score: "4000",
    mail: "user@mail.com",
  },
  {
    id: "3",
    user: "User",
    wallet: "wallet-g3",
    score: "3000",
    mail: "user@mail.com",
  },
  {
    id: "4",
    user: "User",
    wallet: "wallet-g4",
    score: "2000",
    mail: "user@mail.com",
  },
  {
    id: "5",
    user: "User",
    wallet: "wallet-g5",
    score: "1000",
    mail: "user@mail.com",
  },
];

const BadgesPage = () => {
  const [selectedRank, setSelectedRank] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="container-fluid" style={{ padding: "2rem" }}>
      <div className="row">
        <div className="col-12">
          <h4 className="text-white text-center mb-5 fs-32">Ranks</h4>
          <div className="position-relative mb-4">
            <div
              style={{
                height: "8px",
                background:
                  "linear-gradient(to right, rgba(231, 151, 16, 1), rgba(255, 211, 110, 1))",
                width: "100%",
              }}
            ></div>
          </div>
          <p className="text-white fw-light mb-4 text-center fs-32">
            <span className="me-5">No Badge</span> |
            <span className="ms-5">
              total score 0 USD. Confidence cannot be evaluated{" "}
            </span>
          </p>
          <div className="row g-4 mb-4 d-flex justify-content-center">
            {ranks.map((rank, index) => (
              <div
                key={index}
                className="col-12 col-sm-6 col-md-4 d-flex justify-content-center"
              >
                <Card
                  onClick={() => setSelectedRank(index)}
                  style={{
                    ...rank.style,
                    borderRadius: "32px",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    width: "200px",
                    height: "200px",
                    transform:
                      selectedRank === index ? "scale(1.02)" : "scale(1)",
                    opacity: selectedRank === index ? 1 : 0.8,
                    position: "relative", // Burada önemli
                  }}
                  className="h-100"
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      zIndex: 2,
                      color: "#e9c253",
                      fontSize: "1.2rem",
                      opacity: 0.8,
                    }}
                  >
                    <i className="bi bi-info-circle"></i>
                  </div>

                  <Card.Body className="text-center p-3 d-flex flex-column justify-content-center align-items-center">
                    <div
                      className="mb-2"
                      style={{
                        position: "relative",
                        width: "100px",
                        height: "100px",
                      }}
                    >
                      <img
                        src={rank.icon}
                        alt={rank.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          filter:
                            selectedRank === index
                              ? "brightness(1.2)"
                              : "brightness(1)",
                        }}
                      />
                    </div>
                    <h6
                      className="text-white mb-1"
                      style={{
                        fontSize: "1rem",
                        color:
                          selectedRank === index
                            ? "rgba(231, 151, 16, 1)"
                            : "rgba(255, 255, 255, 0.9)",
                      }}
                    >
                      {rank.name}
                    </h6>
                    <small
                      className="d-block"
                      style={{
                        fontSize: "0.8rem",
                        color: "rgba(255, 255, 255, 0.5)",
                      }}
                    >
                      {rank.description}
                    </small>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>

          <Card
            style={{
              background: "rgba(25, 28, 31, 1)",
              border: "1px solid rgba(55, 55, 55, 1)",
              borderRadius: "12px",
            }}
          >
            <Card.Body
              style={{ backgroundColor: "#2f363e" }}
              className="py-3 px-5"
            >
              <div>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search name, phone, etc..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                      background: "rgba(33, 37, 41, 1) !important",
                      border: "1px solid rgba(55, 55, 55, 1)",
                      color: "#fff",
                      borderRadius: "8px",
                      height: "45px",
                      fontSize: "0.875rem",
                    }}
                  />
                </div>
              </div>

              <div className="table-responsive">
                <Table striped hover variant="dark" className="mb-0">
                  <thead>
                    <tr
                      style={{ borderBottom: "1px solid rgba(55, 55, 55, 1)" }}
                    >
                      <th
                        style={{
                          padding: "1rem",
                          color: "rgba(255,255,255,0.5)",
                          fontWeight: "normal",
                          fontSize: "0.875rem",
                          textAlign: "left", // Left align the Name column
                        }}
                      >
                        Name
                      </th>
                      <th
                        style={{
                          padding: "1rem",
                          color: "rgba(255,255,255,0.5)",
                          fontWeight: "normal",
                          fontSize: "0.875rem",
                          textAlign: "right", // Right align the Wallet column
                        }}
                      >
                        Wallet
                      </th>
                      <th
                        style={{
                          padding: "1rem",
                          color: "rgba(255,255,255,0.5)",
                          fontWeight: "normal",
                          fontSize: "0.875rem",
                          textAlign: "right", // Right align the Sales column
                        }}
                      >
                        Sales
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {rankLevels.map((level, index) => (
                      <tr
                        key={index}
                        style={{
                          borderBottom: "1px solid rgba(55, 55, 55, 0.3)",
                        }}
                      >
                        <td style={{ padding: "1rem", textAlign: "left" }}>
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <input
                              type="checkbox"
                              className="form-check-input"
                              style={{
                                background: "transparent",
                                border: "1px solid rgba(255,255,255,0.2)",
                              }}
                            />
                            <span
                              style={{
                                fontSize: "20px",
                                fontWeight: "bold",
                                marginLeft: "10px",
                              }}
                            >
                              {index + 1}.
                            </span>
                            <div style={{ marginLeft: "10px" }}>
                              <span style={{ display: "block" }}>
                                {level.user}
                              </span>
                              <span style={{ display: "block" }}>
                                {level.mail}
                              </span>
                            </div>
                          </div>
                        </td>

                        <td
                          style={{
                            padding: "1rem",
                            color: "rgba(255,255,255,0.5)",
                            textAlign: "right",
                          }}
                        >
                          {level.wallet}
                        </td>
                        <td style={{ padding: "1rem", textAlign: "right" }}>
                          {level.score}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
      {selectedRank !== null && (
        <Modal
          show={selectedRank !== null}
          onHide={() => setSelectedRank(null)}
          centered
          backdrop="static"
          size="md"
        >
          <Modal.Header
            closeButton
            style={{ background: "#1e1e1e", borderBottom: "1px solid #444" }}
          >
            <Modal.Title style={{ color: "#fff" }}>Level Info</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ background: "#1e1e1e", color: "#ddd" }}>
            {/* Progress + Icons */}
            <div className="d-flex align-items-center justify-content-between mb-4">
              {/* Current Level Icon */}
              <div style={{ width: "50px", height: "50px" }}>
                <img
                  src={ranks[selectedRank].icon}
                  alt="Current"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </div>

              {/* Progress Bar */}
              <div
                className="flex-grow-1 mx-3"
                style={{
                  height: "12px",
                  background: "#3a3a3a",
                  borderRadius: "10px",
                }}
              >
                <div
                  style={{
                    width: `${((selectedRank + 1) / ranks.length) * 100}%`,
                    height: "100%",
                    backgroundColor: "#e9c253",
                    borderRadius: "10px",
                    transition: "width 0.3s ease",
                  }}
                />
              </div>

              {/* Next Level Icon */}
              <div style={{ width: "50px", height: "50px" }}>
                {ranks[selectedRank + 1] && (
                  <img
                    src={ranks[selectedRank + 1].icon}
                    alt="Next"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      opacity: 0.7,
                    }}
                  />
                )}
              </div>
            </div>

            {/* Current Level Info */}
            <div className="text-center mb-4">
              <img
                src={ranks[selectedRank].icon}
                alt={ranks[selectedRank].name}
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "contain",
                }}
              />
              <h5 className="mt-3" style={{ color: "#e9c253" }}>
                {ranks[selectedRank].name}
              </h5>
              <p className="text-muted">{ranks[selectedRank].description}</p>
            </div>

            {/* Table */}
            <div style={{ overflow: "hidden", borderRadius: "12px" }}>
              <Table striped hover variant="dark" className="mb-0">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Wallet</th>
                    <th>Score</th>
                  </tr>
                </thead>
                <tbody>
                  {rankLevels.map((level, index) => (
                    <tr key={index}>
                      <td>{level.user}</td>
                      <td>{level.wallet}</td>
                      <td>{level.score}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Modal.Body>
          <Modal.Footer
            style={{ background: "#1e1e1e", borderTop: "1px solid #444" }}
          >
            <Button variant="secondary" onClick={() => setSelectedRank(null)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default BadgesPage;
