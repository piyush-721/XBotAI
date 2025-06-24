import React, { useState, useEffect, useRef } from "react";
import styles from "./Home.module.css";
import newChatLogo from "../../Assets/new-chat-logo.png";
import edit from "../../Assets/edit.png";
import logo from "../../Assets/center-logo.png";
import data from "../../ApiData/apiData.json";
import { FiAlignJustify } from "react-icons/fi";
import ChatCard from "../../Components/ChatCard/ChatCard";
import { useNavigate } from "react-router-dom";


function Home() {
  const [questionList, setQuestionList] = useState([]); // from json data
  const [defaultQuestions, setDefaultQuestions] = useState([]); // 4 questions default cards
  const [showLeft, setShowLeft] = useState(window.innerWidth > 768); // to show left container or not
  const [submittedQuestions, setSubmittedQuestions] = useState([]); // user and bots messages
  const [message, setMessage] = useState(""); // for the input
  const chatRef = useRef(null); // it actually stores reference of the entire element
  const navigate = useNavigate();

  useEffect(() => {
    setDefaultQuestions(data.slice(-4));
    setQuestionList(data);
  }, []);

//   console.log(defaultQuestions);
//   console.log(questionList);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [submittedQuestions]);

  useEffect(() => {
    localStorage.setItem("chatData", JSON.stringify(submittedQuestions));
  }, [submittedQuestions]);

  const handleAsk = () => {
    if (!message.trim()) return;

    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const userMessage = {
      id: Date.now(),
      sender: "user",
      message,
      time,
    };
    const matched = data.find((item) => item.question === message);
    const botReply = {
      id: Date.now() + 1,
      sender: "ai",
      message: matched ? matched.response : "Sorry, Did not understand your query!",
      time,
      rating: null,
      feedback: "",
    };
    setSubmittedQuestions((prev) => [...prev, userMessage, botReply]);
    setMessage("");
  };
//   console.log(submittedQuestions);

  const addUserAndBotMessages = (question) => {
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const userMessage = { id: Date.now(), sender: "user", message: question, time };
    const matched = data.find((item) => item.question === question);
    const botReply = {
      id: Date.now() + 1,
      sender: "ai",
      message: matched ? matched.response : "Sorry, Did not understand your query!",
      time,
      rating: null,
      feedback: "",
    };
    setSubmittedQuestions((prev) => [...prev, userMessage, botReply]);
  };

  const handleEdit = () => {
    setSubmittedQuestions([]);
    navigate("/");
  }

  const handlePastConversations = () => {
    navigate("/history");
  }

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <button className={styles.toggleButton} onClick={() => setShowLeft(!showLeft)}>
          <FiAlignJustify />
        </button>
      </div>

      {showLeft && (
        <div className={styles.leftContainer}>
          <div className={styles.leftInnerContainer}>
            <div className={styles.newChat}>
              <img className={styles.newChatLogo} src={newChatLogo} alt="logo" />
              <a style={{textDecoration:"none", color:"#000000"}} href="/">
              <h3 >New Chat</h3>
              </a>
              <a href="/">
              <img onClick={handleEdit} className={styles.edit} src={edit} alt="edit button" />
              </a>
            </div>
            <div onClick={handlePastConversations} className={styles.pastConversations}>
              <a href="/history" style={{textDecoration:"none", color:"#414146"}}>Past Conversations</a>
            </div>
          </div>
        </div>
      )}

      <div className={styles.rightContainer}>
        <h1 className={styles.mainHeading}>Bot AI</h1>

        {!submittedQuestions.length > 0 && (
          <div className={styles.headerLogo}>
            <h1 className={styles.header}>How Can I Help You Today?</h1>
            <img className={styles.logo} src={logo} alt="logo" />
          </div>
        )}

        {submittedQuestions.length > 0 ? (
          <div className={styles.chatCard} ref={chatRef}>
            {submittedQuestions.map((item) => (
              <ChatCard
                key={item.id}
                id={item.id}
                sender={item.sender}
                message={item.message}
                time={item.time}
                rating={item.rating}
                feedback={item.feedback}
                setSubmittedQuestions={setSubmittedQuestions}
                isHome
              />
            ))}
          </div>
        ) : (
          <div className={styles.cardGrid}>
            {defaultQuestions.map((item) => (
              <div className={styles.card} key={item.id} onClick={() => addUserAndBotMessages(item.question)}>
                <h6 className={styles.cardQuestion}>{item.question}</h6>
                <p className={styles.cardPara}>Get immediate AI generated response</p>
              </div>
            ))}
          </div>
        )}

        <div className={styles.inputContainer}>
          <input
            className={styles.input}
            type="text"
            placeholder="Message Bot AI..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit" className={styles.askButton} onClick={handleAsk}>Ask</button>
          <button type="button" className={styles.saveButton}>Save</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
