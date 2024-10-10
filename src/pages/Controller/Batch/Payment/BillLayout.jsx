import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { nanoid } from "nanoid";
import React, { useMemo } from "react";
import BizarreBrosLogo from "../../../../assets/BizarreBrosLogo.png";

const BillLayout = ({ data }) => {
  console.log("🚀 ~ BillLayout ~ data:", data);

  const columns = useMemo(
    () => [
      {
        id: nanoid(),
        accessorKey: "serialNumber",
        header: "S.N.",
        maxWidth: 40,
      },
      { id: nanoid(), accessorKey: "itemName", header: "Item", maxWidth: 80 },
      { id: nanoid(), accessorKey: "sellingPrice", header: "रु", maxWidth: 80 },
    ],
    []
  );

  return (
    <div style={{ color: "black" }}>
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
      <Box>
        <Table sx={{ borderCollapse: "collapse" }}>
          <TableBody>
            <TableRow>
              <TableCell sx={{ border: "none", padding: "7px" }}>
                Name :
              </TableCell>
              <TableCell sx={{ border: "none", padding: "7px" }}>
                Bivek Prasad Joshi
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ border: "none", padding: "7px" }}>
                Table :
              </TableCell>
              <TableCell sx={{ border: "none", padding: "7px" }}>
                Bivek Prasad Joshi
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ border: "none", padding: "7px" }}>
                Batch :
              </TableCell>
              <TableCell sx={{ border: "none", padding: "7px" }}>
                Bivek Prasad Joshi
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ border: "none", padding: "7px" }}>
                Mobile Number :
              </TableCell>
              <TableCell sx={{ border: "none", padding: "7px" }}>
                9865656565
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ border: "none", padding: "7px" }}>
                Attendent :
              </TableCell>
              <TableCell sx={{ border: "none", padding: "7px" }}>
                Bivek Prasad Joshi
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
                    sx={{ borderBottom: "1px solid #000",fontWeight:"bold" }}
                  >
                    {column.header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.orders.map((order, index) => (
                <TableRow key={nanoid()}>
                  <TableCell
                    sx={{ borderBottom: "1px solid #000", padding: "7px" }}
                  >
                    {index + 1} {/* Serial Number */}
                  </TableCell>
                  <TableCell
                    sx={{ borderBottom: "1px solid #000", padding: "7px"}}
                  >
                    {order.itemName}
                  </TableCell>
                  <TableCell
                    sx={{ borderBottom: "1px solid #000", padding: "7px" }}
                  >
                    	रु {" "} {order.sellingPrice}
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
                  रु {data?.totalBilled}
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
                  रु {data?.discount}
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
                  रु 78778.00
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box sx={{ textAlign: "center", width: "100%" }}>
        <br />
        <Typography>
          Declaration: I Agree To Pay The Above Total Amount According To Card
          Issuer Agreement
        </Typography>
      </Box>
      <Box sx={{ textAlign: "center", width: "100%" }}>
        <Typography>* Customer Copy *</Typography>
      </Box>
    </div>
  );
};

export default BillLayout;
