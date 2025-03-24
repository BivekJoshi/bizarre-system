import React, { useMemo } from "react";
import { useGetRegenerateBillByBatchId } from "../../../../hooks/batch/usebatch";
import BillLayout from "../Payment/BillLayout";
import BillRegerateLayout from "../Payment/BillRegerateLayout";
import BizarreBrosLogo from "../../../../assets/BizarreBrosLogo.png";
import {
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { nanoid } from "nanoid";

const ReGenerateBillModal = ({ batchId, onClose }) => {
  const { data: regenerateBillData, isLoading } =
    useGetRegenerateBillByBatchId(batchId);
  const finalBill = regenerateBillData?.data || [];
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          gap: "1rem",
          alignItems: "center",
        }}
      >
        <div style={{ width: "100px", height: "80px" }}>
          <img
            src={BizarreBrosLogo}
            style={{ width: "100%", height: "100%" }}
            alt="Bizarre Bros Logo"
          />
        </div>
        <div>
          <Typography variant="h3" sx={{ fontWeight: "bold" }}>
            Bizarre Bros.
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Cafe Bizarre
          </Typography>
        </div>
      </Box>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h5">Naxal, Kathmandu, Nepal</Typography>
      </Box>
      <br />
      {isLoading ? (
        <CircularProgress />
      ) : (
        <BillLayoutDesign finalBill={finalBill} />
      )}

      <BillRegerateLayout
        finalBill={regenerateBillData?.data}
        onClose={onClose}
      />
    </>
  );
};

const BillLayoutDesign = ({ finalBill }) => {
  const columns = useMemo(
    () => [
      {
        id: nanoid(),
        accessorKey: "serialNumber",
        header: "S.N.",
        maxWidth: 40,
      },
      { id: nanoid(), accessorKey: "item", header: "Item", maxWidth: 80 },
      { id: nanoid(), accessorKey: "price", header: "रु", maxWidth: 80 },
    ],
    []
  );
  return (
    <>
      {finalBill?.map((finalBill, index) => {
        return (
          <div key={index}>
            <Box>
              <Table sx={{ borderCollapse: "collapse" }}>
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ border: "none", padding: "7px" }}>
                      Name :
                    </TableCell>
                    <TableCell sx={{ border: "none", padding: "7px" }}>
                      {finalBill?.billingName || "NA"}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ border: "none", padding: "7px" }}>
                      Table :
                    </TableCell>
                    <TableCell sx={{ border: "none", padding: "7px" }}>
                      {finalBill?.tableNumber || "NA"}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ border: "none", padding: "7px" }}>
                      Applied PromoCode :
                    </TableCell>
                    <TableCell sx={{ border: "none", padding: "7px" }}>
                      {finalBill?.appliedPromoCode || "NA"}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ border: "none", padding: "7px" }}>
                      Mobile Number :
                    </TableCell>
                    <TableCell sx={{ border: "none", padding: "7px" }}>
                      {finalBill?.mobileNumber || "NA"}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ border: "none", padding: "7px" }}>
                      Attendant :
                    </TableCell>
                    <TableCell sx={{ border: "none", padding: "7px" }}>
                      {finalBill?.attendant || "NA"}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>

            <Box>
              <TableContainer sx={{ maxHeight: 300, overflowY: "auto" }}>
                <Table sx={{ borderCollapse: "collapse" }}>
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align="left"
                          sx={{
                            borderBottom: "1px solid #000",
                            fontWeight: "bold",
                          }}
                        >
                          {column.header}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {finalBill?.items.map((order, index) => (
                      <TableRow key={nanoid()}>
                        <TableCell
                          sx={{
                            borderBottom: "1px solid #000",
                            padding: "7px",
                          }}
                        >
                          {index + 1}
                        </TableCell>
                        <TableCell
                          sx={{
                            borderBottom: "1px solid #000",
                            padding: "7px",
                          }}
                        >
                          {order.item}
                        </TableCell>
                        <TableCell
                          sx={{
                            borderBottom: "1px solid #000",
                            padding: "7px",
                          }}
                        >
                          रु {order.price || "0"}
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell
                        sx={{ borderBottom: "1px solid #000", padding: "7px" }}
                      ></TableCell>
                      <TableCell
                        sx={{
                          borderBottom: "1px solid #000",
                          padding: "7px",
                          fontWeight: "bold",
                        }}
                      >
                        SUB TOTAL
                      </TableCell>
                      <TableCell
                        sx={{ borderBottom: "1px solid #000", padding: "7px" }}
                      >
                        रु {finalBill?.totalBilled || "0"}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        sx={{ borderBottom: "1px solid #000", padding: "7px" }}
                      ></TableCell>
                      <TableCell
                        sx={{
                          borderBottom: "1px solid #000",
                          padding: "7px",
                          fontWeight: "bold",
                        }}
                      >
                        DISCOUNT
                      </TableCell>
                      <TableCell
                        sx={{ borderBottom: "1px solid #000", padding: "7px" }}
                      >
                        रु {finalBill?.discount || "0"}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        sx={{ borderBottom: "1px solid #000", padding: "7px" }}
                      ></TableCell>
                      <TableCell
                        sx={{
                          borderBottom: "1px solid #000",
                          padding: "7px",
                          fontWeight: "bold",
                        }}
                      >
                        GRAND TOTAL
                      </TableCell>
                      <TableCell
                        sx={{
                          borderBottom: "1px solid #000",
                          padding: "7px",
                          fontWeight: "bold",
                        }}
                      >
                        रु {finalBill?.totalReceivable || "0"}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
            <Box sx={{ textAlign: "center", width: "100%" }}>
              <br />
              <Typography>
                Declaration: I Agree To Pay The Above Total Amount According To
                Card Issuer Agreement
              </Typography>
            </Box>
            <Box sx={{ textAlign: "center", width: "100%" }}>
              <Typography>* Customer Copy *</Typography>
            </Box>
            <Box sx={{ textAlign: "center", width: "100%" }}>
              <Typography>{finalBill?.billingDate}</Typography>
            </Box>
          </div>
        );
      })}
    </>
  );
};
export default ReGenerateBillModal;
