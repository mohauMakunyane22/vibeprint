import React from 'react';
import { Card, Button, Container, Row, Col, ListGroup } from 'react-bootstrap';
import { marked } from 'marked';
import { FaUserAlt, FaLightbulb, FaHeart, FaChartBar } from 'react-icons/fa';

const cleanMarkdown = (text) => {
  if (!text) return '';
  return text
    .replace(/\*\*\s*/g, '**')
    .replace(/\*\*(?!\w)/g, '')
    .replace(/(?<!\w)\*\*/g, '')
    .replace(/^\*\*/gm, '')
    .replace(/\*\*:/g, ':')
    .replace(/\n{2,}/g, '\n\n')
    .replace(/^(Personality|Lifestyle|Summary|Marketing Insights)\s*$/gm, '') 
    .trim();
};

const renderMarkdown = (markdownText) => {
  const cleaned = cleanMarkdown(markdownText);
  return marked.parse(cleaned);
};

const VibeResult = ({ mode, result, onBack, onRestart }) => {
  if (!result) return null;

  const { summary, traits, recommendations, marketingInsights } = result;

  return (
    <Container className="py-5">
      <h2 className="mb-5 text-center fw-bold display-5">
        {mode === 'brand' ? 'Brand Vibe Profile' : 'Your Vibe Profile'}
      </h2>

      {/* Summary */}
      {summary && (
        <Card className="mb-4 shadow-sm border-0 rounded-4 p-3">
          <Card.Body>
            <Card.Title className="fw-bold mb-3">
              <FaUserAlt className="me-2 text-primary" />
              Summary
            </Card.Title>
            <div dangerouslySetInnerHTML={{ __html: renderMarkdown(summary) }} />
          </Card.Body>
        </Card>
      )}

      {/* Traits */}
      {traits && traits.length > 0 && (
        <Card className="mb-4 shadow-sm border-0 rounded-4 p-3">
          <Card.Body>
            <Card.Title className="fw-bold mb-3">
              <FaLightbulb className="me-2 text-warning" />
              {mode === 'brand' ? 'Brand Traits' : 'Personality Traits'}
            </Card.Title>
            <ListGroup variant="flush">
              {traits.map((trait, idx) => (
                <ListGroup.Item key={idx} className="bg-transparent border-0 ps-0">
                  <span dangerouslySetInnerHTML={{ __html: renderMarkdown(trait) }} />
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card.Body>
        </Card>
      )}

      {/* Recommendations */}
      {recommendations && recommendations.length > 0 && (
        <Card className="mb-4 shadow-sm border-0 rounded-4 p-3">
          <Card.Body>
            <Card.Title className="fw-bold mb-3">
              <FaHeart className="me-2 text-danger" />
              {mode === 'brand' ? 'Relevant Venues & Partnerships' : 'Lifestyle Recommendations'}
            </Card.Title>
            <ListGroup variant="flush">
              {recommendations.map((rec, idx) => (
                <ListGroup.Item key={idx} className="bg-transparent border-0 ps-0">
                  <strong>{rec.name}:</strong>{' '}
                  <span dangerouslySetInnerHTML={{ __html: renderMarkdown(rec.description) }} />
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card.Body>
        </Card>
      )}

      {/* Marketing Insights */}
      {mode === 'brand' && marketingInsights && marketingInsights.length > 0 && (
        <Card className="mb-4 shadow-sm border-0 rounded-4 p-3">
          <Card.Body>
            <Card.Title className="fw-bold mb-3">
              <FaChartBar className="me-2 text-success" />
              Marketing Insights
            </Card.Title>
            <ListGroup variant="flush">
              {marketingInsights.map((insight, idx) => (
                <ListGroup.Item key={idx} className="bg-transparent border-0 ps-0">
                  <span dangerouslySetInnerHTML={{ __html: renderMarkdown(insight) }} />
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card.Body>
        </Card>
      )}

      {/* Navigation Buttons */}
      <Row className="mt-4 justify-content-center">
        <Col xs="auto">
          <Button variant="outline-secondary" onClick={onBack}>
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
