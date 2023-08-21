/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Breadcrumb from "../common/breadcrumb";
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
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import ReactPaginate from "react-paginate";
import {
  FaCheck,
  FaSearch,
  // FaSortAmountDown,
  // FaSortAmountUp,
  FaTimes,
} from "react-icons/fa";
import { adminInstance, pokekInstance } from "../../config/axios";
import axios from "axios";
import { toast } from "react-toastify";
// import ActionDropdown from "../users/actionDropdown";
import Loader from "../pageLoader/loader";

// import { marketPlaceServer } from "../../config/keys";
import numFormatter from "../../utils/utils";
import ActionDropdown from "../users/actionDropdown";
import TableLoader from "../kyc/loader";
import NoData from "../kyc/noData";

const Cryptoredeem = () => {
  let options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const [redeemData, setRedeemData] = useState([]);
  const [redeemDataCount, setRedeemDataCount] = useState([]);
  const [showApprove, setShowApprove] = useState(false);
  const [userDetail, setUserDetail] = useState({});
  const [showReject, setShowReject] = useState(false);
  const [spinLoader, setSpinLoader] = useState(false);
  const [loader, setLoader] = useState(10);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(10);
  const [pageCount, setPageCount] = useState(0);
  const [mainLoading, setMainLoading] = useState(true);
  const [tableLoader, setTableLoader] = useState(true);

  const initialState = {
    requestedTab: "idle",
    currentPage: 0,
    searchTerm: "",
  };
  const [managedState, setmanagedState] = useState(initialState);

  const getAllWithdrawRequests = async () => {
    try {
      setMainLoading(true);
      setTableLoader(true);
      const res = await adminInstance().get("/getAllWithdrawRequest", {
        params: {
          page: currentPage,
          limit: pageLimit,
          searchKey: managedState.searchTerm,
          filter: selectedStatus,
        },
      });
      const { requestPrize } = res.data;
      setMainLoading(false);
      setTableLoader(false);
      setRedeemData(requestPrize?.results);
      setRedeemDataCount(requestPrize?.totalResults);
      setLoader(false);
    } catch (e) {
      console.log("e?.response?.status", e?.response?.status);
      if (axios.isAxiosError(e) && e?.response) {
        if (e?.response?.status !== 200) {
          toast.error(e?.response?.data?.message, { toastId: "login" });
          if (e?.response?.status === 400) {
            localStorage.clear();
            window.location.href = "/";
          }
        }
      }
      setLoader(false);
    }
  };

  useEffect(() => {
    const source = axios.CancelToken.source();
    let timeOut = setTimeout(async () => {
      getAllWithdrawRequests();
    }, 1000);

    return () => {
      clearInterval(timeOut);
      source.cancel("Request canceled");
    };
  }, [pageLimit, currentPage, selectedStatus, managedState]);

  useEffect(() => {
    setPageCount(Math.ceil(redeemDataCount / pageLimit));
  }, [redeemDataCount, pageLimit]);

  const handleShowApproveInfo = (user) => {
    setShowApprove(!showApprove);
    setUserDetail(user);
  };

  const handleShowReject = (user) => {
    setShowReject(!showReject);
    setUserDetail(user);
  };

  const handleApproveRedeem = async () => {
    setSpinLoader(true);
    const { _id: withdraw_id } = userDetail;
    try {
      const userData = await pokekInstance().post("/withdrawTransaction", {
        withdraw_id: withdraw_id,
      }); // console.log("userData",userData);
      if (userData.data.success) {
        setSpinLoader(false);
        setShowApprove(!showApprove);
        getAllWithdrawRequests();
        toast.success(`withdraw successfully!`);
      } else {
        toast.error("ERROR! - " + userData.data.message, {
          containerId: "error",
        });
        setShowApprove(!showApprove);
        setSpinLoader(false);
      }
    } catch (e) {
      console.log("error", e);
      if (axios.isAxiosError(e) && e?.response) {
        if (e?.response?.status !== 200) {
          toast.error(e?.response?.data?.message, { toastId: "login" });
        }
        // if (e?.response?.status === 400) {
        //   localStorage.clear();
        //   window.location.href = "/";
        // }
      }

      setSpinLoader(false);
    }
  };

  const handleRejectRedeem = async () => {
    try {
      setSpinLoader(true);
      const res = await adminInstance().get("/rejectWithdrawRequest", {
        params: {
          redeem_id: userDetail?._id,
        },
      });
      const { status, msg } = res.data || {};
      if (status === 200) {
        setSpinLoader(false);
        setShowReject(!showReject);
        getAllWithdrawRequests();
        toast.success(msg);
      }
    } catch (error) {
      console.log("error", error);
      setSpinLoader(false);
    }
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  const handlePagination = (value) => {
    setPageLimit(value);
    setCurrentPage(1);
  };

  const handleChangeStatus = (value) => {
    console.log("value", value);
    setSelectedStatus(value);
    setCurrentPage(1);
  };

  const handleSearchTermChange = (event) => {
    setmanagedState((prev) => {
      return { ...prev, currentPage: 1, searchTerm: event.target.value };
    });
  };

  return (
    <>
      {loader && <Loader />}
      <div className='userlist-page'>
        <Breadcrumb title='Withdraw-list' parent='User' />
        <Container fluid={true}>
          <Row>
            <Col sm='12'>
              <Card>
                <CardHeader>
                  <h5>All Withdraw List</h5>
                  <FormGroup className='searchFromgroup'>
                    <Input
                      type='search'
                      name='search'
                      id='exampleEmail'
                      placeholder='Search by username'
                      className='searchFromInput'
                      value={managedState.searchTerm}
                      onChange={handleSearchTermChange}
                    />
                    <FaSearch className='searchlens' />
                  </FormGroup>
                  <div className='transactionSelect'>
                    <div className='selectContainer'>
                      <select
                        aria-label='Default select example'
                        className='form-control'
                        onChange={(e) => handleChangeStatus(e.target.value)}>
                        <option value=''>All Status</option>
                        <option value='Approved'>Accepted</option>
                        <option value='Rejected'>Rejected</option>
                        <option value='pending'>Pending</option>
                      </select>
                    </div>
                  </div>
                </CardHeader>
                <CardBody className='user-datatable cryptoRedeemTable'>
                  <Table responsive>
                    <>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Username</th>
                          <th>address</th>
                          <th>amount</th>
                          <th>Date/Time</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      {tableLoader ? (
                        <tbody>
                          <tr>
                            <td colSpan={9} style={{ textAlign: "center" }}>
                              <Spinner
                                className='tableSpinner'
                                animation='border'
                              />
                            </td>
                          </tr>
                        </tbody>
                      ) : (
                        <tbody>
                          {!mainLoading ? (
                            redeemData.length > 0 ? (
                              redeemData?.map((el, i) => (
                                <tr key={el.id + i}>
                                  <th scope='row'>
                                    {(currentPage - 1) * pageLimit + (i + 1)}
                                  </th>
                                  <td>
                                    <p>{el?.userId?.username}</p>
                                  </td>

                                  <td>{el?.address}</td>
                                  <td>{numFormatter(el?.amount)}</td>
                                  <td>
                                    {" "}
                                    {new Date(
                                      el?.createdAt
                                    )?.toLocaleTimeString("en-US", options)}
                                  </td>
                                  <td
                                    className={
                                      el?.status === "pending"
                                        ? "pendingStatus"
                                        : el?.status === "Rejected"
                                        ? "rejected"
                                        : "approveStatus"
                                    }>
                                    {el.status === "pending"
                                      ? "Pending"
                                      : el.status}
                                  </td>
                                  {el?.status === "pending" ? (
                                    <td className='actionDropdown'>
                                      <ActionDropdown
                                        type={"redeem"}
                                        handleShowUserInfo={() =>
                                          handleShowApproveInfo(el)
                                        }
                                        handleShowReject={() =>
                                          handleShowReject(el)
                                        }
                                      />
                                    </td>
                                  ) : el?.status === "Rejected" ? (
                                    <td className='actionDropdown'>
                                      <FaTimes />
                                    </td>
                                  ) : (
                                    <td className='actionDropdown'>
                                      <FaCheck />
                                    </td>
                                  )}
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan={10}>
                                  <NoData />
                                </td>
                              </tr>
                            )
                          ) : (
                            <tr>
                              <td colSpan={10}>
                                <TableLoader />
                              </td>
                            </tr>
                          )}
                        </tbody>
                      )}
                    </>
                  </Table>

                  {redeemDataCount && redeemDataCount >= 10 && (
                    <div className='adminPagination'>
                      <div className='transactionSelect'>
                        <div className='selectContainer'>
                          <select
                            className='form-control'
                            aria-label='Default select example'
                            onChange={(e) => handlePagination(e.target.value)}
                            defaultValue={pageLimit}>
                            <option value='10'>10 row</option>
                            <option value='20'>20 row</option>
                            <option value='30'>30 row</option>
                            <option value='50'>50 row</option>
                            <option value='100'>100 row</option>
                          </select>
                        </div>
                      </div>
                      <ReactPaginate
                        breakLabel='...'
                        nextLabel='>'
                        onPageChange={handlePageClick}
                        forcePage={currentPage - 1}
                        pageRangeDisplayed={1}
                        pageCount={pageCount}
                        previousLabel='<'
                        renderOnZeroPageCount={null}
                      />
                    </div>
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>

        {/*********** user info popup  **********/}

        <Modal
          className='userInfoModal cryptoredeemApprove'
          centered
          show={showApprove}
          onHide={handleShowApproveInfo}>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Title>Approve Status</Modal.Title>
          <Modal.Footer className='btnRedeem approvepopup'>
            <button
              className='yellowBtn'
              color='primary'
              type='submit'
              onClick={() => handleApproveRedeem()}>
              {!spinLoader ? "Approve" : <Spinner animation='border' />}
            </button>
            <button className='darkBtn' onClick={handleShowApproveInfo}>
              Cancel
            </button>
          </Modal.Footer>
        </Modal>

        {/*********** reject  **********/}

        <Modal
          className='userInfoModal cryptoredeemApprove'
          centered
          show={showReject}
          onHide={handleShowReject}>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Title>Reject Status</Modal.Title>
          <Modal.Footer className='btnRedeem approvepopup'>
            <button
              className='yellowBtn'
              color='primary'
              type='submit'
              onClick={() => handleRejectRedeem()}>
              {!spinLoader ? "Reject" : <Spinner animation='border' />}
            </button>
            <button className='darkBtn' onClick={handleShowReject}>
              Cancel
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default Cryptoredeem;
