import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import LogoutPage from "./Logout";
import { Dropdown } from "react-bootstrap";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import useUserStore from "../../../store/userStore";

const Header = ({ onNote, toggle, onProfile, onNotification, onClick }) => {
  const { publicKey, connected } = useWallet();
  const { setWallet } = useUserStore();
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href="/"
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      className="nav-link bell dz-theme-mode active"
      style={{ display: "flex", alignItems: "center" }}
    >
      {children}
    </a>
  ));
  const token = localStorage.getItem("token");
  const username = JSON.parse(atob(token.split(".")[1]))?.username;

  useEffect(() => {
    if (connected && publicKey && token) {
      const walletAddress = publicKey.toBase58();
      setWallet(walletAddress);
    }
  }, [connected, publicKey, setWallet, token]);

  return (
    <div className="header" style={{ zIndex: "4" }}>
      <div className="header-content">
        <nav className="navbar navbar-expand">
          <div className="collapse navbar-collapse justify-content-between">
            <div className="header-left"></div>
            <ul
              className="navbar-nav header-right"
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <li className="nav-item dropdown notification_dropdown">
                {username}
              </li>
              <li className="nav-item dropdown notification_dropdown">
                <WalletMultiButton
                  className="wallet-btn-connect"
                  style={{
                    backgroundColor: "#000",
                    color: "#fff",
                    borderRadius: "5px",
                    padding: "8px 16px",
                    cursor: "pointer",
                  }}
                />
              </li>
              <li className="nav-item dropdown">
                <Dropdown>
                  <Dropdown.Toggle as={CustomToggle}>
                    <i
                      className="bi bi-globe"
                      style={{ fontSize: "1.25rem" }}
                    ></i>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item>EN</Dropdown.Item>
                    <Dropdown.Item>DE</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </li>

              <li className="nav-item dropdown ">
                <Dropdown>
                  <Dropdown.Toggle as={CustomToggle}>
                    <i
                      className="bi bi-list"
                      style={{ fontSize: "1.25rem" }}
                    ></i>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item>
                      <Link to="/my-ref-profile" className="dropdown-item ai-icon">
                        <i className="bi bi-person"></i>
                        <span className="ms-2">Profile </span>
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item > 
                      <LogoutPage />
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
