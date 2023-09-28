import * as yup from "yup";

export const initialValues = {
  email: "",
  password: "",
};

export const validationSchema = yup.object({
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().min(8, "Password must be at least 8 characters long").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character").required("Password is required"),
});