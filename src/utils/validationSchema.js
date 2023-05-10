import * as yup from "yup";
export const manualLoginSchema = yup.object({
  email: yup.string().email().required("Email is required"),
  password: yup.string().required("Password is required"),
});
export const RegisterSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Email is required"),
  phone: yup.string().required("Phone number is required"),
  password: yup.string().required("Phone number is required"),
});
export const updateSchema = yup.object().shape({
  // firstName: yup.string().required("First Name is required"),
  // lastName: yup.string().required("Last Name is required"),
  username: yup.string().required("Username is required"),
  // email: yup
  //   .string()
  //   .email("Please enter valid email")
  //   .required("Email is required"),
  // phone: yup.string().required("Phone number is required"),
});
export const updateWalletSchema = yup.object().shape({
  wallet: yup.string().required("Amount is required"),
});
export const tournamentSchema = yup.object().shape({
  name: yup.string().required("name is required"),
  smallBlind: yup.string().required("Small blind is required"),
  bigBlind: yup.string().required("Big blind is required"),
  startDate: yup.string().required("Start date is required"),
  tournamentFees: yup.string().required("fees is required"),
  incBlindTime: yup.string().required("Blind increase time is required"),
  joinTime: yup.string().required("Join time is required"),
  buyIn: yup.string().required("Buy In is required"),
  prizeType: yup.string().required("Prize Type is required"),
  winTotalPlayer: yup.string().when("prizeType", {
    is: "Fixed",
    then: yup.string().required("Win total player is required"),
  }),
  prizeDistribution: yup.string().when("prizeType", {
    is: "Percentage",
    then: yup.string().required("Prize distribution is required"),
  }),
});
export const pokerTableSchema = yup.object().shape({
  gameName: yup.string().required("name is required"),
  minchips: yup.string().required("Small blind is required"),
  // sitInAmount: yup.string().required('Sit in amount is required'),
  invitedUsers: yup.array(),
});
