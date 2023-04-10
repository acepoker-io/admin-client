/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Breadcrumb from "../common/breadcrumb";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import OpenTable from "../games/pokerGame/openTable";
// import ReactPaginate from "react-paginate";
//import GameHistory from "../games/pokerGame/gameHistory";
// import TournamentHistory from "../games/pokerGame/tournamentHistory";
// import TournamentDateTable from "../games/pokerGame/tournamentTable";
import { adminInstance } from "../../config/axios";
import ReactPaginate from "react-paginate";
// import ReactPaginate from "react-paginate";

const PokerGame = () => {
  const [key, setKey] = useState("home");
  const [allRooms, setAllrooms] = useState([]);
  const [skip, setSkip] = useState(0);
  const [allRoomsCount, setAllRoomsCount] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [pageLimit] = useState(10);
  const [keyword, setKeyword] = useState("");
  const getAllPokerTable = async () => {
    try {
      const res = await adminInstance().get("/pokerTables", {
        params: { tournament: false, skip, pageLimit, keyword },
      });
      setAllrooms(res?.data?.rooms);
      setAllRoomsCount(res?.data?.count);
    } catch (err) {
      console.log("Error-->", err);
    }
  };
  useEffect(() => {
    getAllPokerTable();
  }, [skip, pageLimit, keyword]);

  const handlePageClick = ({ selected }) => {
    console.log(pageCount);
    setSkip(selected * pageLimit);
  };

  useEffect(() => {
    setPageCount(Math.ceil(allRoomsCount / pageLimit));
  }, [allRoomsCount, pageLimit]);

  return (
    <div className='userlist-page'>
      <Breadcrumb title='Poker-Game' parent='Game' />
      <Container fluid={true}>
        <Row>
          <Col sm='12'>
            <Card>
              <CardBody className='user-datatable'>
                <Tabs
                  id='controlled-tab-example'
                  activeKey={key}
                  onSelect={(k) => setKey(k)}
                  className='mb-3'>
                  <Tab eventKey='home' title='Open table'>
                    <OpenTable
                      allRooms={allRooms}
                      setKeyword={setKeyword}
                      getAllPokerTable={getAllPokerTable}
                    />
                  </Tab>
                  {/* <Tab eventKey="2" title="Tournament Table">
                    <TournamentHistory />
                  </Tab> */}
                  {/* <Tab eventKey='3' title='Poker Tournament History'>
                  </Tab> */}
                  {/* <TournamentDateTable /> */}
                  {/* <Tab eventKey='3' title='Sit & Go'>
                    <div className='opentable-body'>
                      <div className='noCardtable'>
                        <h3>Comming soon ...</h3>
                      </div>
                    </div>
                  </Tab> */}
                  {/* <Tab eventKey="4" title="Game History">
                    <GameHistory />
                  </Tab> */}
                </Tabs>
                {allRoomsCount > 10 ? (
                  <div className='adminPagination'>
                    <ReactPaginate
                      breakLabel='...'
                      nextLabel='next >'
                      onPageChange={handlePageClick}
                      pageRangeDisplayed={5}
                      pageCount={pageCount}
                      previousLabel='< previous'
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

export default PokerGame;
