import React from 'react';
import { Card, Button, Container, Row, Col, Badge } from 'react-bootstrap';
import GoogleMapEmbed from './GoogleMapsEmbed';

const VibeResult = ({ mode, result, onBack, onRestart, formData }) => {
  if (!result) return null;

  const { summary, traits, recommendations, marketingInsights } = result;
  const userCity = formData?.location || '';

  const pastelColors = [
    '#FFB3BA', '#FFDFBA', '#FFFFBA', '#BAFFC9',
    '#BAE1FF', '#E6CCFF', '#FCE8D5', '#D5F0E8'
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
                <li key={idx} className="mb-4">
                  <div className="p-3 border rounded bg-light">
                    <h6 className="mb-2 fw-bold">{rec.name}</h6>
                    <p className="mb-3">{rec.description}</p>
                    <GoogleMapEmbed location={`${rec.name}, ${userCity}`} />
                  </div>
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
