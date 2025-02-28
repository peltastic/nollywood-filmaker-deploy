import * as Yup from "yup";

export const crewInfoSchema = Yup.object({
  email: Yup.string().trim().email().required("Email is required"),
  lname: Yup.string().required("Last name is required"),
  fname: Yup.string().required("First name is required"),
  phone: Yup.string().required("Phone is required")
});
export const companyInfoSchema = Yup.object({
  email: Yup.string().trim().email().required("Email is required"),
  name: Yup.string().required("Company name is required"),
  website: Yup.string(),
  phone: Yup.string().required("Phone is required")
});

export const crewVerificationSchema = Yup.object({
  // address: Yup.string().required("Address is required"),
  // city: Yup.string().required("City is required"),
  // state: Yup.string().required("State is required"),
  // country: Yup.string().required("Country is required"),
  identification: Yup.string().required("Identification is required"),
  username: Yup.string().required("Username is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords doesn't match")
    .required("Password Confirmation is Required"),
});

export const companyVerificationSchema = Yup.object({
  // address: Yup.string().required("Address is required"),
  // city: Yup.string().required("City is required"),
  // state: Yup.string().required("State is required"),
  // country: Yup.string().required("Country is required"),
  identification: Yup.string().required("Identification is required"),
  cac: Yup.string().required("CAC number is required"),
  username: Yup.string().required("Username is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords doesn't match")
    .required("Password Confirmation is Required"),
});
