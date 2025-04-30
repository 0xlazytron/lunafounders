import React, { useState } from "react";
import {
  Pagination,
  Row,
  Table,
  Card,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import {
  BiPencil,
  BiTrash,
  BiChevronDown,
  BiChevronUp,
  BiInfoCircle,
} from "react-icons/bi";

const AdminOverviewPage = () => {
  const referralData = [
    {
      id: 1,
      name: "John Doe",
      level: "Gold",
      date: "2025-04-01",
      commission: "$150.00",
      joinDate: "2024-01-15",
      nfts: 5,
      lastOrder: "2025-03-20",
      totalSpend: "$1,250.00",
    },
    {
      id: 2,
      name: "Jane Smith",
      level: "Silver",
      date: "2025-04-02",
      commission: "$75.00",
      joinDate: "2024-06-10",
      nfts: 3,
      lastOrder: "2025-04-05",
      totalSpend: "$850.00",
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [expandedRow, setExpandedRow] = useState(null);
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = referralData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const toggleRow = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  return (
    <>
      <Row>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h1 className="text-white">Admin Overview</h1>
          <OverlayTrigger
            placement="bottom"
            overlay={
              <Tooltip id="table-tooltip">
                Click on any row to view more details
              </Tooltip>
            }
          >
            <div className="text-muted">
              <BiInfoCircle size={20} />
              <span className="ms-2">Click rows for details</span>
            </div>
          </OverlayTrigger>
        </div>

        <div className="col-lg-12">
          <Card style={{ backgroundColor: "rgba(39, 46, 53, 1)" }}>
            <div className="card-body">
              <div className="table-responsive">
                <Table className="table table-hover">
                  <thead>
                    <tr className="bg-secondary">
                      <th className="text-white text-start">ID</th>
                      <th className="text-white text-start">Name</th>
                      <th className="text-white text-start">Level</th>
                      <th className="text-white text-center">Date</th>
                      <th className="text-white text-end">Commission</th>
                      <th className="text-white text-end">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((item) => (
                      <React.Fragment key={item.id}>
                        <tr
                          onClick={() => toggleRow(item.id)}
                          style={{ cursor: "pointer" }}
                          className={
                            expandedRow === item.id ? "table-active" : ""
                          }
                          aria-expanded={expandedRow === item.id}
                        >
                          <td className="text-white text-start">{item.id}</td>
                          <td className="text-white text-start">
                            <div className="d-flex align-items-center">
                              {item.name}
                              {expandedRow === item.id ? (
                                <BiChevronUp className="ms-2" />
                              ) : (
                                <BiChevronDown className="ms-2" />
                              )}
                            </div>
                          </td>
                          <td className="text-white text-start">
                            {item.level}
                          </td>
                          <td className="text-white text-center">
                            {item.date}
                          </td>
                          <td
                            className="text-danger text-end"
                            style={{ backgroundColor: "white" }}
                          >
                            {item.commission}
                          </td>
                          <td className="text-white text-end">
                            <BiPencil
                              className="me-2"
                              style={{ cursor: "pointer" }}
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                            />
                            <BiTrash
                              style={{ cursor: "pointer" }}
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                            />
                          </td>
                        </tr>
                        {expandedRow === item.id && (
                          <tr className="expandable-row">
                            <td colSpan="6" className="bg-dark p-0">
                              <div className="p-3 text-white">
                                <Row>
                                  <div className="col-md-3">
                                    <strong>Join Date:</strong> {item.joinDate}
                                  </div>
                                  <div className="col-md-3">
                                    <strong>NFTs:</strong> {item.nfts}
                                  </div>
                                  <div className="col-md-3">
                                    <strong>Last Order:</strong>{" "}
                                    {item.lastOrder}
                                  </div>
                                  <div className="col-md-3">
                                    <strong>Total Spend:</strong>{" "}
                                    {item.totalSpend}
                                  </div>
                                </Row>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </Table>
              </div>
              <div className="d-flex justify-content-between align-items-center mt-3">
                <div className="text-muted">
                  Showing {indexOfFirstItem + 1} to{" "}
                  {Math.min(indexOfLastItem, referralData.length)} of{" "}
                  {referralData.length} entries
                </div>
                <nav>
                  <Pagination>
                    {Array.from({
                      length: Math.ceil(referralData.length / itemsPerPage),
                    }).map((_, index) => (
                      <li
                        key={index}
                        className={`page-item ${
                          currentPage === index + 1 ? "active" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => paginate(index + 1)}
                          style={{
                            backgroundColor:
                              currentPage === index + 1
                                ? "#dc3545"
                                : "transparent",
                            color: "#fff",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                          }}
                        >
                          {index + 1}
                        </button>
                      </li>
                    ))}
                  </Pagination>
                </nav>
              </div>
            </div>
          </Card>
        </div>
      </Row>
    </>
  );
};

export default AdminOverviewPage;
