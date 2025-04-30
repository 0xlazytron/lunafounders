import React, { useEffect } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { FaDesktop, FaTabletAlt, FaMobileAlt } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import userImage from "../images/MRLuna3.png";

import useProfileStore from "../store/profileStore";

const SettingsPage = () => {
  return (
    <Container fluid className="min-vh-100 py-4">
      <Row className="g-4">
        {/* Left Column */}
        <Col xl={3} lg={4} md={12}>
          <div className="d-flex flex-column gap-4">
            <ProfileCard userImage={userImage} />
            <LoginHistoryCard />
          </div>
        </Col>

        {/* Right Column */}
        <Col xl={9} lg={8} md={12}>
          <div className="d-flex flex-column gap-4">
            <EditProfileCard />
            <ChangePasswordCard />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

const ProfileCard = ({ userImage }) => (
  <Card
    className="border-secondary"
    style={{ backgroundColor: "rgba(39, 46, 53, 1)" }}
  >
    <Card
      className="border-secondary"
      style={{ backgroundColor: "rgba(39, 46, 53, 1)" }}
    >
      <Card.Body>
        <div className="d-flex justify-content-center align-items-center mb-3">
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ width: "60px", height: "60px", marginRight: "1rem" }}
          >
            <img
              src={userImage}
              alt="User"
              className="img-fluid rounded-circle"
            />
          </div>
        </div>
        <hr />
        <div className="d-flex justify-content-between text-muted small mb-1">
          <strong>Name:</strong>
          <span>Helena Brauer</span>
        </div>
        <hr />
        <div className="d-flex justify-content-between text-muted small mb-1">
          <strong>Mobile:</strong>
          <span>+1-9864499950</span>
        </div>
        <hr />
        <div className="d-flex justify-content-between text-muted small mb-1">
          <strong>Mail:</strong>
          <span>dashboard@comvi.com</span>
        </div>
        <hr />
        <div className="d-flex justify-content-between text-muted small">
          <strong>Location:</strong>
          <span>California, United States</span>
        </div>
      </Card.Body>
    </Card>
  </Card>
);

const iconStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(255, 255, 255, 0.2)",
  borderRadius: "50%",
  padding: "10px",
  width: "40px",
  height: "40px",
};

const LoginHistoryCard = () => (
  <Card
    className="border-secondary"
    style={{ backgroundColor: "rgba(39, 46, 53, 1)" }}
  >
    <Card.Body style={{ padding: "1.5rem" }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 style={{ fontSize: "1.1rem", color: "#fff", marginBottom: 0 }}>
          Login History
        </h5>

        <Button variant="danger" size="sm">
          All Logout
        </Button>
      </div>

      <LoginHistoryItem
        icon={
          <div style={iconStyle}>
            <FaDesktop />
          </div>
        }
        device="Web"
        date="Apr 10, 2023 at 07:18 AM"
      />
      <LoginHistoryItem
        icon={
          <div style={iconStyle}>
            <FaTabletAlt />
          </div>
        }
        device="iPad"
        date="Apr 09, 2023 at 09:20 AM"
      />
      <LoginHistoryItem
        icon={
          <div style={iconStyle}>
            <FaMobileAlt />
          </div>
        }
        device="iPhone"
        date="Apr 02, 2023 at 09:06 AM"
      />
    </Card.Body>
  </Card>
);

const LoginHistoryItem = ({ icon, device, date }) => (
  <div className="d-flex justify-content-between align-items-center py-2 border-bottom">
    <div className="d-flex align-items-center">
      {icon}
      <div className="ms-2">
        <small className="d-block">{device}</small>
        <small className="text-muted">{date}</small>
      </div>
    </div>
    <Button variant="link" size="sm" className="text-danger">
      <MdLogout />
    </Button>
  </div>
);

const EditProfileCard = () => {
  // pull from zustand
  const { userData, fetchUser, setUserData, updateUser } = useProfileStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleChange = (e) => setUserData({ [e.target.name]: e.target.value });

  const handlePhoneKeyPress = (e) => {
    if (!/\d/.test(e.key)) e.preventDefault();
  };

  const handleUpdate = () => {
    updateUser();
  };

  return (
    <Card
      className="border-0"
      style={{ backgroundColor: "rgba(39, 46, 53, 1)" }}
    >
      <Card.Body>
        <h5 className="mb-4">Edit Profile</h5>
        <Form>
          <Row className="g-3">
            <Col md={6} sm={12}>
              <Form.Group>
                <Form.Label>FIRST NAME</Form.Label>
                <Form.Control
                  name="firstName"
                  type="text"
                  placeholder="Your First Name"
                  className="border-secondary"
                  value={userData.firstName}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6} sm={12}>
              <Form.Group>
                <Form.Label>LAST NAME</Form.Label>
                <Form.Control
                  name="lastName"
                  type="text"
                  placeholder="Your Last Name"
                  className="border-secondary"
                  value={userData.lastName}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="g-3 mt-3">
            <Col md={6} sm={12}>
              <Form.Group>
                <Form.Label>PHONE NUMBER</Form.Label>
                <Form.Control
                  name="phoneNumber"
                  type="text"
                  placeholder="Your Phone Number"
                  className="border-secondary"
                  value={userData.phoneNumber}
                  onChange={handleChange}
                  onKeyPress={handlePhoneKeyPress}
                />
              </Form.Group>
            </Col>
            <Col md={6} sm={12}>
              <Form.Group>
                <Form.Label>EMAIL ADDRESS</Form.Label>
                <Form.Control
                  name="email"
                  type="email"
                  placeholder="Your Email Address"
                  className="border-secondary"
                  value={userData.email}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="g-3 mt-3">
            <Col md={6} sm={12}>
              <Form.Group>
                <Form.Label>COUNTRY</Form.Label>
                <Form.Select
                  className="border-secondary"
                  aria-label="Select Country"
                  name="country"
                  value={userData.country}
                  onChange={handleChange}
                >
                  <option>Select Your Country</option>
                  <option>United States</option>
                  <option>Germany</option>
                  <option>Other</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6} sm={12}>
              <Form.Group>
                <Form.Label>POSTAL CODE</Form.Label>
                <Form.Select
                  className="border-secondary custom-select"
                  aria-label="Select Postal Code"
                  name="postalCode"
                  value={userData.postalCode}
                  onChange={handleChange}
                >
                  <option>Select Your Postal Code</option>
                  <option>12345</option>
                  <option>67890</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row className="g-3 mt-3">
            <Col md={6} sm={12}>
              <Form.Group>
                <Form.Label>CITY</Form.Label>
                <Form.Select
                  className="border-secondary custom-select"
                  aria-label="Select City"
                  name="city"
                  value={userData.city}
                  onChange={handleChange}
                >
                  <option>Select Your City</option>
                  <option>California</option>
                  <option>Berlin</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6} sm={12}>
              <Form.Group>
                <Form.Label>PRODUCT NAME</Form.Label>
                <Form.Control
                  name="productName"
                  type="text"
                  placeholder="comvi-dashboard.com"
                  className="border-secondary"
                  value={userData.productName}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mt-3">
            <Col>
              <Form.Group>
                <Form.Label>ABOUT ME</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Tell us about yourself..."
                  className="border-secondary"
                  name="aboutMe"
                  value={userData.aboutMe}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="text-end mt-4">
            <Button variant="danger" onClick={handleUpdate}>
              Update Profile
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

const ChangePasswordCard = () => {
  // pull from zustand
  const { passData, setPassData, changePassword } = useProfileStore();

  const handleChange = (e) => setPassData({ [e.target.name]: e.target.value });

  const handleSubmit = () => {
    if (passData.newPassword !== passData.confirmPassword) return;
    changePassword();
  };

  const isMatch = passData.newPassword === passData.confirmPassword;

  return (
    <Card
      className="border-secondary"
      style={{ backgroundColor: "rgba(39, 46, 53, 1)" }}
    >
      <Card.Body>
        <h5 className="mb-3">Change Password</h5>
        <Form>
          <Row className="g-3">
            <Col md={4}>
              <Form.Group>
                <Form.Label>CURRENT PASSWORD</Form.Label>
                <Form.Control
                  name="oldPassword"
                  type="password"
                  placeholder="Enter Current Password"
                  className="border-secondary"
                  value={passData.oldPassword}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>NEW PASSWORD</Form.Label>
                <Form.Control
                  name="newPassword"
                  type="password"
                  placeholder="Enter New Password"
                  className="border-secondary"
                  value={passData.newPassword}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>REPEAT NEW PASSWORD</Form.Label>
                <Form.Control
                  name="confirmPassword"
                  type="password"
                  placeholder="Repeat New Password"
                  className="border-secondary"
                  value={passData.confirmPassword}
                  onChange={handleChange}
                />
                {passData.confirmPassword && !isMatch && (
                  <Form.Text className="text-danger">
                    Passwords do not match
                  </Form.Text>
                )}
              </Form.Group>
            </Col>
          </Row>
          <div className="d-flex justify-content-between align-items-center mt-3">
            <a
              href="#!"
              className="text-danger text-decoration-underline small"
            >
              Forgot Password ?
            </a>
            <Button
              variant="danger"
              onClick={handleSubmit}
              disabled={
                !passData.oldPassword ||
                !passData.newPassword ||
                !passData.confirmPassword ||
                !isMatch
              }
            >
              Change Password
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default SettingsPage;
