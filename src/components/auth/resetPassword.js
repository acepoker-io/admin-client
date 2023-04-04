import React, { Fragment, useState } from "react";
import logo from "../../assets/images/logo.png";
import { Button, Form, FormGroup, Input } from "reactstrap";
import { Card, CardBody, Container } from "reactstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { withRouter, useHistory } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

const ResetPassword = () => {
  const [shownewPassword, setShownewPassword] = useState(false);
  const [showconfirmPassword, setShowconfirmPassword] = useState(false);
  const history = useHistory();
  const [spinLoader, setSpinLoader] = useState(false);
  const routeChange = () => {
    setSpinLoader(!spinLoader);
    setTimeout(() => {
      history.push(`${process.env.PUBLIC_URL}/dashboard`);
    }, 500);
  };
  return (
    <Fragment>
      <div className="page-wrapper login-page">
        <div className="authentication-box">
          <Container>
            <Card className="tab2-card">
              <img src={logo} alt="logo" />
              <h4 className="forgotpasswdh">Reset Password</h4>
              <br />
              <CardBody>
                <Form className="form-horizontal auth-form">
                  <FormGroup className="inputPasswordBox">
                    <Input
                      required=""
                      className="form-control"
                      placeholder="New Password"
                      type={shownewPassword ? "text" : "password"}
                    />
                    <span
                      id="togglePassword"
                      onClick={() => setShownewPassword(!shownewPassword)}
                      role="presentation"
                    >
                      {shownewPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </FormGroup>
                  <FormGroup className="inputPasswordBox">
                    <Input
                      required=""
                      type={showconfirmPassword ? "text" : "password"}
                      className="form-control"
                      placeholder="Confirm Password"
                    />
                    <span
                      id="togglePassword"
                      onClick={() =>
                        setShowconfirmPassword(!showconfirmPassword)
                      }
                      role="presentation"
                    >
                      {showconfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </FormGroup>
                  <div className="form-button">
                    <Button
                      className="loginPageBtn"
                      color="primary"
                      type="button"
                      onClick={() => routeChange()}
                    >
                      {!spinLoader ? (
                        "Update Password"
                      ) : (
                        <Spinner animation="border" />
                      )}
                    </Button>
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

export default withRouter(ResetPassword);
