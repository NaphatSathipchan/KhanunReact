import React from "react";
import { Button, Col, Container, Row, Image } from "react-bootstrap";
import "./home.css";

const Home = () => {
  return (
    <Container>
      <Row className="justify-content-center">
        <Col md="auto" className="text-center mb-4">
          <h1>ทรงพระเจริญ ยิ่งยืนนาน</h1>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <img src="https://media.discordapp.net/attachments/730400715109040158/1093158713415712849/2020-12_109b0043402c137.png?width=1152&height=662" />
        <Col md="auto"></Col>
      </Row>
    </Container>
  );
};

export default Home;
