import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './App.scss';

function App() {
  return (
    <Container fluid>
      <Row>
        <Col className='header'>Hackernews</Col>
      </Row>
    </Container>
  );
}

export default App;
