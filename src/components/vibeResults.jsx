import React from 'react';
import { Card, Button, Container, Row, Col, Badge } from 'react-bootstrap';

const VibeResult = ({ mode, result, onBack, onRestart }) => {
  if (!result) return null;

  const { summary, traits, recommendations, marketingInsights } = result;

  return (
    <Container className="py-4">
      <h2 className="mb-4 text-center">
        {mode === 'brand' ? 'Brand Vibe Profile' : 'Your Vibe Profile'}
      </h2>

      {/* Summary */}
      {summary && (
        <Card className="mb-4 shadow-sm">
          <Card.Body>
            <Card.Title>Summary</Card.Title>
            <p className="mb-0">{summary}</p>
          </Card.Body>
        </Card>
      )}

      {/* Traits as Pills */}
      {traits && traits.length > 0 && (
        <Card className="mb-4 shadow-sm">
          <Card.Body>
            <Card.Title>{mode === 'brand' ? 'Brand Traits' : 'Personality Traits'}</Card.Title>
            <div className="d-flex flex-wrap gap-2">
              {traits.map((trait, idx) => (
                <Badge key={idx} bg="info" text="dark" pill className="px-3 py-2">
                  {trait}
                </Badge>
              ))}
            </div>
          </Card.Body>
        </Card>
      )}

      {/* Recommendations */}
      {recommendations && recommendations.length > 0 && (
        <Card className="mb-4 shadow-sm">
          <Card.Body>
            <Card.Title>
              {mode === 'brand' ? 'Venues & Partnerships' : 'Lifestyle Recommendations'}
            </Card.Title>
            <div className="d-grid gap-3">
              {recommendations.map((rec, idx) => (
                <div key={idx} className="p-3 border rounded bg-light">
                  <h6 className="mb-1 fw-bold">{rec.name}</h6>
                  <p className="mb-0">{rec.description}</p>
                </div>
              ))}
            </div>
          </Card.Body>
        </Card>
      )}

      {/* Marketing Insights */}
      {mode === 'brand' && marketingInsights && marketingInsights.length > 0 && (
        <Card className="mb-4 shadow-sm">
          <Card.Body>
            <Card.Title>Marketing Insights</Card.Title>
            <ul className="mb-0">
              {marketingInsights.map((insight, idx) => (
                <li key={idx}>{insight}</li>
              ))}
            </ul>
          </Card.Body>
        </Card>
      )}

      {/* Navigation */}
      <Row className="mt-4 justify-content-center">
        <Col xs="auto">
          <Button variant="secondary" onClick={onBack}>
            Back
          </Button>
        </Col>
        <Col xs="auto">
          <Button variant="primary" onClick={onRestart}>
            Start Over
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default VibeResult;
