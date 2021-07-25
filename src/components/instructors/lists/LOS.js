import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import EditIcon from "@material-ui/icons/Edit";
import Tooltip from "@material-ui/core/Tooltip";
import { TextField } from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";
import Skeleton from '@material-ui/lab/Skeleton';
import CircularProgress from '@material-ui/core/CircularProgress';
import { fetchAction } from "../../../store/action/fetchAction";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import VisibilityIcon from '@material-ui/icons/Visibility';
import Modal from '../../EachCourse/quizzes/studentQuiz/Modal';
const useRowStyles = makeStyles({
  root: {
    borderBottom: "unset",
  },
  TF: {
    width: "25%",
  },
  TF1: {
    padding: "50px 0",
  },
});

function CollapsibleTable(props) {
  const { id } = useParams();
  const [open, setOpen] = React.useState("");
  const [close, setClose] = React.useState(false);
  const [value1, setVAlue1] = React.useState(0);
  const [value2, setVAlue2] = React.useState(0);
  const [totalvalue, setTotalvalue] = React.useState(0);
  const [Grades, setGrades] = React.useState([]);
  const [answers, setanswers] = React.useState([]);
  const [pressed, setPressed] = React.useState(false);
  const [loading, setloading] = React.useState(false);
  const code = id;
  const classes = useRowStyles();
  const handleText = () => {
    setPressed(true);
  };
  const DoneText = (id) => () => {
    setPressed(false);
    setTotalvalue(value2 + value1);
  };
  const onClose=()=>{
    setanswers([])
  }
  const abort = new AbortController();

  useEffect(() => {
    setloading(true)
    fetch(
      `https://eng-asu-lms.herokuapp.com/instructors/InstructorCourses/course/studentsList/${code}`,
      {
        signal: abort.signal,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${props.token}`,
        },
      }
    )
      .then((res) => {
        if (res.status === 404) {
          throw Error("404");
        }

        return res.json();
      })
      .then((data) => {
        props.fetchAction("course students done", data);
        setloading(false)
      })
      .catch((error) => {
        if (error.name === "AbortError") {
          console.log("aborted");
        } else {
          props.fetchAction("course students error");
        }
        setloading(false)
      });
    return () => abort.abort();
  }, [code]);
  const getQuizzes = async(student_code) => {
    const course_code = id;
    console.log(student_code, course_code);
   try{
     const res = await fetch(
      `https://eng-asu-lms.herokuapp.com/quizes/getGrades/${course_code}/${student_code}`,
      {
        signal: abort.signal,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${props.token}`,
        },
      }
    )
    const result = await res.json()
    if (res.status===200){
      setGrades(result);
      console.log(Grades);
    }
    else if (res.status===404){
      console.log(result);
      setGrades([]);
    }
    else{
      console.log('error');
    }
   } 
   catch(error){
    if (error.name === "AbortError") {
      console.log("aborted");
    } else {
      console.log(error);
    }
   }
       
    return () => abort.abort();
  };
  const getAnswers = async(quiz_id,student_code)=>{
    const course_code=id

    console.log(quiz_id,course_code)
    try{
      const res = await fetch(
        `https://eng-asu-lms.herokuapp.com/getAnswers/${quiz_id}/${course_code}/${student_code}`,
        {
          signal: abort.signal,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${props.token}`,
          },
        }
      )
      const result = await res.json()
      console.log(result)
      if (res.status===200){
        setanswers(result);
        console.log(answers[0][0]);
      }
      else if (res.status===404){
        console.log(result);
        setanswers([]);
      }
      else{
        console.log('error');
      }
    }
    catch(error){
      console.log(error)
    }
  }

  return (
    <React.Fragment>
      <TableContainer component={Paper}>
        <Table>
          <TableHead className={classes.root}>
          {loading? null:<TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell align="center">NAMES</TableCell>
              <TableCell align="center">ID</TableCell>
            </TableRow>}
          </TableHead>
          {loading?  <div style={{width: 500,margin:'auto'}}>
      <Skeleton />
      <Skeleton animation={false} />
      <Skeleton animation="wave" />
    </div>: props.studentCourse ? (
            props.studentCourse.sort((a,b) => (a.student_name > b.student_name) ? 1 : ((b.student_name > a.student_name) ? -1 : 0)).map((student, index) => (
              <TableBody key={index}>
                <TableRow
                  className={classes.root}
                  style={{
                    backgroundColor:
                      index % 2 === 0 ? "rgba(0, 0, 0, 0.04)" : null,
                  }}
                >
                  <TableCell key={index}>
                    <IconButton
                      size="small"
                      onClick={() => (
                        getQuizzes(student.student_code),
                        setOpen(index + 1),
                        setClose(!close)
                      )}
                    >
                      {!close ? (
                        <KeyboardArrowDownIcon />
                      ) : index + 1 == open ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </IconButton>
                  </TableCell>
                  <TableCell align="center">{index+1}</TableCell>
                  <TableCell align="center">{student.student_name}</TableCell>
                  <TableCell align="center">{student.student_code}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={6}
                  >
                    <Collapse
                      in={close ? (index + 1 == open ? true : false) : null}
                      timeout="auto"
                      unmountOnExit
                    >
                      <Box margin={2}>
                        <Typography variant="h5" gutterBottom component="div">
                          Grades
                        </Typography>
                        {Grades.length == 0 ? (
                          <h1 style={{    textAlign: 'center',
                            fontSize: '20px'}}>no quizzes for {student.student_name}</h1>
                        ) : (
                          <Table>
                            <TableHead>
                              <TableRow key={index}>
                                <TableCell></TableCell>
                                
                                <TableCell align="right">quizzes</TableCell>
                                
                                <TableCell align="right">Grades</TableCell>
                               
                                <TableCell align="right">total</TableCell>
                                <TableCell></TableCell>

                              </TableRow>
                            </TableHead>

                            <TableBody>
                            {Grades.map((quiz) => (
                                  <TableRow>
                             <TableCell></TableCell>
                             <TableCell>{quiz.title} </TableCell>
                             <TableCell>{quiz.score} </TableCell>
                             <TableCell></TableCell>
                             <TableCell><IconButton onClick={()=>{getAnswers(quiz.quiz_id,quiz.student_code)}}>
                               <VisibilityIcon/>
                               </IconButton></TableCell>

                                  </TableRow>
                            ))}
                              <TableRow>
                              <TableCell></TableCell>
                             <TableCell></TableCell>
                             <TableCell></TableCell>
                             <TableCell >{Grades.reduce((a,v) =>  a = a + v.score , 0 )}</TableCell>
                             <TableCell> </TableCell>

                             </TableRow>

                            </TableBody>
                          </Table>
                        )}
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </TableBody>
            ))
          ) : (
            <h1>no student in course</h1>
          )}
        </Table>
      </TableContainer>
      {answers.length>0? <Modal show='yes' results={answers[0]} onClose={onClose}/> :null}
    </React.Fragment>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchAction: (status, data) => dispatch(fetchAction(status, data)),
  };
};
const mapStateToProps = (state) => {
  console.log(state);
  return {
    studentCourse: state.list.studentCourse[0],
    error: state.list.error,
    pending: state.list.pending,
    token: state.user.token,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CollapsibleTable);
