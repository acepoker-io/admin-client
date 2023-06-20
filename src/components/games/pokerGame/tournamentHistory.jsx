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
  //const [tournamentId, setSingleTournament] = useState()
  const [deletePopup, setDelatePopup] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [singleTournament, setSingleTournament] = useState();
  const [spinLoader, setSpinLoader] = useState(false);
  const [modalName, setModalName] = useState("Create");
  const handleClose = () => {
    setSingleTournament();
    setShow(false);
  };


  const handleShow = (type) => {
    setShow(true);
    setModalName(type);
    setSingleTournament();
  };

  const getAllTournament = async () => {
    try {
      setSingleTournament();
      const response = await pokerTournamentInstance().get("/AllTournament", {
        params: { skip, limit: pageLimit },
        headers: {
          Authorization: `Bearer ${ localStorage.getItem("adminToken") }`,
        },
      });
      const {
        data: { tournament, count },
        status,
      } = response;
      if (status === 200) {
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
    // setShow(!show);
    handleShow("Update");
    setSingleTournament(tournaMent);
  };
  const handleDeleteTournament = (tournaMent) => {
    setDeleteId(tournaMent._id);
    setDelatePopup(!deletePopup);
  };
  const DeleteTournament = async () => {
    try {
      setSpinLoader(true);
      const response = await pokerTournamentInstance().delete(
        "/DeleteTournament",
        {
          params: { tournamentId: deleteId },
          headers: {
            Authorization: `Bearer ${ localStorage.getItem("adminToken") }`,
          },
        }
      );
      const { status } = response;
      await getAllTournament();
      setSpinLoader(false);
      if (status === 200) {
        setDeleteId("");
        setDelatePopup(false);
        toast.success("Tournament deleted successfully", {
          toastId: "login",
        });
      }
    } catch (err) {
      setSpinLoader(false);
      setDeleteId("");
      setDelatePopup(false);
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
          <Button
            className="yellowBtn"
            onClick={() => {
              handleShow("Create");
            }}
          >
            <span className="desk-view"> Create Tournament</span>
            <span className="mob-view">
              <i class="fa fa-plus" aria-hidden="true"></i>
              Create
            </span>
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
                            <th>Start Time</th>
                            <th>Buy-In</th>
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
                                  {new Date(
                                    el?.tournamentDate
                                  )?.toLocaleDateString("en-US", options)}
                                </td>
                                <td>
                                  {el?.startTime ? new Date(
                                    el?.tournamentDate
                                  )?.toLocaleTimeString() : "Not Started"}
                                </td>
                                <td>{el.buyIn}</td>
                                <td
                                  className={
                                    el.isStart
                                      ? "tournament-running"
                                      : el?.isFinished
                                        ? "tournament-finish"
                                        : "tournament-not-start"
                                  }
                                >
                                  {el?.isStart
                                    ? "Active"
                                    : el?.isFinished
                                      ? "Finished"
                                      : "Not Active"}
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
                          <div className="actionspaces"></div>
                        </tbody>
                      </Table>
                      {tournamentData?.length > 10 ? (
                        <div className="adminPagination">
                          <div className="transactionSelect ">
                            <div className="selectContainer">
                              <select
                                className="form-control"
                                aria-label="Default select example"
                                onChange={(e) =>
                                  handlePagination(e.target.value)
                                }
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
                      ) : null}
                    </CardBody>
                  </Col>
                </Row>
              </Container>
            </div>
          )}
        </div>
        {show ? (
          <CreateTableModal
            show={show}
            onHide={handleClose}
            singleTournament={
              singleTournament && Object.keys(singleTournament).length > 0
                ? singleTournament
                : {}
            }
            setSingleTournament={setSingleTournament}
            getAllTournament={getAllTournament}
            setShow={setShow}
            modalName={modalName}
          />
        ) : null}
        <DeletePopup
          show={deletePopup}
          setDelatePopup={setDelatePopup}
          handleDelete={DeleteTournament}
          setShow={setShow}
          title={"tournament"}
          spinLoader={spinLoader}
        />
      </div>
    </>
  );
};

export default TournamentHistory;
