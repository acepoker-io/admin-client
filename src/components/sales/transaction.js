/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Breadcrumb from "../common/breadcrumb";
import { FaSearch, FaCaretUp, FaCaretDown, FaSort } from "react-icons/fa";
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
  Spinner,
} from "reactstrap";
// import { Form } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { adminAuthInstance } from "../../config/axios";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../pageLoader/loader";
import NoData from "../kyc/noData";
import TableLoader from "../kyc/loader";
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
  const [searchKey, setSearchKey] = useState("");
  const [selectedPage, setSelectedPage] = useState(0);
  const [sort, setSort] = useState(-1);
  const [sortBy, setSortBy] = useState("");
  const [mainLoading, setMainLoading] = useState(true);
  const [tableLoader, setTableLoader] = useState(true);
  // const pageLimit = 10;
  useEffect(() => {
    setPageCount(Math.ceil(transactionCount / pageLimit));
  }, [transactionCount, pageLimit]);
  const handlePageClick = ({ selected }) => {
    setSkip(selected * pageLimit);
    setCurrentPage(selected + 1);
    setSelectedPage(selected);
  };
  const getAllTransaction = async () => {
    setMainLoading(true);
    setTableLoader(true);
    try {
      const res = await adminAuthInstance().get("/allTransaction", {
        params: {
          skip: skip,
          limit: pageLimit,
          filter,
          searchKey,
          sort: {
            sortBy,
            sort,
          },
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      setMainLoading(false);
      setTableLoader(false);
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
    const source = axios.CancelToken.source();
    let timeOut = setTimeout(async () => {
      getAllTransaction();
    }, 1000);

    return () => {
      clearInterval(timeOut);
      source.cancel("Request canceled");
    };
  }, [skip, filter, pageLimit, searchKey, sortBy, sort]);

  const handlePagination = async (value) => {
    setPageLimit(value);
    setSelectedPage(0);
    setCurrentPage(1);
    setSkip(0);
    setSortBy("");
    setSort(-1);
  };

  const handleSearch = (e) => {
    setSearchKey(e.target.value);
    setSkip(0);
    setSelectedPage(0);
    setCurrentPage(1);
    setSortBy("");
    setSort(-1);
  };

  const handleFilter = (e) => {
    setSkip(0);
    setSelectedPage(0);
    setCurrentPage(1);
    setFilter(e.target.value);
  };

  const handleSortBy = (key) => {
    setSortBy(key);
    setSort(sort * -1);
  };

  return (
    <>
      {loader && <Loader />}
      <div className='userlist-page'>
        <Breadcrumb title='Transaction' parent='Transaction' />
        <Container fluid={true}>
          <Row>
            <Col sm='12'>
              <Card>
                <CardHeader className='transactionSelect'>
                  <div className='selectContainer'>
                    <select
                      aria-label='Default select example'
                      className='form-control'
                      onChange={handleFilter}>
                      <option value=''>All Transaction</option>
                      <option value='poker'>Poker</option>
                      <option value='deposit'>Deposit</option>
                      <option value='withdraw'>Withdraw</option>
                      <option value='Withdraw Request Rejected By Admin'>
                        Rejected
                      </option>

                      {/* <option value='Withdraw Request Rejected By Admin'>
                        Approve
                      </option> */}
                    </select>
                  </div>
                  <FormGroup className='searchFromgroup'>
                    <Input
                      type='text'
                      name='search'
                      id='exampleEmail'
                      placeholder='Search here...'
                      className='searchFromInput'
                      onChange={handleSearch}
                    />
                    <FaSearch className='searchlens' />
                  </FormGroup>
                </CardHeader>
                <CardBody className='user-datatable'>
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>#</th>
                        {/* <th>Avatar</th> */}
                        <th>Username</th>
                        <th>Tokens</th>
                        <th>Source Type</th>
                        <th
                          onClick={() => {
                            handleSortBy("createdAt");
                          }}>
                          Date
                          <FaSort />
                        </th>
                        {/* <th>Phone</th>
                      <th>Payment Status</th> */}
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
                          allTransaction.length > 0 ? (
                            allTransaction?.map((el, i) => (
                              <tr>
                                <th scope='row'>
                                  {(currentPage - 1) * skip + (i + 1)}
                                </th>
                                {/* <td className="latest-user-image">
                                <img
                                  src={el?.userId?.profile || user}
                                  alt="user profile"
                                />
                              </td> */}
                                <td>{el?.userId?.username}</td>
                                <td
                                  className={`${
                                    el?.amount?.toString()?.startsWith("-")
                                      ? "blockActive"
                                      : "userStatusActive"
                                  } `}>
                                  <div className='user-amountTransaction'>
                                    {el?.amount?.toString()?.startsWith("-") ? (
                                      <>
                                        {el?.amount * -1}
                                        <FaCaretDown />
                                      </>
                                    ) : (
                                      <>
                                        {el?.amount}
                                        <FaCaretUp />
                                      </>
                                    )}
                                  </div>
                                </td>
                                <td className='transactionTypeTd'>
                                  {el?.transactionType}
                                </td>
                                <td>
                                  {new Date(el?.createdAt)?.toLocaleDateString(
                                    "en-US",
                                    options
                                  )}
                                </td>
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
                  </Table>
                  {transactionCount && transactionCount >= 10 && (
                    <div className='adminPagination'>
                      <div className='transactionSelect '>
                        <div className='selectContainer'>
                          <select
                            className='form-control'
                            aria-label='Default select example'
                            onChange={(e) => handlePagination(e.target.value)}
                            defaultValue={pageLimit}>
                            <option>Select Page</option>
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
                        forcePage={selectedPage}
                        pageRangeDisplayed={5}
                        pageCount={pageCount}
                        previousLabel='< previous'
                        renderOnZeroPageCount={null}
                      />
                    </div>
                  )}
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
