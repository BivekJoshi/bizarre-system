import React, { useMemo, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Chip,
  CircularProgress,
  Collapse,
  Grid,
  Menu,
  MenuItem,
  Stack,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { nanoid } from "nanoid";
import maleProfile from "../../../assets/MaleProfile.png";
import femaleProfile from "../../../assets/FemaleProfile.png";
import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import CustomerForm from "./CustomerForm";
import { useCustomerForm } from "../../../hooks/customer/Customer/useCustomerForm";
import FormModal from "../../../components/Modal/FormModal";
import CustomTable from "../../../components/CustomTable/CustomTable";
import ConfirmationModal from "../../../components/Modal/ConfirmationModal";
import { useSelector } from "react-redux";
import { CustomPagination } from "../../../components/Pagination/CustomPagination";
import { DOC_URL } from "../../../api/axiosInterceptor";
import CustomerCardView from "./CustomerCardView";
import NoDataFound from "../../PageNotFound/NoDataFound";
import FilterCustomerForm from "./FilterCustomerForm";
import { useFilterCustomerForm } from "../../../hooks/customer/Customer/filterCustomer/useFilterCustomerForm";
import { CustomPaginationUpdated } from "../../../components/Pagination/CustomPaginationUpdated";
import VerfiedIcon from "@mui/icons-material/Verified";
import { useVerifyCustomer } from "../../../hooks/customer/useCustomer";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import CustomerUnboardForm from "./CustomerUnboardForm";
import { useCustomerOnBoardForm } from "../../../hooks/customer/Customer/CustomerOnBoard/useCustomerOnBoardForm";
import CustomerEditForm from "./CustomerEditForm";
import {
  useLockUserForm,
  useUnLockUserForm,
} from "../../../hooks/user/User/useLockUnlockUserForm";

const Customer = () => {
  const theme = useTheme();
  const view = useSelector((state) => state?.view?.mode);

  const [rowData, setRowData] = useState(null);
  const rowId = rowData?.id;
  const [isAddModalOpen, setIsAddModal] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCustomerOnBoardModalOpen, setIsCustomerOnBoardModalOpen] =
    useState(false);

  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);

  const [filteredData, setFilteredData] = useState(null);

  const { mutate: verifyCustomer } = useVerifyCustomer(rowId);

  const onClose = () => {
    setIsAddModal(false);
    setIsCustomerOnBoardModalOpen(false);
    setIsEditModalOpen(false);
  };
  const { formik, successFlag, loading } = useCustomerForm({
    onClose,
    rowData,
  });
  const handleModalClose = () => {
    formik.resetForm();
    setRowData(null);
    setIsAddModal(false);
    setIsEditModalOpen(false);
  };

  const { formik: filterFormik, loading: isLoading } = useFilterCustomerForm({
    customerData: (data) => setFilteredData(data),
    successFlag,
  });

  const { formik: onBoardFormik, loading: isLoadingOnBoard } =
    useCustomerOnBoardForm({ onClose });

  const deleteRow = (row) => {
    setRowData(row?.original?.id);
    setIsDeleteModalOpen(true);
  };

  const handleEnter = (row) => {
    setRowData(row?.original);
    setIsVerifyModalOpen(true);
  };

  const confimVerify = () => {
    verifyCustomer({
      onSuccess: () => {
        setIsVerifyModalOpen(false);
      },
    });
  };

  const editRow = (row) => {
    setIsEditModalOpen(true);
    setRowData(row?.original);
  };

  const columns = useMemo(
    () => [
      {
        id: nanoid(),
        header: "Name",
        sortable: false,
        Cell: ({ cell }) => {
          const data = cell.row.original?.user;
          const imageFinal = data?.profilePictureUrl
            ? DOC_URL + data?.profilePictureUrl
            : data?.gender === "MALE"
            ? maleProfile
            : data?.gender === "FEMALE"
            ? femaleProfile
            : null;
          return (
            <div style={{ display: "flex", gap: ".5rem" }}>
              <Avatar alt="Profile Image" src={imageFinal} />
              <p>{data?.fullName}</p>
            </div>
          );
        },
      },
      {
        id: nanoid(),
        accessorKey: "user.details",
        header: "User Details",
        size: 250,
        sortable: false,
        Cell: ({ row }) => {
          const { gender, birthDate, address, email, mobileNumber } =
            row.original.user;
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <div>
                <strong>Gender:</strong> {gender}
              </div>
              <div>
                <strong>DOB:</strong> {birthDate}
              </div>
              <div>
                <strong>Address:</strong> {address}
              </div>
              <div>
                <strong>Email:</strong> {email}
              </div>
              <div>
                <strong>Mobile:</strong> {mobileNumber}
              </div>
            </div>
          );
        },
      },
      {
        id: nanoid(),
        accessorKey: "verified",
        header: "Is Verified",
        maxWidth: 80,
        sortable: false,
        Cell: ({ cell }) => {
          const data = cell.getValue();
          return (
            <Chip
              avatar={
                <Avatar>{data ? <CheckCircleIcon /> : <CancelIcon />}</Avatar>
              }
              label={data ? "Verified" : "UnVerified"}
              color={data ? "success" : "error"}
            />
          );
        },
      },
      {
        id: nanoid(),
        accessorKey: "actions",
        header: "Status",
        size: 300,
        sortable: false,
        Cell: ({ row }) => {
          const userId = row?.original?.user?.id;
          const [anchorEl, setAnchorEl] = useState(null);
          const [showMessageInput, setShowMessageInput] = useState(false);
          const [choose, setChoose] = useState(null);

          const closeShowMessage = () => {
            setShowMessageInput(false);
          };
          const { formik: lockFormik, loading: lockLoading } = useLockUserForm({
            userId,
            closeShowMessage,
          });
          const { formik: unLockFormik, loading: unLockLoading } =
            useUnLockUserForm({ userId, closeShowMessage });

          const handleOpenMenu = (event) => {
            setAnchorEl(event.currentTarget);
          };

          const handleCloseMenu = () => {
            setAnchorEl(null);
          };

          const handleMenuItemClick = (status) => {
            setShowMessageInput(true);
            handleCloseMenu();
            setChoose(status);
          };

          const handleMessageSubmit = () => {
            if (choose === "LOCK") {
              lockFormik.handleSubmit();
            } else {
              unLockFormik.handleSubmit();
            }
          };

          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <Tooltip title="Change Status">
                    <Chip
                      label={row?.original?.user?.status}
                      onClick={handleOpenMenu}
                      style={{ cursor: "pointer" }}
                    />
                  </Tooltip>
                  {choose && <div>Change to {choose}</div>}
                </div>

                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleCloseMenu}
                >
                  {row?.original?.user?.status === "ACTIVE" ? (
                    <MenuItem onClick={() => handleMenuItemClick("LOCK")}>
                      Lock
                    </MenuItem>
                  ) : (
                    <MenuItem onClick={() => handleMenuItemClick("UNLOCK")}>
                      UnLock
                    </MenuItem>
                  )}
                </Menu>
              </div>
              <Collapse in={showMessageInput}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    marginTop: "0.5rem",
                  }}
                >
                  <TextField
                    label="Please enter reson"
                    variant="outlined"
                    size="small"
                    value={
                      lockFormik.values.reason ||
                      unLockFormik.values.reason ||
                      ""
                    }
                    onChange={(e) => {
                      const newValue = e.target.value;
                      if (choose === "LOCK") {
                        lockFormik.setFieldValue("reason", newValue);
                      } else if (choose === "UNLOCK") {
                        unLockFormik.setFieldValue("reason", newValue);
                      }
                    }}
                    fullWidth
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleMessageSubmit}
                  >
                    Submit
                  </Button>
                </div>
              </Collapse>
            </div>
          );
        },
      },
    ],
    []
  );

  const renderView = () => {
    if (isLoading) {
      return (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <CircularProgress />
        </Box>
      );
    }
    if (!filteredData?.content || filteredData.content.length === 0) {
      return <NoDataFound />;
    }

    if (view === "table") {
      return (
        <CustomTable
          columns={columns}
          data={filteredData.content}
          overFlow={"scroll"}
          width={"100%"}
          enablePagination={false}
          enableRowNumbers
          enableColumnActions
          enableEditing={true}
          // handleDeleteRow={deleteRow}
          handleEdit={editRow}
          handleEnter={handleEnter}
          enterIcon={<VerfiedIcon />}
          entertooltip={"Verify Customer"}
          enter
          edit
        />
      );
    } else {
      return (
        <Grid container spacing={2}>
          {filteredData.content.map((item, index) => (
            <Grid item xs={12} md={4} lg={4} sm={12} key={index}>
              <CustomerCardView
                data={item}
                setIsEditModalOpen={setIsEditModalOpen}
                setRowData={setRowData}
              />
            </Grid>
          ))}
        </Grid>
      );
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            color: theme.palette.text.default,
            fontWeight: 700,
          }}
        >
          Customer
        </Typography>
        <div style={{ display: "flex", gap: "1rem" }}>
          <Button
            variant="outlined"
            onClick={() => setIsAddModal(true)}
            startIcon={<ControlPointRoundedIcon />}
          >
            Add Customer
          </Button>
          <Button
            variant="contained"
            onClick={() => setIsCustomerOnBoardModalOpen(true)}
            startIcon={<ControlPointRoundedIcon />}
          >
            Customer Onboard
          </Button>
        </div>
      </Box>

      <br />
      <FilterCustomerForm filterFormik={filterFormik} />
      <br />
      <Box
        sx={{
          backgroundColor: theme.palette.background.default,
          padding: "1rem",
          marginTop: ".1rem",
        }}
      >
        {renderView()}
      </Box>

      <CustomPaginationUpdated
        totalPages={filteredData?.totalPages || 1}
        currentPage={filteredData?.pageable?.pageNumber + 1}
        rowsPerPage={filteredData?.pageable?.pageSize}
        totalElements={filteredData?.totalElements || 0}
        filterFormik={filterFormik}
      />

      <FormModal
        open={isAddModalOpen}
        onClose={handleModalClose}
        width={"30%"}
        height={"auto"}
        maxHeight={"80vh"}
        header={"Add Customer"}
        formik={formik}
        loading={loading}
        formComponent={
          <>
            <CustomerForm formik={formik} />
          </>
        }
        showButton={true}
      />
      <FormModal
        open={isEditModalOpen}
        onClose={handleModalClose}
        width={"30%"}
        height={"auto"}
        maxHeight={"80vh"}
        header={"Edit Customer Detial"}
        formik={formik}
        loading={loading}
        isEditModalOpen={isEditModalOpen}
        formComponent={
          <>
            <CustomerEditForm formik={formik} />
          </>
        }
        showButton={true}
      />
      <FormModal
        open={isCustomerOnBoardModalOpen}
        onClose={() => setIsCustomerOnBoardModalOpen(false)}
        width={"30%"}
        height={"auto"}
        maxHeight={"80vh"}
        header={"Customer Onboard"}
        formik={onBoardFormik}
        loading={isLoadingOnBoard}
        formComponent={
          <>
            <CustomerUnboardForm formik={onBoardFormik} />
          </>
        }
        showButton={true}
      />
      <ConfirmationModal
        disagreeLabel={"Yes, Delete !"}
        agreeLabel={"No, Keep It."}
        alertTitle={"Delete Alert"}
        header={"You're going to delete this Id?"}
        confirmhead={"Are you sure ?"}
        handleModalClose={() => setIsDeleteModalOpen(false)}
        isModalOpen={isDeleteModalOpen}
        // handleSave={() => mutate(rowData)}
        icon={
          <DeleteRoundedIcon
            sx={{
              backgroundColor: "#FFDDDC",
              borderRadius: "50%",
              fontSize: 36,
              padding: "1rem",
            }}
          />
        }
      />
      <ConfirmationModal
        disagreeLabel={"Yes, Confirm"}
        agreeLabel={"No, Don't Verify."}
        alertTitle={"Confirm !!!"}
        header={"Verify Customer"}
        confirmhead={"Are you sure ?"}
        handleModalClose={() => {
          setIsVerifyModalOpen(false);
          close();
        }}
        isModalOpen={isVerifyModalOpen}
        icon={
          <VerfiedIcon
            sx={{
              backgroundColor: "#a3fca1",
              borderRadius: "50%",
              fontSize: 36,
              padding: "1rem",
              color: "green",
            }}
          />
        }
        handleSave={confimVerify}
      />
    </>
  );
};

export default Customer;
