import React, { useState } from "react";
import Breadcrumb from "../common/breadcrumb";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
// import OpenTable from "../games/slotsGame/openTable";
// import ReactPaginate from "react-paginate";
// import GameHistory from "../games/slotsGame/gameHistory";

const SlotsGame = () => {
  const [key, setKey] = useState("home");
  return (
    <div className="userlist-page">
      <Breadcrumb title="slots-Game" parent="Game" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardBody className="user-datatable">
                <Tabs
                  id="controlled-tab-example"
                  activeKey={key}
                  onSelect={(k) => setKey(k)}
                  className="mb-3"
                >
                  {/* <Tab eventKey="home" title="Slots Open table">
                    <OpenTable />
                  </Tab>
                  <Tab eventKey="2" title="Slots Open Tournament">
                    <OpenTable />
                  </Tab> */}
                  <Tab eventKey="home" title="Slots Game History">
                    {/* <GameHistory /> */}
                    <div className="opentable-body">
                      <div className="noCardtable">
                        <h3>Comming soon ...</h3>
                      </div>
                    </div>
                  </Tab>
                </Tabs>
                {/* <div className="adminPagination">
                  <ReactPaginate
                    breakLabel="..."
                    nextLabel="next >"
                     onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={5}
                    previousLabel="< previous"
                    renderOnZeroPageCount={null}
                  />
                </div> */}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SlotsGame;
