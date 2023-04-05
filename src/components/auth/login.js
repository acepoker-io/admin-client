import React, { Fragment } from "react";
import LoginTabset from "./loginTabset";
// import { ArrowLeft } from "react-feather";
// import Slider from "react-slick";
// import stats from "../../assets/images/dashboard/stats.png";
import "../../assets/scss/slick.scss";
import "../../assets/scss/slick-theme.scss";
import { Card, CardBody, Container } from "reactstrap";
import logo from "../../assets/images/Final Logo-01.jpg";

const Login = () => {
  // var settings = {
  // 	dots: true,
  // 	infinite: true,
  // 	speed: 500,
  // 	arrows: false,
  // };
  return (
    <Fragment>
      <div className='page-wrapper login-page'>
        <div className='authentication-box'>
          <Container>
            <Card className='tab2-card'>
              <img src={logo} alt='logo' />
              {/* <h3>Login</h3> */}
              <CardBody>
                <LoginTabset />
              </CardBody>
            </Card>
          </Container>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
