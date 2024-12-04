import {
  Box,
  Button,
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
import receiptlogo from "./receiptlogo.jpeg";

const BillLayout = ({ finalBill, onClose }) => {
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

  const handlePrint = () => {
    const printWindow = window.open("", "PRINT", "height=600,width=800");

    const itemRows = finalBill.items
      .map(
        (item, index) =>
          `<tr>
          <td class="quantity line">${index + 1}</td>
          <td class="description line">${item.item}</td>
          <td class="price line">रु${item.price.toFixed(2)}</td>
        </tr>`
      )
      .join("");

    printWindow.document.write(`
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Receipt example</title>
    <style>
      * {
        font-size: 12px;
        font-family: "Times New Roman";
      }

      h1 {
        font-size: 16px;
        margin: 5px;
      }

      h2 {
        font-size: 12px;
        margin: 5px;
      }

      p {
        margin: 4px;
      }

      img {
        width: 50px;
        display: inline-block;
      }

      td.line,
      th.line,
      tr.line,
      table.line {
        border-top: 1px solid black;
        border-collapse: collapse;
      }

      td.description,
      th.description {
        width: 80px;
        max-width: 80px;
      }

      td.bold,
      th.bold {
        font-weight: bold;
      }

      td.quantity,
      th.quantity {
        width: 25px;
        max-width: 25px;
        word-break: break-all;
      }

      td.price,
      th.price {
        width: 60px;
        max-width: 60px;
        word-break: break-all;
      }

      td.header-left {
        width: 60px;
        max-width: 60px;
        word-break: break-all;
      }
      td.header-right {
        width: 100px;
        max-width: 100px;
        word-break: break-all;
      }

      .centered {
        text-align: center;
        align-content: center;
      }

      .ticket {
        width: 160px;
        max-width: 160px;
      }

@media print {
  .hidden-print,
  .hidden-print * {
    display: none !important;
  }
}
    </style>
  </head>
  <body>
    <div class="ticket">
      <div class="centered">
        <img alt="Bizarre-Bros-Logo" src="https://cafebizarre.com.np/files/images/Bizarre-Bros-Outline-Black.png" style="width:50px; display:block; margin:0 auto;" />
      </div>
      <h1 class="centered">Bizarre Bros.</h1>
      <h2 class="centered">Cafe Bizarre</h2>
      <p class="centered">Naxal, Kathmandu, Nepal</p>
      <br />
      <table>
        <tr>
          <td class="header-left">Name:</td>
          <td class="header-right"> ${finalBill?.billingName || "NA"}</td>
        </tr>
        <tr>
          <td class="header-left">Table:</td>
          <td class="header-right">${finalBill?.tableNumber || "NA"}</td>
        </tr>
        <tr>
          <td class="header-left">Applied PromoCode :</td>
          <td class="header-right">${finalBill?.appliedPromoCode || "NA"}</td>
        </tr>
        <tr>
          <td class="header-left">Attendant:</td>
          <td class="header-right">${finalBill?.attendant || "NA"}</td>
        </tr>
      </table>
      <br />
      <table class="bill-detail line">
        <thead>
          <tr>
            <th class="quantity line">S.N.</th>
            <th class="description line">Item</th>
            <th class="price line">रु</th>
          </tr>
        </thead>
        <tbody>
          ${itemRows}
          <tr>
            <td colspan="2" class="description line bold">SUB TOTAL</td>
            <td class="price line">रु ${finalBill?.totalBilled || "0"}</td>
          </tr>
          <tr>
            <td colspan="2" class="description line bold">DISCOUNT</td>
            <td class="price line">रु ${finalBill?.discount || "0"}</td>
          </tr>
          <tr>
            <td colspan="2" class="description line bold">GRAND TOTAL</td>
            <td class="price line bold">रु ${
              finalBill?.totalReceivable || "0"
            }</td>
          </tr>
        </tbody>
      </table>
      <br />
      <p class="centered">
        Declaration: I Agree To Pay The Above Total Amount According To Card
        Issuer Agreement
      </p>
      <p class="centered">* Customer Copy *</p>
      <p class="centered">Billing Date : ${finalBill?.billingDate}</p>
    </div>
  </body>
</html>
    `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
    const logo = printWindow.document.getElementById("printLogo");

    function loadImagePromise(img) {
      return new Promise((resolve, reject) => {
        if (img.complete) {
          resolve(); // Image is already loaded
        } else {
          img.onload = () => resolve(); // Resolve when the image is loaded
          img.onerror = () => reject(new Error("Image failed to load")); // Reject on error
        }
      });
    }

    loadImagePromise(logo)
      .then(() => {
        // Image loaded successfully, proceed with printing
        printWindow.focus();
        printWindow.print();
        printWindow.close();
      })
      .catch((error) => {
        console.error("Error loading image:", error);
      });
  };

  return (
    <div style={{ color: "black" }}>
      {/* Existing content of the Bill */}
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
                    sx={{ borderBottom: "1px solid #000", fontWeight: "bold" }}
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
                    sx={{ borderBottom: "1px solid #000", padding: "7px" }}
                  >
                    {index + 1} {/* Serial Number */}
                  </TableCell>
                  <TableCell
                    sx={{ borderBottom: "1px solid #000", padding: "7px" }}
                  >
                    {order.item}
                  </TableCell>
                  <TableCell
                    sx={{ borderBottom: "1px solid #000", padding: "7px" }}
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
          Declaration: I Agree To Pay The Above Total Amount According To Card
          Issuer Agreement
        </Typography>
      </Box>
      <Box sx={{ textAlign: "center", width: "100%" }}>
        <Typography>* Customer Copy *</Typography>
      </Box>
      <Box sx={{ textAlign: "center", width: "100%" }}>
        <Typography>{finalBill?.billingDate}</Typography>
      </Box>
      {/* Bill details */}

      {/* Print button */}
      <Box
        sx={{
          margin: "20px 0",
          display: "flex",
          gap: "1rem",
          justifyContent: "center",
        }}
      >
        <Button variant="contained" color="primary" onClick={handlePrint}>
          Print Bill
        </Button>
        <Button variant="outlined" color="error" onClick={onClose}>
          Skip
        </Button>
      </Box>
    </div>
  );
};

export default BillLayout;
