import * as Yup from "yup"

export const createConsultantSchema = Yup.object({
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    email: Yup.string().trim().email().required("Email is required"),
    phone:Yup.string().required("Phone number is required")
})

