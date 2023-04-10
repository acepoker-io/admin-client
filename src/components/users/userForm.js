import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
// import {
//     FaEdit,
//     FaCamera,
//   } from "react-icons/fa";
import PhoneInput from "react-phone-input-2";
import { toast } from "react-toastify";
import { Button, Form, FormGroup, Input, Label, Spinner } from "reactstrap";
import dummy from "../../assets/images/game/dummy.png";
import { adminInstance } from "../../config/axios";
import { updateSchema } from "../../utils/validationSchema";
const UserForm = ({ userDetail, getAllUser, setShowInfo }) => {
  const {
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(updateSchema),
    defaultValues: {
      firstName: userDetail?.firstName || "",
      lastName: userDetail?.lastName || "",
      username: userDetail?.username || "",
      email: userDetail?.email || "",
      phone: userDetail?.phone || "",
    },
  });
  const [spinLoader, setSpinLoader] = useState(false);
  const [phone, setPhone] = useState("");
  const updateUserDetail = async (values) => {
    try {
      console.log("update user detail ", values);
      setSpinLoader(true);
      const response = await adminInstance().post(
        `/update-user/${userDetail?.id}`,
        {
          ...values,
          existUsername: userDetail?.username,
          existEmail: userDetail?.email,
          existPhone: userDetail?.phone,
        }
      );
      setSpinLoader(false);
      const {
        data: { user },
      } = response;
      if (user) {
        getAllUser();
        setShowInfo(false);
        toast.success(`User updated successfully`);
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
      <div className='opentableModal'>
        <div className='userInfoProfile'>
          <div className='userprofileImgContainer'>
            <img
              src={userDetail?.profile || dummy}
              className='userInfoProfilImg'
              alt=''
            />
            {/* <FaCamera /> */}
          </div>
        </div>
        <Form onSubmit={handleSubmit(updateUserDetail)}>
          <FormGroup>
            <Label>
              <h4>First name</h4>
              {/* <p>John Smith</p> */}
              {/* <FaEdit /> */}
            </Label>
            <Input
              type='text'
              name='firstName'
              defaultValue={userDetail?.firstName}
              placeholder='First Name'
              onChange={(e) => setValue("firstName", e.target.value)}
            />
            {errors.firstName && (
              <p className='error-msg'>{errors.firstName.message}</p>
            )}
          </FormGroup>

          <FormGroup>
            <Label>
              <h4>Last name</h4>
              {/* <p>John Smith</p> */}
              {/* <FaEdit /> */}
            </Label>
            <Input
              type='text'
              name='lastName'
              defaultValue={userDetail?.lastName}
              placeholder='Last Name'
              onChange={(e) => setValue("lastName", e.target.value)}
            />
            {errors.lastName && (
              <p className='error-msg'>{errors.lastName.message}</p>
            )}
          </FormGroup>
          <FormGroup>
            <Label>
              <h4>Username</h4>
              {/* <p>John Smith</p> */}
              {/* <FaEdit /> */}
            </Label>
            <Input
              type='text'
              name='username'
              defaultValue={userDetail?.username}
              placeholder='Username'
              onChange={(e) => setValue("username", e.target.value)}
            />
            {errors.username && (
              <p className='error-msg'>{errors.username.message}</p>
            )}
          </FormGroup>
          <FormGroup>
            <Label>
              <h4>Email</h4>
              {/* <p>johnSmith@example</p> */}
              {/* <FaEdit /> */}
            </Label>
            <Input
              type='email'
              name='email'
              defaultValue={userDetail?.email}
              placeholder='johnSmith@example.com'
              onChange={(e) => setValue("email", e.target.value)}
            />
            {errors.email && (
              <p className='error-msg'>{errors.email.message}</p>
            )}
          </FormGroup>
          <FormGroup>
            <Label>
              <h4>Phone</h4>
            </Label>
            <PhoneInput
              className='phoneInputUserInfo'
              country='us'
              value={phone || userDetail?.phone}
              onChange={(value) => {
                setPhone(value);
                setValue("phone", `+${value}`);
              }}
              inputProps={{
                name: "phone",
              }}
            />

            {errors?.phone ? (
              <span className='error-msg'>{errors.phone.message}</span>
            ) : (
              ""
            )}
          </FormGroup>
          <Button
            className='loginPageBtn userInfoPopupBtn'
            color='primary'
            type='submit'>
            {!spinLoader ? "Save Changes" : <Spinner animation='border' />}
          </Button>
        </Form>
      </div>
    </>
  );
};
export default UserForm;
