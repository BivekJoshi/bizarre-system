import {
  Alert,
  Autocomplete,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  InputAdornment,
  Radio,
  RadioGroup,
  TextField,
  Tooltip,
  Typography,
  FormControl,
  useTheme,
} from "@mui/material";
import { getIn } from "formik";
import React, { useEffect } from "react";
import AsyncDropDownOption from "./AsyncDropDownOption";
import AsyncDropDown from "./AsyncDropDown";

const RenderInput = ({
  inputField,
  formik,
  index: arrayIndex,
  isFieldArray,
  fieldArrayName,
  align,
  firstDropdownDisable,
  passwordProps,
}) => {
  useEffect(() => {
    if (formik.values.documentType && inputField.length) {
      const isSingleFile = inputField[0].singleFile;
      const onlyDocument = inputField[0].onlyDocument;
      formik.setFieldValue("isSingleFile", isSingleFile);
      formik.setFieldValue("onlyDocument", onlyDocument);
    }
  }, [formik?.values?.documentType]);

  const theme = useTheme();
  const handleChange = (event, element) => {
    const { name, value } = event.target;
    let updatedValue = value;

    if (element?.isCapital) {
      updatedValue = value.toUpperCase();
    }

    formik.setFieldValue(name, updatedValue);
  };

  const getComponentToRender = (element, disableField, index) => {
    if (!element) return null;
    const formValues = isFieldArray
      ? getIn(formik.values, element.name)
      : formik.values[element.name];
    const formError = isFieldArray
      ? getIn(formik.errors, element.name)
      : formik.errors[element.name];
    const formTouched = isFieldArray
      ? getIn(formik.touched, element.name)
      : formik.touched[element.name];

    switch (element.type) {
      case "text":
        return (
          <div>
            <Typography
              variant="h5"
              sx={{
                color: theme.palette.text.default,
                fontWeight: 700,
                marginBottom: "0.1rem",
              }}
            >
              {element?.label}{" "}
              {element.required && <span style={{ color: "#EC4034" }}>*</span>}
            </Typography>
            <TextField
              name={element?.name}
              // label={element?.label}
              placeholder={element?.placeholder}
              value={formValues}
              onBlur={formik.handleBlur}
              size="small"
              onChange={(event) => {
                handleChange(event, element);
                if (element.clearField) {
                  for (let i = 0; i < element.clearField?.length; i++) {
                    formik.setFieldValue(element.clearField[i], "");
                  }
                }
              }}
              fullWidth
              required={element.required}
              variant="outlined"
              className="textfield-icon-input"
              disabled={element.isDisabled}
              multiline={element?.multiline || false}
              rows={element?.rows || false}
              error={
                Boolean(element?.err) || (formTouched && Boolean(formError))
              }
              helperText={element?.err || (formTouched && formError)}
              onKeyPress={(ev) => {
                if (ev.key === "Enter") {
                  formik.handleSubmit();
                  ev.preventDefault();
                }
              }}
              sx={
                element?.extraInfo && element?.extraLabel
                  ? { "& .MuiOutlinedInput-root": { borderRadius: "2rem" } }
                  : {}
              }
              inputProps={{
                minLength: element?.min,
                maxLength: element?.max,
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {element?.isImage ? (
                      <img
                        width={element?.iconWidth ? element?.iconWidth : 20}
                        src={element?.iconStart}
                      />
                    ) : (
                      <Tooltip>{element?.iconStart}</Tooltip>
                    )}
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{ shrink: Boolean(formValues) }}
            />
          </div>
        );
      case "password":
        const isConfirmPassword = element.name === "confirmPassword";
        return (
          <div>
            <Typography
              variant="h5"
              sx={{
                color: theme.palette.text.default,
                fontWeight: 700,
                marginBottom: "0.1rem",
              }}
            >
              {element?.label}{" "}
              {element?.required && <span style={{ color: "#EC4034" }}>*</span>}
            </Typography>
            <TextField
              name={element?.name}
              // label={element?.label}
              placeholder={element?.placeholder}
              value={formValues}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              fullWidth
              size="small"
              className="textfield-icon-input"
              variant="outlined"
              disabled={element.isDisabled}
              error={formTouched && Boolean(formError)}
              helperText={formTouched && formError}
              InputLabelProps={{ shrink: Boolean(formValues) }}
              type={
                isConfirmPassword
                  ? passwordProps?.showConfirmPassword
                    ? "text"
                    : "password"
                  : passwordProps?.showPassword
                  ? "text"
                  : "password"
              }
              sx={
                element?.extraInfo && element?.extraLabel
                  ? { "& .MuiOutlinedInput-root": { borderRadius: "2rem" } }
                  : {}
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip
                      title={`${
                        isConfirmPassword
                          ? passwordProps?.showConfirmPassword
                            ? "Hide"
                            : "Show"
                          : passwordProps?.showPassword
                          ? "Hide"
                          : "Show"
                      } Password`}
                    >
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={
                          isConfirmPassword
                            ? passwordProps?.handleClickShowConfirmPassword
                            : passwordProps?.handleClickShowPassword
                        }
                        onMouseDown={passwordProps?.handleMouseDownPassword}
                        edge="end"
                      >
                        {isConfirmPassword
                          ? passwordProps?.showConfirmPassword
                            ? element?.iconEnd1
                            : element?.iconEnd2
                          : passwordProps?.showPassword
                          ? element?.iconEnd1
                          : element?.iconEnd2}
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
                ),
                startAdornment: (
                  <InputAdornment position="start">
                    <Tooltip>{element?.iconStart}</Tooltip>
                  </InputAdornment>
                ),
              }}
            />
          </div>
        );
      case "onlyNumber":
        return (
          <>
            <TextField
              name={element?.name}
              label={element?.label}
              value={element?.defaultValue ? element?.defaultValue : formValues}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              onKeyPress={(e) => {
                if (isNaN(e.key)) {
                  e.preventDefault();
                }
              }}
              fullWidth
              required={element.required}
              // variant="outlined"
              className="textfield-icon-input"
              disabled={element.isDisabled}
              error={formTouched && Boolean(formError)}
              helperText={formTouched && formError}
              inputProps={{
                minLength: element?.min,
                maxLength: element?.max,
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Tooltip>{element?.iconStart}</Tooltip>
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{ shrink: Boolean(formValues) }}
            />
          </>
        );

      case "dropDown":
        return (
          <div>
            <Typography
              variant="h5"
              sx={{
                color: theme.palette.text.default,
                fontWeight: 700,
                marginBottom: "0.1rem",
              }}
            >
              {element?.label}{" "}
              {element.required && <span style={{ color: "#EC4034" }}>*</span>}
            </Typography>
            <Autocomplete
              id={element.name}
              key={formValues}
              fullWidth
              sx={{
                marginBottom: element?.marginBottom,
              }}
              name={element.name}
              disabled={
                firstDropdownDisable && index === 0
                  ? firstDropdownDisable
                  : element?.isDisabled
              }
              options={element?.options || []}
              getOptionLabel={(option) => option?.label || ""}
              value={
                element?.options?.find(
                  (option) => option?.value === formValues
                ) || ""
              }
              onChange={(event, newValue) => {
                if (element?.customOnChange) {
                  element.customOnChange(event, newValue);
                } else {
                  formik.setFieldValue(
                    element.name,
                    newValue?.value || newValue?.code || ""
                  ); // Set value to newValue's value property or empty string if undefined
                  if (element.clearField) {
                    for (let i = 0; i < element.clearField?.length; i++) {
                      formik.setFieldValue(element.clearField[i], "");
                    }
                  }
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  className="textfield-icon-input"
                  disabled={element?.isDisabled}
                  error={formTouched && Boolean(formError)}
                  required={element.required}
                  helperText={formTouched && formError}
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <InputAdornment position="start">
                        <div>
                          {element?.isImage ? (
                            <img
                              width={
                                element?.iconWidth ? element?.iconWidth : 20
                              }
                              src={element?.iconStart}
                            />
                          ) : (
                            <Tooltip>{element?.iconStart}</Tooltip>
                          )}
                        </div>
                      </InputAdornment>
                    ),
                  }}
                  size="small"
                />
              )}
            />
          </div>
        );
      case "number":
        return (
          <>
            <Typography
              variant="h5"
              sx={{
                color: theme.palette.text.default,
                fontWeight: 700,
                marginBottom: "0.1rem",
              }}
            >
              {element?.label}
            </Typography>
            <TextField
              name={element?.name}
              // label={element?.label}
              value={formValues}
              onChange={formik.handleChange}
              InputLabelProps={{ shrink: Boolean(formValues) }}
              onKeyPress={(ev) => {
                if (
                  ev.key === "E" ||
                  ev.key === "e" ||
                  ev.key === "." ||
                  ev.key === "+"
                ) {
                  ev.preventDefault();
                }
              }}
              fullWidth
              type={element?.type}
              required={element.required}
              inputProps={{
                min: element?.min,
                max: element?.max,
              }}
              variant="outlined"
              error={formTouched && Boolean(formError)}
              helperText={formTouched && formError}
              size="small"
            />
          </>
        );
      case "switch":
        return (
          <div
            style={{
              display: element?.display,
              flexDirection: element?.direction,
              justifyContent: element?.justify,
              width: "100%",
            }}
          >
            <FormControlLabel
              style={{
                display: "flex",
                flexDirection: "row-reverse",
                marginLeft: "0px",
                justifyContent: element?.justify,
              }}
              control={
                <CustomizedSwitches
                  isDisabled={element?.isDisabled}
                  checked={Boolean(formValues)}
                  onChange={(event, value) => {
                    formik.handleChange(event);
                    formik.setFieldValue(element.name, value);
                    if (element?.customOnChange) {
                      element.customOnChange(
                        event,
                        formik,
                        arrayIndex,
                        fieldArrayName
                      );
                    }
                  }}
                  name={element?.name}
                  id={element?.name}
                  sx={{
                    color: element?.isDisabled ? element?.opacity : "",
                  }}
                />
              }
              label={element?.label}
            />
            {element?.options && (
              <SwitchWithModalField
                element={element?.options}
                formik={formik}
                isFieldArray={isFieldArray}
                arrayIndex={arrayIndex}
                fieldArrayName={fieldArrayName}
              />
            )}
            {element?.infoAlert && !formik.values[element?.name] && (
              <Alert
                variant="standard"
                sx={{
                  bgcolor: "background.default",
                  fontSize: isSm ? "0.55rem" : "0.75rem",
                  alignItems: "center",
                  padding: isSm ? "0.2rem" : "0.75rem",
                }}
                severity="info"
              >
                {element.infoAlert}
              </Alert>
            )}
            {element?.hasRadio && formik.values[element.name] && (
              <FormControl
                style={{
                  display: element?.radioDisplay,
                  flexDirection: element?.radioDirection,
                  alignItems: element?.radioAlign,
                  gap: element?.radioGap,
                }}
              >
                <FormLabel id="demo-radio-buttons-group-label">
                  {element.radioLabel}
                </FormLabel>
                <RadioGroup
                  row
                  name={element?.radioName}
                  value={formik.values[element.radioName]}
                  onChange={(event, value) => {
                    formik.setFieldValue(
                      element?.radioName,
                      event.target.value
                    );
                    formik.handleChange(element.radioName)(value); // Manually update Formik state
                  }}
                >
                  {element.radio.map((radio, i) => (
                    <FormControlLabel
                      value={radio.value}
                      control={<Radio />}
                      key={i}
                      label={radio.label}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            )}
            {element?.hasTrueRadio && formik.values[element.name] && (
              <FormControl
                style={{
                  display: element?.radioDisplay,
                  flexDirection: element?.radioDirection,
                  alignItems: element?.radioAlign,
                  gap: element?.radioGap,
                }}
              >
                <FormLabel id="demo-radio-buttons-group-label">
                  {element.radioLabel}
                </FormLabel>
                <RadioGroup
                  row
                  name={element?.radioName}
                  value={formik.values[element.radioName]}
                  onChange={(event, value) => {
                    formik.setFieldValue(
                      element?.radioName,
                      event.target.value
                    );
                    formik.handleChange(element.radioName)(value);
                  }}
                >
                  {element.radio.map((radio, i) => (
                    <FormControlLabel
                      value={radio.value}
                      control={<Radio />}
                      key={i}
                      label={radio.label}
                      checked={formik.values[element.radioName]?.includes(
                        radio.value
                      )}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            )}
          </div>
        );
      case "radio":
        return (
          <>
            <FormControl
              style={{
                display: element?.display,
                alignItems: element?.align,
                gap: element?.gap,
              }}
            >
              <FormLabel id="demo-radio-buttons-group-label">
                <Typography
                  color={
                    (formTouched && Boolean(formError) && "error") || "black"
                  }
                >
                  {element.label}
                </Typography>
              </FormLabel>
              <RadioGroup
                row
                name={element?.name}
                value={formik.values[element.name]}
                onChange={(event, value) => {
                  formik.handleChange(element.name)(value); // Manually update Formik state
                }}
                onError={formTouched && Boolean(formError)}
              >
                {element.radio.map((radio, i) => (
                  <FormControlLabel
                    value={radio.value}
                    control={<Radio />}
                    key={i}
                    label={radio.label}
                    disabled={
                      element.name === "accountStatementPeriod" &&
                      formik.values.isStandingInstructionForAutomaticTxn ===
                        "false"
                    }
                  />
                ))}
              </RadioGroup>

              {formTouched && Boolean(formError) && (
                <Typography color="error" fontSize="12px" marginBottom={1}>
                  {formTouched && formError}
                </Typography>
              )}
            </FormControl>

            {element.isDependent && formik.values[element?.name] === "true" ? (
              <RenderInput inputField={element.trueNewFields} formik={formik} />
            ) : (
              <RenderInput
                inputField={element.falseNewFields}
                formik={formik}
              />
            )}
          </>
        );
      case "date":
        return (
          <>
            <Typography
              variant="h5"
              sx={{
                color: theme.palette.text.default,
                fontWeight: 700,
                marginBottom: "0.1rem",
              }}
            >
              {element?.label}
            </Typography>
            <TextField
              name={element?.name}
              // label={element?.label}
              key={element?.value}
              type="date"
              variant="outlined"
              className="textfield-icon-input"
              fullWidth
              inputProps={{
                min: element.disablePast
                  ? new Date().toISOString().split("T")[0]
                  : "",
                max: element.maxDate ? element?.max : "",
              }}
              error={
                formik.touched[element?.name] &&
                Boolean(formik.errors[element?.name])
              }
              helperText={
                formik.touched[element?.name] && formik.errors[element?.name]
              }
              disabled={
                element.minDate ? !formik?.values[element?.minDate] : false
              }
              InputLabelProps={{ shrink: true }}
              value={formValues}
              onChange={formik.handleChange}
              size="small"
            />
          </>
        );
      case "asyncDropDownOption":
        return (
          <AsyncDropDownOption
            element={element}
            formik={formik}
            isFieldArray={isFieldArray}
          />
        );
      case "asyncDropDown":
        return (
          <div>
            <Typography
              variant="h5"
              sx={{
                color: theme.palette.text.default,
                fontWeight: 700,
                marginBottom: "0.1rem",
              }}
            >
              {element?.label}{" "}
              {element.required && <span style={{ color: "#EC4034" }}>*</span>}
            </Typography>
            <AsyncDropDown
              element={element}
              formik={formik}
              formVaues={formValues}
            />
            {/* <div>
              {element.isDependent &&
              formik.values[element?.name] &&
              !element?.isNeutral ? (
                <RenderInput
                  inputField={element.trueNewFields}
                  formik={formik}
                />
              ) : !element.isDependent &&
                formik.values[element?.name] &&
                !element?.isNeutral ? (
                <RenderInput
                  inputField={element?.falseNewFields}
                  formik={formik}
                />
              ) : (
                ""
              )}
            </div> */}
          </div>
        );
      default:
        return <TextField name={element?.name} label={element?.label} />;
    }
  };

  return (
    <div>
      <Grid container spacing={2} alignItems="flex-end">
        {inputField?.map((element, index) => {
          const isDisabled = element?.disableOnChange?.name.some(
            (item, i) =>
              element.disableOnChange.value[i] === formik.values[item]
          );

          return (
            <>
              <Grid
                item
                sm={element?.sm}
                xs={element?.xs || element?.sm}
                md={element?.md}
                lg={element?.lg}
                xl={element?.xl}
                mt={element?.mt}
                key={index}
              >
                {getComponentToRender(element, isDisabled, index)}
              </Grid>
              {element?.iconStart && (
                <style>{`
    .textfield-icon-input .css-185ye3j {
    left: 24px; !important;
    }
    .mobile-number-input .css-185ye3j {
    margin-left: 54px; !important;
    } 
    .css-j2iasn {
    border-color: purple !important;
    }
    .css-igs3ac{
    border-color: purple !important;
    }
    .css-1svrpdw {
    margin: 0px !important
    }
    .css-1xbz73f {
    margin-left: 0px !important
    }
    `}</style>
              )}
            </>
          );
        })}
      </Grid>
    </div>
  );
};

export default RenderInput;
