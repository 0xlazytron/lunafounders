import React from "react";
import { Card } from "react-bootstrap";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import ticket from "../images/gold_ticket.png";
import wheel from "../images/wheel.png";
import empty_ticket from "../images/empty_ticket.png"

const TicketsPage = () => {
  const activeTickets = [
    {
      id: 1,
      title: "Active Ticket",
      price: "$100.00",
      empty_ticket: empty_ticket,
    },
    {
      id: 2,
      title: "Active Ticket",
      price: "$50.00",
      empty_ticket: empty_ticket,
    },
    {
      id: 3,
      title: "Active Ticket",
      price: "$80.00",
      empty_ticket: empty_ticket,
    },
    {
      id: 4,
      title: "Active Ticket",
      price: "$120.00",
      empty_ticket: empty_ticket,
    },
    {
      id: 5,
      title: "Active Ticket",
      price: "$70.00",
      empty_ticket: empty_ticket,
    },
    {
      id: 6,
      title: "Active Ticket",
      price: "$90.00",
      empty_ticket: empty_ticket,
    },
  ];

  return (
    <div>
      <div className="row">
        <div className="col-xl-5 my-5 my-xl-0">
          <Card
            style={{
              background: `linear-gradient(305deg, rgba(221, 88, 88, 1), rgba(180, 19, 19, 1))`,
              minHeight: "150px",
              height: "100%",
            }}
          >
            <Card.Body>
              <h4 className="text-white">Lottery Tickets</h4>
              <h5 className="text-white fw-light mb-3">Active Tickets</h5>
              <div className="d-flex flex-column gap-3 pe-5 mt-5">
                {activeTickets.map((ticket, index) => (
                  <div
                    key={ticket.id}
                    className="d-flex align-items-center gap-3"
                    style={{
                      borderBottom:
                        index !== activeTickets.length - 1
                          ? "1px solid rgba(55, 55, 55, 1)"
                          : "none",
                      paddingBottom: "1rem",
                    }}
                  >
                    <div
                      className="bg-white rounded d-flex align-items-center justify-content-center"
                      style={{ width: "64px", height: "64px" }}
                    >
                      <img
                        src={ticket.empty_ticket}
                        alt="ticket"
                        style={{ width: "64px", height: "64px" }}
                      />
                    </div>
                    <div className="flex-grow-1">
                      <h6 className="text-white mb-1">{ticket.title}</h6>
                      <small className="text-white-50">Active Ticket</small>
                    </div>
                    <div className="text-white">{ticket.price}</div>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </div>
        <div className="col-xl-7 ">
          <div className="row">
            <div className="col-12 d-none d-xl-block">
              <Card
                style={{
                  background: `linear-gradient(to bottom, rgba(176, 54, 54, 1), rgba(29, 3, 3, 1))`,
                  minHeight: "150px",
                  position: "relative",
                }}
              >
                <Card.Body
                  className="d-flex align-items-center justify-content-between"
                  style={{
                    padding: "1.5rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      position: "relative",
                      width: "12rem",
                      height: "12.5rem",
                    }}
                  >
                    {[0, 1, 2].map((index) => (
                      <img
                        key={index}
                        src={ticket}
                        alt="ticket"
                        style={{
                          width: "14rem",

                          objectFit: "contain",
                          position: "absolute",
                          left: `${index * 3.25}rem`,
                          zIndex: 3 - index,
                        }}
                      />
                    ))}
                  </div>

                  <div className="text-center flex-grow-1 ms-5">
                    <h4
                      className="mb-0 fs-32 fw-bold"
                      style={{
                        background:
                          "linear-gradient(to bottom, rgba(249, 223, 112, 1), rgba(153, 102, 13, 1))",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      13.06.2025 <br /> GMT: 10.00
                    </h4>
                  </div>

                  <div
                    style={{
                      width: "12rem",
                      height: "12rem",
                      position: "relative",
                      flex: "0 0 auto",
                    }}
                  >
                    <img
                      src={wheel}
                      alt="wheel"
                      style={{
                        width: "16rem",
                        height: "16rem",
                        position: "absolute",
                        top: "-2.2rem",
                        right: "-3rem",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                </Card.Body>
              </Card>
            </div>

            <div className="col-12 d-block d-xl-none">
              <Card
                style={{
                  background: `linear-gradient(to bottom, rgba(176, 54, 54, 1), rgba(29, 3, 3, 1))`,
                  minHeight: "300px",
                  position: "relative",
                }}
              >
                <Card.Body
                  className="d-flex flex-column align-items-center justify-content-center"
                  style={{ padding: "2rem" }}
                >
                  {/* Çark */}
                  <div
                    style={{
                      width: "16rem",
                      height: "16rem",
                      position: "relative",
                      marginBottom: "1.5rem",
                    }}
                  >
                    <img
                      src={wheel}
                      alt="wheel"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </div>

                  {/* Tarih */}
                  <div className="text-center mb-4">
                    <h4
                      className="mb-0 display-6 fw-bold"
                      style={{
                        background:
                          "linear-gradient(to bottom, rgba(249, 223, 112, 1), rgba(153, 102, 13, 1))",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      13.06.2025 <br /> GMT: 10.00
                    </h4>
                  </div>

                  <div
                    style={{
                      position: "relative",
                      width: "14rem",
                      height: "16.5rem",
                    }}
                  >
                    {[0, 1, 2].map((index) => (
                      <img
                        key={index}
                        src={ticket}
                        alt="ticket"
                        style={{
                          width: "14rem",
                          height: "16.5rem",
                          objectFit: "contain",
                          position: "absolute",
                          top: 0,
                          left: "50%",
                          transform: `translateX(-50%) translateX(${
                            (index - 1) * 3.25
                          }rem)`,
                          zIndex: 3 - index,
                        }}
                      />
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </div>

            <div className="col-12">
              <Card
                style={{
                  background: "rgba(50, 57, 64, 1)",
                  border: "1px solid rgba(55, 55, 55, 1)",
                  borderRadius: "12px",
                  padding: "1.5rem",

                  height: "100%",
                  minHeight: "400px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.65)",
                }}
              >
                <div className="row g-3 h-100 align-items-center">
                  {[
                    { status: "In Stock", price: "$123.99" },
                    { status: "Cancelled", price: "$123.99" },
                    { status: "In Stock", price: "$123.99" },
                  ].map((item, index) => (
                    <div key={index} className="col-lg-4">
                      <Card
                        style={{
                          background: "#1a1a1a",
                          border: "1px solid rgba(55, 55, 55, 1)",
                          borderRadius: "12px",
                          position: "relative",
                          margin: "0",
                          overflow: "hidden",
                        }}
                      >
                        <span
                          style={{
                            border:
                              item.status === "In Stock"
                                ? "1px solid #28a745"
                                : "1px solid #dc3545",
                            color:
                              item.status === "In Stock"
                                ? "#28a745"
                                : "#dc3545",
                            padding: "4px 12px",
                            borderRadius: "4px",
                            fontSize: "12px",
                            backgroundColor: "transparent",
                            position: "absolute",
                            top: "15px",
                            left: "15px",
                            zIndex: 2,
                          }}
                        >
                          {item.status}
                        </span>
                        <div
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: `repeating-linear-gradient(
                            45deg,
                            transparent,
                            transparent 10px,
                            rgba(255, 0, 0, 0.1) 10px,
                            rgba(255, 0, 0, 0.1) 20px
                          )`,
                          }}
                        ></div>
                        <Card.Body
                          className="position-relative d-flex align-items-center justify-content-center"
                          style={{ minHeight: "180px" }}
                        >
                          <h4 className="text-white mb-0">{item.price}</h4>
                        </Card.Body>
                      </Card>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketsPage;
