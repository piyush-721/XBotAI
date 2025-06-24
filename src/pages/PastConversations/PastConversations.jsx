import React, { useState } from "react";
import styles from "./PastConversations.module.css";
import newChatLogo from "../../Assets/new-chat-logo.png";
import edit from "../../Assets/edit.png";
import { FiAlignJustify } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import HistoryCard from "../../Components/HistoryCard/HistoryCard";

function PastConversations() {
  const [showLeft, setShowLeft] = useState(window.innerWidth > 768);
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate("/");
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
              <img className={styles.newChatLogo} src={newChatLogo} alt="new chat" />
              <h3>New Chat</h3>
              <img onClick={handleEdit} className={styles.edit} src={edit} alt="edit" />
            </div>
            <div className={styles.pastConversations}>
              <h4>Past Conversations</h4>
            </div>
          </div>
        </div>
      )}

      <div className={styles.rightContainer}>
        <h1 className={styles.header}>Conversation History</h1>
        <h6 className={styles.todayChat}>Today's Chats</h6>
        <HistoryCard />
        <div className={styles.inputContainer}>
          <input
            className={styles.input}
            type="text"
            placeholder="Message Bot AI..."
          />
          <button type="submit" className={styles.askButton}>Ask</button>
          <button type="button" className={styles.saveButton}>Save</button>
        </div>
      </div>
    </div>
  );
}

export default PastConversations;
