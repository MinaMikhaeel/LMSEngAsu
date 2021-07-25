import React, { useEffect, useState } from 'react';

import { formatTime } from '../studentQuiz/utility';

const End = ({ total_marks, results, data, onReset, onAnswersCheck, time }) => {
  const [correctAnswers, setCorrectAnswers] = useState(0);

  useEffect(() => {
    let correct = 0;
    results.forEach((result, index) => {
      console.log(data)
      if(result.answer === data[index].answer) {
        correct+=Number(data[index].grades);
      }
    });
    setCorrectAnswers(correct);
    // eslint-disable-next-line
  }, []);
  return(
    <div className="modal is-active" style={{textAlign:'center'}}>
            <div className="modal-background"></div>

      {console.log({results})}
      <div className="modal-card">
        <div className="modal-card-body content">
          <h3>Your results</h3>
          <p>{correctAnswers} of {total_marks}</p>
          <p><strong>{Math.floor((correctAnswers / total_marks) * 100)}%</strong></p>
          <p><strong>Your time:</strong> {formatTime(time)}</p>
          <button className="button is-info mr-2" onClick={onAnswersCheck}>Check your answers</button>
          <button className="button is-success" onClick={onReset}>End Preview</button>
        </div>
      </div>
    </div>
  );
}

export default End;