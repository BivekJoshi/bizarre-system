import React, { useMemo, useState } from "react";
import { Box, Button, Grid, Typography, useTheme } from "@mui/material";
import FormModal from "../../../components/Modal/FormModal";
import CustomTable from "../../../components/CustomTable/CustomTable";
import { nanoid } from "nanoid";
import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";
import { useSelector } from "react-redux";
import AddSetting from "./AddSetting";
import { useGetSetting } from "../../../hooks/setting/useSetting";
import { useSettingForm } from "../../../hooks/setting/Setting/useSettingForm";
import SettingCardView from "./SettingCardView";
import NoDataFound from "../../PageNotFound/NoDataFound";

const Setting = () => {
  const theme = useTheme();
  const view = useSelector((state) => state?.view?.mode);
  const { data } = useGetSetting();

  const [rowData, setRowData] = useState(null);

  const [isAddModalOpen, setIsAddModal] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const onClose = () => setIsAddModal(false);
  const { formik, loading } = useSettingForm({ onClose, rowData });

  const editRow = (row) => {
    setIsAddModal(true);
    setRowData(row?.original);
  };

  const columns = useMemo(
    () => [
      {
        id: nanoid(),
        accessorKey: "value",
        header: "Value",
        maxWidth: 80,
        sortable: false,
      },
      {
        id: nanoid(),
        accessorKey: "setting",
        header: "Setting",
        maxWidth: 180,
        sortable: false,
      },
    ],
    []
  );

  const renderView = () => {
    if (!data?.content || data.content.length === 0) {
      return <NoDataFound />;
    }
    if (view === "table") {
      return (
        <CustomTable
          columns={columns}
          data={data?.content}
          overFlow={"scroll"}
          width={"100%"}
          enablePagination={true}
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
          {data?.content?.map((data, index) => {
            return (
              <Grid item xs={12} md={4} lg={4} sm={12} key={index}>
                <SettingCardView data={data} />
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
          Setting
        </Typography>
        {/* <Button
          variant="outlined"
          onClick={() => setIsAddModal(true)}
          startIcon={<ControlPointRoundedIcon />}
        >
          Add Setting
        </Button> */}
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

      <FormModal
        open={isAddModalOpen}
        onClose={() => setIsAddModal(false)}
        width={"30%"}
        height={"auto"}
        maxHeight={"80vh"}
        header={"Edit Setting"}
        formik={formik}
        loading={loading}
        isEditModalOpen={isAddModalOpen}
        formComponent={
          <>
            <AddSetting formik={formik} />
          </>
        }
        showButton={true}
      />
    </>
  );
};

export default Setting;
