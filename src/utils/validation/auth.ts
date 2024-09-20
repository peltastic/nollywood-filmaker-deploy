import * as Yup from "yup";

export const userDetailsSchema = Yup.object({
  email: Yup.string().email().required(),
  l_name: Yup.string().required(),
  f_name: Yup.string().required(),
  phone: Yup.string().required(),
});
