import React, { useMemo, useState } from "react";
import { Box, Button, Grid, Typography, useTheme } from "@mui/material";
import FormModal from "../../../components/Modal/FormModal";
import CustomTable from "../../../components/CustomTable/CustomTable";
import { nanoid } from "nanoid";
import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";
import { useSelector } from "react-redux";
import { CustomPagination } from "../../../components/Pagination/CustomPagination";
import AddRedeemCode from "./AddRedeemCode";
import RedeemCodeCardView from "./RedeemCodeCardView";
import { useRedeemCodeForm } from "../../../hooks/redeemCode/RedeemCode/useRedeemCodeForm";
import { useGetRedeemCode } from "../../../hooks/redeemCode/useRedeemCode";

const RedeemCode = () => {
  const theme = useTheme();
  const view = useSelector((state) => state?.view?.mode);

  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [rowData, setRowData] = useState(null);
  const [isAddModalOpen, setIsAddModal] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { data } = useGetRedeemCode(pageNumber, pageSize);

  const onClose = () => {
    setIsAddModal(false);
    setIsEditModalOpen(false);
  };
  const { formik, loading } = useRedeemCodeForm({ onClose, rowData });

  const editRow = (row) => {
    setIsEditModalOpen(true);
    setRowData(row?.original);
  };

  const columns = useMemo(
    () => [
      {
        id: nanoid(),
        accessorKey: "code",
        header: "Code",
        maxWidth: 80,
        sortable: false,
      },
      {
        id: nanoid(),
        accessorKey: "league",
        header: "League",
        maxWidth: 80,
        sortable: false,
      },
      {
        id: nanoid(),
        accessorKey: "redeemableCoins",
        header: "Redeemable Coins",
        maxWidth: 80,
        sortable: false,
      },
      {
        id: nanoid(),
        accessorKey: "effectiveDateTime",
        header: "Effective Date Time",
        maxWidth: 80,
        sortable: false,
      },
      {
        id: nanoid(),
        accessorKey: "terminationDateTime",
        header: "Termination Date Time",
        maxWidth: 80,
        sortable: false,
      },
    ],
    []
  );

  const renderView = () => {
    if (view === "table") {
      return (
        <CustomTable
          columns={columns}
          data={data?.content}
          overFlow={"scroll"}
          width={"100%"}
          enablePagination={false}
          enableRowNumbers
          enableColumnActions
          enableEditing={true}
          handleEdit={editRow}
          edit
        />
      );
    } else {
      return (
        <Grid container spacing={2}>
          {data?.content?.map((item, index) => (
            <Grid item xs={12} md={4} lg={4} sm={12} key={index}>
              <RedeemCodeCardView data={item} />
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
          Redeem Code
        </Typography>
        <Button
          variant="outlined"
          onClick={() => setIsAddModal(true)}
          startIcon={<ControlPointRoundedIcon />}
        >
          Add Redeem Code
        </Button>
      </Box>

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

      <CustomPagination
        totalPages={data?.totalPages || 1}
        currentPage={pageNumber}
        onPageChange={setPageNumber}
        rowsPerPage={pageSize}
        onRowsPerPageChange={setPageSize}
      />

      <FormModal
        open={isAddModalOpen}
        onClose={() => setIsAddModal(false)}
        width={"30%"}
        height={"auto"}
        maxHeight={"80vh"}
        header={"Add Redeem Code"}
        formik={formik}
        loading={loading}
        formComponent={
          <>
            <AddRedeemCode formik={formik} />
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
        header={"Add Redeem Code"}
        formik={formik}
        loading={loading}
        formComponent={
          <>
            <AddRedeemCode formik={formik} />
          </>
        }
        showButton={true}
      />
    </>
  );
};

export default RedeemCode;
