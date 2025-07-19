import xmark from "../../assests/svgs/xmark.svg";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

const Chat = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hello! 👋 How can I assist you today?" }
  ]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null); // to scroll to bottom

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMsgGroq = async (message) => {
    const apiKey = "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";

    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [{ role: "user", content: message }],
        temperature: 0.7,
        max_tokens: 256,
      }),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error.message || "Error connecting to Groq");
    }

    const data = await res.json();
    return data.choices[0].message.content;
  };

  const handleSend = async () => {
    if (input.trim() === "") return;

    const userMessage = { from: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const botReplyText = await sendMsgGroq(input);
      const botReply = { from: "bot", text: botReplyText };
      setMessages((prev) => [...prev, botReply]);
    } catch (err) {
      const errorReply = { from: "bot", text: "Sorry, something went wrong. Try again later." };
      setMessages((prev) => [...prev, errorReply]);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px" }}>
        <img
          src={xmark}
          alt="xmark"
          style={{ cursor: "pointer", height: "30px" }}
          onClick={() => navigate(`/Home`)}
        />
        <h2 style={{ fontSize: "2rem", margin: 0 }}>Chat</h2>
      </div>

      {/* Chat Messages */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              alignSelf: msg.from === "user" ? "flex-end" : "flex-start",
              margin: "10px 0",
              fontSize: "16px",
              direction: "ltr",
              maxWidth: "75%",
            }}
          >
            <span
              style={{
                backgroundColor: msg.from === "user" ? "#DCF8C6" : "#eee",
                padding: "10px 15px",
                borderRadius: "15px",
                display: "inline-block",
                whiteSpace: "pre-wrap",
                textAlign: "left",
              }}
            >
              {msg.text}
            </span>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input Box */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          padding: "15px",
          borderTop: "1px solid #ccc",
        }}
      >
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
          style={{
            flex: 1,
            padding: "12px",
            borderRadius: "10px",
            border: "1px solid #ccc",
            fontSize: "16px",
            outline: "none",
          }}
        />
        <button
          onClick={handleSend}
          style={{
            padding: "12px 16px",
            borderRadius: "10px",
            backgroundColor: "#000",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          <i className="fa-solid fa-paper-plane" />
        </button>
      </div>
    </div>
  );
};

export default Chat;
