import { Box, Button, IconButton, TextField } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { Link, Redirect} from "react-router-dom";
import clsx from "clsx";
import View from "./viewer";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import Slide from "@material-ui/core/Slide";
import Alert from "@material-ui/lab/Alert";
import { fetchAction } from "../../../store/action/fetchAction";
import { connect } from "react-redux";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import YouTube from "react-youtube";
import YouTubeIcon from "@material-ui/icons/YouTube";
import VideocamIcon from "@material-ui/icons/Videocam";
import VideocamOffIcon from "@material-ui/icons/VideocamOff";
import Tooltip from "@material-ui/core/Tooltip";
import GetAppIcon from '@material-ui/icons/GetApp';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import LaunchIcon from '@material-ui/icons/Launch';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Skeleton from '@material-ui/lab/Skeleton';
import CircularProgress from '@material-ui/core/CircularProgress';
const useStyles = makeStyles(() => ({
  "@global": {
    ".MuiTreeItem-root.Mui-selected > .MuiTreeItem-content .MuiTreeItem-label":
      {
        backgroundColor: "unset",
      },
    ".MuiTreeItem-root.Mui-selected > .MuiTreeItem-content .MuiTreeItem-label:hover":
      {
        backgroundColor: "rgba(0, 0, 0, 0.04)",
      },
    ".MuiTreeItem-root.Mui-selected:focus > .MuiTreeItem-content .MuiTreeItem-label":
      {
        backgroundColor: "unset",
      },
  },
  root: {
    display: "flex",
  },
  hide: {
    display: "none",
  },
}));

const Content = (props) => {
  const classes = useStyles();
  const [filename, setfile] = useState("");
  const [lesson, setlesson] = useState("");
  const [link, setlink] = useState("");
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [showPdf, setShowPdf] = useState('');
  const [error, setError] = useState("");
  const [openA, setOpenA] = useState(false);
  const [typed, setTyped] = useState(false);
  const [loading, setlaoding] = useState(false);
  const [Done, setDone] = useState(false);
  const [file,setfilepath] = useState('')
  const { code, token } = props;
  const course_id = code;
  const abort = new AbortController();


  useEffect(() => {
    setlaoding(true)
    fetch(`https://eng-asu-lms.herokuapp.com/courses/lessons/${course_id}`, {
      signal: abort.signal,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 404) {
          throw Error("404");
        }

        return res.json();
      })
      
      .then((data) => {
        props.fetchAction("lessons done", data);
      })
      .then(   ()=>     {setlaoding(false)}
      )
      .catch((error) => {
        if (error.name === "AbortError") {
          console.log("aborted");
        } else {
          props.fetchAction("lessons error");
        }
        setlaoding(false)
      });
    return () => abort.abort();
  }, [Done, code]);

  const handleOpen = () => {
    setlink("");
    setOpen(true);
  };
  const ShowVideos = () => {
    setShow(true);
  };
  const CloseVideos = () => {
    setShow(false);
  };
  const upload = () => {
    if (lesson.length == 0 && filename.length != 0) {
      setError("Enter Lesson Title");
    } else if (lesson.length != 0 && filename.length != 0) {
      var formData = new FormData();
      formData.append(`upload`, filename);
      formData.append(`lesson_title`, lesson);

      formData.append(`course_id`, course_id);
      if (link.length > 0) {
        formData.append(`video_url`, link);
      }
      fetch(`https://eng-asu-lms.herokuapp.com/courses/course/lessonsUpload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })
        .then((res) => {
          if (!res.ok) {
            throw Error(res.status);
          }
          setError("");
          setDone(!Done)
          setOpen(false)
          setOpenA(true);
          setlesson("");
          setfile("");
          Array.from(document.querySelectorAll("input")).forEach(
            (input) => (input.value = null)
          );
        })
        .catch((error) => alert('Error Occured!! Please try again'));
    } else if (lesson.length != 0 && filename.length == 0) {
      alert("please upload your file");
    } else if (lesson.length == 0 && filename.length == 0) {
      setlesson("");
      setfile("");
      setOpen(false);
      setTyped(false);
    }
    setlesson("");
    setfile("");
  };
  const download = (title) => {
    const lesson_title = title;
    fetch(
      `https://eng-asu-lms.herokuapp.com/courses/lessons/lesson/${course_id}/${lesson_title}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.blob())
      .then((blob) => {
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url;
        a.download = `${lesson_title}.pdf`;
        document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
        a.click();
        a.remove(); //afterwards we remove the element again
      })
      .catch(() => console.log("error"));
  };
  const handleClose = () => {
    setOpen(false);
    setOpenA(false);
  };
  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
    },
  };

  return (
    <Box>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={openA}
        onClose={handleClose}
        TransitionComponent={Slide}
        autoHideDuration={1000}

      >
        <Alert variant="filled" severity="success">
          Lesson Uploaded
        </Alert>
      </Snackbar>

      { loading?<div style={{maxWidth:'20%'}}><Skeleton/><Skeleton/> <Skeleton/></div>:props.lessonTitles ? (
        props.lessonTitles.length === 0 ? (
          <h1>no content found</h1>
        ) : (
          props.lessonTitles.map((title,index) => (
            <div key={index}>
              <TreeView
                style={{
                  flexGrow: 1,
                  maxWidth: 400,
                }}
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
              >
                <TreeItem
                  nodeId="1"
                  label={title.lesson_title}
                  style={{ marginBottom: "10px" }}
                >
                  <TreeItem
                    nodeId="2"
                    label="PDFs"
                    style={{ marginBottom: "10px" }}
                  >
                    <Box>
                    {title.lesson_title}.pdf


                    <IconButton onClick={() => download(title.lesson_title)}>
                      <GetAppIcon/>
                    </IconButton>
                    {showPdf!=index+1?    <IconButton onClick={download}>
                    <VisibilityIcon/>
                    </IconButton>:    <IconButton onClick={download}>
                     <VisibilityOffIcon/>
                    </IconButton> }

                  <IconButton onClick={download}>
                      
                <LaunchIcon/>
                    </IconButton>   
                    </Box>

                    {console.log('index' , index , 'show' , showPdf)}
                    {showPdf!=index+1?null: 
                 <iframe src={`${file}`} style={{    height:'790px',
        width: '1000px',
        border:'none'}}></iframe> 
      }
                  </TreeItem>
                  {console.log(title.video_id)}
                  {title.video_id ?( <TreeItem nodeId="3" label="videos">
                  
                      <Box>
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <Button
                            style={{
                              width: "40%",
                            }}
                            endIcon={<YouTubeIcon />}
                          >
                            <a
                              href={
                                "https://www.youtube.com/watch?v=" +
                                title.video_id
                              }
                              style={{ color: "#000" }}
                              target="_blank"
                            >
                              Youtube{" "}
                            </a>
                          </Button>

                          <Button
                            style={{ width: "40%", color: "#000" }}
                            onClick={show ? CloseVideos : ShowVideos}
                            endIcon={
                              show ? <VideocamOffIcon /> : <VideocamIcon />
                            }
                          >
                            {!show ? "show Video" : "hide video"}
                          </Button>
                        </div>
                        <div
                          className={clsx({
                            [classes.root]: show,
                            [classes.hide]: !show,
                          })}
                        >
                          <YouTube videoId={title.video_id} opts={opts} />
                          {console.log(title.video_id)}
                        </div>
                      </Box>
                      </TreeItem> ):null}
                  
                </TreeItem>
              </TreeView>
            </div>
          ))
        )
      ) : null}

      {props.role == "instructor" ? (
        <div style={{ textAlign: "center", padding: "0 0 0 32%" }}>
          <Button
            onClick={!open ? handleOpen : upload}
            color="primary"
            variant="contained"
            disabled={loading}
          >
            
            {loading? 'loading...':!open ? "Add Lesson" : !typed ? "x" : "done"}
          </Button>
        </div>
      ) : null}
      <div
        className={clsx({
          [classes.root]: open,
          [classes.hide]: !open,
        })}
        style={{
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <TextField
          label="enter lesson title"
          variant="outlined"
          required
          error={error}
          helperText={error}
          style={{ width: "20%" }}
          onChange={(e) =>
            e.target.value.length == 0
              ? (setTyped(false), setlesson(""))
              : (setTyped(true), setlesson(e.target.value))
          }
        />
        <TextField
          label="enter Youtube link"
          variant="outlined"
          style={{ margin: "15px 0", width: "20%" }}
          onChange={(e) => setlink(e.target.value)}
        />
        <div style={{ width: "40%", textAlign: "right" }}>
          <input
            id="contained-button-file"
            multiple
            type="file"
            style={{ display: "none" }}
            onChange={(e) =>
              e.target.files[0].length == 0
                ? (setTyped(false), setfile(""))
                : (setTyped(true), setfile(e.target.files[0]))
            }
          />
          <label htmlFor="contained-button-file">
            <Button variant="contained" color="primary" component="span">
              Upload File
            </Button>
          </label>
        </div>
      </div>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    lessonTitles: state.list.lessonTitles[0],
    error: state.list.error,
    pending: state.list.pending,
    role: state.user.role,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchAction: (status, data) => dispatch(fetchAction(status, data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Content);
