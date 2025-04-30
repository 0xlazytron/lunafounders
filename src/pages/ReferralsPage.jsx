import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { Button, Card, Form } from "react-bootstrap";
import useUserStore from "../store/userStore";
import useUserTreeStore from "../store/userTreeStore";

const Referrals = () => {
  const svgRef = useRef();
  const [zoomLevel, setZoomLevel] = useState(1);
  const originalTreeRef = useRef(null);
  const [currentTree, setCurrentTree] = useState(null);

  const { user, loading, error, getProfile } = useUserStore();
  const { fetchTree, tree } = useUserTreeStore();
  let nodeId = 0;
  const levels = [
    { id: 1, value: 10 },
    { id: 2, value: 20 },
    { id: 3, value: 30 },
    { id: 4, value: 40 },
    { id: 5, value: 50 },
    { id: 6, value: 60 },
    { id: 7, value: 70 },
    { id: 8, value: 80 },
    { id: 9, value: 90 },
    { id: 10, value: 100 },
  ];

  useEffect(() => {
    getProfile();
    fetchTree().then((data) => {
      originalTreeRef.current = data;
      setCurrentTree(data);
      console.log("Fetched tree:", data);
    });
  }, [getProfile, fetchTree]);

  // D3 zoom davranışı
  const zoomBehavior = d3
    .zoom()
    .scaleExtent([0.5, 2])
    .on("zoom", (event) => {
      d3.select(svgRef.current).select("g").attr("transform", event.transform);
    });

  // Zoom in/out
  const handleZoom = (zoomIn) => {
    const factor = zoomIn ? 1.2 : 0.8;
    d3.select(svgRef.current).transition().call(zoomBehavior.scaleBy, factor);
    setZoomLevel((z) => Math.max(0.5, Math.min(2, z * factor)));
  };

  // Collapse all: hide children into _children
  const handleCollapseAll = () => {
    if (!currentTree) return;
    const newTree = JSON.parse(JSON.stringify(currentTree));
    const collapse = (n) => {
      if (n.children) {
        n._children = n.children;
        n._children.forEach(collapse);
        delete n.children;
      }
    };
    collapse(newTree);
    setCurrentTree(newTree);
  };

  // Expand all: restore children from _children
  const handleExpandAll = () => {
    if (!currentTree) return;
    const newTree = JSON.parse(JSON.stringify(currentTree));
    const expand = (n) => {
      if (n._children) {
        n.children = n._children;
        n.children.forEach(expand);
        delete n._children;
      }
    };
    expand(newTree);
    setCurrentTree(newTree);
  };

  // redraw whenever currentTree changes
  useEffect(() => {
    const handleResize = () => {
      if (!svgRef.current || !currentTree) return;
      d3.select(svgRef.current).selectAll("*").remove();

      const containerWidth = svgRef.current.parentElement.clientWidth;
      const margin = {
        top: 20,
        right: containerWidth < 768 ? 40 : 90,
        bottom: 30,
        left: containerWidth < 768 ? 40 : 90,
      };
      const width = containerWidth - margin.left - margin.right;
      const height = Math.min(500, width * 0.6) - margin.top - margin.bottom;

      const svg = d3
        .select(svgRef.current)
        .call(zoomBehavior)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      const treemap = d3.tree().size([width, height]);
      const root = d3.hierarchy(currentTree);
      root.x0 = width / 2;
      root.y0 = 0;

      const treeData2 = treemap(root);
      const nodes = treeData2.descendants();
      const links = nodes.slice(1);

      nodes.forEach((d) => {
        d.y = d.depth * (containerWidth < 768 ? 70 : 100);
      });

      const diagonal = d3
        .linkVertical()
        .x((d) => d.x)
        .y((d) => d.y);

      const node = svg
        .selectAll("g.node")
        .data(nodes, (d) => d.id || (d.id = ++nodeId));
      const nodeEnter = node
        .enter()
        .append("g")
        .attr("class", "node")
        .attr("transform", (d) => `translate(${d.x},${d.y})`);

      const nodeRadius = containerWidth < 768 ? 15 : 20;
      nodeEnter
        .append("circle")
        .attr("r", nodeRadius)
        .style("fill", (d) =>
          d.depth === 0 ? "rgba(231, 151, 16, 0.2)" : "rgba(33, 37, 41, 0.8)"
        )
        .style("stroke", (d) =>
          d.depth === 0 ? "rgba(231, 151, 16, 1)" : "rgba(55, 55, 55, 1)"
        )
        .style("stroke-width", "2px");

      nodeEnter
        .append("text")
        .attr("dy", ".35em")
        .attr("text-anchor", "middle")
        .text((d) => d.data.username || d.data.name)
        .style("fill", "#fff")
        .style("font-size", containerWidth < 768 ? "10px" : "12px");

      svg
        .selectAll("path.link")
        .data(links, (d) => d.id)
        .enter()
        .insert("path", "g")
        .attr("class", "link")
        .attr("d", (d) =>
          diagonal({
            source: { x: d.parent.x, y: d.parent.y },
            target: { x: d.x, y: d.y },
          })
        )
        .style("fill", "none")
        .style("stroke", "rgba(231, 151, 16, 0.5)")
        .style("stroke-width", "1.5px");
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [currentTree]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>No user data</div>;

  return (
    <>
      <div className="container-fluid p-0">
        <div className="row g-0">
          <div className="col-12">
            <div className="card-body p-3 p-md-4">
              <div className="d-flex flex-column flex-lg-row justify-content-between align-items-start mb-4 gap-4">
                <div>
                  <h4
                    className="text-white mb-2"
                    style={{ fontSize: "1.25rem" }}
                  >
                    Your Referral Network
                  </h4>
                  <p
                    className="text-muted mb-2 mt-3 mt-md-5"
                    style={{ fontSize: "0.875rem" }}
                  >
                    Your Streamline position is {user.position || "None"} |
                    Bonus: {user.bonus || 0}
                  </p>
                  <Button variant="primary" className="btn-sm btn-md-lg">
                    Hard Reload
                  </Button>
                </div>

                <div className="d-flex flex-column align-items-start align-items-lg-end col-lg-8 col-12">
                  <div className="w-100 mb-3 p-2 p-md-3 rounded text-white">
                    <span className="mb-2 d-block">
                      Share the referral link
                    </span>
                    <Form className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2">
                      <div className="position-relative w-100">
                        <Form.Control
                          size="sm"
                          type="text"
                          value={`https://lunafounder.io/register?r=${user?.username}`}
                          className="text-white border-1 flex-grow-1 me-0 me-md-3 pe-5"
                          readOnly
                          style={{ backgroundColor: "transparent" }}
                        />
                        <i
                          className="bi bi-link-45deg position-absolute"
                          style={{
                            right: "10px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            color: "#fff",
                            cursor: "pointer",
                            fontSize: "1.25rem",
                          }}
                        />
                      </div>

                      <div
                        className="text-white px-3 py-1 rounded d-flex align-items-center mt-2 mt-md-0"
                        style={{
                          minHeight: "38px",
                          border: "1px solid #3e454d",
                          cursor: "default",
                        }}
                      >
                        <i
                          className="lab la-instagram mx-2"
                          style={{
                            fontSize: "1.25rem",
                            color: "#fff",
                            cursor: "pointer",
                          }}
                        />
                        <i
                          className="lab la-linkedin mx-2"
                          style={{
                            fontSize: "1.25rem",
                            color: "#fff",
                            cursor: "pointer",
                          }}
                        />
                        <i
                          className="lab la-facebook mx-2"
                          style={{
                            fontSize: "1.25rem",
                            color: "#fff",
                            cursor: "pointer",
                          }}
                        />
                      </div>
                    </Form>
                  </div>

                  {/* Invite Friends Section */}
                  <div className="w-100 mb-2 p-2 p-md-3 rounded text-white">
                    <span className="mb-2 d-block">Invite your Friends</span>
                    <Form className="d-flex justify-content-between align-items-center mb-2 position-relative">
                      <Form.Control
                        size="sm"
                        type="text"
                        value={`https://lunafounder.io/register?r=${user?.username}`}
                        className="text-muted flex-grow-1 pe-5"
                        style={{ backgroundColor: "transparent" }}
                        readOnly
                      />
                      <div
                        className="position-absolute d-flex align-items-center"
                        style={{
                          right: "10px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          gap: "8px",
                        }}
                      >
                        <i
                          className="bi bi-send"
                          style={{
                            backgroundImage:
                              "linear-gradient(to bottom, #e9c253, #997b3d)",
                            backgroundClip: "text",
                            color: "transparent",
                            fontSize: "1.2rem",
                            cursor: "pointer",
                          }}
                        ></i>

                        <i
                          className="bi bi-whatsapp"
                          style={{
                            backgroundImage:
                              "linear-gradient(to bottom, #e9c253, #997b3d)",
                            backgroundClip: "text",
                            color: "transparent",
                            fontSize: "1.2rem",
                            cursor: "pointer",
                          }}
                        ></i>
                      </div>
                    </Form>
                  </div>
                </div>
              </div>
              <div className="d-flex flex-column align-items-start align-items-lg-end col-lg-8 col-12">
                <div className="w-100 mb-3 p-2 p-md-3 rounded text-white">
                  <span className="mb-2 d-block">My Wallet</span>
                  <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2">
                    <div className="position-relative w-100">
                      <Form.Control
                        size="sm"
                        type="text"
                        value={user.wallet}
                        className="text-white border-1 flex-grow-1 me-0 me-md-3 pe-5"
                        readOnly
                        style={{ backgroundColor: "transparent" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <div
                  className="overflow-auto border"
                  style={{
                    borderRadius: "8px",
                    WebkitOverflowScrolling: "touch",
                  }}
                >
                  <div
                    className="d-flex align-items-center"
                    style={{
                      minWidth: "600px",
                    }}
                  >
                    <div
                      className="flex-shrink-0"
                      style={{
                        backgroundImage:
                          "linear-gradient(to bottom, #e9c253, #997b3d)",
                        padding: "1.5rem",
                        width: "150px",
                      }}
                    >
                      <div
                        className="text-dark text-center"
                        style={{ fontSize: "1rem" }}
                      >
                        Depth
                        <hr className="my-2" />
                        People/Active
                      </div>
                    </div>

                    {levels.map((level) => (
                      <div
                        key={level.id}
                        className="flex-grow-1 text-center px-3 py-2"
                        style={{
                          borderLeft: "1px solid rgba(255, 255, 255, 0.1)",
                          minWidth: "80px",
                        }}
                      >
                        <div className="text-white mb-1">{level.id}</div>
                        <hr className="my-2" />
                        <div
                          className="text-muted"
                          style={{ fontSize: "0.875rem" }}
                        >
                          {level.id - 1}/0
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-center align-items-center">
                <div className="col-10">
                  <div className="mb-3 d-flex gap-2 justify-content-center align-items-center">
                    <Button size="sm" onClick={handleExpandAll}>
                      Expand All
                    </Button>
                    <Button size="sm" onClick={handleCollapseAll}>
                      Collapse All
                    </Button>
                    <Button size="sm" onClick={() => handleZoom(true)}>
                      Zoom In
                    </Button>
                    <Button size="sm" onClick={() => handleZoom(false)}>
                      Zoom Out
                    </Button>
                  </div>
                  <Card className="d-flex justify-content-center align-items-center p-2 p-md-5 overflow-auto">
                    <div className="d-flex justify-content-center align-items-center w-100 overflow-auto">
                      <svg ref={svgRef}></svg>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Referrals;
