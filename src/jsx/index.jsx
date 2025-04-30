import React, { useContext } from "react";
import { Outlet } from "react-router-dom";

import "./index.css";
import "./chart.css";
import "./step.css";

import Nav from "./layouts/nav";
import Footer from "./layouts/Footer";
import ScrollToTop from "./layouts/ScrollToTop";
import Setting from "./layouts/Setting";
import { ThemeContext } from "../context/ThemeContext";

function MainLayout() {
  const { menuToggle, sidebariconHover } = useContext(ThemeContext);
  return (
    <div
      id="main-wrapper"
      className={`show ${sidebariconHover ? "iconhover-toggle" : ""} ${
        menuToggle ? "menu-toggle" : ""
      }`}
    >
      <Nav />
      <div
        className="content-body"
        style={{ minHeight: window.screen.height - 45 }}
      >
        <div className="container-fluid">
          <Outlet />
        </div>
      </div>
      <Footer />
      <Setting />
      <ScrollToTop />
    </div>
  );
}

export default MainLayout;
