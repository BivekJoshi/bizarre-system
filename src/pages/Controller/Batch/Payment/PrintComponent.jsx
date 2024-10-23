import React, { forwardRef } from 'react';

const PrintableComponent = forwardRef((props, ref) => {
  return (
    <div ref={ref}>
      <h1>Hello</h1>
    </div>
  );
});

export default PrintableComponent;