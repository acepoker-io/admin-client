import React from "react";
import { Col, Container, Row } from "reactstrap";

const Footer = () => {
  return (
    <div>
      <footer className="footer">
        <Container fluid={true}>
          <Row>
            <Col md="12" className="footer-copyright">
              <p className="mb-0">
                Copyright 2023 © Scrooge LLC - All rights reserved.
              </p>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
};

export default Footer;
