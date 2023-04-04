/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
//import { FaSearch } from 'react-icons/fa'
import Button from "react-bootstrap/Button";
import {
  // Input,
  // FormGroup,
  CardBody,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";
//import game1 from "../../../assets/images/game/game1.svg";
// import game2 from "../../../assets/images/game/game2.svg";
// import game3 from "../../../assets/images/game/game3.svg";
//import user from "../../../assets/images/game/dummy.png";
import CreateTableModal from "./createTableModal";
//import TournamentDateTable from "./tournamentTable";
import { pokerTournamentInstance } from "../../../config/axios";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import axios from "axios";
import ActionDropdown from "../../users/actionDropdown";
import DeletePopup from "../../model/confirmationPopup";
import numFormatter from "../../../utils/utils";
let options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};
const TournamentHistory = () => {
  const [show, setShow] = useState(false);
  const [tournamentData, setTournamentData] = useState([]);
  const [tournamentCount, setTournamentCount] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [skip, setSkip] = useState(0);
  const [pageLimit, setPageLimit] = useState(10);
  const [singleTournament, setSingleTournament] = useState({});
  const [deletePopup, setDelatePopup] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [modalName, setModalName] = useState("Create");
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    setModalName("Update");
    setSingleTournament({});
  };
  const getAllTournament = async () => {
    try {
      const response = await pokerTournamentInstance().get("/AllTournament", {
        params: { skip, limit: pageLimit },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      const {
        data: { tournament, count },
        status,
      } = response;
      if (status === 200 && tournament?.length > 0) {
        setTournamentData(tournament);
        setTournamentCount(count);
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        if (err.response.status !== 200) {
          toast.error(err?.response?.data?.message || "Something went wrong", {
            toastId: "login",
          });
        }
      }
    }
  };
  useEffect(() => {
    getAllTournament();
  }, [skip, pageLimit]);
  useEffect(() => {
    setPageCount(Math.ceil(tournamentCount / pageLimit));
  }, [tournamentCount]);
  const handlePageClick = ({ selected }) => {
    setSkip(selected * pageLimit);
  };
  const handlePagination = (value) => {
    setPageLimit(value);
  };
  const handleShowUserInfo = (tournaMent) => {
    setShow(!show);
    setSingleTournament(tournaMent);
  };
  const handleDeleteTournament = (tournaMent) => {
    setDeleteId(tournaMent._id);
    setDelatePopup(!deletePopup);
  };
  const DeleteTournament = async () => {
    try {
      const response = await pokerTournamentInstance().delete(
        "/DeleteTournament",
        {
          params: { tournamentId: deleteId },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );
      const { status } = response;
      if (status === 200) {
        getAllTournament();
        setDeleteId("");
        setDelatePopup(false);
        toast.success("Tournament deleted successfully", {
          toastId: "login",
        });
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        if (err.response.status !== 200) {
          toast.error(err?.response?.data?.message || "Something went wrong", {
            toastId: "login",
          });
        }
      }
    }
  };
  return (
    <>
      <div className="OpenTable">
        <div className="openTable-header">
          <h4>All Tournament</h4>
          {/* <FormGroup className="searchFromgroup">
          <Input
            type="text"
            name="search"
            id="exampleEmail"
            placeholder="Search here..."
            className="searchFromInput"
          />
          <FaSearch className="searchlens" />
        </FormGroup> */}
          <Button className="yellowBtn" onClick={handleShow}>
            Create Tournament
          </Button>
        </div>
        <div className="opentable-body">
          {tournamentData && tournamentData?.length === 0 ? (
            <div className="noCardtable">
              <h3>No Tournament</h3>
            </div>
          ) : (
            <div className="tournament-table">
              <Container fluid={true}>
                <Row>
                  <Col md="12">
                    <CardBody className="user-datatable">
                      <Table responsive>
                        <thead>
                          <tr>
                            <th>Tournament Name</th>
                            <th>Tournament Fess</th>
                            <th>Start Date</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {tournamentData &&
                            tournamentData?.length > 0 &&
                            tournamentData.map((el, i) => (
                              <tr key={el._id}>
                                <td className="firstnameUserList">{el.name}</td>
                                <td>{numFormatter(el?.tournamentFee)}</td>
                                <td>
                                  {new Date(el?.startDate)?.toLocaleDateString(
                                    "en-US",
                                    options
                                  )}
                                </td>
                                <td
                                  className={
                                    el.active
                                      ? "userStatusActive"
                                      : "blockActive"
                                  }
                                >
                                  {el.active ? "Active" : "Not Active"}
                                </td>
                                <td className="actionDropdown">
                                  <ActionDropdown
                                    handleShowUserInfo={() =>
                                      handleShowUserInfo(el)
                                    }
                                    handleShowUserBlock={() =>
                                      handleDeleteTournament(el)
                                    }
                                    data={el}
                                    type="tournament"
                                  />
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </Table>
                      <div className="adminPagination">
                        <div className="transactionSelect ">
                          <div className="selectContainer">
                            <select
                              className="form-control"
                              aria-label="Default select example"
                              onChange={(e) => handlePagination(e.target.value)}
                              defaultValue={pageLimit}
                            >
                              <option>Select Page</option>
                              <option value="10">10</option>
                              <option value="20">20</option>
                              <option value="30">30</option>
                              <option value="50">50</option>
                              <option value="100">100</option>
                            </select>
                          </div>
                        </div>
                        {tournamentData && tournamentData?.length > 0 ? (
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
                        ) : (
                          ""
                        )}
                      </div>
                    </CardBody>
                  </Col>
                </Row>
              </Container>
            </div>
          )}
        </div>
        <CreateTableModal
          show={show}
          modalName={modalName}
          onHide={handleClose}
          singleTournament={singleTournament}
          getAllTournament={getAllTournament}
          setShow={setShow}
        />
        <DeletePopup
          show={deletePopup}
          setDelatePopup={setDelatePopup}
          handleDelete={DeleteTournament}
          setShow={setShow}
        />
      </div>
    </>
  );
};

export default TournamentHistory;
