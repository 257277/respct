import React, { useState, useRef, useEffect } from "react";
import { Input, FormControl, Button, Box } from "@chakra-ui/react";
import Styles from "../pages/style/message.module.css";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

export default function Message() {
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();
  const messageAreaRef = useRef(null);
const [totalconversation,settotalconversation]=useState(JSON.parse(sessionStorage.getItem("numberofMessage")));
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  function scrollToBottom() {
    if (messageAreaRef.current) {
      messageAreaRef.current.scrollTop = messageAreaRef.current.scrollHeight;
    }
  }

  async function sendMsg() {
    let token = JSON.parse(sessionStorage.getItem("token"));
    if (token === undefined) {
      alert("Please login first!");
      navigate("/");
    } else if(JSON.parse(sessionStorage.getItem("numberofMessage"))>=25)
    {
      alert("Your conversion limit is expired");
      sessionStorage.clear();
      navigate("/");
    }else {
      try {
        let res = await fetch("http://127.0.0.1:5002/generate-message", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ prompt: msg }),
        });
        if (res.ok) {
          let r = await res.json();
          console.log(JSON.stringify(r.response));
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: msg, type: "outgoing" },
            { text: r.response, type: "incoming" },
          ]);
        }
        sessionStorage.setItem("numberofMessage",JSON.parse(sessionStorage.getItem("numberofMessage"))+1);
      } catch (err) {
        alert("Something went wrong. Please try again");
        console.log(err);
      }
    }
  }

  return (
    <div>
      <Navbar />
      <div className={Styles.message__area} ref={messageAreaRef}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={
              message.type === "outgoing" ? Styles.outgoing : Styles.incoming
            }
          >
            {message.text}
          </div>
        ))}
      </div>
      <Box
        position="fixed"
        bottom="0"
        left="0"
        width="100%"
        p={4}
        bgColor="white"
        boxShadow="md"
      >
        <FormControl isRequired>
          <Input
            type="text"
            placeholder="Enter the message"
            w={"80%"}
            float={"left"}
            ml={"3%"}
            onChange={(e) => {
              setMsg(e.target.value);
            }}
          />
          <Button colorScheme="blue" type="submit" onClick={sendMsg}>
            Send
          </Button>
        </FormControl>
      </Box>
    </div>
  );
}
