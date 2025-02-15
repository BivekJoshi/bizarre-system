import { useEffect, useState } from "react";

const Typewriter = ({ text="", speed = 50,isLoading }) => {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    setDisplayText(""); 
    let i = 0;

    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayText(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <div className="wrapper">
      <div className="typing-demo">{displayText}</div>
    </div>
  );
};

export default Typewriter;
