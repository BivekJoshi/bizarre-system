import * as Yup from "yup";

const redeemCodeSchema = Yup.object().shape({
  code: Yup.string()
    .required("Promo code is required")
    .matches(/^[A-Za-z0-9]+$/, "Promo code must be alphanumeric"),

  league: Yup.string().required("League is required"),
  redeemableCoins: Yup.string().required("Redeemable Coins is required"),
  effectiveDateTime: Yup.string().required("Effective Date Time is required"),
  terminationDateTime: Yup.string().required("Termination Date Time is required"),
});

export { redeemCodeSchema };
