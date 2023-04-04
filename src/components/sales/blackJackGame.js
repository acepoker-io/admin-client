import React, { useEffect, useState } from "react";
import Breadcrumb from "../common/breadcrumb";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import OpenTable from "../games/blackjackGame/openTable";
import ReactPaginate from "react-paginate";
//import GameHistory from "../games/blackjackGame/gameHistory";
// import TournamentDateTable from "../games/blackjackGame/tournamentTable";
// import TournamentHistory from "../games/blackjackGame/tournamentHistory";
import { adminInstance } from "../../config/axios";

const BlackJackGame = () => {
  const [key, setKey] = useState("home");
  const [allRooms, setAllrooms] = useState([]);
  const [skip, setSkip] = useState(0);
  const [allRoomsCount, setAllRoomsCount] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [pageLimit] = useState(10);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    console.log("poker game use effect excuted ");
    (async () => {
      console.log("poker game async executed");
      const res = await adminInstance().get("/blackjackTables", {
        params: { tournament: false, skip, pageLimit, keyword },
      });
      console.log("res", res);
      setAllrooms(res?.data?.rooms);
      setAllRoomsCount(res?.data?.count);
    })();
  }, [skip, pageLimit, keyword]);

  const handlePageClick = ({ selected }) => {
    setSkip(selected * pageLimit);
  };

  useEffect(() => {
    setPageCount(Math.ceil(allRoomsCount / pageLimit));
  }, [allRoomsCount, pageLimit]);

  return (
    <div className="userlist-page">
      <Breadcrumb title="BlackJack-Game" parent="Game" />
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
                  <Tab eventKey="home" title="Open table">
                    <OpenTable allRooms={allRooms} setKeyword={setKeyword} />
                  </Tab>
                  {/* <Tab eventKey='2' title='BlackJack Tournament Table'>
                    <TournamentDateTable />
                  </Tab>
                  <Tab eventKey='3' title='BlackJack Tournament History'>
                    <TournamentHistory />
                  </Tab> */}
                  {/* <Tab eventKey="4" title="Game History">
                    <GameHistory />
                  </Tab> */}
                </Tabs>
                {allRooms?.length > 10 ? (
                  <div className="adminPagination">
                    <ReactPaginate
                      breakLabel="..."
                      nextLabel="next >"
                      onPageChange={handlePageClick}
                      pageRangeDisplayed={5}
                      pageCount={pageCount}
                      previousLabel="< previous"
                      renderOnZeroPageCount={null}
                    />
                  </div>
                ) : null}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default BlackJackGame;
