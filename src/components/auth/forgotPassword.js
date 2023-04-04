import React, { Fragment, useState } from "react";
import logo from "../../assets/images/logo.png";
import { Button, Form, FormGroup, Input } from "reactstrap";
import { Card, CardBody, Container } from "reactstrap";
// import { Link } from "react-router-dom";
import { withRouter, useHistory } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

const ForgotPassword = () => {
  const history = useHistory();
  const [spinLoader, setSpinLoader] = useState(false);
  const routeChange = () => {
    setSpinLoader(!spinLoader);
    setTimeout(() => {
      history.push(`${process.env.PUBLIC_URL}/resetpassword`);
    }, 500);
  };
  return (
    <Fragment>
      <div className="page-wrapper login-page">
        <div className="authentication-box">
          <Container>
            <Card className="tab2-card">
              <img src={logo} alt="logo" />
              <h4 className="forgotpasswdh">Forgot Password</h4>
              <br />
              <CardBody>
                <Form className="form-horizontal auth-form">
                  <FormGroup>
                    <Input
                      required=""
                      type="number"
                      className="form-control"
                      placeholder="enter phone number"
                      id="exampleInputEmail1"
                    />
                  </FormGroup>
                  <div className="form-button">
                    {/* <Link to="/resetpassword" className="resetPasswordLink"> */}
                    <Button
                      className="loginPageBtn"
                      color="primary"
                      type="button"
                      onClick={() => routeChange()}
                    >
                      {!spinLoader ? (
                      "Send OTP"
                      ) : (
                        <Spinner animation="border" />
                      )}
                    </Button>
                    {/* </Link> */}
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Container>
        </div>
      </div>
    </Fragment>
  );
};

export default withRouter(ForgotPassword);
