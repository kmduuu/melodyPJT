import { createContext, useState, useEffect } from "react";
import { io } from "socket.io-client";

const DataContext = createContext({});
const socket = io('http://192.168.0.19:3001');
export const DataProvider = ({ children }) => {
  // All Quizs, Current Question, Index of Current Question, Answer, Selected Answer, Total Marks
  const [quizs, setQuizs] = useState([]);
  const [question, setQuesion] = useState({});
  const [questionIndex, setQuestionIndex] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [marks, setMarks] = useState(0);
  // const [listenAudio, setListenAudio] = useState({});

  // Display Controlling States
  const [showStart, setShowStart] = useState(true);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showResult, setShowResult] = useState(false);

  // Load JSON Data
  useEffect(() => {
    fetch('quiz.json')
      .then(res => res.json())
      .then(data => {
        setQuizs(data);
        // console.log(data);
      });
  }, []);

  // Set a Single Question
  useEffect(() => {
    if (quizs.length > questionIndex) {
      setQuesion(quizs[questionIndex]);
      const currentQuestion = quizs[questionIndex];
      if (currentQuestion.audio) {
        console.log('Audio Data : ', currentQuestion.audio);
      }

      // setListenAudio(listenAudio[questionIndex]);
    }
  }, [quizs, questionIndex])

  // Start Quiz
  const startQuiz = () => {
    setShowStart(false);
    setShowQuiz(true);
  }

  // Check Answer
  const checkAnswer = (event, selected) => {
    if (!selectedAnswer) {
      setCorrectAnswer(question.answer);
      setSelectedAnswer(selected);

      if (selected === question.answer) {
        event.target.classList.add('bg-success');
        setMarks(marks + 10);
      } else {
        event.target.classList.add('bg-danger');
      }
    }
  }

  // Next Quesion
  const nextQuestion = () => {
    setCorrectAnswer('');
    setSelectedAnswer('');
    const wrongBtn = document.querySelector('button.bg-danger');
    wrongBtn?.classList.remove('bg-danger');
    const rightBtn = document.querySelector('button.bg-success');
    rightBtn?.classList.remove('bg-success');
    setQuestionIndex(questionIndex + 1);
  }


  // Show Result
  const showTheResult = () => {
    setShowResult(true);
    setShowStart(false);
    setShowQuiz(false);
  }

  // Start Over
  const startOver = () => {
    alert("눌렀을껀데 분명히...")
    const userMarks = marks;
    console.log("현재 점수 : ", marks);
    var userId = sessionStorage.getItem('userId');
    setShowStart(false);
    setShowResult(false);
    setShowQuiz(true);
    setCorrectAnswer('');
    setSelectedAnswer('');
    setQuestionIndex(0);
    setMarks(0);

    const wrongBtn = document.querySelector('button.bg-danger');
    wrongBtn?.classList.remove('bg-danger');
    const rightBtn = document.querySelector('button.bg-success');
    rightBtn?.classList.remove('bg-success');

    if (userId) {
      socket.emit('whatIsUserName', userId);
      socket.on('gotUserName', (userName) => {
        // alert('received UserName : ', userName);
        console.log("userMarks and userId : ", userMarks, userId, userName);
        alert("잠시만 기다려주세요...");
        socket.emit('userMarks', { userMarks, userId, userName });
        socket.on('userMarks', isUserIn3rd => {
          if (isUserIn3rd <= 3) {
            alert(userName+"님, "+isUserIn3rd+"등을 축하합니다. 기념사진 촬영하겠습니다!!");
            window.location.href = '/takePicture';
          } else {
            window.location.href = '/getLogin';
          }
        });
      });
    }

  }
  return (
    <DataContext.Provider value={{
      startQuiz, showStart, showQuiz, question, quizs, checkAnswer, correctAnswer,
      selectedAnswer, questionIndex, nextQuestion, showTheResult, showResult, marks,
      startOver
    }} >
      {children}
    </DataContext.Provider>
  );
}

export default DataContext;

