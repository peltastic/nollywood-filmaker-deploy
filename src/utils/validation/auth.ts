import * as Yup from "yup";

export const userDetailsSchema = Yup.object({
  email: Yup.string().email().required("Email is required"),
  lname: Yup.string().required("Last name is required"),
  fname: Yup.string().required("First name is required"),
  phone: Yup.string().required("Phone number is required"),
});

export const secureAccountSchema = Yup.object({
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords doesn't match")
    .required("Password Confirmation is Required"),
});


export const loginSchema = Yup.object({
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required")
})