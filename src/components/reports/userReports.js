/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Breadcrumb from "../common/breadcrumb";
import {
  // Alert,
  // Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  FormGroup,
  Input,
  Row,
  Table,
} from "reactstrap";
import TableLoader from "../kyc/loader";
import {
  // FaCaretDown,
  // FaCaretUp,
  // FaInfoCircle,
  FaSearch,
  FaSort,
} from "react-icons/fa";
import ReactPaginate from "react-paginate";
// import NoData from "../kyc/noData";
//import numFormatter from "../../utils/utils";
import { Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { adminInstance } from "../../config/axios";
import axios from "axios";
import { toast } from "react-toastify";
import moment from "moment";
import numFormatter from "../../utils/utils";
// import App from "../app";
// import ProfileModal from "../common/profileModal";

const UserReports = () => {
  const [loader, setLoader] = useState(false);
  // const [itemLoading, setItemLoading] = useState(false);
  const [pageLimit, setPageLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [skip, setSkip] = useState(0);
  const [selectedPage, setSelectedPage] = useState(0);
  const [allTransactions, setAllTransactions] = useState([]);
  const [transactionCount, setTransactionCount] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [sortBy, setShortBy] = useState("desc");
  const [qeryType, setQueryType] = useState("");
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [scheduleTime, setScheduleTime] = useState("All");
  const [minDate, setMinDate] = useState();
  const [toDailyDate, setToDailyDate] = useState();
  const [transactionType, setTransactionType] = useState("Active");
  const initialState = {
    requestedTab: "idle",
    currentPage: 0,
    searchTerm: "",
  };
  const [managedState, setmanagedState] = useState(initialState);
  const [profileModal, setProfileModal] = useState(false);
  const [, setUserId] = useState("");

  useEffect(() => {
    getAllTransactionReport();
  }, [
    skip,
    pageLimit,
    sortBy,
    qeryType,
    toDate,
    fromDate,
    toDailyDate,
    transactionType,
    managedState,
  ]);

  useEffect(() => {
    setPageCount(Math.ceil(transactionCount / pageLimit));
  }, [transactionCount, pageLimit]);

  const handlePageClick = ({ selected }) => {
    setSelectedPage(selected);
    setSkip(selected * pageLimit);
    setCurrentPage(selected + 1);
  };

  const getAllTransactionReport = async () => {
    try {
      setLoader(true);
      const res = await adminInstance().get("/reportMembers", {
        params: {
          page: currentPage,
          limit: pageLimit,
          sortBy: qeryType,
          fromDate: fromDate ? moment(fromDate).format("YYYY-MM-DD") : fromDate,
          toDate:
            scheduleTime === "Daily"
              ? moment(toDailyDate).format("YYYY-MM-DD")
              : moment(toDate).format("YYYY-MM-DD"),
          type: transactionType,
          searchKey: managedState.searchTerm,
        },
      });
      setAllTransactions(res?.data?.report || []);
      setTransactionCount(res?.data?.count);
      setLoader(false);
    } catch (e) {
      setLoader(false);
      if (axios.isAxiosError(e) && e?.response) {
        if (e?.response?.status !== 200) {
          toast.error(e?.response?.data?.message, { toastId: "login" });
        }
      }
    }
  };

  const handlePagination = async (value) => {
    setPageLimit(value);
    setSelectedPage(0);
    setSkip(0);
    setCurrentPage(1);
  };

  const handleSort = (itemtype) => {
    if (itemtype === "Total Bet") {
      if (sortBy === "desc") {
        setShortBy("asc");
        setQueryType("totalBet:asc");
      } else {
        setShortBy("desc");
        setQueryType("totalBet:desc");
      }
    }
    if (itemtype === "Gold Coin") {
      if (sortBy === "desc") {
        setShortBy("asc");
        setQueryType("goldCoin:asc");
      } else {
        setShortBy("desc");
        setQueryType("goldCoin:desc");
      }
    }
    if (itemtype === "Wallet") {
      if (sortBy === "desc") {
        setShortBy("asc");
        setQueryType("wallet:asc");
      } else {
        setShortBy("desc");
        setQueryType("wallet:desc");
      }
    }
    if (itemtype === "Ticket") {
      if (sortBy === "desc") {
        setShortBy("asc");
        setQueryType("ticket:asc");
      } else {
        setShortBy("desc");
        setQueryType("ticket:desc");
      }
    }
  };
  const handleFilter = (value) => {
    setScheduleTime(value);
    if (value === "All") {
      setFromDate("");
      setToDate("");
    }
    if (value === "Daily") {
      setFromDate(new Date());
      setToDate(new Date());
      let date = new Date();
      let lastday = date.setDate(date.getDate() + 1);
      setToDailyDate(new Date(lastday));
    }
    if (value === "Weekly") {
      let date = new Date();
      let lastday = date.setDate(date.getDate() - 6);
      setFromDate(new Date(lastday));
      setToDate(new Date());
    }
    if (value === "Monthly") {
      let date = new Date();
      let lastday = date.setDate(date.getDate() - 30);
      setFromDate(new Date(lastday));
      setToDate(new Date());
    }
    if (value === "Annual") {
      let date = new Date();
      let lastday = date.setDate(date.getDate() - 365);
      setFromDate(new Date(lastday));
      setToDate(new Date());
    }
  };

  const handleTransactionType = (value) => {
    setTransactionType(value);
  };

  const handleFromDate = (value) => {
    if (scheduleTime === "All") {
      setFromDate(value);
      setMinDate(value);
    }
    if (scheduleTime === "Daily") {
      let date = new Date(value);
      let lastday = date.setDate(date.getDate() + 1);
      setToDailyDate(new Date(lastday));
      setFromDate(value);
      setToDate(value);
      setMinDate(value);
    }
    if (scheduleTime === "Weekly") {
      let date = new Date(value);
      let lastday = date.setDate(date.getDate() + 6);
      setFromDate(value);
      setToDate(new Date(lastday));
      setMinDate(value);
    }
    if (scheduleTime === "Monthly") {
      let date = new Date(value);
      let lastday = date.setDate(date.getDate() + 30);
      setFromDate(value);
      setToDate(new Date(lastday));
      setMinDate(value);
    }
    if (scheduleTime === "Annual") {
      let date = new Date(value);
      let lastday = date.setDate(date.getDate() + 365);
      setFromDate(value);
      setToDate(new Date(lastday));
      setMinDate(value);
    }
  };
  const handleToDate = (value) => {
    if (fromDate === undefined) {
      toast.error(`Please select from Date`);
    } else {
      if (scheduleTime === "All") {
        setToDate(value);
      }
      if (scheduleTime === "Daily") {
        setToDate(fromDate);
      }
      if (scheduleTime === "Weekly") {
        let date = new Date(value);
        let lastday = date.setDate(date.getDate() - 6);
        setFromDate(new Date(lastday));
        setToDate(value);
        setMinDate(value);
      }
      if (scheduleTime === "Monthly") {
        let date = new Date(value);
        let lastday = date.setDate(date.getDate() - 30);
        setFromDate(new Date(lastday));
        setToDate(value);
        setMinDate(value);
      }
      if (scheduleTime === "Annual") {
        let date = new Date(value);
        let lastday = date.setDate(date.getDate() - 365);
        setFromDate(new Date(lastday));
        setToDate(value);
        setMinDate(value);
      }
    }
  };

  const handleSearchTermChange = (event) => {
    setSkip(0);
    setmanagedState((prev) => {
      return { ...prev, currentPage: 1, searchTerm: event.target.value };
    });
  };

  // const handleCsvDownload = async () => {
  //   try {
  //     setItemLoading(true);
  //     const res = await adminInstance().get("/exportAllUsersReport", {
  //       responseType: "blob",
  //       params: {
  //         sortBy: qeryType,
  //         fromDate: fromDate ? moment(fromDate).format("YYYY-MM-DD") : fromDate,
  //         toDate:
  //           scheduleTime === "Daily"
  //             ? moment(toDailyDate).format("YYYY-MM-DD")
  //             : moment(toDate).format("YYYY-MM-DD"),
  //         type: transactionType,
  //         searchKey: managedState.searchTerm,
  //       },
  //     });

  //     if (res.status === 200) {
  //       setItemLoading(false);
  //     }

  //     var blobXls = new Blob([res.data], {
  //       type: res.headers["content-type"],
  //     });
  //     const link = document.createElement("a");
  //     link.href = window.URL.createObjectURL(blobXls);
  //     link.download = "allUsersReport.xlsx";
  //     link.click();
  //   } catch (e) {
  //     if (axios.isAxiosError(e) && e?.response) {
  //       if (e?.response?.status !== 200) {
  //         toast.error(e?.response?.data?.message, { toastId: "login" });
  //       }
  //     }
  //   }
  // };
  const handleProfileModal = (id) => {
    if (id) {
      setUserId(id);
    } else {
      setUserId("");
    }

    setProfileModal(!profileModal);
  };
  return (
    <>
      {/* <App> */}
      {/* <ProfileModal
          profileModal={profileModal}
          setProfileModal={setProfileModal}
          handleProfileModal={handleProfileModal}
          userId={userId}
        /> */}
      <div className='userlist-page AllTransaction'>
        <Breadcrumb title='All Users Report' parent='All Users Report' />
        <Container fluid={true}>
          <Row>
            <Col sm='12'>
              <Card>
                <CardHeader>
                  <div className='inputDateRange'>
                    <Form.Group>
                      <Form.Label>From : </Form.Label>
                      <DatePicker
                        selected={fromDate}
                        onChange={(date) => handleFromDate(date)}
                        placeholderText={"MM/DD/YYYY"}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>To : </Form.Label>
                      <DatePicker
                        selected={toDate}
                        onChange={(date) => handleToDate(date)}
                        placeholderText={"MM/DD/YYYY"}
                        minDate={new Date(minDate)}
                      />
                    </Form.Group>
                  </div>
                </CardHeader>
                <CardHeader className='transactionSelect'>
                  <div className='reportDropdowns'>
                    <div className='selectContainer'>
                      <select
                        aria-label='Default select example'
                        className='form-control'
                        onChange={(e) => handleTransactionType(e.target.value)}
                        value={transactionType}>
                        <option value='Active'>Active Playing</option>
                        <option value='Inactive'>Inactive Playing</option>
                        <option value='Not Played'>Not Playing</option>
                      </select>
                    </div>
                    <div className='selectContainer'>
                      <select
                        aria-label='Default select example'
                        className='form-control'
                        onChange={(e) => handleFilter(e.target.value)}>
                        <option value='All'>All Reports</option>
                        <option value='Daily'>Daily Reports</option>
                        <option value='Weekly'>Weekly Reports</option>
                        <option value='Monthly'>Monthly Reports</option>
                        <option value='Annual'>Annual Reports</option>
                      </select>
                    </div>
                  </div>

                  <FormGroup className='searchFromgroup'>
                    <Input
                      type='search'
                      name='search'
                      id='exampleEmail'
                      placeholder='Search here ...'
                      className='searchFromInput'
                      value={managedState.searchTerm}
                      onChange={handleSearchTermChange}
                    />
                    <FaSearch className='searchlens' />
                  </FormGroup>
                  {/* <Button
                    className='downloadCSVbtn'
                    onClick={() => handleCsvDownload()}>
                    {itemLoading ? <TableLoader /> : "Download"}
                  </Button> */}
                </CardHeader>
                {loader ? (
                  <TableLoader />
                ) : (
                  <>
                    <CardBody className='user-datatable'>
                      <Table responsive>
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Username</th>
                            <th onClick={() => handleSort("Total Bet")}>
                              Total Bet <FaSort />
                            </th>
                            <th onClick={() => handleSort("Wallet")}>
                              Token <FaSort />
                            </th>
                            {/* <th onClick={() => handleSort("Ticket")}>
                              Ticket <FaSort />
                            </th>
                            <th onClick={() => handleSort("Gold Coin")}>
                              Gold Coin <FaSort />
                            </th> */}
                          </tr>
                        </thead>

                        {console.log("All transactions ==>", allTransactions)}
                        {allTransactions && allTransactions?.length > 0 ? (
                          <tbody>
                            {allTransactions &&
                              allTransactions?.length > 0 &&
                              allTransactions?.map((el, i) => (
                                <tr key={el.id + i}>
                                  <th scope='row'>
                                    {(currentPage - 1) * pageLimit + (i + 1)}
                                  </th>

                                  <td>
                                    <p
                                      onClick={() => {
                                        handleProfileModal(el?._id);
                                      }}>
                                      {/* <FaInfoCircle /> {el?.username} */}
                                    </p>
                                  </td>
                                  <td>
                                    <div className='user-amountTransaction'>
                                      {numFormatter(el?.totalBet) || 0}
                                    </div>
                                  </td>
                                  <td
                                    className={`${
                                      el?.wallet?.toString()?.startsWith("-")
                                        ? "blockActive"
                                        : "userStatusActive"
                                    } `}>
                                    {numFormatter(el?.wallet)}
                                  </td>
                                  {/* <td
                                    className={`${
                                      el?.ticket?.toString()?.startsWith("-")
                                        ? "blockActive"
                                        : "userStatusActive"
                                    } `}>
                                    {numFormatter(el?.ticket)}
                                  </td>
                                  <td
                                    className={`${
                                      el?.goldCoin?.toString()?.startsWith("-")
                                        ? "blockActive"
                                        : "userStatusActive"
                                    } `}>
                                    {numFormatter(el?.goldCoin)}
                                  </td> */}
                                </tr>
                              ))}
                          </tbody>
                        ) : (
                          <tbody>
                            <tr>
                              <td colSpan={10} className='noRecords'>
                                No records found
                              </td>
                            </tr>
                          </tbody>
                        )}
                      </Table>
                      {transactionCount && transactionCount >= 10 && (
                        <div className='adminPagination'>
                          <div className='transactionSelect '>
                            <div className='selectContainer'>
                              <select
                                className='form-control'
                                aria-label='Default select example'
                                onChange={(e) =>
                                  handlePagination(e.target.value)
                                }
                                defaultValue={pageLimit}>
                                <option value='10'>10</option>
                                <option value='20'>20</option>
                                <option value='30'>30</option>
                                <option value='50'>50</option>
                                <option value='100'>100</option>
                              </select>
                            </div>
                          </div>
                          <ReactPaginate
                            breakLabel='...'
                            nextLabel='next >'
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={5}
                            forcePage={selectedPage}
                            pageCount={pageCount}
                            previousLabel='< previous'
                            renderOnZeroPageCount={null}
                          />
                        </div>
                      )}
                    </CardBody>
                  </>
                )}
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      {/* </App> */}
    </>
  );
};

export default UserReports;
