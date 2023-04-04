import React, { useState } from "react";
import Breadcrumb from "../common/breadcrumb";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
// import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
// import OpenTable from "../games/rouletteGame/openTable";
// import ReactPaginate from "react-paginate";
// import GameHistory from "../games/rouletteGame/gameHistory";

const RouletteGame = () => {
  const [key, setKey] = useState("home");
  return (
    <div className="userlist-page">
      <Breadcrumb title="roulette-Game" parent="Game" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardBody className="user-datatable">
                <div className="comingSoon-Text">
                  <h1>COMING SOON ...</h1>
                </div>
                <Tabs
                  id="controlled-tab-example"
                  activeKey={key}
                  onSelect={(k) => setKey(k)}
                  className="mb-3"
                >

                  {/* <Tab eventKey="home" title="Roulette Open table">
                    <OpenTable />
                  </Tab>
                  <Tab eventKey="2" title="Roulette Open Tournament">
                    <OpenTable />
                  </Tab>
                  <Tab eventKey="4" title="Roulette Game History">
                    <GameHistory />
                  </Tab> */}
                </Tabs>
                {/* <div className="adminPagination">
                  <ReactPaginate
                    breakLabel="..."
                    nextLabel="next >"
                    // onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={5}
                    previousLabel="< previous"
                    renderOnZeroPageCount={null}
                  /> */}
                {/* </div> */}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RouletteGame;
