import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

function App() {
  const [n, setN] = useState(0);
  const [matrixA, setMatrixA] = useState([]);
  const [matrixB, setMatrixB] = useState([]);
  const [result, setResult] = useState([]);

  const createMatrix = () => {
    let A = [];
    let B = [];
    for (let i = 0; i < n; i++) {
      let rowA = [];
      for (let j = 0; j < n; j++) {
        rowA.push(0);
      }
      A.push(rowA);
      B.push(0);
    }
    setMatrixA(A);
    setMatrixB(B);
  };

  const handleInputA = (i, j, value) => {
    let newMatrixA = matrixA.slice();
    newMatrixA[i][j] = value;
    setMatrixA(newMatrixA);
  };

  const handleInputB = (i, value) => {
    let newMatrixB = matrixB.slice();
    newMatrixB[i] = value;
    setMatrixB(newMatrixB);
  };

  const calculate = () => {
    let newResult = [];
    for (let i = 0; i < n; i++) {
      let sum = 0;
      for (let j = 0; j < n; j++) {
        sum += matrixA[i][j] * matrixB[j];
      }
      newResult.push(sum);
    }
    setResult(newResult);
  };

  return (
    <Container>
      <h1 className="mt-4">Matrix Calculator</h1>
      <Row className="mt-4">
        <Col xs={4}>
          <Form.Group controlId="formN">
            <Form.Label>Enter n:</Form.Label>
            <Form.Control
              type="number"
              value={n}
              onChange={(e) => setN(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col xs={1} className="d-flex align-items-center justify-content-center">
          <Button variant="primary" onClick={createMatrix}>
            Create Matrix
          </Button>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          {matrixA.length > 0 && (
            <div className="mt-4">
              <h2>Matrix A:</h2>
              <Form>
                {matrixA.map((row, i) => (
                  <Row key={i}>
                    {row.map((cell, j) => (
                      <Col key={j}>
                        <Form.Control
                          type="number"
                          value={matrixA[i][j]}
                          onChange={(e) => handleInputA(i, j, e.target.value)}
                        />
                      </Col>
                    ))}
                  </Row>
                ))}
              </Form>
            </div>
          )}
        </Col>
        <Col xs={1} className="d-flex align-items-center justify-content-center">
          {matrixA.length > 0 && matrixB.length > 0 && (
            <h2 className="mx-3">
              =
            </h2>
          )}
        </Col>
        <Col>
          {matrixB.length > 0 && (
            <div className="mt-4">
              <h2>Matrix B:</h2>
              <Form>
                {matrixB.map((cell, i) => (
                  <Row key={i}>
                    <Col>
                      <Form.Control
                        type="number"
                        value={matrixB[i]}
                        onChange={(e) => handleInputB(i, e.target.value)}
                      />
                    </Col>
                  </Row>
                ))}
              </Form>
            </div>
          )}
        </Col>
      </Row>
      <Button variant="primary" className="mt-4" onClick={calculate}>
        Calculate
      </Button>
      {result.length > 0 && (
        <div>
          <h2>Result:</h2>
          {result.map((cell, i) => (
            <div key={i}>{cell}</div>
          ))}
        </div>
      )}
    </Container>
  );
}

export default App;
