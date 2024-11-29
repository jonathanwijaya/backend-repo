import * as yup from "yup";

export const updateUserDataSchema = yup.object({
  name: yup.string().min(3, "Name must be at least 3 characters").required("Name is required"),
  email: yup.string().email("Invalid email address").required("Email is required"),
  age: yup.number().positive("Age must be a positive number").positive('Age must be a positive number').integer("Age must be an integer").required("Age is required"),
});

// Infer the TypeScript type from the schema
export type UpdateUserData = yup.InferType<typeof updateUserDataSchema>;