import React from 'react';
import { Card, Button, Container, Row, Col, Badge } from 'react-bootstrap';

const VibeResult = ({ mode, result, onBack, onRestart }) => {
  if (!result) return null;

  const { summary, traits, recommendations, marketingInsights } = result;

  const pastelColors = [
    '#FFB3BA', '#FFDFBA', '#FFFFBA', '#BAFFC9', '#BAE1FF', '#E6CCFF',
    '#D9F2FF', '#FFF0F5', '#FCE8D5', '#D5F0E8', '#F0D5E8'
  ];

  return (
    <Container className="py-5 text-center">
      <h2 className="mb-5 fw-bold text-primary">
        {mode === 'brand' ? 'Brand Vibe Profile' : 'Your Vibe Profile'}
      </h2>

      {/* Summary */}
      {summary && (
        <Card className="mb-4 shadow" style={{ backgroundColor: '#fef6e4' }}>
          <Card.Body>
            <Card.Title className="text-secondary fs-4 mb-3">Summary</Card.Title>
            <p className="lead">{summary}</p>
          </Card.Body>
        </Card>
      )}

      {/* Traits */}
      {traits && traits.length > 0 && (
        <Card className="mb-4 shadow" style={{ backgroundColor: '#f0f4ff' }}>
          <Card.Body>
            <Card.Title className="text-secondary fs-4 mb-3">
              {mode === 'brand' ? 'Brand Traits' : 'Personality Traits'}
            </Card.Title>
            <Row className="justify-content-center g-2">
              {traits.map((trait, idx) => (
                <Col xs="auto" key={idx}>
                  <Badge
                    pill
                    style={{
                      backgroundColor: pastelColors[idx % pastelColors.length],
                      color: '#333',
                      padding: '0.6em 1em',
                      fontSize: '0.95rem',
                    }}
                  >
                    {trait}
                  </Badge>
                </Col>
              ))}
            </Row>
          </Card.Body>
        </Card>
      )}

      {/* Recommendations */}
      {recommendations && recommendations.length > 0 && (
        <Card className="mb-4 shadow" style={{ backgroundColor: '#e8fff4' }}>
          <Card.Body>
            <Card.Title className="text-secondary fs-4 mb-3">
              {mode === 'brand' ? 'Venues & Partnerships' : 'Lifestyle Recommendations'}
            </Card.Title>
            <ul className="list-unstyled">
              {recommendations.map((rec, idx) => (
                <li key={idx} className="mb-3">
                  <Card className="border-0" style={{ backgroundColor: '#ffffffcc' }}>
                    <Card.Body>
                      <h6 className="fw-bold text-info mb-1">{rec.name}</h6>
                      <p className="mb-0 text-muted">{rec.description}</p>
                    </Card.Body>
                  </Card>
                </li>
              ))}
            </ul>
          </Card.Body>
        </Card>
      )}

      {/* Marketing Insights */}
      {mode === 'brand' && marketingInsights && marketingInsights.length > 0 && (
        <Card className="mb-4 shadow" style={{ backgroundColor: '#f3e8ff' }}>
          <Card.Body>
            <Card.Title className="text-secondary fs-4 mb-3">Marketing Insights</Card.Title>
            <ul className="text-start">
              {marketingInsights.map((insight, idx) => (
                <li key={idx} className="mb-1">{insight}</li>
              ))}
            </ul>
          </Card.Body>
        </Card>
      )}

      {/* Navigation Buttons */}
      <Row className="mt-5 justify-content-center">
        <Col xs="auto">
          <Button variant="outline-secondary" onClick={onBack}>
            Back
          </Button>
        </Col>
        <Col xs="auto">
          <Button variant="success" onClick={onRestart}>
            Start Over
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default VibeResult;
