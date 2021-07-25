import { Button, IconButton } from "@material-ui/core";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchAction } from "../../../store/action/fetchAction";
import StudentQuiz from "../quizzes/studentQuiz/StudentQuiz";
import studentQuiz from "../quizzes/studentQuiz/StudentQuiz";
import DeleteIcon from "@material-ui/icons/Delete";
import { Tooltip } from "antd";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Fab from "@material-ui/core/Fab";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { Box, Container, Grid } from "@material-ui/core";
import url from "../../../assets/img/Untitled.jpg";
import url2 from "../../../assets/img/quiz1.jpg";
import Skeleton from '@material-ui/lab/Skeleton';
import CircularProgress from '@material-ui/core/CircularProgress';
const Titles = (props) => {
  const abort = new AbortController();
  const [hide, setHide] = useState(false);
  const [DoneDelete, setDoneDelete] = useState(false);
  const [Done, setDone] = useState(false);
  const [score, setScore] = useState(false);
  const { id } = useParams();
  const [openDialogue, setopenDialogue] = useState(false);
  const [quizid, setquizid] = useState("");
  const [courseCode, setcourseCode] = useState("");
  const [Isdonecheck, setIsdonecheck] = useState(false);
  const [isinDate, setIsinDate] = useState(false);
  const [NotStartDate, setNotStartDate] = useState(false);
  const [NotEndDate, setNotEndDate] = useState(false);
  const [loading, setlaoding] = useState(false);

  var currentDateTime = new Date().getTime();

  const closeDial = () => {
    setopenDialogue(false);
  };
  const handleOpenDial = (id, course_code) => {
    setopenDialogue(true);
    setquizid(id);
    setcourseCode(course_code);
  };
  const toggleHide = (toggle) => {
    setHide(toggle);
  };
  useEffect(() => {
    setlaoding(true)
    const course_code = id;
    fetch(`https://eng-asu-lms.herokuapp.com/quizes/getQuizTitles/${course_code}`, {
      signal: abort.signal,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${props.token}`,
      },
    })
      .then((res) => {
        if (res.status === 404) {
          throw Error("404");
        }

        return res.json();
      })
      .then((data) => {
        props.fetchAction("quizzes done", data);
      })
      .then(   ()=>     {setlaoding(false)}
      )
      .catch((error) => {
        if (error.name === "AbortError") {
          console.log("aborted");
        } else {
          props.fetchAction("quizzes error");
        }
        setlaoding(false)

      });
    return () => abort.abort();
  }, [props.submit, id, DoneDelete]);
  const getQuiz = async (title) => {
    toggleHide(true);
    if (props.role === "instructor") {
      props.hidden(true);
    }
    try {
      const res = await fetch(
        `https://eng-asu-lms.herokuapp.com/quizes/getQuiz/${title}/${props.course.course.code}`,
        {
          signal: abort.signal,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${props.token}`,
          },
        }
      );
      const result = await res.json();
      console.log(result);
      if (res.status === 200) {
        props.fetchAction("one quiz done", result);
        var date1 = new Date(result.startDate).getTime();

        var date2 = new Date(result.endDate).getTime();
        console.log(
          "not current Time",
          currentDateTime < date1 || currentDateTime >= date2
        );
        console.log(
          "current Time",
          currentDateTime >= date1 && currentDateTime < date2
        );

        if (currentDateTime < date1 || currentDateTime >= date2) {
          setIsinDate(false);

          if (currentDateTime < date1) {
            setNotStartDate(true);
            setNotEndDate(false);
          } else if (currentDateTime >= date2) {
            setNotStartDate(false);
            setNotEndDate(true);
          }

          console.log("hi");
        } else if (currentDateTime >= date1 && currentDateTime < date2) {
          setIsinDate(true);
          setNotStartDate(false);
          setNotEndDate(false);
          console.log("pi");
        }
      } else if (res.status === 400) {
        console.log(result);
      }

      return () => abort.abort();
    } catch (error) {
      console.log(error);
      if (error.name === "AbortError") {
        console.log("aborted");
      } else {
        props.fetchAction("one quiz error");
      }
    }
  };
  const handleDelete = () => {
    const id = quizid;
    const course_code = courseCode;
    console.log(id, course_code);
    fetch(`https://eng-asu-lms.herokuapp.com/delete/${id}/${course_code}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${props.token}`,
      },
    })
      .then(setDoneDelete(!DoneDelete), closeDial())
      .catch(() => {
        console.log("error");
      });
  };
  const check = (quiz) => {
    const id = quiz._id;
    const course_code = quiz.course_code;
    fetch(`https://eng-asu-lms.herokuapp.com/quizes/checkQuiz/${id}/${course_code}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${props.token}`,
      },
    })
      .then((res) => {
        if (res.status === 404) {
          console.log("not found");
          throw Error("404");
        }
        return res.json();
      })
      .then((data) => {
        setDone(true);
        setScore(data);
        console.log("found");
      })
      .catch(() => {
        console.log("not found");
        setDone(false);
        setScore("");
      });
    getQuiz(quiz.title);
  };
  const handleClick = (quiz) => {
    if (props.role === "student") {
      check(quiz);
    } else {
      getQuiz(quiz.title);
    }
  };

  return (
    <div>
      <Dialog open={openDialogue} onClose={closeDial}>
        <DialogTitle>Are you sure you want to delete ?</DialogTitle>
        <DialogActions>
          <Button onClick={handleDelete} color="secondary">
            Yes
          </Button>
          <Button onClick={closeDial} color="error">
            no
          </Button>
        </DialogActions>
      </Dialog>
      {!hide ? (
        <div
          style={{
            display: "block",
            marginBottom: "20px",
          }}
        >
          {loading?<div style={{maxWidth:'20%'}}><Skeleton/><Skeleton/> <Skeleton/></div>: props.quizzes ? (
            <Container style={{ margin: 0 }}>
              <Grid container spacing={3}>
                {props.quizzes.map((quiz, index) => (
                  <Grid item xs={12} sm={8} md={6} lg={3}>
                    <Box style={{ textDecoration: "none", fontSize: "20px" }}>
                      <Card elevation={3}>
                        <CardActionArea onClick={() => handleClick(quiz)}>
                          <CardMedia
                            component="img"
                            style={{ maxHeight: "180px" }}
                            height="140"
                            image={index%2===0?url:url2}
                          />
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="h2"
                            >
                              {quiz.title}
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                        {props.role === "instructor" ? (
                          <CardActions style={{ justifyContent: "flex-end" }}>
                            <IconButton
                              onClick={() =>
                                handleOpenDial(
                                  props.quizzes[index]._id,
                                  props.quizzes[index].course_code
                                )
                              }
                            >
                              {" "}
                              <DeleteIcon />
                            </IconButton>
                          </CardActions>
                        ) : null}
                      </Card>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Container>
          ) : (
            <h1 style={{ marginBottom: "10px" }}>no quizzes yet</h1>
          )}
        </div>
      ) : null}
      <div>
        {hide && props.oneQuiz ? (
          props.role === "instructor" ? (
            <StudentQuiz
              role={props.role}
              reset={props.hidden}
              hide={toggleHide}
              quizData={props.oneQuiz}
            />
          ) : (
            <StudentQuiz
              isdone={isinDate}
              isStartTime={NotStartDate}
              currentDateTime={currentDateTime}
              isEndTime={NotEndDate}
              score={score}
              donevar={Done}
              role={props.role}
              hide={toggleHide}
              quizData={props.oneQuiz}
            />
          )
        ) : null}
      </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(Titles);
