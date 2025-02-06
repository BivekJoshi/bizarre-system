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
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { nanoid } from "nanoid";
import maleProfile from "../../../assets/MaleProfile.png";
import femaleProfile from "../../../assets/FemaleProfile.png";
import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";
import CustomerForm from "./CustomerForm";
import {
  useCustomerEditForm,
  useCustomerForm,
} from "../../../hooks/customer/Customer/useCustomerForm";
import FormModal from "../../../components/Modal/FormModal";
import CustomTable from "../../../components/CustomTable/CustomTable";
import { useSelector } from "react-redux";
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
import {
  MonetizationOn,
  AccountBalance,
  EmojiEvents,
  Star,
} from "@mui/icons-material";
import HexagonIcon from "@mui/icons-material/Hexagon";

const Customer = () => {
  const theme = useTheme();
  const view = useSelector((state) => state?.view?.mode);

  const [rowData, setRowData] = useState(null);
  const rowId = rowData?.id;
  const [isAddModalOpen, setIsAddModal] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
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
  const {
    formik: formikEdit,
    successFlag: editSuccessFlag,
    loading: editLoading,
  } = useCustomerEditForm({
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
    editSuccessFlag,
  });

  const { formik: onBoardFormik, loading: isLoadingOnBoard } =
    useCustomerOnBoardForm({ onClose });

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
          const coins = cell.row.original?.coins;

          const imageFinal = data?.profilePictureUrl
            ? DOC_URL + data?.profilePictureUrl
            : data?.gender === "MALE"
            ? maleProfile
            : data?.gender === "FEMALE"
            ? femaleProfile
            : null;
          return (
            <div
              style={{ display: "flex", gap: ".5rem", alignItems: "center" }}
            >
              <Avatar alt="Profile Image" src={imageFinal} />
              <div
                style={{ display: "flex", flexDirection: "column", gap: "1px" }}
              >
                {data?.fullName}
                <p>
                  Coins: <b style={{ color: "purple" }}>{coins}</b>
                </p>
              </div>
            </div>
          );
        },
      },
      {
        id: nanoid(),
        accessorKey: "league",
        header: "League",
        maxWidth: 80,
        sortable: false,
        Cell: ({ cell }) => {
          const league = cell.getValue();
          const getIconAndColor = (league) => {
            switch (league) {
              case "SILVER":
                return { icon: <Star />, color: "#C0C0C0" };
              case "GOLD":
                return { icon: <EmojiEvents />, color: "#FFD700" };
              case "PLATINUM":
                return { icon: <AccountBalance />, color: "#E5E4E2" };
              case "BRONZE":
                return { icon: <HexagonIcon />, color: "#CD7F32" };
              default:
                return { icon: <MonetizationOn />, color: "#2196f3" };
            }
          };
          const { icon, color } = getIconAndColor(league);
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <Avatar
                style={{
                  backgroundColor: color,
                  width: 46,
                  height: 46,
                  color: "#fff",
                }}
              >
                {icon}
              </Avatar>

              <Typography sx={{ fontWeight: "bold", color: color }}>
                {league}
              </Typography>
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
          const { verified, verifiedBy } = cell?.row?.original;
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <Chip
                avatar={
                  <Avatar>
                    {verified ? <CheckCircleIcon /> : <CancelIcon />}
                  </Avatar>
                }
                label={verified ? "Verified" : "UnVerified"}
                color={verified ? "success" : "error"}
              />
              <Typography sx={{ fontWeight: "bold", color: "green" }}>
                {verifiedBy?.fullName || ""}
              </Typography>
            </div>
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
            filterFormik,
          });
          const { formik: unLockFormik, loading: unLockLoading } =
            useUnLockUserForm({ userId, closeShowMessage, filterFormik });

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
              //
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
                      color={
                        row?.original?.user?.status === "ACTIVE"
                          ? "primary"
                          : "warning"
                      }
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
      {
        id: nanoid(),
        header: "Remarks",
        sortable: false,
        Cell: ({ cell }) => {
          const remark = cell.row.original?.user;
          const { unlockedReason, lockedReason, status } = remark;
          return (
            <div>
              {status === "LOCKED" ? (
                <>
                  Locked Reason:{" "}
                  <span style={{ color: "orange" }}>{lockedReason}</span>
                </>
              ) : (
                unlockedReason && (
                  <>
                    UnLock Reason:{" "}
                    <span style={{ color: "green" }}>{unlockedReason}</span>
                  </>
                )
              )}
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
        formik={formikEdit}
        loading={editLoading}
        isEditModalOpen={isEditModalOpen}
        formComponent={
          <>
            <CustomerEditForm formik={formikEdit} />
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
    </>
  );
};

export default Customer;
