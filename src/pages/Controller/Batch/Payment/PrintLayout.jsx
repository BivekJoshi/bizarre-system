// PrintLayout.js
import React from 'react';

const PrintLayout = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center' }}>Invoice</h1>
      <p>Date: 2024-10-22</p>
      <p>Customer Name: John Doe</p>
      <p>Items Purchased:</p>
      <ul>
        <li>Item 1: $10.00</li>
        <li>Item 2: $20.00</li>
        <li>Item 3: $15.00</li>
      </ul>
      <p style={{ fontWeight: 'bold' }}>Total Amount: $45.00</p>
      <p style={{ textAlign: 'center' }}>Thank you for your purchase!</p>
    </div>
  );
};

export default PrintLayout;
