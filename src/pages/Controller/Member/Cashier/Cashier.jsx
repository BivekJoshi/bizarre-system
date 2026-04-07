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
import maleProfile from "../../../../assets/MaleProfile.png";
import femaleProfile from "../../../../assets/FemaleProfile.png";
import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";
import FormModal from "../../../../components/Modal/FormModal";
import CustomTable from "../../../../components/CustomTable/CustomTable";
import CashierForm from "./CashierForm";
import { useCashierMemberForm } from "../../../../hooks/member/Member/CashierMemeber/useCashierMemberForm";
import { useSelector } from "react-redux";
import CashierCardView from "./CashierCardView";
import { DOC_URL } from "../../../../api/axiosInterceptor";
import PermissionButton from "../../../../components/Button/PermissionButton";
import MemberDocumentForm from "../MemberDocumentForm";
import NoDataFound from "../../../PageNotFound/NoDataFound";
import { CustomPaginationUpdated } from "../../../../components/Pagination/CustomPaginationUpdated";
import { useCashierFilterForm } from "../../../../hooks/member/MemberFilter/useCashierFilterForm";
import FilterCashierForm from "../MemberFilterForm/FilterCashierForm";
import {
  useLockUserForm,
  useUnLockUserForm,
} from "../../../../hooks/user/User/useLockUnlockUserForm";
import CustomDocumentView from "../../../../components/CustomTable/CustomDocumentView";

const Cashier = () => {
  const theme = useTheme();
  const view = useSelector((state) => state?.view?.mode);

  const [rowData, setRowData] = useState(null);
  const [isAddModalOpen, setIsAddModal] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [filteredData, setFilteredData] = useState(null);

  // const { mutate } = useDeleteBranch({ rowData });

  const onClose = () => setIsAddModal(false);
  const { formik, successFlag, loading } = useCashierMemberForm({
    onClose,
    rowData,
  });

  const handleModalClose = () => {
    formik.resetForm();
    setRowData(null);
    setIsAddModal(false);
    setIsEditModalOpen(false);
  };

  const { formik: filterFormik, loading: isLoading } = useCashierFilterForm({
    memberData: (data) => setFilteredData(data),
    successFlag,
  });

  const deleteRow = (row) => {
    setRowData(row?.original?.id);
    setIsDeleteModalOpen(true);
  };

  const editRow = (row) => {
    setIsEditModalOpen(true);
    setRowData(row?.original);
  };

  const handleAddDocumentRow = (row) => {
    setIsDocumentModalOpen(true);
    setRowData(row?.original);
  };

  const STATUS_CONFIG = {
    ACTIVE: { color: "success", label: "Active" },
    LOCKED: { color: "error", label: "Locked" },
    INACTIVE: { color: "warning", label: "Inactive" },
  };

  const columns = useMemo(
    () => [
      {
        id: "name",
        header: "User",
        size: 200,
        Cell: ({ cell }) => {
          const data = cell.row.original?.user;
          const imageFinal = data?.profilePictureUrl
            ? DOC_URL + data?.profilePictureUrl
            : data?.gender === "MALE"
              ? maleProfile
              : femaleProfile;

          return (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Avatar
                src={imageFinal}
                sx={{
                  width: 40,
                  height: 40,
                  border: "1px solid",
                  borderColor: "divider",
                }}
              />
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                  {data?.fullName}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  ID: {data?.id?.slice(0, 8)}
                </Typography>
              </Box>
            </Box>
          );
        },
      },
      {
        id: "details",
        header: "Contact & Info",
        size: 280,
        Cell: ({ row }) => {
          const { gender, birthDate, address, email, mobileNumber } =
            row.original.user;
          return (
            <Box sx={{ display: "flex", flexDirection: "column", py: 0.5 }}>
              <Typography variant="body2" sx={{ display: "flex", gap: 1 }}>
                <span style={{ opacity: 0.6, minWidth: "50px" }}>Email:</span>{" "}
                {email}
              </Typography>
              <Typography variant="body2" sx={{ display: "flex", gap: 1 }}>
                <span style={{ opacity: 0.6, minWidth: "50px" }}>Phone:</span>{" "}
                {mobileNumber}
              </Typography>
              <Box sx={{ mt: 1, display: "flex", gap: 1 }}>
                <Chip
                  label={gender}
                  size="small"
                  variant="outlined"
                  sx={{ fontSize: "10px", height: "20px" }}
                />
                <Chip
                  label={birthDate}
                  size="small"
                  variant="outlined"
                  sx={{ fontSize: "10px", height: "20px" }}
                />
              </Box>
            </Box>
          );
        },
      },
      {
        id: "remarks",
        header: "Remarks",
        size: 200,
        Cell: ({ cell }) => {
          const { unlockedReason, lockedReason, status } =
            cell.row.original?.user;
          const isLocked = status === "LOCKED";
          const reason = isLocked ? lockedReason : unlockedReason;

          if (!reason)
            return (
              <Typography variant="caption" color="text.disabled">
                No remarks
              </Typography>
            );

          return (
            <Box sx={{ maxWidth: "100%" }}>
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 700,
                  display: "block",
                  color: isLocked ? "error.main" : "success.main",
                  mb: 0.5,
                }}
              >
                {isLocked ? "LOCKED REASON:" : "UNLOCK REASON:"}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontStyle: "italic",
                  whiteSpace: "normal",
                  wordBreak: "break-word",
                  overflowWrap: "anywhere",
                  color: "text.primary",
                  maxWidth: "inherit",
                }}
              >
                "{reason}"
              </Typography>
            </Box>
          );
        },
      },
      {
        accessorKey: "salary",
        header: "Monthly Salary",
        size: 140,
        sortable: true,
        Cell: ({ cell }) => {
          const amount = cell.getValue();
          return (
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography
                sx={{
                  fontWeight: 800,
                  color: "success.main",
                  fontSize: "1rem",
                }}
              >
                {amount ? `$${Number(amount).toLocaleString()}` : "—"}
              </Typography>
              <Typography variant="caption" color="text.disabled">
                Gross Pay
              </Typography>
            </Box>
          );
        },
      },
      {
        id: "status_actions",
        header: "Status Control",
        size: 320,
        Cell: ({ row }) => {
          // Logic remains exactly as you had it
          const userId = row?.original?.user?.id;
          const [anchorEl, setAnchorEl] = useState(null);
          const [showMessageInput, setShowMessageInput] = useState(false);
          const [choose, setChoose] = useState(null);

          const closeShowMessage = () => setShowMessageInput(false);
          const { formik: lockFormik } = useLockUserForm({
            userId,
            closeShowMessage,
            filterFormik,
          });
          const { formik: unLockFormik } = useUnLockUserForm({
            userId,
            closeShowMessage,
            filterFormik,
          });

          const handleOpenMenu = (event) => setAnchorEl(event.currentTarget);
          const handleCloseMenu = () => setAnchorEl(null);
          const handleMenuItemClick = (status) => {
            setShowMessageInput(true);
            handleCloseMenu();
            setChoose(status);
          };

          const handleMessageSubmit = () => {
            choose === "LOCK"
              ? lockFormik.handleSubmit()
              : unLockFormik.handleSubmit();
          };

          const currentStatus = row?.original?.user?.status;
          const statusStyle = STATUS_CONFIG[currentStatus] || {
            color: "default",
          };

          return (
            <Box sx={{ width: "100%" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Tooltip title="Click to change status">
                  <Chip
                    label={currentStatus}
                    color={statusStyle.color}
                    onClick={handleOpenMenu}
                    sx={{ fontWeight: 800, cursor: "pointer", px: 1 }}
                  />
                </Tooltip>

                {choose && showMessageInput && (
                  <Typography
                    variant="caption"
                    sx={{ fontWeight: 600, color: "primary.main" }}
                  >
                    → {choose}
                  </Typography>
                )}
              </Box>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
              >
                <MenuItem
                  onClick={() =>
                    handleMenuItemClick(
                      currentStatus === "ACTIVE" ? "LOCK" : "UNLOCK",
                    )
                  }
                >
                  {currentStatus === "ACTIVE" ? "Lock User" : "Unlock User"}
                </MenuItem>
              </Menu>

              <Collapse in={showMessageInput}>
                <Box
                  sx={{
                    display: "flex",
                    gap: 0.5,
                    mt: 1.5,
                    alignItems: "flex-start",
                  }}
                >
                  <TextField
                    placeholder="Reason..."
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={
                      lockFormik.values.reason ||
                      unLockFormik.values.reason ||
                      ""
                    }
                    onChange={(e) => {
                      const val = e.target.value;
                      choose === "LOCK"
                        ? lockFormik.setFieldValue("reason", val)
                        : unLockFormik.setFieldValue("reason", val);
                    }}
                    sx={{ "& .MuiInputBase-input": { fontSize: "12px" } }}
                  />
                  <Button
                    variant="contained"
                    size="small"
                    onClick={handleMessageSubmit}
                    sx={{ height: "37px", minWidth: "70px" }}
                  >
                    Submit
                  </Button>
                </Box>
              </Collapse>
            </Box>
          );
        },
      },
      {
        id: "documents",
        header: "Verified Documents",
        size: 260,
        sortable: false,
        Cell: ({ row }) => {
          const { idFrontUrl, idBackUrl } = row.original;

          return (
            <Box
              sx={{
                p: 1,
                borderRadius: 2,
                bgcolor: "grey.50",
                border: "1px solid",
                borderColor: "grey.200",
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  display: "block",
                  mb: 1,
                  fontWeight: 700,
                  color: "text.secondary",
                  textAlign: "center",
                }}
              >
                ID VERIFICATION
              </Typography>
              <CustomDocumentView
                idFrontUrl={idFrontUrl}
                idBackUrl={idBackUrl}
              />
            </Box>
          );
        },
      },
    ],
    [filterFormik], // Ensure dependencies are correct
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
          data={filteredData?.content}
          overFlow={"scroll"}
          width={"100%"}
          enablePagination={false}
          enableRowNumbers
          enableColumnActions
          // enableDelete
          // handleDeleteRow={deleteRow}
          // delete
          enableEditing={true}
          handleEdit={editRow}
          handleAddDocumentRow={handleAddDocumentRow}
          edit
          document
        />
      );
    } else {
      return (
        <Grid container spacing={2}>
          {filteredData?.content?.map((data, index) => {
            return (
              <Grid item xs={12} md={4} lg={4} sm={12} key={index}>
                <CashierCardView
                  data={data}
                  setIsEditModalOpen={setIsEditModalOpen}
                  setRowData={setRowData}
                />
              </Grid>
            );
          })}
        </Grid>
      );
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }} gap={1}>
      <FilterCashierForm
        filterFormik={filterFormik}
        setIsAddModal={setIsAddModal}
      />
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
        header={"Add Cashier"}
        formik={formik}
        loading={loading}
        formComponent={
          <>
            <CashierForm formik={formik} />
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
        header={"Edit Cashier Detial"}
        formik={formik}
        loading={loading}
        isEditModalOpen={isEditModalOpen}
        formComponent={
          <>
            <CashierForm
              formik={formik}
              rowData={rowData}
              isEditModalOpen={isEditModalOpen}
            />
          </>
        }
        showButton={true}
      />
      <FormModal
        open={isDocumentModalOpen}
        onClose={() => setIsDocumentModalOpen(false)}
        width={"30%"}
        height={"auto"}
        maxHeight={"80vh"}
        header={"Add Member Document"}
        // formik={formik}
        // loading={loading}
        formComponent={
          <>
            <MemberDocumentForm
              onClose={() => setIsDocumentModalOpen(false)}
              rowData={rowData?.id}
              filterFormik={filterFormik}
            />
          </>
        }
        showButton={false}
      />
    </Box>
  );
};

export default Cashier;
