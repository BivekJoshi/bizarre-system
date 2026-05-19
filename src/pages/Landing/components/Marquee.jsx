import React from "react";

const Marquee = ({ items = [] }) => {
  const loop = [...items, ...items];
  return (
    <div className="cb-marquee" role="presentation">
      <div className="cb-marquee__track">
        {loop.map((it, i) => (
          <span key={i}>
            {it}
            <i className="cb-marquee__dot" />
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
