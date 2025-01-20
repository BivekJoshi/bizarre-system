import * as Yup from "yup";

const addExpenseSchema = Yup.object().shape({
  expenseType: Yup.string().required("Please Select Expense Type"),
  paymentType: Yup.string().required("Please Selecy Paymeny Type"),
  amount: Yup.string().required("Please Enter Amount"),
});

export { addExpenseSchema };
