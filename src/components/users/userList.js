/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
// import Breadcrumb from "../common/breadcrumb";
import { FaSearch } from "react-icons/fa";
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
  Button,
} from "reactstrap";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
// import Button from 'react-bootstrap/Button'
import Spinner from "react-bootstrap/Spinner";
import ReactPaginate from "react-paginate";
import ActionDropdown from "./actionDropdown";
import { adminAuthInstance, adminInstance } from "../../config/axios";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
// import user from "../../assets/images/user.png";
import UserForm from "./userForm";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateWalletSchema } from "../../utils/validationSchema";
import Loader from "../pageLoader/loader";
// import numFormatter from "../../utils/utils";
import AddUserForm from "./Add_user_Form";
import TableLoader from "../kyc/loader";
import NoData from "../kyc/noData";

const UserList = () => {
  let num = 1;
  const [allUsers, setAllUsers] = useState([]);
  const [showInfo, setShowInfo] = useState(false);
  const [showBlock, setShowBlock] = useState(false);
  const [showWallet, setShowWallet] = useState(false);
  const [userDetail, setUserDetail] = useState({});
  const [spinLoader, setSpinLoader] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [skip, setSkip] = useState(0);
  const [pageLimit, setPageLimit] = useState(10);
  const [keyword, setKeyword] = useState("");
  const [loader, setLoader] = useState(true);
  const [showUser, setShowUser] = useState(false);
  const [showAddUser, setShowAddUser] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [showDelete, setShowDelete] = useState(false);
  const [mainLoading, setMainLoading] = useState(true);
  const [tableLoader, setTableLoader] = useState(true);
  // const pageLimit = 10
  const handleShowUserInfo = (user) => {
    setShowInfo(!showInfo);
    setUserDetail(user);
  };
  const handleShowUserBlock = (user) => {
    setShowBlock(!showBlock);
    setUserDetail(user);
  };
  const handleShowUpdateWallet = (user) => {
    setShowWallet(!showWallet);
    setUserDetail(user);
  };
  const handleUpdateUser = (user) => {
    setShowUser(!showUser);
    setUserDetail(user);
  };
  const handleCloseUser = (user) => {
    setShowAddUser(!showAddUser);
  };
  const handleAddUser = () => {
    setShowAddUser(!showAddUser);
    setUserDetail({});
  };
  const handleDeleteUser = (el) => {
    setShowDelete(!showDelete);
    setDeleteId(el.id);
  };
  // const handleAddUser=()=>{
  //   setShowAddUser(!showAddUser);
  //   setUserDetail({});
  // }
  useEffect(() => {
    setPageCount(Math.ceil(userCount / pageLimit));
  }, [userCount, pageLimit]);
  const handlePageClick = ({ selected }) => {
    setSkip(selected * pageLimit);
  };
  const getAllUser = async () => {
    setMainLoading(true);
    setTableLoader(true);
    try {
      const res = await adminAuthInstance().get("/getAllUsers", {
        params: { skip, limit: pageLimit, keyword },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      setMainLoading(false);
      setTableLoader(false);
      setAllUsers(res?.data?.users);
      setUserCount(res?.data?.count);
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
  }, [skip, pageLimit, keyword]);
  const handleBlockUser = async () => {
    try {
      setSpinLoader(true);
      const response = await adminInstance().put(
        `/block-user/${userDetail?.id}`
      );
      setSpinLoader(false);
      const {
        data: {
          block: { msg, status },
        },
      } = response;
      if (status === 200) {
        getAllUser();
        setShowBlock(false);
        toast.success(`User ${msg} successfully`);
      }
      setLoader(false);
    } catch (e) {
      setSpinLoader(false);
      if (axios.isAxiosError(e) && e.response) {
        if (e.response.status !== 200) {
          toast.error(e?.response?.data?.message, { toastId: "login" });
        }
      }
    }
  };
  const deleteUser = async () => {
    try {
      setSpinLoader(true);
      const response = await adminInstance().delete(`/delete-user/${deleteId}`);
      console.log("response ===>", response);
      setSpinLoader(false);
      const { status } = response;
      if (status === 200) {
        getAllUser();
        setShowDelete(false);
        toast.success(`User delete successfully`);
      }
      setLoader(false);
    } catch (e) {
      setSpinLoader(false);
      if (axios.isAxiosError(e) && e.response) {
        if (e.response.status !== 200) {
          toast.error(e?.response?.data?.message, { toastId: "login" });
        }
      }
    }
  };

  const handlePagination = async (value) => {
    setPageLimit(value);
    setSkip(0);
  };
  return (
    <>
      {loader && <Loader />}
      <div className='userlist-page pt-2'>
        {/* <Breadcrumb title='User-list' parent='User' /> */}

        <Container fluid={true}>
          <Row>
            <Col sm='12'>
              <Card>
                <CardHeader>
                  <h5>All Users</h5>
                  <FormGroup className='searchFromgroup'>
                    <Input
                      type='text'
                      name='search'
                      id='exampleEmail'
                      placeholder='Search here...'
                      className='searchFromInput'
                      onChange={(e) => {
                        setKeyword(e.target.value);
                        setSkip(0);
                      }}
                    />
                    <FaSearch className='searchlens' />
                  </FormGroup>
                  <Button onClick={handleAddUser}>Add User</Button>
                </CardHeader>
                <CardBody className='user-datatable'>
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>#</th>
                        {/* <th>Avatar</th>
                        <th>First Name</th>
                        <th>Email</th> */}
                        <th>Username</th>
                        {/* <th>Phone</th> */}
                        <th>Tokens</th>
                        <th>Status</th>
                        <th>Action</th>
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
                          allUsers?.length > 0 ? (
                            allUsers.map((el, i) => (
                              <tr key={el.id + i}>
                                <th scope='row'>{num + i}</th>
                                {/* <td className="latest-user-image">
                              <img
                                src={el?.profile || user}
                                alt="user profile"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = user;
                                }}
                              />
                            </td>
                            <td className="firstnameUserList">
                              {el.firstName}
                            </td>
                            <td>{el.email}</td> */}
                                <td>{el.metaMaskAddress || el.username}</td>
                                {/* <td>{el.phone}</td> */}
                                {/* <td className="pending">Pending</td> */}
                                <td>{el.wallet}</td>
                                <td
                                  className={
                                    el.isBlock
                                      ? "blockActive"
                                      : "userStatusActive"
                                  }>
                                  {el.isBlock ? "Block" : "Active"}
                                </td>
                                <td className='actionDropdown'>
                                  <ActionDropdown
                                    handleShowUserInfo={() =>
                                      handleShowUserInfo(el)
                                    }
                                    handleShowUserBlock={() =>
                                      handleShowUserBlock(el)
                                    }
                                    handleShowUpdateWallet={() =>
                                      handleShowUpdateWallet(el)
                                    }
                                    handleUpdateUser={() =>
                                      handleUpdateUser(el)
                                    }
                                    handleDeleteUser={() =>
                                      handleDeleteUser(el)
                                    }
                                    data={el}
                                  />
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
                  {allUsers && userCount >= 10 && (
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
        {/*********** user info popup  **********/}

        <Modal
          className='userInfoModal'
          centered
          show={showUser}
          onHide={handleUpdateUser}>
          <Modal.Header closeButton>
            <Modal.Title>User Info</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <UserForm
              userDetail={userDetail}
              getAllUser={getAllUser}
              setShowInfo={setShowUser}
            />
          </Modal.Body>
          {/* <Modal.Footer>
          
        </Modal.Footer> */}
        </Modal>
        <Modal
          className='userInfoModal'
          centered
          show={showAddUser}
          onHide={handleCloseUser}>
          <Modal.Header closeButton>
            <Modal.Title>Add New User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AddUserForm getAllUser={getAllUser} setShowInfo={setShowAddUser} />
          </Modal.Body>
          {/* <Modal.Footer>
          
        </Modal.Footer> */}
        </Modal>

        {/*********** user Block popup  **********/}

        <Modal
          className='userBlockModal'
          centered
          show={showBlock}
          onHide={handleShowUserBlock}>
          <Modal.Header closeButton>
            <Modal.Title>
              {userDetail?.isBlock ? "Active User" : "Block User"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className='opentableModal'>
              <h4>
                Are you sure, you want to{" "}
                {userDetail?.isBlock ? (
                  <span className='text-green'> Active</span>
                ) : (
                  <span className='text-danger'> Block</span>
                )}{" "}
                the <span>@{userDetail?.username}</span> ?
              </h4>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              className='yellowBtn'
              color='primary'
              type='button'
              onClick={() => handleBlockUser()}>
              {!spinLoader ? "Yes" : <Spinner animation='border' />}
            </button>
            <button className='darkBtn' onClick={() => setShowBlock(false)}>
              No
            </button>
          </Modal.Footer>
        </Modal>
        {/*********** user delet popup  **********/}

        <Modal
          className='userBlockModal'
          centered
          show={showDelete}
          onHide={handleDeleteUser}>
          {/* <Modal.Header closeButton>
            <Modal.Title>
              {userDetail?.isBlock ? "Active User" : "Block User"}
            </Modal.Title>
          </Modal.Header> */}
          <Modal.Body>
            <div className='opentableModal'>
              <h4>Are you sure, you want to delete</h4>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              className='yellowBtn'
              color='primary'
              type='button'
              onClick={() => deleteUser()}>
              {!spinLoader ? "Yes" : <Spinner animation='border' />}
            </button>
            <button className='darkBtn' onClick={() => setShowDelete(false)}>
              No
            </button>
          </Modal.Footer>
        </Modal>

        {/*********** update user wallet  **********/}
        <UpdateUserWallet
          showWallet={showWallet}
          handleShowUpdateWallet={handleShowUpdateWallet}
          userDetail={userDetail}
          getAllUser={getAllUser}
          setShowWallet={setShowWallet}
        />
      </div>
    </>
  );
};

export default UserList;

const UpdateUserWallet = ({
  showWallet,
  handleShowUpdateWallet,
  userDetail,
  getAllUser,
  setShowWallet,
}) => {
  const [spinLoader, setSpinLoader] = useState(false);
  const {
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({ resolver: yupResolver(updateWalletSchema) });
  const handleUpdateWallet = async (values) => {
    try {
      setSpinLoader(true);
      const response = await adminInstance().put(
        `/update-wallet/${userDetail?.id}`,
        {
          wallet: values?.wallet,
        }
      );
      setSpinLoader(false);
      const {
        data: { status },
      } = response;
      if (status === 200) {
        getAllUser();
        setShowWallet(false);
        toast.success(`User wallet successfully`);
      }
    } catch (e) {
      setSpinLoader(false);
      if (axios.isAxiosError(e) && e.response) {
        if (e.response.status !== 200) {
          toast.error(e?.response?.data?.message, { toastId: "login" });
        }
      }
    }
  };
  return (
    <>
      <Modal
        className='userWalletModal'
        centered
        show={showWallet}
        onHide={handleShowUpdateWallet}>
        <Form onSubmit={handleSubmit(handleUpdateWallet)}>
          <Modal.Header closeButton>
            <Modal.Title>Update User Wallet</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className='opentableModal'>
              <Form.Group>
                <Form.Label>
                  <h4>Username : </h4>
                  <p>{userDetail?.username}</p>
                </Form.Label>
              </Form.Group>
              <Form.Group>
                <Form.Label>
                  <h4>Current Tokens :</h4>
                  <p>{userDetail?.wallet?.toFixed(2) || "0.00"}</p>
                </Form.Label>
              </Form.Group>
              <Form.Group>
                <Form.Label>
                  <h4>Enter Tokens</h4>
                </Form.Label>
                <Form.Control
                  type='number'
                  placeholder='Wallet'
                  name='wallet'
                  onChange={(e) => setValue("wallet", e.target.value)}
                />
                {errors.wallet && (
                  <p className='error-msg'>{errors.wallet.message}</p>
                )}
              </Form.Group>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              className='yellowBtn'
              color='primary'
              type='submit'
              // onClick={() => routeChange()}
            >
              {!spinLoader ? "Update" : <Spinner animation='border' />}
            </button>
            <button
              type='button'
              onClick={() => {
                handleShowUpdateWallet();
              }}
              className='darkBtn'>
              Cancel
            </button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};
