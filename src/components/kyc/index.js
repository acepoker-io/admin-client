import React, { useState, useEffect } from "react";
import { debounce } from "lodash"
import axios from 'axios';
import {
  Card,
  Col,
  Container,
  Row,
  CardHeader,
  FormGroup,
  Input,
  CardBody,
} from "reactstrap";
import Table from 'react-bootstrap/Table';
import { toast } from "react-toastify";
import { getDate } from "./utils";
import { Button, Modal, Spinner } from "react-bootstrap";
import { Tabs, Tab } from "react-bootstrap";
import ReactPaginate from "react-paginate";
// import AdminLayout from "../layout/layout";
import Lightbox from "react-awesome-lightbox";
import viewkycdetails from "../../assets/images/table/view-kyc-details.svg";
import { getKYCRequest, updatekycRequest } from "./api.js";
import TableLoader from "./loader";
import NoData from "./noData/index";
import "react-awesome-lightbox/build/style.css";
import "./clients.css";
import Breadcrumb from "../common/breadcrumb";
import { FaSearch } from "react-icons/fa";

const KycPage = () => {
  const initialState = {
    requestedTab: "idle",
    currentPage: 1,
    searchTerm: "",
  };
  const [managedState, setmanagedState] = useState(initialState);
  const [mainLoading, setMainLoading] = useState(true);
  const [kycList, setKycList] = useState([]);
  const [show, setShow] = useState(false);
  const [data, setData] = useState({});
  const [totalPages, setTotalPages] = useState(0);
  const [forceUpdate, setforeceUpdate] = useState(false);

  const handleforeceUpdate = () => {
    setMainLoading(true);
    handlePopup();
    setforeceUpdate((prev) => !prev);
  };

  const handlePageChange = (data) => {
    setMainLoading(true);
    const selectedPage = data.selected + 1;
    setmanagedState((prev) => {
      return { ...prev, currentPage: selectedPage };
    });
  };

  const handleRequestTab = (tab) => {
    setMainLoading(true);
    setmanagedState((prev) => {
      return { ...prev, requestedTab: tab, currentPage: 1 };
    });
  };

  const handlePopup = () => {
    setShow(!show);
  };

  const handleOpen = (info, status) => {
    setShow(true);
    setData({ info, status });
  };

  const handleSearchTermChange = (event) => {
    setmanagedState((prev) => {
      return { ...prev, currentPage: 1, searchTerm: event.target.value };
    });
  };

  useEffect(() => {
    const source = axios.CancelToken.source();
    const getKycData = async () => {
      setMainLoading(true);
      const response = await getKYCRequest(managedState, source.token);
      setMainLoading(false);
      if (response.code === 200) {
        setKycList(response.kycData);
        setTotalPages(response.totalPages);
      } else {
        toast.error(response.message, { toastId: "error-kyc-feature" })
      }
    };


    const debouncedFetchData = debounce(getKycData, 600);

    debouncedFetchData();

    return () => {
      source.cancel('Request canceled');
    };
  }, [managedState, forceUpdate]);



  return (
    <>
      <div className="userlist-page">
        <Breadcrumb title="KYC Requests" parent="KYC Requests" />
        <Container fluid={true}>
          <Row>
            <Col sm="12">
              <Card className="kycContainer-card">

                <CardHeader className="transactionSelect">
                  <h4>KYC Requests</h4>
                  <FormGroup className="searchFromgroup">
                    <Input
                      type='text'
                      placeholder='Search by name'
                      value={managedState.searchTerm}
                      onChange={handleSearchTermChange}
                      className="searchFromInput"
                    />
                    <FaSearch className="searchlens" />
                  </FormGroup>
                </CardHeader>

                <CardBody className="user-datatable">

                  <div className='admin-tab-section'>
                    <Tabs
                      defaultActiveKey='idle'
                      id='uncontrolled-tab-example'
                      onSelect={(tab) => handleRequestTab(tab)}>
                      <Tab eventKey='accept' title='Approved'>
                        <div className='admin-table'>
                          <div className='row'>
                            <div className='col-md-12'>
                              <Table responsive>
                                <TableHeader />
                                <tbody>
                                  {!mainLoading ? (
                                    kycList.length > 0 ? (
                                      kycList.map((dataElement) => {
                                        return (
                                          <>
                                            <TableRow
                                              dataElement={dataElement}
                                              handleOpen={handleOpen}
                                              status={"accept"}
                                            />
                                          </>
                                        );
                                      })
                                    ) : (
                                      <NoData />
                                    )
                                  ) : (
                                    <TableLoader />
                                  )}
                                </tbody>
                              </Table>
                            </div>
                          </div>
                        </div>
                      </Tab>
                      <Tab eventKey='reject' title='Denied'>
                        <div className='admin-table'>
                          <div className='row'>
                            <div className='col-md-12'>
                              <Table responsive>
                                <TableHeader />
                                <tbody>
                                  {!mainLoading ? (
                                    kycList.length > 0 ? (
                                      kycList.map((dataElement) => {
                                        return (
                                          <>
                                            <TableRow
                                              dataElement={dataElement}
                                              handleOpen={handleOpen}
                                              status={"reject"}
                                            />
                                          </>
                                        );
                                      })
                                    ) : (
                                      <NoData />
                                    )
                                  ) : (
                                    <TableLoader />
                                  )}
                                </tbody>
                              </Table>
                            </div>
                          </div>
                        </div>
                      </Tab>
                      <Tab eventKey='idle' title='Pending'>
                        <div className='admin-table'>
                          <div className='row'>
                            <div className='col-md-12'>

                              <Table
                                hover
                                responsive
                                class={`table table-hover ${kycList.length < 0 ? "no-data-table" : ""
                                  }${mainLoading ? "loading" : ""}`}>
                                <TableHeader showHeaders={true} />
                                <tbody>
                                  {!mainLoading ? (
                                    kycList.length > 0 ? (
                                      kycList.map((dataElement) => {
                                        return (
                                          <>
                                            <TableRow
                                              dataElement={dataElement}
                                              handleOpen={handleOpen}
                                              status={"idle"}
                                            />
                                          </>
                                        );
                                      })
                                    ) : (
                                      <NoData />
                                    )
                                  ) : (
                                    <TableLoader />
                                  )}
                                </tbody>
                              </Table>
                            </div>
                          </div>
                        </div>
                      </Tab>
                    </Tabs>
                  </div>
                  <ReactPaginate
                    nextLabel={
                      <>
                        <span>Next</span>
                        <i className="las la-angle-right" />
                      </>
                    }
                    onPageChange={handlePageChange}
                    pageRangeDisplayed={1}
                    marginPagesDisplayed={2}
                    pageCount={totalPages}
                    previousLabel={
                      <>
                        <i className="las la-angle-left" />
                        <span>Prev</span>
                      </>
                    }
                    pageClassName='page-item'
                    pageLinkClassName='page-link'
                    previousClassName='page-item'
                    previousLinkClassName='page-link'
                    nextClassName='page-item'
                    nextLinkClassName='page-link'
                    breakLabel='...'
                    breakClassName='page-item'
                    breakLinkClassName='page-link'
                    containerClassName='pagination'
                    activeClassName='active'
                    forcePage={parseInt(managedState.currentPage) - 1}
                  // renderOnZeroPageCount={null}
                  />


                </ CardBody>

                {show && (
                  <KycPopup
                    data={data}
                    show={show}
                    handlePopup={handlePopup}
                    handleforeceUpdate={handleforeceUpdate}
                  />
                )}

              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>

  );
};

const TableHeader = () => {
  return (
    <>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Gender</th>
          <th>Date of Birth</th>
          <th>Details</th>
        </tr>
      </thead>
    </>
  );
};

const TableRow = ({ dataElement, handleOpen, status }) => {


  return (
    <>
      <tr>
        <td>{dataElement?.firstName} </td>

        <td>
          {dataElement?.lastName}
        </td>
        <td>{dataElement?.gender}</td>
        <td>
          {getDate(dataElement?.birthDate)}
        </td>
        <td onClick={() => handleOpen(dataElement, status)} style={{ cursor: "pointer" }}>
          <img src={viewkycdetails} className="viewkycdetails eye" alt='arrow' />
        </td>
      </tr>
    </>
  );
};
export default KycPage




const KycPopup = ({
  data,
  show,
  handlePopup,
  handleforeceUpdate
}) => {
  const { info, status } = data
  const [loading, setLoading] = useState(null);
  const [preview, setPreview] = useState(false);
  const [preview2, setPreview2] = useState(false);



  const updateReq = async (payload) => {
    console.log("this is the payload", payload);
    setLoading(payload.status);
    const response = await updatekycRequest(payload);
    setLoading(null);
    if (response.code === 200) {
      toast.success(response.message, { toastId: "kyc-success-status" })
      handleforeceUpdate();
    } else {
      toast.error(response.message, { toastId: "kyc-error-status" });
      handlePopup();
    }
  }
  const showmodalFront = () => {
    setPreview(true)
  }
  const showmodalBack = () => {
    setPreview2(true)
  }

  return (
    <Modal
      size='lg'
      className='game-request-popup kyc-request-popup'
      show={show}
      onHide={() => handlePopup()}
      centered
    >
      <Modal.Header closeButton><h3>KYC Request</h3></Modal.Header>
      <Modal.Body>
        <div className='transaction-body'>
          <div className='transaction-body-content'>
            <div className='cashtag-heading'>
              <div className='transaction-heading'>

              </div>
            </div>
            <div className='cashtag-kyc'>
              <div className='cashtag-kyc-grid'>
                <div className='cashtag-link'>
                  <h6>
                    First Name: <span>{info?.firstName || ""}</span>
                  </h6>
                </div>
                <div className='cashtag-link'>
                  <h6>
                    Last Name: <span>{info.lastName || ""}</span>
                  </h6>
                </div>
              </div>
              <div className='cashtag-kyc-grid'>
                <div className='cashtag-link'>
                  <h6>
                    Gender : <span>{info?.gender || ""}</span>
                  </h6>
                </div>
                <div className='cashtag-link'>
                  <h6>
                    Date of Birth:{" "}
                    <span>{getDate(info?.birthDate)}</span>
                  </h6>
                </div>
              </div>
              <div className='cashtag-kyc-grid'>
                <div className='cashtag-link'>
                  <h6>
                    City: <span>{info?.city || ""}</span>
                  </h6>
                </div>

                <div className='cashtag-link'>
                  <h6>
                    State: <span>{info?.state || ""}</span>
                  </h6>
                </div>
              </div>
              <div className='cashtag-kyc-grid'>
                <div className='cashtag-link'>
                  <h6>
                    Country: <span>{info?.country || ""}</span>
                  </h6>
                </div>
              </div>

              <div className='cashtag-kyc-id'>
                <div className='qr-wrapper'>
                  <p>FRONT ID</p>
                  <div className='qr-wrapper-id'>
                    <div className='corner-button'>
                      <div className='corner-bottom-button'>
                        <div className='qr-box' onClick={showmodalFront}>
                          <img
                            src={info?.IDimageFront}
                            alt="Selfie with Id"
                          />
                        </div>
                        {preview &&
                          <Lightbox image={info?.IDimageFront} onClose={() => setPreview(false)} />
                        }
                      </div>
                    </div>
                  </div>
                </div>
                <div className='qr-wrapper'>
                  <p>Selfie with  Front Id</p>
                  <div className='qr-wrapper-id'>
                    <div className='corner-button'>
                      <div className='corner-bottom-button'>
                        <div className='qr-box' onClick={showmodalBack}>
                          <img
                            src={info?.IDimageBack}
                            alt="Selfie with Id"
                          />
                        </div>
                        {preview2 &&
                          <Lightbox image={info?.IDimageBack} onClose={() => setPreview2(false)} />
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {status === "idle" && (<div className='kyc-btn-grid'>
                <div className='popup-btn-grid desktop-btn-view'>
                  <Button
                    className='popup-cancel-btn'
                    onClick={() => {
                      if (!loading) {
                        updateReq(
                          { id: info._id, status: "reject" },
                        );
                      }
                    }}
                  >
                    {loading === "reject" ? (
                      <Spinner animation='border' className="accept-btn-show-btn" />
                    ) : (
                      "Reject Request"
                    )}
                  </Button>
                  <Button
                    className='popup-confirm-btn'
                    onClick={() => {
                      if (!loading) {
                        updateReq(
                          { id: info?._id, status: "accept" },
                        );
                      }
                    }}
                  >
                    {loading === "accept" ? (
                      <Spinner animation='border' className="accept-btn-show-btn" />
                    ) : (
                      "Accept Request"
                    )}
                  </Button>
                </div>
              </div>)}
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>


  );
};
