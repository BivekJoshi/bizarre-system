// import React, { useState } from "react";
// import {
//   Grid,
//   Card,
//   CardContent,
//   Typography,
//   CardMedia,
//   TextField,
//   IconButton,
//   Box,
//   ButtonGroup,
//   useTheme,
//   Chip,
//   Badge,
//   Button,
// } from "@mui/material";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import AddIcon from "@mui/icons-material/Add";
// import RemoveIcon from "@mui/icons-material/Remove";
// import { useGetItem } from "../../../hooks/item/useItem";
// import { DOC_URL } from "../../../api/axiosInterceptor";
// import { useOrderForm } from "../../../hooks/order/Order/useOrderForm";
// import { LoadingButton } from "@mui/lab";
// import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";
// import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";


// const OrderItem = ({ category, onClose }) => {
//   const theme = useTheme();
//   const [pageNumber, setPageNumber] = useState(1);
//   const [pageSize, setPageSize] = useState(10);

//   const { data: itemData } = useGetItem(pageNumber, pageSize);

//   const [selectedIds, setSelectedIds] = useState([]);
//   const [remarks, setRemarks] = useState({});
//   const [itemCounts, setItemCounts] = useState({});

//   const { formik, loading } = useOrderForm({
//     remarks,
//     selectedIds,
//     itemCounts,
//     onClose
//   });

//   const handleClick = (id) => {
//     setSelectedIds((prevSelected) =>
//       prevSelected.includes(id)
//         ? prevSelected.filter((selectedId) => selectedId !== id)
//         : [...prevSelected, id]
//     );
//   };

//   const handleRemarkChange = (id, value) => {
//     setRemarks((prevRemarks) => ({ ...prevRemarks, [id]: value }));
//   };

//   const handleCountChange = (id, increment) => {
//     setItemCounts((prevCounts) => ({
//       ...prevCounts,
//       [id]: Math.max(1, (prevCounts[id] || 1) + increment),
//     }));
//   };

//   return (
//     <Grid container spacing={3}>
//       {itemData?.content.map((item) => (
//         <Grid item xs={12} sm={6} md={2} key={item.id}>
//           <Card
//             onClick={() => handleClick(item.id)}
//             sx={{
//               cursor: "pointer",
//               position: "relative",
//               border: selectedIds.includes(item.id)
//                 ? "2px solid green"
//                 : "1px solid #ddd",
//               transition: "0.3s",
//               boxShadow: selectedIds.includes(item.id)
//                 ? "0 4px 12px rgba(0, 128, 0, 0.3)"
//                 : "none",
//             }}
//           >
//             <CardMedia
//               component="img"
//               height="140"
//               image={
//                 item.itemImageUrl
//                   ? `${DOC_URL}${item.itemImageUrl}`
//                   : "https://via.placeholder.com/150"
//               }
//               alt={item.name}
//             />

//             {item.stockCount <= 0 && (
//               <div
//                 style={{
//                   backgroundColor: "red",
//                   position: "absolute",
//                   top: 0,
//                   left: 0,
//                   color: "white",
//                   fontWeight: 900,
//                   padding: "5px",
//                   borderRadius: "0 0 8px 0",
//                 }}
//               >
//                 {item.stockCount <= 0 ? "Out of Stock" : null}
//               </div>
//             )}

//             <CardContent
//               sx={{
//                 backgroundColor: selectedIds.includes(item.id)
//                   ? theme.palette.background.alt
//                   : theme.palette.background.alt,
//               }}
//             >
//               <Typography
//                 variant="h6"
//                 sx={{
//                   color: theme.palette.text.default,
//                   fontWeight: 700,
//                   textAlign: "center",
//                 }}
//                 gutterBottom
//                 noWrap
//               >
//                 {item.name}
//               </Typography>
//               <Typography
//                 variant="subtitle1"
//                 color="textSecondary"
//                 textAlign="center"
//               >
//                 {`Price: Rs ${item.sellingPrice.toFixed(2)}`}
//               </Typography>
//               {selectedIds.includes(item.id) && (
//                 <Box
//                   display="flex"
//                   alignItems="center"
//                   justifyContent="space-between"
//                   mt={2}
//                 >
//                   <Typography variant="subtitle1">Quantity</Typography>
//                   <ButtonGroup size="small">
//                     <IconButton
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         handleCountChange(item.id, -1);
//                       }}
//                     >
//                       <RemoveIcon />
//                     </IconButton>
//                     <Chip label={itemCounts[item.id] || 1} color="primary" />
//                     <IconButton
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         handleCountChange(item.id, 1);
//                       }}
//                     >
//                       <AddIcon />
//                     </IconButton>
//                   </ButtonGroup>
//                 </Box>
//               )}
//             </CardContent>

//             {selectedIds.includes(item.id) && (
//               <IconButton
//                 sx={{
//                   position: "absolute",
//                   top: 10,
//                   right: 10,
//                   color: "green",
//                 }}
//               >
//                 <CheckCircleIcon />
//               </IconButton>
//             )}
//           </Card>

//           {selectedIds.includes(item.id) && (
//             <Box mt={2}>
//               <TextField
//                 fullWidth
//                 variant="outlined"
//                 label="Remark"
//                 size="small"
//                 value={remarks[item.id] || ""}
//                 onChange={(e) => handleRemarkChange(item.id, e.target.value)}
//               />
//             </Box>
//           )}
//         </Grid>
//       ))}

//       <Grid item xs={12}>
//         <Box display="flex" justifyContent="flex-end">
//           <Button
//             variant="outlined"
//             color="error"
//             sx={{marginRight:"1rem"}}
//             onClick={() => {
//               formik.handleReset();
//               onClose();
//             }}
//             startIcon={<HighlightOffRoundedIcon />}
//           >
//             Close
//           </Button>
//           <LoadingButton
//             loading={loading}
//             onClick={() => formik.handleSubmit()}
//             variant="contained"
//             startIcon={<ControlPointRoundedIcon />}
//             size="large"
//           >
//             Place Order
//           </LoadingButton>
//         </Box>
//       </Grid>
//     </Grid>
//   );
// };

// export default OrderItem;


import React, { useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardMedia,
  TextField,
  IconButton,
  Box,
  ButtonGroup,
  useTheme,
  Chip,
  Badge,
  Button,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useGetItem } from "../../../hooks/item/useItem";
import { DOC_URL } from "../../../api/axiosInterceptor";
import { useOrderForm } from "../../../hooks/order/Order/useOrderForm";
import { LoadingButton } from "@mui/lab";
import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";

const OrderItem = ({ category, onClose }) => {
  const theme = useTheme();
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data: itemData } = useGetItem(pageNumber, pageSize);

  const [selectedIds, setSelectedIds] = useState([]);
  const [remarks, setRemarks] = useState({});
  const [itemCounts, setItemCounts] = useState({});

  const { formik, loading } = useOrderForm({
    remarks,
    selectedIds,
    onClose,
  });

  const handleClick = (id) => {
    setSelectedIds((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((selectedId) => selectedId !== id)
        : [...prevSelected, id]
    );
  };

  const handleRemarkChange = (id, index, value) => {
    setRemarks((prevRemarks) => ({
      ...prevRemarks,
      [id]: {
        ...prevRemarks[id],
        [index]: value,
      },
    }));
  };

  const handleCountChange = (id, increment) => {
    setItemCounts((prevCounts) => ({
      ...prevCounts,
      [id]: Math.max(1, (prevCounts[id] || 1) + increment),
    }));
  };

  return (
    <Grid container spacing={3}>
      {itemData?.content.map((item) => (
        <Grid item xs={12} sm={6} md={2} key={item.id}>
          <Card
            onClick={() => handleClick(item.id)}
            sx={{
              cursor: "pointer",
              position: "relative",
              border: selectedIds.includes(item.id)
                ? "2px solid green"
                : "1px solid #ddd",
              transition: "0.3s",
              boxShadow: selectedIds.includes(item.id)
                ? "0 4px 12px rgba(0, 128, 0, 0.3)"
                : "none",
            }}
          >
            <CardMedia
              component="img"
              height="140"
              image={
                item.itemImageUrl
                  ? `${DOC_URL}${item.itemImageUrl}`
                  : "https://via.placeholder.com/150"
              }
              alt={item.name}
            />

            {item.stockCount <= 0 && (
              <div
                style={{
                  backgroundColor: "red",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  color: "white",
                  fontWeight: 900,
                  padding: "5px",
                  borderRadius: "0 0 8px 0",
                }}
              >
                {item.stockCount <= 0 ? "Out of Stock" : null}
              </div>
            )}

            <CardContent
              sx={{
                backgroundColor: selectedIds.includes(item.id)
                  ? theme.palette.background.alt
                  : theme.palette.background.alt,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: theme.palette.text.default,
                  fontWeight: 700,
                  textAlign: "center",
                }}
                gutterBottom
                noWrap
              >
                {item.name}
              </Typography>
              <Typography
                variant="subtitle1"
                color="textSecondary"
                textAlign="center"
              >
                {`Price: Rs ${item.sellingPrice.toFixed(2)}`}
              </Typography>
              {selectedIds.includes(item.id) && (
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  mt={2}
                >
                  <Typography variant="subtitle1">Quantity</Typography>
                  <ButtonGroup size="small">
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCountChange(item.id, -1);
                      }}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <Chip label={itemCounts[item.id] || 1} color="primary" />
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCountChange(item.id, 1);
                      }}
                    >
                      <AddIcon />
                    </IconButton>
                  </ButtonGroup>
                </Box>
              )}
            </CardContent>

            {selectedIds.includes(item.id) && (
              <IconButton
                sx={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  color: "green",
                }}
              >
                <CheckCircleIcon />
              </IconButton>
            )}
          </Card>

          {selectedIds.includes(item.id) && (
            <Box mt={2}>
              {[...Array(itemCounts[item.id] || 1)].map((_, index) => (
                <Box key={`${item.id}-remark-${index}`} mb={2}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label={`Remark ${index + 1}`}
                    size="small"
                    value={remarks[item.id]?.[index] || ""}
                    onChange={(e) =>
                      handleRemarkChange(item.id, index, e.target.value)
                    }
                  />
                </Box>
              ))}
            </Box>
          )}
        </Grid>
      ))}

      <Grid item xs={12}>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="outlined"
            color="error"
            sx={{ marginRight: "1rem" }}
            onClick={() => {
              formik.handleReset();
              onClose();
            }}
            startIcon={<HighlightOffRoundedIcon />}
          >
            Close
          </Button>
          <LoadingButton
            loading={loading}
            onClick={() => formik.handleSubmit()}
            variant="contained"
            startIcon={<ControlPointRoundedIcon />}
            size="large"
          >
            Place Order
          </LoadingButton>
        </Box>
      </Grid>
    </Grid>
  );
};

export default OrderItem;
