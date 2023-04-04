/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Breadcrumb from "../common/breadcrumb";
import { FaSearch, FaCaretUp, FaCaretDown } from "react-icons/fa";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
  Table,
  Input,
  FormGroup,
} from "reactstrap";
// import { Form } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { adminAuthInstance } from "../../config/axios";
import axios from "axios";
import { toast } from "react-toastify";
import user from "../../assets/images/user.png";
import Loader from "../pageLoader/loader";
let options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};
const Transaction = () => {
  const [pageCount, setPageCount] = useState(0);
  const [transactionCount, setTransactionCount] = useState(0);
  const [skip, setSkip] = useState(0);
  const [allTransaction, setAllTransaction] = useState([]);
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(10);
  const [loader, setLoader] = useState(true);
  // const pageLimit = 10;
  useEffect(() => {
    setPageCount(Math.ceil(transactionCount / pageLimit));
  }, [transactionCount]);
  const handlePageClick = ({ selected }) => {
    setSkip(selected * pageLimit);
    setCurrentPage(selected + 1);
  };
  const getAllUser = async () => {
    try {
      const res = await adminAuthInstance().get("/allTransaction", {
        params: { skip: skip, limit: pageLimit, filter },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      setAllTransaction(res?.data?.transaction);
      setTransactionCount(res?.data?.count);
      setLoader(false);
    } catch (e) {
      if (axios.isAxiosError(e) && e?.response) {
        if (e?.response?.status !== 200) {
          toast.error(e?.response?.data?.message, { toastId: "login" });
        }
      }
    }
  };
  useEffect(() => {
    getAllUser();
  }, [skip, filter, pageLimit]);

  const handlePagination = async (value) => {
    setPageLimit(value);
  };
  return (
    <>
      {loader && <Loader />}
      <div className="userlist-page">
        <Breadcrumb title="Transaction" parent="Transaction" />
        <Container fluid={true}>
          <Row>
            <Col sm="12">
              <Card>
                <CardHeader className="transactionSelect">
                  <div className="selectContainer">
                    <select
                      aria-label="Default select example"
                      className="form-control"
                      onChange={(e) => setFilter(e.target.value)}
                    >
                      <option value="">All Transaction</option>
                      <option value="poker">Poker</option>
                      <option value="blackjack">Blackjack</option>
                      <option value="slot">Slot</option>
                    </select>
                  </div>
                  <FormGroup className="searchFromgroup">
                    <Input
                      type="text"
                      name="search"
                      id="exampleEmail"
                      placeholder="Search here..."
                      className="searchFromInput"
                    />
                    <FaSearch className="searchlens" />
                  </FormGroup>
                </CardHeader>
                <CardBody className="user-datatable">
                  {allTransaction && allTransaction?.length > 0 ? (
                    <Table responsive>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Avatar</th>
                          <th>Username</th>
                          <th>Tokens</th>
                          <th>Source Type</th>
                          <th>Date</th>
                          {/* <th>Phone</th>
                      <th>Payment Status</th> */}
                        </tr>
                      </thead>
                      <tbody>
                        {allTransaction?.map((el, i) => (
                          <tr>
                            <th scope="row">
                              {(currentPage - 1) * 10 + (i + 1)}
                            </th>
                            <td className="latest-user-image">
                              <img
                                src={el?.userId?.profile || user}
                                alt="user profile"
                              />
                            </td>
                            <td>{el?.userId?.username}</td>
                            <td
                              className={`${
                                el?.amount?.toString()?.startsWith("-")
                                  ? "blockActive"
                                  : "userStatusActive"
                              } `}
                            >
                              <div className="user-amountTransaction">
                                {el?.amount?.toString()?.startsWith("-") ? (
                                  <>
                                    {el?.amount?.toFixed(2) * -1}
                                    <FaCaretDown />
                                  </>
                                ) : (
                                  <>
                                    {el?.amount?.toFixed(2)}
                                    <FaCaretUp />
                                  </>
                                )}
                              </div>
                            </td>
                            <td className="transactionTypeTd">
                              {el?.transactionType}
                            </td>
                            <td>
                              {new Date(el?.createdAt)?.toLocaleDateString(
                                "en-US",
                                options
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  ) : (
                    <span>No record Found</span>
                  )}
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
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Transaction;
