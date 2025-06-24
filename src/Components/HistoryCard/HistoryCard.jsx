import React, { useEffect, useState, useRef } from "react";
import styles from "./HistoryCard.module.css";
import boy from "../../Assets/boy.png";
import logo from "../../Assets/center-logo.png";

function HistoryCard() {
  const [conversations, setConversations] = useState([]);
  const scrollRef = useRef(null); 

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("chatData")) || [];
    const merged = [];
    for (let i = 0; i < data.length; i += 2) {
      const userMessage = data[i];
      const aiMessage = data[i + 1];
      if (userMessage?.sender === "user" && aiMessage?.sender === "ai") {
        merged.push({ userMessage, aiMessage });
      }
    }
    setConversations(merged);
  }, []);

  
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [conversations]);

  return (
    <div className={styles.scrollContainer} ref={scrollRef}>
      {conversations.map((pair, index) => (
        <div className={styles.card} key={index}>
          <div className={styles.row}>
            <img className={styles.avatar} src={boy} alt="user" />
            <div className={styles.messageBox}>
              <span className={styles.name}>You</span>
              <p className={styles.message}>{pair.userMessage.message}</p>
              <span className={styles.time}>{pair.userMessage.time}</span>
            </div>
          </div>
          <div className={styles.row} style={{ marginTop: "1rem" }}>
            <img className={styles.avatar} src={logo} alt="ai" />
            <div className={styles.messageBox}>
              <span className={styles.name}>Soul AI</span>
              <p className={styles.message}>{pair.aiMessage.message}</p>
              <div className={styles.infoRow}>
                <span className={styles.time}>{pair.aiMessage.time}</span>
                {pair.aiMessage.rating && (
                  <span className={styles.rating}>Rating: {pair.aiMessage.rating}</span>
                )}
              </div>
              {pair.aiMessage.feedback && (
                <p className={styles.feedback}>Feedback: {pair.aiMessage.feedback}</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default HistoryCard;
