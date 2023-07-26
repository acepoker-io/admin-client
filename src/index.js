/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-clock/dist/Clock.css";
import "react-calendar/dist/Calendar.css";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-datepicker/dist/react-datepicker.css";
import "./index.scss";
import App from "./components/app";
// import PerfectScrollbar from "react-perfect-scrollbar";
import "react-phone-input-2/lib/style.css";
// Components
import Dashboard from "./components/dashboard";
import Login from "./components/auth/login";
import "./components/admin.css";
import "./components/custom.css";
import UserList from "./components/users/userList";
import Transaction from "./components/sales/transaction";
// import KycPage from "./components/kyc/index.js";
import Poker from "./components/sales/pokerGame.js";
// import BlackJackGame from "./components/sales/blackJackGame";
// import SlotsGame from "./components/sales/slotsGame";
// import RouletteGame from "./components/sales/rouletteGame";
import Profile from "./components/settings/profile";
import ForgotPassword from "./components/auth/forgotPassword";
import ResetPassword from "./components/auth/resetPassword";
import AdminContext from "./components/context/adminContgext";
import { adminInstance } from "./config/axios";
import { PrivateRoute } from "./components/privateRoute/privateRoute";
import DepositWithdraw from "./components/reports/DepositWithdraw";
import UserReports from "./components/reports/userReports";
// import Loader from "./components/pageLoader/loader";

const Root = () => {
  // const [loaderPage, setLoaderPage] = useState(true);
  const displayWidth = window.innerWidth;
  const history = useHistory();
  const [admin, setAdmin] = useState({});
  const [sidebar, setSidebar] = useState(displayWidth < 992 ? true : false);

  const getProfile = async () => {
    try {
      const res = await adminInstance().get("/check-admin");
      const { data } = res;
      if (data.user) {
        setAdmin(data.user);
      }
      // setLoaderPage(false);
    } catch (error) {
      // setLoaderPage(false);
      localStorage.removeItem("adminToken");
      toast.error(error.response.data, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
      });
      history.push("/login");
    }
  };

  useEffect(() => {
    if (
      Object.keys(admin)?.length === 0 &&
      localStorage.getItem("adminToken")
    ) {
      getProfile();
    } else {
      // setLoaderPage(false)
    }
  }, [localStorage.getItem("adminToken")]);

  // if (loaderPage) {
  //   return <Loader />;
  // }
  return (
    <BrowserRouter basename={"/"}>
      {/* <PerfectScrollbar> */}
      <AdminContext.Provider
        value={{
          admin,
          setAdmin,
          sidebar,
          setSidebar,
        }}>
        <Switch>
          <Route exact path={`${process.env.PUBLIC_URL}/`} component={Login} />
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/auth/login`}
            component={Login}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/forgotpassword`}
            component={ForgotPassword}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/resetpassword`}
            component={ResetPassword}
          />
          <App>
            {/* <Route
              path={`${process.env.PUBLIC_URL}/dashboard`}
              component={Dashboard}
            /> */}
            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/dashboard`}
              component={Dashboard}
            />
            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/User/user-list`}
              component={UserList}
            />
            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/transaction`}
              component={Transaction}
            />
            {/* <PrivateRoute
              path={`${process.env.PUBLIC_URL}/kyc`}
              component={KycPage}
            /> */}
            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/games/poker`}
              component={Poker}
            />

            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/reports-deposit-withdraw`}
              component={DepositWithdraw}
            />
            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/user-reports`}
              component={UserReports}
            />
            {/* <PrivateRoute
              path={`${process.env.PUBLIC_URL}/games/blackjack`}
              component={BlackJackGame}
            /> */}
            {/* <PrivateRoute
              path={`${process.env.PUBLIC_URL}/games/slots`}
              component={SlotsGame}
            /> */}
            {/* <PrivateRoute
              path={`${process.env.PUBLIC_URL}/games/roulette`}
              component={RouletteGame}
            /> */}
            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/settings/profile`}
              component={Profile}
            />
          </App>
        </Switch>
        <ToastContainer />
      </AdminContext.Provider>
      {/* </PerfectScrollbar> */}
    </BrowserRouter>
  );
};

ReactDOM.render(<Root />, document.getElementById("root"));
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
