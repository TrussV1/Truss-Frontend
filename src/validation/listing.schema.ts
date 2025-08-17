import * as yup from "yup";

export const productSchema = yup.object({
  title: yup.string().required("Product title is required"),
  description: yup.string().optional(),
  price: yup
    .number()
    .positive("Price must be a positive number")
    .required("Price is required"),
  image: yup.mixed<FileList>().required("Product images are required"),
  deliveryDateTime: yup
    .string()
    .required("Delivery date and time is required")
    .test(
      "is-future-date",
      "Delivery date must be in the future",
      function (value) {
        if (!value) return false;
        const selectedDate = new Date(value);
        const now = new Date();
        return selectedDate > now;
      }
    ),
  hasWarranty: yup
    .string()
    .required("Please specify if the product has warranty")
    .oneOf(["true", "false"], "Please select a valid warranty option"),
  specialFeatures: yup
    .string()
    .max(500, "Special features description must be less than 500 characters")
    .optional(),
});
