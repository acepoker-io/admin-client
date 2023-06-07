import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button, Form, FormGroup, Input, Label, Spinner } from "reactstrap";
//import dummy from "../../assets/images/game/dummy.png";
import { adminInstance } from "../../config/axios";
import { updateSchema } from "../../utils/validationSchema";
const AddUserForm = ({ getAllUser, setShowInfo }) => {
  const {
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(updateSchema),
  });
  const [spinLoader, setSpinLoader] = useState(false);
  const updateUserDetail = async (values) => {
    try {
      setSpinLoader(true);
      const response = await adminInstance().post(
        `/create-user`,values,
      );
      setSpinLoader(false);
      const {
        data: { user },
      } = response;
      if (user) {
        getAllUser();
        // setShowInfo(false);
        // toast.success(`User created successfully`);
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
        </div>
        <Form onSubmit={handleSubmit(updateUserDetail)}>
          <FormGroup>
            <Label>
              <h4>Username</h4>

            </Label>
            <Input
              type='text'
              name='username'
              autoComplete="off"
              placeholder='Username'
              onChange={(e) => setValue("username", e.target.value)}
              onFocus={(e) => {
                if (e.target.hasAttribute('readonly')) {
                  e.target.removeAttribute('readonly');
                  // fix for mobile safari to show virtual keyboard
                  e.target.blur(); e.target.focus();
                }
              }}
              readOnly={true}
            />
            {errors.username && (
              <p className='error-msg'>{errors.username.message}</p>
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
export default AddUserForm;
