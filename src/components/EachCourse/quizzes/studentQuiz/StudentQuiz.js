import React, { useState, useEffect } from "react";
import "../studentQuiz/quiz.css";
import Start from "../studentQuiz/Start";
import Question from "../studentQuiz/Questions";
import End from "../studentQuiz/End";
import Modal from "../studentQuiz/Modal";
import "bulma/css/bulma.min.css";
import { connect } from "react-redux";
import { fetchAction } from "../../../../store/action/fetchAction";
import axios from "axios";
let interval;

const StudentQuiz = (props) => {
  const [step, setStep] = useState(1);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [time, setTime] = useState(0);
  const { quizData } = props;
  const [done, setDon] = useState(false);
  useEffect(() => {
    if (step === 3) {
      clearInterval(interval);
    }
  }, [step]);

  const quizStartHandler = () => {
    setStep(2);
    interval = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
  };

  const resetClickHandler = () => {
    if (props.role === "instructor") {
      props.reset(false);
      props.hide(false);
    } else {
      const Answers = answers;
      console.log(answers);
      const answer = {
        course_code: props.course.course.code,
        Answers,
        quizID: props.oneQuiz._id,
      };

      console.log(answer);
      axios
        .post("http://localhost:8080/submit", answer, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${props.token}`,
          },
        })
        .then((res) => {
          console.log(res);
        })
        .catch();

      // this.props.createQuiz(quz);
      props.hide(false);
    }
  };
  const Back = () => {
    if (props.role === "instructor") {
      props.reset(false);
      props.hide(false);
    } else {
      props.hide(false);
    }
  };
  return (
    <div className="App">
      {step === 1 && (
        <Start
        isStartTime={props.isStartTime}
        isEndTime={props.isEndTime}
        isdon={props.isdone}
        startDate={quizData.startDate}
          score={props.score}
          onReset={Back}
          role={props.role}
          done={props.donevar}
          onQuizStart={quizStartHandler}
          time={quizData.time}
          total_marks={quizData.total_marks}
        />
      )}
      {step === 2 && (
        <Question
          data={quizData.questions[activeQuestion]}
          time={quizData.time}
          role={props.role}
          onAnswerUpdate={setAnswers}
          endDate={quizData.endDate}
          numberOfQuestions={quizData.questions.length}
          activeQuestion={activeQuestion}
          onSetActiveQuestion={setActiveQuestion}
          onSetStep={setStep}
          results={answers}
        />
      )}
      {step === 3 && (
        <End
          results={answers}
          data={quizData.questions}
          onReset={resetClickHandler}
          onAnswersCheck={() => setShowModal(true)}
          time={time}
          total_marks={quizData.total_marks}
        />
      )}

      {showModal && (
        <Modal
          onClose={() => setShowModal(false)}
          results={answers}
          data={quizData.questions}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    oneQuiz: state.list.oneQuiz[0],
    course: state.list.course[0],
    quizzes: state.list.quizzes[0],
    error: state.list.error,
    pending: state.list.pending,
    token: state.user.token,
    role: state.user.role,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAction: (status, data) => dispatch(fetchAction(status, data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(StudentQuiz);
