import React, { useState, useEffect, useRef } from "react";

import ReactCountdownClock from "react-countdown-clock";

const Question = ({
  data,
  onAnswerUpdate,
  numberOfQuestions,
  time,
  activeQuestion,
  onSetActiveQuestion,
  onSetStep,
  results,
  endDate,
  role
}) => {
  const [selected, setSelected] = useState("");
  const [error, setError] = useState("");
  const radiosWrapper = useRef();

  useEffect(() => {
    const findCheckedInput =
      radiosWrapper.current.querySelector("input:checked");
    if (findCheckedInput) {
      findCheckedInput.checked = false;
    }
  }, [data]);
  var currentDateTime = new Date().getTime();
  useEffect(()=>{
    console.log('here')
    console.log( new Date(endDate).getTime());
    console.log(currentDateTime);
    console.log(currentDateTime>=endDate);

  if(currentDateTime>= new Date(endDate).getTime()&&role==='student'){
onSetStep(3)  
}
  },[currentDateTime])
  const changeHandler = (e) => {
    setSelected(e.target.value);
    if (error) {
      setError("");
    }
  };
  const handelFinsh = () => {
    onSetStep(3);
  };

  const nextClickHandler = (e) => {
    if (selected === "") {
      return setError("Please select one option!");
    }
    onAnswerUpdate((prevState) => [
      ...prevState,
      { question: data.question, answer: selected },
    ]);
 
    setSelected("");
    if (activeQuestion < numberOfQuestions - 1) {
      onSetActiveQuestion(activeQuestion + 1);
    } else {
 
      onSetStep(3);

    }
   
  };

  return (
    <div className="modal is-active">
      <div className="modal-background" ></div>
      <div className="modal-card">
    
        <div className="modal-card-body yes content">
        <ReactCountdownClock
          seconds={time / 1.666}
          color="#000"
          alpha={0.9}
          size={50}
          onComplete={handelFinsh}
        />
          <h2 className="mb-5">{data.question}</h2>
          <div className="control" ref={radiosWrapper}>
            {data.choices.map((choice, i) => (
              <label className="radio has-background-light" key={i}>
                <input
                  type="radio"
                  name="answer"
                  value={choice}
                  onChange={changeHandler}
                />
                {choice}
              </label>
            ))}
          </div>
          {error && <div className="has-text-danger">{error}</div>}
          <button
            className="button is-link is-medium is-fullwidth mt-4"
            onClick={nextClickHandler}
          >
            {activeQuestion === numberOfQuestions - 1 ? "Finish" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Question;
