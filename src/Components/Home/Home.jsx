import React, {useState, useEffect} from 'react';
import styles from "./Home.module.css";
import newChatLogo from "../../Assets/new-chat-logo.png";
import edit from "../../Assets/edit.png";
import logo from "../../Assets/center-logo.png";
import axios from 'axios';
import data from "../../ApiData/apiData.json";
import { FiAlignJustify } from "react-icons/fi";

function Home() {

    const [questionList, setQuestionList] = useState([]);
    const [defaultQuestions, setDefaultQuestions] = useState([]);
    const [showleft, setShowLeft] = useState(true);

    useEffect(() => {
        setDefaultQuestions(data.slice(-4));
        // console.log(data);
        setQuestionList(data);

    }, []);
    // console.log(defaultQuestions);
  return (
    <div className={styles.container}>

        <div className={styles.topBar}>
            <button
                className={styles.toggleButton} 
                onClick={() => setShowLeft(!showleft)}
            ><FiAlignJustify /></button>
        </div>

        {showleft && (
            <div className={styles.leftContainer}>
                <div className={styles.leftInnerContainer}>
                    <div className={styles.newChat}>
                        <img src={newChatLogo} alt="logo" />
                        <h3>New Chat</h3>
                        <img className={styles.edit} src={edit} alt="edit button" />
                    </div>
                    <div className={styles.pastConversations}>
                        <h4>Past Conversations</h4>
                    </div>
                </div>
            </div>
        )}


        <div className={styles.rightContainer}>
            <h1 className={styles.mainHeading}>Bot AI</h1>
            <div className={styles.headerLogo}>
                <h1 className={styles.header}>How Can I Help You Today?</h1>
                <img className={styles.logo} src={logo} alt="logo" />
            </div>
            <div className={styles.cardGrid}>
                <DefaultCard questions={defaultQuestions}/>
            </div>
            <div>
                <InputComponent />
            </div>
        </div>
        
    </div>
  )
}

export default Home;

function DefaultCard({questions}){
    return(
        <>
            {
                questions.map((item) => (
                    <div className={styles.card} key={item.id}>
                        <h6 className={styles.cardQuestion}>{item.question}</h6>
                        <p className={styles.cardPara}>Get immediate AI generated response</p>
                    </div>
                ))
            }
        </>
    )
}


function InputComponent() {
    return(
        <>
            <div className={styles.inputContainer}>
                <input className={styles.input} type="text" placeholder='Message Bot AI…' onChange={""}></input>
                <button className={styles.askButton} type='submit'>Ask</button>
                <button className={styles.saveButton} type='button'>Save</button>
            </div>
        </>
    )
}