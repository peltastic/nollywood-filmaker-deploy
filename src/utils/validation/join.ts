import * as Yup from "yup";

export const joinWaitlistSchema = Yup.object({
  email: Yup.string().trim().email().required("Email is required"),
  name: Yup.string().required("Full name"),
});
