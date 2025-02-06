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
import BranchOwnerForm from "./BranchOwnerForm";
import { useBranchOwnerMemberForm } from "../../../../hooks/member/Member/BranchOwnerMember/useBranchOwnerMemberForm";
import BranchOwnerCardView from "./BranchOwnerCardView";
import { useSelector } from "react-redux";
import { DOC_URL } from "../../../../api/axiosInterceptor";
import PermissionButton from "../../../../components/Button/PermissionButton";
import MemberDocumentForm from "../MemberDocumentForm";
import NoDataFound from "../../../PageNotFound/NoDataFound";
import { useBranchOwnerFilterForm } from "../../../../hooks/member/MemberFilter/useBranchOwnerFilterForm";
import { CustomPaginationUpdated } from "../../../../components/Pagination/CustomPaginationUpdated";
import FilterBranchOwnerForm from "../MemberFilterForm/FilterBranchOwnerForm";
import {
  useLockUserForm,
  useUnLockUserForm,
} from "../../../../hooks/user/User/useLockUnlockUserForm";
import CustomDocumentView from "../../../../components/CustomTable/CustomDocumentView";

const BranchOwner = () => {
  const theme = useTheme();
  const view = useSelector((state) => state?.view?.mode);

  const [rowData, setRowData] = useState(null);
  const [isAddModalOpen, setIsAddModal] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [filteredData, setFilteredData] = useState(null);

  // const { mutate } = useDeleteBranch({ rowData });

  const onClose = () => {
    setIsAddModal(false);
  };
  const { formik, successFlag, loading } = useBranchOwnerMemberForm({
    onClose,
    rowData,
  });

  const handleModalClose = () => {
    formik.resetForm();
    setRowData(null);
    setIsAddModal(false);
    setIsEditModalOpen(false);
  };

  const { formik: filterFormik, loading: isLoading } = useBranchOwnerFilterForm(
    {
      memberData: (data) => setFilteredData(data),
      successFlag,
    }
  );

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
        accessorKey: "branch.address",
        header: "Branch",
        maxWidth: 80,
        sortable: false,
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
                      color={
                        row?.original?.user?.status === "ACTIVE"
                          ? "primary"
                          : "warning"
                      }
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
      {
        id: nanoid(),
        accessorKey: "salary",
        header: "Salary",
        size: 100,
        sortable: false,
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
                <BranchOwnerCardView
                  data={data}
                  setIsEditModalOpen={setIsEditModalOpen}
                  setRowData={setRowData}
                  setIsDocumentModalOpen={setIsDocumentModalOpen}
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
          Branch Owner
        </Typography>

        <PermissionButton
          label="Add Branch Owner"
          variant="outlined"
          onClick={() => setIsAddModal(true)}
          startIcon={<ControlPointRoundedIcon />}
          allowedUserTypes={["ADMIN"]}
          disabledUserTypes={[]}
        />
      </Box>

      <br />
      <FilterBranchOwnerForm filterFormik={filterFormik} />
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
        onClose={handleModalClose}
        width={"30%"}
        height={"auto"}
        maxHeight={"80vh"}
        header={"Add Branch Owner Details"}
        formik={formik}
        loading={loading}
        formComponent={
          <>
            <BranchOwnerForm formik={formik} rowData={rowData} />
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
        header={"Edit Branch Owner Detial"}
        formik={formik}
        loading={loading}
        isEditModalOpen={isEditModalOpen}
        formComponent={
          <>
            <BranchOwnerForm
              formik={formik}
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
    </>
  );
};

export default BranchOwner;
