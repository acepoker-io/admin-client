import React, { Fragment, useState, useContext } from "react";
import { Form, Spinner } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import designer from "../../assets/images/game/dummy.png";
import TabsetProfile from "./tabset-profile";
import Breadcrumb from "../common/breadcrumb";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import { toast } from "react-toastify";
import { adminInstance } from "../../config/axios";
import AdminContext from "../context/adminContgext";
import axios from "axios";

const Profile = () => {
  const { admin, fetchAdmin, setAdmin } = useContext(AdminContext);

  const [loading, setLoading] = useState(false);
  console.log("admin ==>", admin);
  const handleFile = async (e) => {
    try {
      const {
        target: { files, name },
      } = e;

      if (!files[0]?.name?.match(/\.(jpg|jpeg|png|JPG|JPEG|PNG|)$/)) {
        return toast.error("Choose Only Image File");
      }
      if (files[0].size > 2e6) {
        toast.error("Please upload a file smaller than 2 MB");
        return false;
      }
      const formData = new FormData();
      formData.append("file", files[0]);
      formData.append("type", name);
      setLoading(true);
      const res = await adminInstance().post("/uploadProfile", formData);
      console.log("res", res);
      setLoading(false);
      const {
        data: { userDetail },
        status,
      } = res;

      console.log("user detail :==>", userDetail);
      setAdmin({
        ...admin,
        profile: userDetail.profile,
      });
      if (status === 200 && userDetail) {
        fetchAdmin();
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        toast.error(err.response.data.msg, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
        });
      }
    }
  };
  return (
    <Fragment>
      <Breadcrumb title="Profile" parent="Settings" />
      <Container fluid={true}>
        <div className="profile-grid">
          <Row>
            <Col xl="4">
              <Card>
                <CardBody>
                  <div className="profile-details text-center">
                    <div className="settingUserImg">
                      <img
                        src={admin?.profile ? admin?.profile : designer}
                        alt=""
                        className="img-fluid img-90 rounded-circle blur-up lazyloaded"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = designer;
                        }}
                      />
                      {loading ? (
                        <Spinner
                          as="span"
                          variant="light"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                          animation="border"
                          className="editImg"
                        />
                      ) : (
                        <Form.Group controlId="formFile" className="editImg">
                          <Form.Label>
                            <FaEdit />
                          </Form.Label>
                          <Form.Control
                            type="file"
                            name="profile"
                            onChange={handleFile}
                            accept="image/*"
                          />
                        </Form.Group>
                      )}
                    </div>
                    <h5 className="f-w-600 f-16 mb-0">{admin.username}</h5>
                    <span>{admin.email}</span>
                  </div>

                  {/* <div className='project-status'>
                  <h5 className='f-w-600 f-16'>Employee Status</h5>
                  <Media>
                    <Media body>
                      <h6>
                        Performance <span className='pull-right'>80%</span>
                      </h6>
                      <div className='progress sm-progress-bar'>
                        <div
                          className='progress-bar bg-primary'
                          role='progressbar'
                          style={{ width: "90%" }}
                          aria-valuenow='25'
                          aria-valuemin='0'
                          aria-valuemax='100'></div>
                      </div>
                    </Media>
                  </Media>
                  <Media>
                    <Media body>
                      <h6>
                        Overtime <span className='pull-right'>60%</span>
                      </h6>
                      <div className='progress sm-progress-bar'>
                        <div
                          className='progress-bar bg-secondary'
                          role='progressbar'
                          style={{ width: "60%" }}
                          aria-valuenow='25'
                          aria-valuemin='0'
                          aria-valuemax='100'></div>
                      </div>
                    </Media>
                  </Media>
                  <Media>
                    <Media body>
                      <h6>
                        Leaves taken <span className='pull-right'>50%</span>
                      </h6>
                      <div className='progress sm-progress-bar'>
                        <div
                          className='progress-bar bg-danger'
                          role='progressbar'
                          style={{ width: "50%" }}
                          aria-valuenow='25'
                          aria-valuemin='0'
                          aria-valuemax='100'></div>
                      </div>
                    </Media>
                  </Media>
                </div> */}
                </CardBody>
              </Card>
            </Col>
            <Col xl="8">
              <Card className="profile-card">
                <CardBody>
                  <TabsetProfile />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </Container>
    </Fragment>
  );
};

export default Profile;
