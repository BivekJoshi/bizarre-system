import React, { useEffect, useState } from "react";
import "./TypeWriter.css";
import RenderInput from "../../../../components/RenderInput/RenderInput";
import { useAIgenerateForm } from "../../../../hooks/chat/AIGenerate/useAIgenerateForm";
import { Button, CircularProgress } from "@mui/material";
import { nanoid } from "nanoid";

const Typewriter = ({ text, speed = 50 }) => {
  const [displayText, setDisplayText] = useState(""); // Start with empty string

  useEffect(() => {
    let i = 0; // Start from the first character
    setDisplayText(""); // Reset displayText on new text input

    const interval = setInterval(() => {
      if (i <= text.length) {
        setDisplayText((prev) => prev + text.charAt(i));
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
}
const AIGenerate = () => {
  const { formik, generateData, isLoading } = useAIgenerateForm({});
  console.log("🚀 ~ AIGenerate ~ isLoading:", isLoading);

  const inputField = [
    {
      id: nanoid(),
      name: "message",
      label: "Message",
      type: "text",
      required: true,
      xs: 12,
      md: 6,
      lg: 6,
      sm: 12,
    },
  ];

  return (
    <>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <>
          <RenderInput inputField={inputField} formik={formik} />
          <Button onClick={() => formik.handleSubmit()}>Submit</Button>
          <Typewriter text={generateData?.generation} speed={50} />
        </>
      )}
    </>
  );
};

export default AIGenerate;
