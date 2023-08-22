import React, { useState } from "react";
// import { Tabs, TabList, TabPanel, Tab } from "react-tabs";
// import { User, Unlock } from "react-feather";
import { withRouter, useHistory } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { adminAuthInstance } from "../../config/axios";
import { useContext } from "react";
import AdminContext from "../context/adminContgext";
import { useForm } from "react-hook-form";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import { manualLoginSchema } from "../../utils/validationSchema";
import { toast } from "react-toastify";
const LoginTabset = () => {
  const history = useHistory();
  const { setAdmin } = useContext(AdminContext);
  const [showPassword, setShowPassword] = useState(false);
  const [loader, setLoader] = useState(false);

  const {
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({ mode: "onBlur", resolver: yupResolver(manualLoginSchema) });
  const handleLogin = async (values) => {
    console.log("values", values);
    values.password = values.password.trim();
    try {
      setLoader(true);
      const response = await adminAuthInstance().post("/login", values);
      const {
        data: {
          tokens: { access, refresh },
          user,
        },
        status,
      } = response;
      if (status === 200) {
        const { token } = access;
        setAdmin(user);
        localStorage.setItem("adminToken", token);
        if (refresh) {
          localStorage.setItem("adminRefreshToken", refresh.token);
        }
        reset();
        history.push("/dashboard");
      }
      setLoader(false);
    } catch (e) {
      setLoader(false);
      if (axios.isAxiosError(e) && e.response) {
        if (e.response.status !== 200) {
          toast.error(
            e?.response?.data?.message || "Credentials are not correct",
            { toastId: "login" }
          );
        }
      }
    }
  };
  return (
    <Form
      className='form-horizontal auth-form'
      onSubmit={handleSubmit(handleLogin)}>
      <FormGroup>
        <Input
          type='email'
          className='form-control'
          placeholder='Email'
          name='email'
          onChange={(e) => setValue("email", e.target.value)}
        />
        {errors.email && <p className='error-msg'>{errors.email.message}</p>}
      </FormGroup>
      <FormGroup className='inputPasswordBox'>
        <Input
          type={showPassword ? "text" : "password"}
          className='form-control'
          placeholder='Password'
          name='password'
          onChange={(e) => setValue("password", e.target.value)}
        />
        <span
          id='togglePassword'
          onClick={() => setShowPassword(!showPassword)}
          role='presentation'>
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
        {errors.password && (
          <p className='error-msg'>{errors.password.message}</p>
        )}
      </FormGroup>
      <div className='form-terms'>
        <div className='custom-control custom-checkbox mr-sm-2'>
          <Label className='d-block'>
            <span className='pull-right'>
              <a href='/forgotpassword' className='forgot-pass'>
                Forget password?
              </a>
            </span>
          </Label>
        </div>
      </div>
      <div className='form-button'>
        <Button
          className='loginPageBtn'
          color='primary'
          type='submit'
          //onClick={() => routeChange()}
        >
          {!loader ? "Login" : <Spinner animation='border' />}
        </Button>
      </div>
    </Form>
  );
};

export default withRouter(LoginTabset);
