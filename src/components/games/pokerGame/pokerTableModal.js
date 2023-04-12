/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react"; //useMemo
import { Form, Spinner, Button, Modal } from "react-bootstrap";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { pokerTableSchema } from "../../../utils/validationSchema";
//import DatePicker from 'react-datepicker'
import {
  // adminAuthInstance,
  adminInstance,
  // pokerTournamentInstance,
} from "../../../config/axios";
import axios from "axios";
import { toast } from "react-toastify";
// import Select from "react-select";

// const customStyles = {
//   container: (provided) => ({
//     ...provided,
//     width: "100%",
//   }),
//   option: (provided) => ({
//     ...provided,
//     background: "#ebe8e8",
//     color: "#000",
//     fontWeight: "400",
//     fontSize: "16px",
//     padding: "10px 20px",
//     lineHeight: "16px",
//     cursor: "pointer",
//     borderRadius: "4px",
//     borderBottom: "1px solid #ebe8e8",
//     ":hover": {
//       background: "#ebe8e8",
//       borderRadius: "4px",
//     },
//   }),
//   menu: (provided) => ({
//     ...provided,
//     background: "#ebe8e8",
//     borderRadius: "30px",
//     padding: "10px 20px",
//     border: "2px solid transparent",
//   }),
//   control: () => ({
//     background: "#ebe8e8",
//     border: "2px solid #ebe8e8",
//     borderRadius: "30px",
//     color: "#000",
//     display: "flex",
//     alignItem: "center",
//     height: "41",
//     margin: "2px 0",
//     boxShadow: " 0 2px 10px #ebe8e8",
//     cursor: "pointer",
//     ":hover": {
//       background: "#ebe8e8",
//       // border: "2px solid #306CFE",
//     },
//   }),
//   singleValue: (provided) => ({
//     ...provided,
//     color: "#000",
//     fontWeight: "400",
//     fontSize: "14px",
//     lineHeight: "16px",
//   }),
//   indicatorSeparator: (provided) => ({
//     ...provided,
//     display: "none",
//   }),
//   placeholder: (provided) => ({
//     ...provided,
//     fontWeight: "400",
//     fontSize: "14px",
//     lineHeight: "19px",
//     color: "#858585c7",
//   }),
//   input: (provided) => ({
//     ...provided,
//     // height: "38px",
//     color: "fff",
//   }),
//   valueContainer: (provided) => ({
//     ...provided,
//     padding: "2px 20px",
//   }),
//   indicatorsContainer: (provided) => ({
//     ...provided,
//     paddingRight: "20px",
//     color: "#858585c7",
//   }),
//   svg: (provided) => ({
//     ...provided,
//     fill: "#858585c7 !important",
//     ":hover": {
//       fill: "#858585c7 !important",
//     },
//   }),
// };
const CreatePokerTableModal = ({ show, onHide, getAllPokerTable, setShow }) => {
  const {
    handleSubmit,
    formState: { errors },
    register,
    setValue,
    reset,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(pokerTableSchema),
  });
  const [spinLoader, setSpinLoader] = useState(false);
  // const [allUsers, setAllUsers] = useState([]);
  // const getAllUser = async () => {
  //   const res = await adminAuthInstance().get("/users-forInvite", {
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
  //     },
  //   });
  //   // setAllUsers(res?.data?.allUsers);
  // };
  // useEffect(() => {
  //   getAllUser();
  // }, []);
  // const options = useMemo(
  //   () =>
  //     allUsers?.length > 0 &&
  //     allUsers.map((el) => {
  //       return { value: el.id, label: el.username };
  //     }),
  //   [allUsers]
  // );
  // const handleChnageInviteUsers = (selectedOptions) => {
  //   setValue("invitedUsers", [...selectedOptions]);
  // };

  useEffect(() => {
    reset();
  }, [show]);

  const handleSmallBlind = (e) => {
    const { value } = e.target;
    setValue("maxchips", Number(value * 2));
  };
  const handleChange = (e) => {
    setValue(`${e.target.id}`, e.target.checked);
  };
  const createTable = async (values) => {
    setSpinLoader(true);
    console.log("value ==>", values);
    if (spinLoader) {
      return false;
    }
    try {
      const resp = await adminInstance().post(
        "/createTable",
        {
          ...values,
          public: true,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );
      console.log("resp ==>", resp);
      getAllPokerTable();
      reset();
      setShow(false);
      setSpinLoader(false);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message, { id: "create-table-error" });
      }
      setSpinLoader(false);
    }
  };
  return (
    <div>
      <Modal
        centered
        show={show}
        onHide={() => {
          onHide();
        }}
        className='create-tournament-popup createOpenTable'>
        <Form onSubmit={handleSubmit(createTable)}>
          <Modal.Header closeButton>
            <Modal.Title>Create Table</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group
              className='form-group'
              controlId='formPlaintextPassword'>
              <Form.Label>Enter Game name</Form.Label>
              <Form.Control
                name='gameName'
                type='text'
                placeholder="Ex : John's game"
                {...register("gameName")}
              />
              {!!errors?.gameName && (
                <p className='text-danger'>{errors?.gameName?.message}</p>
              )}
            </Form.Group>
            <Form.Group
              className='form-group blindpopupField'
              controlId='formPlaintextPassword'>
              <div>
                {" "}
                <div className='blindFields-box'>
                  <div>
                    {" "}
                    <Form.Label>Small Blind</Form.Label>
                    <Form.Control
                      name='minchips'
                      type='number'
                      placeholder='Ex : 50'
                      {...register("minchips")}
                      onChange={handleSmallBlind}
                    />
                    {!!errors?.minchips && (
                      <p className='text-danger'>{errors?.minchips?.message}</p>
                    )}
                  </div>
                  <div>
                    {" "}
                    <Form.Label>Big Blind</Form.Label>
                    <Form.Control
                      name='maxchips'
                      type='number'
                      placeholder='Ex : 1000'
                      {...register("maxchips")}
                      disabled
                    />
                  </div>
                </div>
              </div>
            </Form.Group>

            {/* <div className="searchSelectDropdown">
              <Form.Label>Invite Users</Form.Label>
              <Select
                isMulti
                onChange={handleChnageInviteUsers}
                options={options}
                styles={customStyles}
              />
              {!!errors?.invitedUsers && (
                <p className="text-danger">{errors?.invitedUsers?.message}</p>
              )}
            </div> */}
            <div className='createGameCheckHand'>
              {/* <Form.Check
                inline
                label='Public Game'
                name='public'
                type='checkbox'
                id={"public"}
                onChange={handleChange}
                checked={values?.public}
              /> */}
              <Form.Check
                inline
                label='Auto Hand'
                name='autohand'
                type='checkbox'
                id={"autohand"}
                onChange={handleChange}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={onHide}>
              Close
            </Button>
            <Button variant='primary' type='submit' onClick={createTable}>
              {spinLoader ? <Spinner animation='border' /> : "Create Table"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default CreatePokerTableModal;
