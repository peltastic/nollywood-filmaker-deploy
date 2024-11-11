import * as Yup from "yup"

export const updateProfileSchema = Yup.object({
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    email: Yup.string().email().required("Email is required")
})