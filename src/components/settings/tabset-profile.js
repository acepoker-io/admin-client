import React, { useState, useContext } from "react";
import { Tabs, TabList, TabPanel, Tab } from "react-tabs";
import { User, Key } from "react-feather";
import { Button, Input, Label, Table } from "reactstrap";
import { Form, FormGroup } from "reactstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Spinner from "react-bootstrap/Spinner";
import AdminContext from "../context/adminContgext";
import { adminInstance } from "../../config/axios";
import { toast } from "react-toastify";

const TabsetProfile = () => {
  const [shownewPassword, setShownewPassword] = useState(false);
  const [showconfirmPassword, setShowconfirmPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [spinLoader, setSpinLoader] = useState(false);

  const { admin } = useContext(AdminContext);

  const resetPassword = async () => {
    setSpinLoader(true);
    try {
      if (newPassword === "") {
        toast.error("Please fill new password", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
        });
        setSpinLoader(false);
      }
      if (!isPasswordSame() && isConfirmPasswordCorrect()) {
        const res = await adminInstance().put("/reset-password", {
          email: admin.email,
          currentPassword,
          newPassword,
        });
        console.log("response", res);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        toast.success(res?.data?.msg);
        setShownewPassword(false);
        setShowconfirmPassword(false);
        setShowCurrentPassword(false);
        setSpinLoader(false);
      }
    } catch (e) {
      toast.error(e?.response?.data?.msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
      });
      setSpinLoader(false);
    }
  };

  const isConfirmPasswordCorrect = () => {
    if (confirmPassword === "") {
      toast.error("Please fill confirm password", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
      });
      setSpinLoader(false);
      return false;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Confirm password do not match", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
      });
      setSpinLoader(false);
      return false;
    }
    return true;
  };

  const isPasswordSame = () => {
    if (currentPassword === newPassword) {
      toast.error("New password cannot be same as current password", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
      });
      setSpinLoader(false);
      return true;
    }
    return false;
  };

  return (
    <div>
      <Tabs>
        <TabList className="nav nav-tabs tab-coupon">
          <Tab className="nav-link">
            <User className="mr-2" />
            Profile
          </Tab>
          <Tab className="nav-link">
            <Key className="mr-2" />
            Update Password
          </Tab>
        </TabList>

        <TabPanel>
          <div className="tab-pane fade show active">
            <h5 className="f-w-600 f-16">Profile</h5>
            <div className="table-responsive profile-table">
              <Table className="table-responsive">
                <tbody>
                  <tr>
                    <td>First Name:</td>
                    <td className="user-info-td">{admin.firstName}</td>
                  </tr>
                  <tr>
                    <td>Last Name:</td>
                    <td className="user-info-td">{admin.lastName}</td>
                  </tr>
                  <tr>
                    <td>Username:</td>
                    <td className="user-info-td">{admin.username}</td>
                  </tr>
                  <tr>
                    <td>Email:</td>
                    <td className="user-info-td">{admin.email}</td>
                  </tr>

                  <tr>
                    <td>Mobile Number:</td>
                    <td className="user-info-td">{admin.phone}</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
        </TabPanel>

        <TabPanel>
          <div className="tab-pane fade show active">
            <h5 className="f-w-600 f-16">Update Password</h5>
            <div className="passwdUpdate">
              <Form className="form-horizontal auth-form">
                <FormGroup className="inputPasswordBox">
                  <Label>Current Password</Label>
                  <Input
                    required=""
                    className="form-control"
                    placeholder="Enter Current Password"
                    type={showCurrentPassword ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => {
                      setCurrentPassword(e.target.value);
                    }}
                  />
                  <span
                    id="togglePassword"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    role="presentation"
                  >
                    {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </FormGroup>
                <FormGroup className="inputPasswordBox">
                  <Label>New Password</Label>
                  <Input
                    required=""
                    className="form-control"
                    placeholder="Enter New Password"
                    type={shownewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                    }}
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
                  <Label>Confirm Password</Label>
                  <Input
                    required=""
                    type={showconfirmPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                    }}
                  />
                  <span
                    id="togglePassword"
                    onClick={() => setShowconfirmPassword(!showconfirmPassword)}
                    role="presentation"
                  >
                    {showconfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </FormGroup>
              </Form>
              <div className="form-button">
                <Button
                  className="loginPageBtn"
                  color="primary"
                  type="button"
                  onClick={() => resetPassword()}
                >
                  {!spinLoader ? (
                    "Update Password"
                  ) : (
                    <Spinner animation="border" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </TabPanel>
        {/* <TabPanel>
          <div className="tab-pane fade">
          <div className="account-setting">
            <h5 className="f-w-600 f-16">Notifications</h5>
            <Row>
              <Col>
                <Label className="d-block">
                  <Input
                    className="checkbox_animated"
                    id="chk-ani"
                    type="checkbox"
                    defaultChecked
                  />
                  Allow Desktop Notifications
                </Label>
                <Label className="d-block">
                  <Input
                    className="checkbox_animated"
                    id="chk-ani1"
                    type="checkbox"
                  />
                  Enable Notifications
                </Label>
                <Label className="d-block">
                  <Input
                    className="checkbox_animated"
                    id="chk-ani2"
                    type="checkbox"
                  />
                  Get notification for my own activity
                </Label>
                <Label className="d-block mb-0">
                  <Input
                    className="checkbox_animated"
                    id="chk-ani3"
                    type="checkbox"
                    defaultChecked
                  />
                  DND
                </Label>
              </Col>
            </Row>
          </div>
          <div className="account-setting deactivate-account">
            <h5 className="f-w-600 f-16">Deactivate Account</h5>
            <Row>
              <Col>
                <Label className="d-block">
                  <Input
                    className="radio_animated"
                    id="edo-ani"
                    type="radio"
                    name="rdo-ani"
                    defaultChecked
                  />
                  I have a privacy concern
                </Label>
                <Label className="d-block">
                  <Input
                    className="radio_animated"
                    id="edo-ani1"
                    type="radio"
                    name="rdo-ani"
                  />
                  This is temporary
                </Label>
                <Label className="d-block mb-0">
                  <Input
                    className="radio_animated"
                    id="edo-ani2"
                    type="radio"
                    name="rdo-ani"
                    defaultChecked
                  />
                  Other
                </Label>
              </Col>
            </Row>
            <Button type="button" color="primary">
              Deactivate Account
            </Button>
          </div>
          <div className="account-setting deactivate-account">
            <h5 className="f-w-600 f-16">Delete Account</h5>
            <Row>
              <Col>
                <Label className="d-block">
                  <Input
                    className="radio_animated"
                    id="edo-ani3"
                    type="radio"
                    name="rdo-ani1"
                    defaultChecked
                  />
                  No longer usable
                </Label>
                <Label className="d-block">
                  <Input
                    className="radio_animated"
                    id="edo-ani4"
                    type="radio"
                    name="rdo-ani1"
                  />
                  Want to switch on other account
                </Label>
                <Label className="d-block mb-0">
                  <Input
                    className="radio_animated"
                    id="edo-ani5"
                    type="radio"
                    name="rdo-ani1"
                    defaultChecked
                  />
                  Other
                </Label>
              </Col>
            </Row>
            <Button type="button" color="primary">
              Delete Account
            </Button>
          </div>
          </div>
        </TabPanel> */}
      </Tabs>
    </div>
  );
};

export default TabsetProfile;
