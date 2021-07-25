import React from "react";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Box, Button, IconButton } from "@material-ui/core";
const Start = ({
  score,
  onReset,
  onQuizStart,
  time,
  total_marks,
  done,
  startDate,
  isStartTime,
  isEndTime,
  isdon,
  role
}) => {

  return (
    <div className="modal is-active">
      <div className="modal-background"></div>

      <div className="modal-card">
        <div
          style={{ position: "relative", textAlign: "center" }}
          className="modal-card-body yes content"
        >
          <IconButton
            onClick={onReset}
            style={{ position: "absolute", top: "18%", left: "10%" }}
          >
            <ArrowBackIcon />
          </IconButton>

          <h1>Start the quiz</h1>
          <p> Quiz time : {time / 100} min</p>
          {score ? (
            <p>
              you got {score} out of {total_marks}
            </p>
          ) : (
            <p> {!done&&isEndTime? "you didn't take the quiz" :'Marks : '+total_marks} </p>
          )}
          {console.log(isdon)}
        {role==='student' ?
          isdon? (
            !done ? (
              <button
                className="button is-info is-medium"
                onClick={onQuizStart}
              >
                start
              </button>
            ) : (
              <h3>no more attempts</h3>
            )
          ) : (
            <div>
              {isStartTime? <p>Starts at {new Date(startDate).toLocaleString()}</p>:isEndTime?<p>The Quiz Ended!!</p>:null}
              <Button disabled variant="contained">
                Start
              </Button>
            </div>
          ):   <button
          className="button is-info is-medium"
          onClick={onQuizStart}
        >
          start
        </button>}
        </div>
      </div>
    </div>
  );
};

export default Start;
