import React, { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

const WebSocketChat = () => {
  const [messages, setMessages] = useState([]); // State to store incoming messages
  console.log("🚀 ~ WebSocketChat ~ messages:", messages)
  const [inputMessage, setInputMessage] = useState(''); // State to store the input message
  const [stompClient, setStompClient] = useState(null); // State to manage stompClient instance

  useEffect(() => {
    // Set up SockJS and Stomp
    const socket = new SockJS("https://cafebizarre.com.np/test/ws");
    const stompClient = Stomp.over(socket);

    // Connect to the WebSocket server
    stompClient.connect(
      {},
      (frame) => {
        console.log("Connected:", frame);
        setStompClient(stompClient);

        // Subscribe to the specific topic for chat
        stompClient.subscribe(
          "/all/57a455d2-a385-4311-a32e-3b6f96a1858d",
          (message) => {
            console.log("Received message:", message.body);
            setMessages((prevMessages) => [...prevMessages, message.body]);
          }
        );
      },
      (error) => {
        console.error("STOMP connection error:", error);
      }
    );

    // Cleanup function to disconnect the client on component unmount
    return () => {
      if (stompClient && stompClient.connected) {
        stompClient.disconnect(() => {
          console.log("Disconnected");
        });
      }
    };
  }, []);

  // Function to handle input change
  const handleInputChange = (event) => {
    setInputMessage(event.target.value);
  };

  // Function to handle sending the message
  const sendMessage = () => {
    if (stompClient && stompClient.connected && inputMessage.trim() !== "") {
      stompClient.send(
        "/app/chat", // Your chat message endpoint
        {},
        JSON.stringify({ content: inputMessage })
      );
      setInputMessage(''); // Clear the input field
    }
  };

  // Function to handle Enter key press
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2>Chat Room</h2>
      <div
        id="messages"
        style={{
          border: "1px solid #ddd",
          padding: "10px",
          marginBottom: "10px",
          height: "300px",
          overflowY: "scroll"
        }}
      >
        {messages.map((message, index) => (
          <div key={index}>Received: {message}</div>
        ))}
      </div>

      <input
        type="text"
        value={inputMessage}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="Type a message..."
        style={{ width: "calc(100% - 70px)", marginRight: "10px" }}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default WebSocketChat;
