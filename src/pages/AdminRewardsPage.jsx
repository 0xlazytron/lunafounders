import React, { useEffect } from "react";
import { Card, Row, Col, Button, Form, ListGroup } from "react-bootstrap";
import useAdminRewardsStore from "../store/adminRewardsStore";

const AdminRewardsPage = () => {
  const {
    rewards,
    formData,
    selectedRewardId,
    fetchRewards,
    createReward,
    deleteReward,
    setFormData,
    setSelectedReward
  } = useAdminRewardsStore();

  useEffect(() => {
    fetchRewards();
  }, []);

  return (
    <div className="p-3">
      <Row className="g-3 mb-3 justify-content-center">
        {/* First Card - Select Reward */}
        <Col md={5}>
          <Card>
            <Card.Header>
              <Card.Title>Select Reward</Card.Title>
            </Card.Header>
            <Card.Body className="p-0">
              <ListGroup
                variant="flush"
                style={{ maxHeight: "300px", overflowY: "auto" }}
              >
                {rewards.map(reward => (
                  <ListGroup.Item
                    key={reward.id}
                    action
                    active={reward.id === selectedRewardId}
                    onClick={() => setSelectedReward(reward.id)}
                  >
                    {reward.name}
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <div className="p-3 bg-opacity-10">
                <Button
                  variant="danger"
                  className="w-100"
                  onClick={() => deleteReward(selectedRewardId)}
                  disabled={!selectedRewardId}
                >
                  Delete
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Second Card - unchanged */}
        <Col md={5}>
          <Card>
            <Card.Header>
              <Card.Title>Select User</Card.Title>
            </Card.Header>
            <Card.Body>
              <p className="text-muted mb-4">
                Randomly select a user to receive the reward.
              </p>

              <Button variant="primary" className="w-100 mb-4">
                Randomize User
              </Button>

              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Username" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>User ID</Form.Label>
                <Form.Control type="text" placeholder="User ID" />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>User's Tickets</Form.Label>
                <Form.Control type="text" placeholder="Tickets" />
              </Form.Group>

              <Button variant="success" className="w-100">
                Give Reward
              </Button>
            </Card.Body>
          </Card>
        </Col>

        {/* Third Card - Create / Edit Reward */}
        <Col md={10}>
          <Card>
            <Card.Header>
              <Card.Title>Create New Reward</Card.Title>
            </Card.Header>
            <Card.Body>
              <p className="text-muted mb-4">Add a new reward to the list.</p>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Reward Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter reward name"
                      value={formData.name}
                      onChange={e => setFormData({ name: e.target.value })}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Emoji</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter emoji"
                      value={formData.emoji}
                      onChange={e => setFormData({ emoji: e.target.value })}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Amount</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter amount"
                      value={formData.amount}
                      onChange={e => setFormData({ amount: e.target.value })}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Image Link</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter image URL"
                      value={formData.imageUrl}
                      onChange={e => setFormData({ imageUrl: e.target.value })}
                    />
                  </Form.Group>
                </Col>

                <Col
                  md={6}
                  className="d-flex align-items-center justify-content-center"
                >
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-75"
                    onClick={createReward}
                  >
                    Create Reward
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminRewardsPage;
