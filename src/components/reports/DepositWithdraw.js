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
  //FaCaretDown,
  // FaCaretUp,
  // FaInfoCircle,
  FaSearch,
  FaSort,
} from "react-icons/fa";
import ReactPaginate from "react-paginate";
// import NoData from "../kyc/noData";
// import numFormatter from "../../utils/utils";
import { Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { adminInstance } from "../../config/axios";
import axios from "axios";
import { toast } from "react-toastify";
import moment from "moment";
import numFormatter from "../../utils/utils";
// import App from "../app";
// import ProfileModal from "../common/profileModal";

const DepositWithdraw = () => {
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
  const initialState = {
    requestedTab: "idle",
    currentPage: 0,
    searchTerm: "",
  };
  const [managedState, setmanagedState] = useState(initialState);
  const [profileModal, setProfileModal] = useState(false);
  const [, setUserId] = useState("");

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
      const res = await adminInstance().get("/depositWithdrawalReport", {
        params: {
          page: currentPage,
          limit: pageLimit,
          sortBy: qeryType,
          fromDate: fromDate ? moment(fromDate).format("YYYY-MM-DD") : fromDate,
          toDate:
            scheduleTime === "Daily"
              ? moment(toDailyDate).format("YYYY-MM-DD")
              : moment(toDate).format("YYYY-MM-DD"),
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
    managedState,
  ]);

  const handlePagination = async (value) => {
    setPageLimit(value);
    setSelectedPage(0);
    setSkip(0);
    setCurrentPage(1);
  };

  const handleSort = (itemtype) => {
    if (itemtype === "Total Deposit") {
      if (sortBy === "desc") {
        setShortBy("asc");
        setQueryType("totalDeposit:asc");
      } else {
        setShortBy("desc");
        setQueryType("totalDeposit:desc");
      }
    }
    if (itemtype === "Total Withdrawal") {
      if (sortBy === "desc") {
        setShortBy("asc");
        setQueryType("totalWithdrawal:asc");
      } else {
        setShortBy("desc");
        setQueryType("totalWithdrawal:desc");
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
  //     const res = await adminInstance().get("/exportDepositWithdrawalReport", {
  //       responseType: "blob",
  //       params: {
  //         sortBy: qeryType,
  //         fromDate: fromDate ? moment(fromDate).format("YYYY-MM-DD") : fromDate,
  //         toDate:
  //           scheduleTime === "Daily"
  //             ? moment(toDailyDate).format("YYYY-MM-DD")
  //             : moment(toDate).format("YYYY-MM-DD"),
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
  //     link.download = "depositWithdrawalReport.xlsx";
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
    console.log("id==", id);
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
        <Breadcrumb
          title='All Deposit & Withdrawal Report'
          parent='All Deposit & Withdrawal Report'
        />
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
                        onChange={(e) => handleFilter(e.target.value)}
                        value={scheduleTime}>
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
                            <th onClick={() => handleSort("Total Deposit")}>
                              Total Deposit <FaSort />
                            </th>
                            <th onClick={() => handleSort("Total Withdrawal")}>
                              Total Withdrawal <FaSort />
                            </th>
                            <th>Status</th>
                          </tr>
                        </thead>
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
                                      {el?.username}
                                    </p>
                                  </td>
                                  <td className={"userStatusActive"}>
                                    <div className='user-amountTransaction'>
                                      {numFormatter(el?.totalDeposit)}
                                    </div>
                                  </td>
                                  <td
                                    className={`${
                                      el?.totalWithdrawal
                                        ?.toString()
                                        ?.startsWith("-")
                                        ? "blockActive"
                                        : "userStatusActive"
                                    } `}>
                                    {numFormatter(el?.totalWithdrawal)}
                                  </td>
                                  <td
                                    className={`${
                                      el?.totalWithdrawal
                                        ?.toString()
                                        ?.startsWith("-")
                                        ? "blockActive"
                                        : "userStatusActive"
                                    } `}>
                                    {el?.totalWithdrawal >= 0
                                      ? "Profit"
                                      : "Loss"}
                                  </td>
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

export default DepositWithdraw;
