import * as Yup from "yup";

export const withdrawalsSchema = Yup.object({
  bankname: Yup.string().required("Bank name is required"),
  accountnumber: Yup.string().required("Account number is required"),
});

export const withdrawalRequestSchema = Yup.object({
  amount: Yup.string().required("Account number is required"),
  bankName:  Yup.string().required("Bank name is required"),
  accountNumber: Yup.string().required("Account number is required"),
})
