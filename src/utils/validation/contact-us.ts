import * as Yup from "yup";

export const contactUsSchema = Yup.object({
  email: Yup.string().lowercase().trim().email().required("Email is required"),
  firstName: Yup.string().required("Last name is required"),
  lastName: Yup.string().required("First name is required"),
  phone: Yup.string().required("Phone number is required"),
});

export const contactUsReply = Yup.object({
  subject: Yup.string().required("Subject is required")
})
