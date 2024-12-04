import { Box, Button, Typography } from "@mui/material";
import React from "react";
import receiptlogo from "./receiptlogo.jpeg";

const BillRegerateLayout = ({ finalBill, onClose }) => {
  const handlePrint = () => {
    const printWindow = window.open("", "PRINT", "height=600,width=800");

    const displayRecord = finalBill
      .map((bill, index) => {
        // Map items for each bill
        const itemRows = bill.items
          .map(
            (item, idx) => `
                  <tr>
                    <td class="quantity line">${idx + 1}</td>
                    <td class="description line">${item.item}</td>
                    <td class="price line">रु${item.price.toFixed(2)}</td>
                  </tr>
                `
          )
          .join("");

        return `
              <div class="ticket">
                <div class="centered">
                  <img alt="Bizarre Bros Logo" src="https://cafebizarre.com.np/files/images/Bizarre-Bros-Outline-Black.png" style="width:50px; height:50px;display:block; margin:0 auto;" />
                  <h1>Bizarre Bros.</h1>
                  <h2>Cafe Bizarre</h2>
                  <p>Naxal, Kathmandu, Nepal</p>
                </div>
                <table>
                  <tr><td>Name:</td><td>${bill?.billingName || "NA"}</td></tr>
                  <tr><td>Table:</td><td>${bill?.tableNumber || "NA"}</td></tr>
                  <tr><td>Promo Code:</td><td>${
                    bill?.appliedPromoCode || "NA"
                  }</td></tr>
                  <tr><td>Attendant:</td><td>${
                    bill?.attendant || "NA"
                  }</td></tr>
                </table>
                <br />
                <table class="line">
                  <thead>
                    <tr>
                      <th>S.N.</th>
                      <th>Item</th>
                      <th>रु</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${itemRows}
                    <tr>
                      <td colspan="2">SUB TOTAL</td>
                      <td>रु ${bill?.totalBilled || "0"}</td>
                    </tr>
                    <tr>
                      <td colspan="2">DISCOUNT</td>
                      <td>रु ${bill?.discount || "0"}</td>
                    </tr>
                    <tr>
                      <td colspan="2">GRAND TOTAL</td>
                      <td>रु ${bill?.totalReceivable || "0"}</td>
                    </tr>
                  </tbody>
                </table>
                <p class="centered">Declaration: I agree to pay the total amount.</p>
                <p class="centered">* Customer Copy *</p>
                   <p class="centered">Billing Date : ${bill?.billingDate}</p>
              </div>
            `;
      })
      .join("");

    printWindow.document.write(`
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Receipt example</title>
            <style>
              * { font-size: 12px; font-family: "Times New Roman"; }
              h1 { font-size: 16px; margin: 5px; }
              h2, p { font-size: 12px; margin: 4px; }
              .centered { text-align: center; }
              .line { border-top: 1px solid black; border-collapse: collapse; }
              td, th { padding: 4px; }
              .ticket { width: 160px; max-width: 160px; margin-bottom: 20px; }
              @media print { .hidden-print { display: none !important; } }
            </style>
          </head>
          <body>
            ${displayRecord}
          </body>
        </html>
      `);

    // printWindow.document.close();
    // printWindow.focus();
    // printWindow.print();
    // printWindow.close();

    const images = printWindow.document.querySelectorAll("img");
    const promises = Array.from(images).map((img) => {
      return new Promise((resolve) => {
        img.onload = resolve;
        img.onerror = resolve; 
      });
    });

    Promise.all(promises).then(() => {
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    });
  };

  return (
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
  );
};

export default BillRegerateLayout;
