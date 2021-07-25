import React from 'react';

const Modal = ({ onClose, results, data ,show}) => {
  return(
    <div className="modal is-active" style={{zIndex:show==='yes'?'2100':null}}>
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{show==='yes'? 'Student answer':'Your answers'}</p>
          <button className="delete" onClick={onClose}></button>
        </header>
        <section className="modal-card-body content">
          <ul>
            
            {results.map((result, i) => (
              <li key={i} className="mb-6" style={{    listStyle: 'auto'}}>
                <p><strong>Question: {result.question}</strong></p>
               {show!='yes'?
                
                <div>

                <p className={result.answer === data[i].answer ? 'has-background-success has-text-white p-2' : 'has-background-danger has-text-white p-2'}>Your answer: {result.answer}</p>
                {result.answer !== data[i].answer ? <p className="has-background-link has-text-white p-2">Correct answer: {data[i].answer}</p>:null}
                </div>
            :
            result.right_ans? 
                <p className={ 'has-background-success has-text-white p-2'}>Student answer: {result.answer}</p>
                :
                <p className={'has-background-danger has-text-white p-2'}>Student answer: {result.answer}</p>
                
            

                }         
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

export default Modal;