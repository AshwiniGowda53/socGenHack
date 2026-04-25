import * as Yup from "yup"

export const loginSchema = Yup.object({
  customerId: Yup.string()
    .required("Customer ID is required")
    .matches(/^[0-9]+$/, "Invalid Customer ID format")
    .length(9, "Customer ID must be 9 digits"),

  password: Yup.string()
    .required("Password is required")
})