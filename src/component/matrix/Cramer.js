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
    console.log(`Input in matrix A[${i}][${j}]: ${value}`);
    let newMatrixA = matrixA.slice();
    newMatrixA[i][j] = value;
    setMatrixA(newMatrixA);
  };

  const handleInputB = (i, value) => {
    console.log(`Input in matrix B[${i}]: ${value}`);
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

  function cramer(matrixA, matrixB) {
    const n = matrixA.length;
    const detA = determinant(matrixA);
  
    if (detA === 0) {
      return null; // matrixA is singular, no unique solution exists
    }
  
    const results = [];
  
    for (let i = 0; i < n; i++) {
      const matrixAi = matrixA.map((row, j) => row.map((cell, k) => (k === i ? matrixB[j] : cell)));
      const detAi = determinant(matrixAi);
      const xi = detAi / detA;
      results.push(xi);
    }
  
    return results;
  }
  
  function determinant(matrix) {
    const n = matrix.length;
  
    if (n === 1) {
      return matrix[0][0];
    }
  
    let det = 0;
  
    for (let i = 0; i < n; i++) {
      const submatrix = matrix.slice(1).map((row) => row.filter((_, j) => j !== i));
      const sign = i % 2 === 0 ? 1 : -1;
      det += sign * matrix[0][i] * determinant(submatrix);
    }
    setResult(det)
    return det;
  }
  

  return (
    <Container>
      <h1 className="mt-4 ">Cramer's Calculator</h1>
      <Row className="mt-4 d-flex justify-content-center align-items-center" >
        <Col xs={2}>
          <Form.Group controlId="formN">
            <Form.Label>Enter number :</Form.Label>
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
      <Row className="mt-4 mt-4 d-flex justify-content-center align-items-center">
        <Col xs={6}>
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
        <Col xs={3}>
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
      {matrixA.length > 0 && matrixB.length > 0 && (
        <div>
          <Button variant="primary" className="mt-4" onClick={cramer}>
          Calculate
          </Button>
        </div>
      )}
      
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
