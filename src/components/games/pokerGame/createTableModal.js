/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { Form, Spinner, Button, Modal } from "react-bootstrap";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { tournamentSchema } from "../../../utils/validationSchema";
// import DatePicker from "react-datetime-picker";
//import DatePicker from 'react-datepicker'
import { pokerTournamentInstance } from "../../../config/axios";
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
//     background: "#000",
//     color: "#ddd",
//     fontWeight: "400",
//     fontSize: "16px",
//     padding: "10px 20px",
//     lineHeight: "16px",
//     cursor: "pointer",
//     borderRadius: "4px",
//     borderBottom: "1px solid #141414",
//     ":hover": {
//       background: "#141414",
//       borderRadius: "4px",
//     },
//   }),
//   menu: (provided) => ({
//     ...provided,
//     background: "#000",
//     borderRadius: "30px",
//     padding: "10px 20px",
//     border: "2px solid transparent",
//   }),
//   control: () => ({
//     background: "#000",
//     border: "2px solid #000",
//     borderRadius: "30px",
//     color: "#fff",
//     display: "flex",
//     alignItem: "center",
//     height: "41",
//     margin: "2px 0",
//     boxShadow: " 0 2px 10px #000000a5",
//     cursor: "pointer",
//     ":hover": {
//       background: "#000",
//       // border: "2px solid #306CFE",
//     },
//   }),
//   singleValue: (provided) => ({
//     ...provided,
//     color: "#fff",
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
const CreateTableModal = ({
  show,
  onHide,
  singleTournament,
  getAllTournament,
  setShow,
  setUpdate,
  modalName,
  setSingleTournament,
}) => {
  console.log("singleTournament ====>", singleTournament);
  // const options = [
  //   { value: "3", label: "3" },
  //   { value: "10", label: "10" },
  //   { value: "25", label: "25" },
  // ];
  // const prizeOption = [
  //   { value: "Fixed", label: "Fixed" },
  //   { value: "Percentage", label: "Percentage" },
  // ];
  // const prizeDistributionOption = [
  //   { value: "top-10", label: "Top-10" },
  //   { value: "top-15", label: "Top-15" },
  //   { value: "top-20", label: "Top-20" },
  // ];
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
    setValue,
    // watch,
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      name: singleTournament?.name || "",
      smallBlind: singleTournament?.levels?.smallBlind?.amount || "",
      bigBlind: singleTournament?.levels?.bigBlind?.amount || "",
    },
    resolver: yupResolver(tournamentSchema),
  });
  // const [winTotalPlayer, setWinTotalPlayer] = useState({});
  const [spinLoader, setSpinLoader] = useState(false);
  // const [datePicker, setDatePicker] = useState(
  //   singleTournament?.tournamentDate
  //     ? new Date(singleTournament?.tournamentDate)
  //     : new Date()
  // );
  // const watchPrizeType = watch("prizeType");
  // const changeDatePicker = (date) => {
  //   setValue("startDate", date);
  //   setDatePicker(date);
  // };
  // const handleChnageInviteUsers = (selectedOptions) => {
  //   setValue("winTotalPlayer", selectedOptions?.value);
  //   setWinTotalPlayer(selectedOptions);
  // };
  // const handlePrizeType = (selectedOptions) => {
  //   setValue("prizeType", selectedOptions?.value);
  // };
  // const handlePrizeDistribution = (selectedOptions) => {
  //   setValue("prizeDistribution", selectedOptions?.value);
  // };
  const createTournament = async (values) => {
    try {
      setSpinLoader(true);
      console.log("singleTournament ==>", singleTournament);
      // return false;
      const apipath = singleTournament?._id
        ? "/UpdateTournament"
        : "/CreateTournament";
      const response = await pokerTournamentInstance().post(
        apipath,
        {
          ...values,
          tournamentId: singleTournament?._id || null,
          // startDate: new Date(values?.startDate).toISOString().split("T")[0],
          // startTime: `${new Date(values?.startDate).getHours()}:${new Date(
          //   values?.startDate
          // ).getMinutes()}:00`,
          // tournamentDate: values.startDate,
          existTournamentName: singleTournament?.name,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );

      const {
        status,
        data: { msg },
      } = response || {};

      if (status === 200) {
        await getAllTournament();
        setSpinLoader(false);
        setShow(false);
        toast.success(msg, { toastId: "login" });
        reset();
      }
    } catch (e) {
      setSpinLoader(false);
      if (axios.isAxiosError(e) && e.response) {
        if (e.response.status !== 200) {
          toast.error(e?.response?.data?.message || "Something went wrong", {
            toastId: "login",
          });
        }
      }
    }
  };

  const handleSmallBlind = (e) => {
    const { value } = e.target;
    setValue("bigBlind", Number(value * 2));
    // console.log({value,name})
    // setValue('bigBlind',)
  };

  return (
    <div>
      <Modal
        centered
        show={show}
        onHide={() => {
          onHide();
          setSingleTournament();
        }}
        className='create-tournament-popup'>
        <Form onSubmit={handleSubmit(createTournament)}>
          <Modal.Header closeButton>
            <Modal.Title>{modalName} Tournament</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className='opentableModal'>
              <Form.Group>
                <Form.Label>Tournament Name</Form.Label>
                <Form.Control
                  type='text'
                  name='name'
                  defaultValue={singleTournament?.name}
                  placeholder='Tournament Name'
                  {...register("name")}
                />
                {errors?.name && (
                  <p className='error-msg'>{errors?.name?.message}</p>
                )}
              </Form.Group>
              <div className='opentable-userBy'>
                <div className='opentable-userByinput'>
                  <Form.Group className='userBuy'>
                    <Form.Label>Tournament Fees</Form.Label>
                    <Form.Control
                      type='number'
                      name='tournamentFees'
                      defaultValue={singleTournament?.tournamentFee}
                      placeholder='5000'
                      {...register("tournamentFees")}
                    />
                    {errors?.tournamentFees && (
                      <p className='error-msg'>
                        {errors?.tournamentFees?.message}
                      </p>
                    )}
                  </Form.Group>
                  <Form.Group className='userBuy'>
                    <Form.Label>Buy In</Form.Label>
                    <Form.Control
                      type='number'
                      name='buyIn'
                      defaultValue={singleTournament?.buyIn}
                      placeholder='5000'
                      {...register("buyIn")}
                    />
                    {errors?.buyIn && (
                      <p className='error-msg'>{errors?.buyIn?.message}</p>
                    )}
                  </Form.Group>
                </div>
              </div>
              <div className='opentable-userBy'>
                <div className='opentable-userByinput'>
                  <Form.Group className='userBuy'>
                    <Form.Label>Small Blind (SB)</Form.Label>
                    <Form.Control
                      type='number'
                      name='smallBlind'
                      defaultValue={
                        singleTournament?.levels?.smallBlind?.amount
                      }
                      placeholder='50'
                      {...register("smallBlind")}
                      onChange={handleSmallBlind}
                    />
                    {errors?.smallBlind && (
                      <p className='error-msg'>{errors?.smallBlind?.message}</p>
                    )}
                  </Form.Group>
                  <Form.Group className='userBuy'>
                    <Form.Label>Big Blind (BB)</Form.Label>
                    <Form.Control
                      type='number'
                      name='bigBlind'
                      defaultValue={singleTournament?.levels?.bigBlind?.amount}
                      placeholder='100'
                      {...register("bigBlind")}
                      disabled
                    />
                  </Form.Group>
                </div>
              </div>
              {/* <Form.Group className='userBuy' controlId='formBasicEmail'>
                <Form.Label>Prize Type</Form.Label>
                <Select
                  options={prizeOption}
                  onChange={handlePrizeType}
                  styles={customStyles}
                />
                {errors?.prizeType && (
                  <p className='error-msg'>{errors?.prizeType?.message}</p>
                )}
              </Form.Group> */}
              <div className='opentable-userBy'>
                <div className='opentable-userByinput'>
                  {/* {watchPrizeType && watchPrizeType === "Fixed" && (
                    <Form.Group className='userBuy' controlId='formBasicEmail'>
                      <Form.Label>Win total player</Form.Label>
                      <Select
                        options={options}
                        onChange={handleChnageInviteUsers}
                        styles={customStyles}
                      />
                      {errors?.winTotalPlayer && (
                        <p className='error-msg'>
                          {errors?.winTotalPlayer?.message}
                        </p>
                      )}
                    </Form.Group>
                  )}
                  {watchPrizeType && watchPrizeType === "Percentage" && (
                    <Form.Group>
                      <Form.Label>Prize Distribution</Form.Label>
                      <Select
                        options={prizeDistributionOption}
                        onChange={handlePrizeDistribution}
                        styles={customStyles}
                      />
                      {errors?.prizeDistribution && (
                        <p className='error-msg'>
                          {errors?.prizeDistribution?.message}
                        </p>
                      )}
                    </Form.Group>
                  )} */}

                  <Form.Group>
                    <Form.Label>Have Players</Form.Label>
                    <Form.Control
                      type='number'
                      name='havePlayers'
                      placeholder='No. of players'
                      defaultValue={singleTournament?.havePlayers}
                      {...register("havePlayers")}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Minimum Players</Form.Label>
                    <Form.Control
                      type='number'
                      name='havePlayers'
                      placeholder='No. of players'
                      defaultValue={singleTournament?.minimumPlayers}
                      {...register("minimumPlayers")}
                    />
                  </Form.Group>
                </div>
              </div>
              <Form.Group className='userBuy'>
                <Form.Label>Hours to start tournament</Form.Label>
                <Form.Control
                  type='number'
                  name='hoursToStart'
                  defaultValue={singleTournament?.hoursToStart}
                  placeholder='Enter Hours'
                  {...register("hoursToStart")}
                />
              </Form.Group>

              <Form.Group className='userBuy'>
                <Form.Label>First Winner</Form.Label>
                <Form.Control
                  type='number'
                  name='first'
                  defaultValue={singleTournament?.winnerAmount}
                  placeholder='Enter Amount'
                  {...register("first")}
                />
              </Form.Group>

              {/* {winTotalPlayer?.value &&
                watchPrizeType &&
                watchPrizeType !== "Percentage" &&
                (winTotalPlayer?.value === "3" ||
                  winTotalPlayer?.value === "10" ||
                  winTotalPlayer?.value === "25") && (
                  <div className='opentable-userByinput winner-row'>
                    <Form.Group className='userBuy'>
                      <Form.Label>Second Winner</Form.Label>
                      <Form.Control
                        type='number'
                        name='second'
                        defaultValue={
                          singleTournament?.winPlayer?.second?.amount
                        }
                        placeholder='Enter Amount'
                        {...register("second")}
                      />
                    </Form.Group>
                    <Form.Group className='userBuy'>
                      <Form.Label>Third Winner</Form.Label>
                      <Form.Control
                        type='number'
                        name='third'
                        defaultValue={
                          singleTournament?.winPlayer?.third?.amount
                        }
                        placeholder='Enter Amount'
                        {...register("third")}
                      />
                    </Form.Group>
                  </div>
                )}
              {winTotalPlayer.lenght ? (
                <div className='opentable-userBy'>
                  <div className='opentable-userByinput'>
                    {(winTotalPlayer?.value === "10" ||
                      winTotalPlayer?.value === "25") && (
                      <Form.Group className='userBuy'>
                        <Form.Label>Winning amount for 4-10</Form.Label>
                        <Form.Control
                          type='number'
                          name='4-10'
                          placeholder='Winning amount for 4-10'
                          {...register(`4-10`)}
                        />
                      </Form.Group>
                    )}
                    {winTotalPlayer?.value === "25" && (
                      <Form.Group className='userBuy'>
                        <Form.Label>Winning amount for 11-25</Form.Label>
                        <Form.Control
                          type='number'
                          name='11-25'
                          placeholder='Winning amount for 4-10'
                          {...register(`11-25`)}
                        />
                      </Form.Group>
                    )}
                  </div>
                </div>
              ) : null} */}

              <div className='opentable-userBy'>
                <div className='opentable-userByinput'>
                  <Form.Group className='userBuy'>
                    <Form.Label>SB/BB will increase in (minutes)</Form.Label>
                    <Form.Control
                      type='number'
                      name='incBlindTime'
                      defaultValue={singleTournament?.incBlindTime}
                      placeholder='In minutes'
                      {...register("incBlindTime")}
                    />
                    {errors?.incBlindTime && (
                      <p className='error-msg'>
                        {errors?.incBlindTime?.message}
                      </p>
                    )}
                  </Form.Group>
                  {/* <Form.Group className='userBuy'>
                    <Form.Label>Join time in (minutes)</Form.Label>
                    <Form.Control
                      type='number'
                      name='joinTime'
                      defaultValue={singleTournament?.incBlindTime}
                      placeholder='In minutes'
                      {...register("joinTime")}
                    />
                    {errors?.joinTime && (
                      <p className='error-msg'>{errors?.joinTime?.message}</p>
                    )}
                  </Form.Group> */}
                </div>
              </div>

              {/* <div className='opentable-userBy'>
                <div className='opentable-userByinput'>
                  <Form.Group className='userBuy'>
                    <Form.Label>Start Date</Form.Label>
                    <DatePicker
                      placeholderText='Select Date'
                      onChange={(date) => changeDatePicker(date, "startDate")}
                      className='form-select'
                      themeVariant='dark'
                      value={datePicker}
                    />
                    {errors?.startDate && (
                      <p className='error-msg'>{errors?.startDate?.message}</p>
                    )}
                  </Form.Group>
                </div>
              </div> */}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button className='yellowBtn' variant='primary' type='submit'>
              {!spinLoader ? modalName : <Spinner animation='border' />}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default CreateTableModal;
