import * as Yup from "yup";

const branchSchema = Yup.object().shape({
  address: Yup.string().required("Address is required"),
  phoneNumber: Yup.string().required("Phone Number is required"),
  housingCapacity: Yup.string().required("Housing Capacity is required"),
});

export { branchSchema };
