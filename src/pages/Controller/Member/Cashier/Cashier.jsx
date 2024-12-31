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
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import FormModal from "../../../../components/Modal/FormModal";
import CustomTable from "../../../../components/CustomTable/CustomTable";
import ConfirmationModal from "../../../../components/Modal/ConfirmationModal";
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
      {
        id: nanoid(),
        accessorKey: "documents",
        header: "Documents",
        size: 250,
        sortable: false,
        Cell: ({ row }) => {
          const { idFrontUrl, idBackUrl } = row.original;
          return (
            <CustomDocumentView idFrontUrl={idFrontUrl} idBackUrl={idBackUrl} />
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
          Cashier Member
        </Typography>

        <PermissionButton
          label="Add Cashier"
          variant="outlined"
          onClick={() => setIsAddModal(true)}
          startIcon={<ControlPointRoundedIcon />}
          allowedUserTypes={["BRANCH_OWNER"]}
          disabledUserTypes={["ADMIN"]}
        />
      </Box>

      <br />
      <FilterCashierForm filterFormik={filterFormik} />
      <br />

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
        onClose={() => setIsAddModal(false)}
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
        onClose={() => setIsEditModalOpen(false)}
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
            />
          </>
        }
        showButton={false}
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
    </>
  );
};

export default Cashier;
