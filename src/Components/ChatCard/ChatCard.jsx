import React, { useState } from "react";
import styles from "./ChatCard.module.css";
import boy from "../../Assets/boy.png";
import logo from "../../Assets/center-logo.png";
import { Rating, Modal } from "@mui/material";
import { X } from "lucide-react";

function ChatCard({ sender, message, time, isHome, setSubmittedQuestions, id, rating, feedback }) {
  const [showModal, setShowModal] = useState(false);
  const [localRating, setLocalRating] = useState(rating || 1);
  const [localFeedback, setLocalFeedback] = useState(feedback || "");

  const handleFeedbackSubmit = () => {
    setSubmittedQuestions((prev) =>
      prev.map((q) =>
        q.id === id ? { ...q, rating: localRating, feedback: localFeedback } : q
      )
    );
    setShowModal(false);
  };

  if (isHome) {
    return (
      <div className={styles.card}>
        <div className={styles.imageDiv}>
          <img className={styles.logoSize} src={sender === "user" ? boy : logo} alt={sender} />
        </div>
        <div className={styles.chatDiv}>
          <span className={styles.youOrSoul}>{sender === "user" ? "You" : "Soul AI"}</span>
          <p className={styles.question}>{message}</p>

          {sender === "ai" && (
            <>
              <div className={styles.timeRatingRow}>
                <p className={styles.time}>{time}</p>
                <Rating
                  name="simple-controlled"
                  value={localRating}
                  size="small"
                  onChange={(e, newValue) => {
                    setLocalRating(newValue);
                    setShowModal(true);
                  }}
                />
              </div>

              {localFeedback && <p className={styles.feedbackText}>Feedback: {localFeedback}</p>}

              <Modal open={showModal} onClose={() => setShowModal(false)}>
                <div className={styles.modalContainer}>
                  <div className={styles.modalHeader}>
                    <h4>Provide Additional Feedback</h4>
                    <X className={styles.closeIcon} onClick={() => setShowModal(false)} />
                  </div>
                  <textarea
                    className={styles.modalTextArea}
                    placeholder="Your thoughts here..."
                    value={localFeedback}
                    onChange={(e) => setLocalFeedback(e.target.value)}
                  />
                  <button className={styles.submitButton} onClick={handleFeedbackSubmit}>Submit</button>
                </div>
              </Modal>
            </>
          )}
        </div>
      </div>
    );
  }
  return null;
}

export default ChatCard;
