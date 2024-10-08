import React, { useMemo, useState } from "react";
import { Avatar, Box, Grid, useTheme } from "@mui/material";
import { nanoid } from "nanoid";
import { useSelector } from "react-redux";
import CustomTable from "../../../../components/CustomTable/CustomTable";
import OrderProcessBaristaCard from "./OrderProcessBaristaCard";
import FormModal from "../../../../components/Modal/FormModal";
import OpenProcessModal from "./OpenProcessModal";
import { DOC_URL } from "../../../../api/axiosInterceptor";
import NoDataFound from "../../../PageNotFound/NoDataFound";

const OrderProcess = ({ orderData, refetch }) => {
  const theme = useTheme();
  const view = useSelector((state) => state?.view?.mode);

  const [rowId, setRowId] = useState(null);
  const [openProcessModal, setOpenProcessModal] = useState(false);

  const editRow = (row) => {
    setOpenProcessModal(true);
    setRowId(row?.original?.id);
  };

  const columns = useMemo(
    () => [
      {
        id: nanoid(),
        header: "Name",
        maxWidth: 80,
        sortable: false,
        Cell: ({ cell }) => {
          const data = cell.row.original?.item;
          const imageFinal = data?.itemImageUrl
            ? DOC_URL + data?.itemImageUrl
            : "";
          return (
            <div style={{ display: "flex", gap: ".5rem" }}>
              <Avatar variant="rounded" alt={data?.name} src={imageFinal} />
              <p>{data?.name}</p>
            </div>
          );
        },
      },
      {
        id: nanoid(),
        accessorKey: "remark",
        header: "Remark",
        maxWidth: 80,
        sortable: false,
      },
      {
        id: nanoid(),
        accessorKey: "item.description",
        header: "Description",
        maxWidth: 80,
        sortable: false,
      },
      {
        id: nanoid(),
        accessorKey: "item.stockCount",
        header: "Stock Count",
        maxWidth: 80,
        sortable: false,
        Cell: ({ cell }) => {
          const stockCount = cell.row.original?.item?.stockCount;
          const style = {
            color: stockCount < 10 ? "red" : "inherit",
          };
          return <p style={style}>{stockCount}</p>;
        },
      },
      {
        id: nanoid(),
        accessorKey: "item.type",
        header: "Type",
        maxWidth: 80,
        sortable: false,
      },
      {
        id: nanoid(),
        accessorKey: "status",
        header: "Status",
        maxWidth: 80,
        sortable: false,
      },
    ],
    []
  );

  const renderView = () => {
    if (!orderData?.content || orderData.content.length === 0) {
      return (
        <NoDataFound/>
      );
    }
    if (view === "table") {
      return (
        <CustomTable
          columns={columns}
          data={orderData?.content}
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
          {orderData?.content.map((item, index) => (
            <Grid item xs={12} md={4} lg={3} sm={12} key={index}>
              <OrderProcessBaristaCard data={item} setRowId={setRowId} />
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
          backgroundColor: theme.palette.background.default,
          padding: "1rem",
          marginTop: ".1rem",
        }}
      >
        {renderView()}
      </Box>

      <FormModal
        open={openProcessModal || rowId}
        onClose={() => {
          setOpenProcessModal(false);
          setRowId(null);
        }}
        width={"40%"}
        height={"auto"}
        maxHeight={"80vh"}
        header={"Order Process"}
        formComponent={
          <OpenProcessModal
            rowId={rowId}
            refetch={refetch}
            onClose={() => {
              setOpenProcessModal(false);
              setRowId(null);
            }}
          />
        }
        showButton={false}
      />
    </>
  );
};

export default OrderProcess;
