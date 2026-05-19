import React, { useMemo } from "react";

const BeanRain = ({ count = 18 }) => {
  const beans = useMemo(
    () =>
      Array.from({ length: count }).map(() => ({
        left: Math.random() * 100,
        duration: 9 + Math.random() * 12,
        delay: -Math.random() * 12,
        scale: 0.6 + Math.random() * 0.9,
      })),
    [count]
  );

  return (
    <div className="cb-bean-rain" aria-hidden="true">
      {beans.map((b, i) => (
        <span
          key={i}
          style={{
            left: `${b.left}%`,
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
            transform: `scale(${b.scale})`,
          }}
        />
      ))}
    </div>
  );
};

export default BeanRain;
