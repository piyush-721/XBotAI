import React, { useRef } from "react";
import styles from "./ChatCard.module.css";
import boy from "../../Assets/boy.png";
import logo from "../../Assets/center-logo.png";

function ChatCard({ sender, message, time }) {
  return (
    <div className={styles.card}>
      <div className={styles.imageDiv}>
        <img className={styles.logoSize} src={sender === "user" ? boy : logo} alt={sender} />
      </div>
      <div className={styles.chatDiv}>
        <span className={styles.youOrSoul}>{sender === "user" ? "You" : "Soul AI"}</span>
        <p className={styles.question}>{message}</p>
        <p className={styles.time}>{time}</p>
      </div>
    </div>
  );
}

export default ChatCard;
