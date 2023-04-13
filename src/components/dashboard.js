import React, { Fragment } from "react";
import Breadcrumb from "./common/breadcrumb";
import {
  // Navigation,
  //  Box,
  MessageSquare,
  Users,
  // Briefcase,
  // CreditCard,
  // ShoppingCart,
  // Calendar,
} from "react-feather";
// import CountUp from "react-countup";
// import { Chart } from "react-google-charts";

import { Bar } from "react-chartjs-2";
import {
  lineOptions,
  // buyOption,
  // employeeData,
  // employeeOptions,
} from "../constants/chartData";
// import user2 from "../assets/images/dashboard/user2.jpg";
// import user1 from "../assets/images/dashboard/user1.jpg";
// import man from "../assets/images/dashboard/man.png";
// import user from "../assets/images/dashboard/user.png";
// import designer from "../assets/images/dashboard/designer.jpg";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Media,
  Row,
  Table,
} from "reactstrap";
import { adminAuthInstance } from "../config/axios";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import user from "../assets/images/user.png";
import Loader from "../components/pageLoader/loader";
import numFormatter from "../utils/utils";

const Dashboard = () => {
  let num = 1;
  const lineData = {
    labels: ["100", "200", "300", "400", "500", "600", "700", "800"],
    datasets: [
      {
        lagend: "none",
        data: [2.5, 3, 3, 0.9, 1.3, 1.8, 3.8, 1.5],
        borderColor: "#dc3545",
        backgroundColor: "#dc3545",
        borderWidth: 2,
      },
      {
        lagend: "none",
        data: [3.8, 1.8, 4.3, 2.3, 3.6, 2.8, 2.8, 2.8],
        borderColor: "#a5a5a5",
        backgroundColor: "#a5a5a5",
        borderWidth: 2,
      },
    ],
  };
  const [allUsers, setAllUsers] = useState([]);
  const [allCount, setAllCount] = useState({});
  const [loader, setLoader] = useState(true);
  const getAllUser = async () => {
    try {
      const res = await adminAuthInstance().get("/getLettestUser", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setAllUsers(res?.data?.users);
      setLoader(false);
    } catch (e) {
      if (axios.isAxiosError(e) && e?.response) {
        if (e?.response?.status !== 200) {
          toast.error(e?.response?.data?.message, { toastId: "login" });
        }
      }
    }
  };
  const allDashboardCount = async () => {
    try {
      const res = await adminAuthInstance().get("/dashboardCount", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });

      setAllCount(res?.data);
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
    allDashboardCount();
  }, []);
  // const buyData = {
  //   labels: ["", "10", "20", "30", "40", "50"],
  //   datasets: [
  //     {
  //       backgroundColor: "transparent",
  //       borderColor: "#13c9ca",
  //       data: [20, 5, 80, 10, 100, 15],
  //     },
  //     {
  //       backgroundColor: "transparent",
  //       borderColor: "#a5a5a5",
  //       data: [0, 50, 20, 70, 30, 27],
  //     },
  //     {
  //       backgroundColor: "transparent",
  //       borderColor: "#dc3545",
  //       data: [0, 30, 40, 10, 86, 40],
  //     },
  //   ],
  // };

  // const doughnutOptions = {
  //   title: "",
  //   pieHole: 0.35,
  //   pieSliceBorderColor: "none",
  //   colors: ["#dc3545", "#13c9ca", "#a5a5a5"],
  //   legend: {
  //     position: "none",
  //   },
  //   pieSliceText: "none",
  //   tooltip: {
  //     trigger: "none",
  //   },
  //   animation: {
  //     startup: true,
  //     easing: "linear",
  //     duration: 1500,
  //   },
  //   chartArea: { left: 0, top: 10, width: "360px", height: "100%" },
  //   enableInteractivity: false,
  // };
  // const pieOptions = {
  //   title: "",
  //   pieHole: 1,
  //   slices: [
  //     {
  //       color: "#dc3545",
  //     },
  //     {
  //       color: "#13c9ca",
  //     },
  //     {
  //       color: "#f0b54d",
  //     },
  //   ],
  //   tooltip: {
  //     showColorCode: false,
  //   },
  //   chartArea: { left: 0, top: 10, width: "360px", height: "100%" },
  //   legend: "none",
  // };
  // const LineOptions = {
  //   hAxis: {
  //     textPosition: "none",
  //     baselineColor: "transparent",
  //     gridlineColor: "transparent",
  //   },
  //   vAxis: {
  //     textPosition: "none",
  //     baselineColor: "transparent",
  //     gridlineColor: "transparent",
  //   },
  //   colors: ["#dc3545"],
  //   legend: "none",
  // };
  // const LineOptions1 = {
  //   hAxis: {
  //     textPosition: "none",
  //     baselineColor: "transparent",
  //     gridlineColor: "transparent",
  //   },
  //   vAxis: {
  //     textPosition: "none",
  //     baselineColor: "transparent",
  //     gridlineColor: "transparent",
  //   },
  //   colors: ["#13c9ca"],
  //   chartArea: { left: 0, top: 0, width: "100%", height: "100%" },
  //   legend: "none",
  // };
  // const LineOptions2 = {
  //   hAxis: {
  //     textPosition: "none",
  //     baselineColor: "transparent",
  //     gridlineColor: "transparent",
  //   },
  //   vAxis: {
  //     textPosition: "none",
  //     baselineColor: "transparent",
  //     gridlineColor: "transparent",
  //   },
  //   colors: ["#f5ce8a"],
  //   chartArea: { left: 0, top: 0, width: "100%", height: "100%" },
  //   legend: "none",
  // };
  // const LineOptions3 = {
  //   hAxis: {
  //     textPosition: "none",
  //     baselineColor: "transparent",
  //     gridlineColor: "transparent",
  //   },
  //   vAxis: {
  //     textPosition: "none",
  //     baselineColor: "transparent",
  //     gridlineColor: "transparent",
  //   },
  //   colors: ["#a5a5a5"],
  //   chartArea: { left: 0, top: 0, width: "100%", height: "100%" },
  //   legend: "none",
  // };
  return (
    <Fragment>
      {loader && <Loader />}
      <Breadcrumb title='Dashboard' parent='Dashboard' />
      <Container fluid={true}>
        <Row>
          <Col xl='6 xl-50' md='6'>
            <Card className=' o-hidden widget-cards'>
              <CardBody className='bg-danger '>
                <Media className='static-top-widget row'>
                  <div className='icons-widgets col-3'>
                    <div className='align-self-center text-center'>
                      <Users className='font-danger' />
                    </div>
                  </div>
                  <Media body className='col-9'>
                    <span className='m-0'>Total Users</span>
                    <h3 className='mb-0'>
                      {allCount?.userCount || 0}
                      {/* <small> This Month</small> */}
                    </h3>
                  </Media>
                </Media>
              </CardBody>
            </Card>
          </Col>
          <Col xl='6 xl-50' md='6'>
            <Card className='o-hidden widget-cards'>
              <CardBody className='bg-primary'>
                <Media className='static-top-widget row'>
                  <div className='icons-widgets col-3'>
                    <div className='align-self-center text-center'>
                      <MessageSquare className='font-primary' />
                    </div>
                  </div>
                  <Media body className='col-9'>
                    <span className='m-0'>Number of Transaction</span>
                    <h3 className='mb-0'>
                      {allCount?.transactionCount || 0}
                      {/* <small> This Month</small> */}
                    </h3>
                  </Media>
                </Media>
              </CardBody>
            </Card>
          </Col>
        </Row>{" "}
        <Row>
          {/* <Col xl="3 xl-50" md="6">
            <Card className=" o-hidden  widget-cards">
              <CardBody className="bg-secondary ">
                <Media className="static-top-widget row">
                  <div className="icons-widgets col-4">
                    <div className="align-self-center text-center">
                      <Box className="font-secondary" />
                    </div>
                  </div>
                  <Media body className="col-8">
                    <span className="m-0">Games</span>
                    <h3 className="mb-0">
                      $5500
                      <small> This Month</small>
                    </h3>
                  </Media>
                </Media>
              </CardBody>
            </Card>
          </Col> */}
          <Col xl='6 xl-100'>
            <Card>
              <CardHeader>
                <h5>Market Value</h5>
              </CardHeader>
              <CardBody className='marketValueCard'>
                <div className='market-chart'>
                  <Bar
                    data={lineData}
                    options={lineOptions}
                    width={778}
                    height={308}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xl='6 xl-100'>
            <Card className='dashboardViewAllCard'>
              <CardHeader className='dashboardViewAll'>
                <h5>Latest Users</h5>
                <Link to='/User/user-list' className='btn btn-primary'>
                  View All Users
                </Link>
              </CardHeader>
              <CardBody>
                <div className='user-status table-responsive latest-order-table'>
                  <Table borderless>
                    <thead>
                      <tr>
                        <th scope='col'>SR No</th>
                        {/* <th scope="col">Avatar</th> */}
                        <th scope='col'>Username</th>
                        {/* <th scope="col">Email</th>
                        <th scope="col">Phone</th> */}
                        <th scope='col'>Tokens</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allUsers &&
                        allUsers?.length > 0 &&
                        allUsers.map((el, i) => (
                          <tr>
                            <td>{num + i}</td>
                            {/* <td className='latest-user-image'>
                              <img
                                src={el?.profile || user}
                                alt='user profile'
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = user;
                                }}
                              />
                            </td> */}
                            <td className='font-danger'>{el?.username}</td>
                            {/* <td className='digits'>{el?.email}</td>
                            <td className='font-danger'>{el?.phone}</td> */}
                            <td className='digits'>
                              {numFormatter(el?.wallet)}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                </div>
              </CardBody>
            </Card>
          </Col>
          {/* <Col xl="3 xl-50" md="6">
            <Card className=" order-graph sales-carousel">
              <CardHeader>
                <h6>Total Users</h6>
                <Row>
                  <Col className="col-6">
                    <div className="small-chartjs">
                      <div
                        className="flot-chart-placeholder"
                        id="simple-line-chart-sparkline-3"
                      >
                        <Chart
                          height={"60px"}
                          chartType="LineChart"
                          loader={<div>Loading Chart</div>}
                          data={[
                            ["x", "time"],
                            [0, 20],
                            [1, 5],
                            [2, 120],
                            [3, 10],
                            [4, 140],
                            [5, 15],
                          ]}
                          options={LineOptions}
                          legend_toggle
                        />
                      </div>
                    </div>
                  </Col>
                  <Col className="col-6">
                    <div className="value-graph">
                      <h3>
                        42%
                        <span>
                          <i className="fa fa-angle-up font-primary"></i>
                        </span>
                      </h3>
                    </div>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Media>
                  <Media body>
                    <span>Users Last Month</span>
                    <h2 className="mb-0">9054</h2>
                    <p>
                      0.25%
                      <span>
                        <i className="fa fa-angle-up"></i>
                      </span>
                    </p>
                    <h5 className="f-w-600 f-16">Gross sales of August</h5>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting
                    </p>
                  </Media>
                  <div className="bg-primary b-r-8">
                    <div className="small-box">
                      <Briefcase />
                    </div>
                  </div>
                </Media>
              </CardBody>
            </Card>
          </Col>
          <Col xl="3 xl-50" md="6">
            <Card className=" order-graph sales-carousel">
              <CardHeader>
                <h6>Total User Bets</h6>
                <Row>
                  <Col className="col-6">
                    <div className="small-chartjs">
                      <div
                        className="flot-chart-placeholder"
                        id="simple-line-chart-sparkline"
                      >
                        <Chart
                          height={"60px"}
                          chartType="LineChart"
                          loader={<div>Loading Chart</div>}
                          data={[
                            ["x", "time"],
                            [0, 85],
                            [1, 83],
                            [2, 90],
                            [3, 70],
                            [4, 85],
                            [5, 60],
                            [6, 65],
                            [7, 63],
                            [8, 68],
                            [9, 68],
                            [10, 65],
                            [11, 40],
                            [12, 60],
                            [13, 75],
                            [14, 70],
                            [15, 90],
                          ]}
                          options={LineOptions1}
                          legend_toggle
                        />
                      </div>
                    </div>
                  </Col>
                  <Col className="col-6">
                    <div className="value-graph">
                      <h3>
                        20%
                        <span>
                          <i className="fa fa-angle-up font-secondary"></i>
                        </span>
                      </h3>
                    </div>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Media>
                  <Media body>
                    <span>Monthly Purchase</span>
                    <h2 className="mb-0">2154</h2>
                    <p>
                      0.13%
                      <span>
                        <i className="fa fa-angle-up"></i>
                      </span>
                    </p>
                    <h5 className="f-w-600 f-16">Avg Gross purchase</h5>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting
                    </p>
                  </Media>
                  <div className="bg-secondary b-r-8">
                    <div className="small-box">
                      <CreditCard />
                    </div>
                  </div>
                </Media>
              </CardBody>
            </Card>
          </Col>
          <Col xl="3 xl-50" md="6">
            <Card className="order-graph sales-carousel">
              <CardHeader>
                <h6>Total cash transaction</h6>
                <Row>
                  <Col className="col-6">
                    <div className="small-chartjs">
                      <div
                        className="flot-chart-placeholder"
                        id="simple-line-chart-sparkline-2"
                      >
                        <Chart
                          height={"60px"}
                          chartType="LineChart"
                          loader={<div>Loading Chart</div>}
                          data={[
                            ["x", "time"],
                            [0, 85],
                            [1, 83],
                            [2, 90],
                            [3, 70],
                            [4, 85],
                            [5, 60],
                            [6, 65],
                            [7, 63],
                            [8, 68],
                            [9, 68],
                            [10, 65],
                            [11, 40],
                            [12, 60],
                            [13, 75],
                            [14, 70],
                            [15, 90],
                          ]}
                          options={LineOptions2}
                          legend_toggle
                        />
                      </div>
                    </div>
                  </Col>
                  <Col className="col-6">
                    <div className="value-graph">
                      <h3>
                        28%
                        <span>
                          <i className="fa fa-angle-up font-warning"></i>
                        </span>
                      </h3>
                    </div>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Media>
                  <Media body>
                    <span>Cash on hand</span>
                    <h2 className="mb-0">4672</h2>
                    <p>
                      0.8%
                      <span>
                        <i className="fa fa-angle-up"></i>
                      </span>
                    </p>
                    <h5 className="f-w-600 f-16">Details about cash</h5>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting
                    </p>
                  </Media>
                  <div className="bg-warning b-r-8">
                    <div className="small-box">
                      <ShoppingCart />
                    </div>
                  </div>
                </Media>
              </CardBody>
            </Card>
          </Col>
          <Col xl="3 xl-50" md="6">
            <Card className="order-graph sales-carousel">
              <CardHeader>
                <h6>Daily Deposits</h6>
                <Row>
                  <Col className="col-6">
                    <div className="small-chartjs">
                      <div
                        className="flot-chart-placeholder"
                        id="simple-line-chart-sparkline-1"
                      >
                        <Chart
                          height={"60px"}
                          chartType="LineChart"
                          loader={<div>Loading Chart</div>}
                          data={[
                            ["x", "time"],
                            [0, 85],
                            [1, 83],
                            [2, 90],
                            [3, 70],
                            [4, 85],
                            [5, 60],
                            [6, 65],
                            [7, 63],
                            [8, 68],
                            [9, 68],
                            [10, 65],
                            [11, 40],
                            [12, 60],
                            [13, 75],
                            [14, 70],
                            [15, 90],
                          ]}
                          options={LineOptions3}
                          legend_toggle
                        />
                      </div>
                    </div>
                  </Col>
                  <Col className="col-6">
                    <div className="value-graph">
                      <h3>
                        75%
                        <span>
                          <i className="fa fa-angle-up font-danger"></i>
                        </span>
                      </h3>
                    </div>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Media>
                  <Media body>
                    <span>Security Deposits</span>
                    <h2 className="mb-0">5782</h2>
                    <p>
                      0.25%
                      <span>
                        <i className="fa fa-angle-up"></i>
                      </span>
                    </p>
                    <h5 className="f-w-600 f-16">Gross sales of June</h5>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting
                    </p>
                  </Media>
                  <div className="bg-danger b-r-8">
                    <div className="small-box">
                      <Calendar />
                    </div>
                  </div>
                </Media>
              </CardBody>
            </Card>
          </Col> */}
        </Row>
      </Container>
    </Fragment>
  );
};

// javascript:void(0)

export default Dashboard;
