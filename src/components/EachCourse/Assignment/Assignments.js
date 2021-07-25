import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  TextField,
  MenuItem,
  IconButton,
  Chip,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import Slide from "@material-ui/core/Slide";
import Alert from "@material-ui/lab/Alert";
import { fetchAction } from "../../../store/action/fetchAction";
import { connect } from "react-redux";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import { Assignment } from "@material-ui/icons";
import { useParams } from "react-router";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import GetAppIcon from "@material-ui/icons/GetApp";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import LaunchIcon from "@material-ui/icons/Launch";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";
import Skeleton from "@material-ui/lab/Skeleton";
const useStyles = makeStyles(() => ({
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
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [openA, setOpeFeatureA] = useState(false);
  const [typed, setTyped] = useState(false);
  const [found, setfound] = useState("");
  const [notfoundassi, setnotfoundassi] = useState(false);
  const { course, token } = props;
  const { id } = useParams();
  const [nodeid, setnodeId] = useState("");
  const title = lesson;
  const course_code = id;
  const [showPdf, setShowPdf] = useState("");
  const [file, setfilepath] = useState("");
  const [loading, setlaoding] = useState(false);
  const abort = new AbortController();
  const [Done, setDone] = useState(false);
  const [url, setUrl] = useState("");
  const [OpenFeature, setOpenFeature] = useState(false);

  useEffect(() => {
    const course_id = course.course._id;
    setlaoding(true);
    setOpen(false);
    fetch(
      `https://eng-asu-lms.herokuapp.com/courses/course/getAssignments/${course_id}`,
      {
        signal: abort.signal,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw Error("error");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        props.fetchAction("Des Ass done", data);
      })
      .then(() => {
        getTitles();
      })
      .then(() => {
        setlaoding(false);
      })
      .catch((error) => {
        if (error.name === "AbortError") {
          console.log("aborted");
        } else {
          props.fetchAction("Des Ass error");
        }
        setlaoding(false);
      });
    return () => abort.abort();
  }, [Done, id, course.course._id]);
  const getTitles = () => {
    if (props.role == "student") {
      const course_id = course.course._id;
      fetch(
        `https://eng-asu-lms.herokuapp.com/courses/course/assignments/${course_id}`,
        {
          signal: abort.signal,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
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
          props.fetchAction("Ass done", data);
        })
        .catch((error) => {
          if (error.name === "AbortError") {
            console.log("aborted");
          } else {
            props.fetchAction("Ass error");
          }
        });
      return () => abort.abort();
    } else {
      fetch(
        `https://eng-asu-lms.herokuapp.com/courses/assignments/get_titles/${course_code}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((res) => {
          if (!res.ok) {
            throw Error(res.status);
          }
          return res.json();
        })
        .then((data) => (setfound(data), setnotfoundassi(false)))
        .catch(
          (error) => (setnotfoundassi(true), setfound(""), console.log(error))
        );
      console.log(found);
    }
  };
  const handleOpen = () => {
    setfile("");
    setlesson("");
    setOpen(true);
  };
  const upload = (lesson_title) => {
    if (
      lesson.length == 0 &&
      props.role === "instructor" &&
      filename.length != 0
    ) {
      setError("Enter Lesson Title");
    } else if (
      (lesson.length != 0 || props.role === "student") &&
      filename.length != 0
    ) {
      setlaoding(true);
      console.log("here");
      var formData = new FormData();
      formData.append(`upload`, filename);
      if (props.role === "student") {
        formData.append(`title`, lesson_title);
      } else if (props.role === "instructor") {
        formData.append(`title`, title);
      }

      formData.append(`course_code`, course_code);
      if (props.role === "student") {
        fetch(
          `https://eng-asu-lms.herokuapp.com/courses/course/assignmentUpload`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          }
        )
          .then((res) => {
            console.log(res);
            if (!res.ok) {
              throw Error(res.status);
            }
            setError("");
            setfile("");
            setlesson("");
            setOpen(false);
            setDone(!Done);
            Array.from(document.querySelectorAll("input")).forEach(
              (input) => (input.value = null)
            );
            console.log("then data");
          })
          .then(() => {
            setlaoding(false);
          })
          .then(() => setOpeFeatureA(true))
          .catch((error) => console.log(error));
      } else if (props.role === "instructor") {
        console.log("object");
        fetch(
          `https://eng-asu-lms.herokuapp.com/courses/course/instructorUploadAssignment`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          }
        )
          .then((res) => {
            console.log(res);

            return res.json();
          })
          .then((data) => {
            console.log(data);
            setError("");
            setlesson("");
            setfile("");

            setOpen(false);
            setDone(!Done);
            Array.from(document.querySelectorAll("input")).forEach(
              (input) => (input.value = null)
            );
            console.log("then data");
          })
          .then(() => {
            setlaoding(false);
          })

          .then(() => setOpeFeatureA(true))
          .catch((error) => console.log(error));
      }
    } else if (lesson.length != 0 && filename.length == 0) {
      alert("please upload your file");
    } else if (lesson.length == 0 && filename.length == 0) {
      setlesson("");
      setfile("");
      setOpen("");
      setTyped(false);
    }
    setlesson("");
    setfile("");
    setlaoding(false);
  };
  const handleClose = () => {
    setOpen("");
    setfile("");
    setlesson("");
    setOpeFeatureA(false);
  };
  const CloseFeatures = () => {
    setOpenFeature(false);
  };
  const Treenode = (event) => {
    setnodeId(event);
  };
  const getassigments = () => {
    if (lesson.length != 0) {
      const title = lesson;
      fetch(
        `https://eng-asu-lms.herokuapp.com/courses/course/assignments/${course_code}/${title}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((res) => {
          if (!res.ok) {
            throw Error(res.status);
          }
          return res.json();
        })
        .then((data) => (setfound(data), setnotfoundassi(false)))
        .catch(
          (error) => (setnotfoundassi(true), setfound(""), console.log(error))
        );
    } else if (lesson.length == 0) {
      setlesson("");
      setfile("");
      setTyped(false);
      setnotfoundassi(false);
    }
  };
  const download = (title) => {
    setOpenFeature(true);
  };
  console.log(url)
  const downloadDes = (title) => {
    const course_id = course.course._id;
    fetch(
      `https://eng-asu-lms.herokuapp.com/courses/course/downloadAssignments/${course_id}/${title}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res)=>{return res.json()})
      .then((err) => {
        setUrl(err)
      })
      .catch(() => console.log("error"))
      console.log('url',url)
  };
  const downloadStudent = (title) => {
    const course_id = course.course._id;

    fetch(
      `https://eng-asu-lms.herokuapp.com/courses/course/assignments/myAssignment/${course_id}/${title}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res)=>{return res.json()})

      .then((err) => {
        setUrl(err)
      })
      .catch(() => console.log("error"));
      console.log(url)
  };
  console.log(url)


  if (props.role == "instructor") {
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
            assignment Uploaded
          </Alert>
        </Snackbar>
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          open={OpenFeature}
          onClose={setOpenFeature}
          TransitionComponent={Slide}
          autoHideDuration={1000}
        >
          <Alert variant="filled" severity="success">
            Feature Coming Soon
          </Alert>
        </Snackbar>
        {/* <TextField
          placeholder="enter lesson title"
          required
          error={error}
          helperText={error}
          onChange={(e) =>
            e.target.value.length == 0
              ? (setTyped(false), setlesson(""))
              : (setTyped(true), setlesson(e.target.value))
          }
        />
        <Button onClick={getassigments}>Get Assignments</Button> */}
        {loading ? (
          <div style={{ maxWidth: "20%" }}>
            <Skeleton />
            <Skeleton /> <Skeleton />
          </div>
        ) : props.DesAssTitle ? (
          props.DesAssTitle.length === 0 ? (
            <h1>No Assignments Yet!!</h1>
          ) : (
            props.DesAssTitle.map((title, key) => (
              <div style={{ margin: "25px 0" }}>
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
                    label={"Assignment " + title.title}
                    onClick={() => downloadDes(title.title)}
                  >
                    <Box>
                      <p style={{ fontWeight: "bolder", display: "inline" }}>
                        Description
                      </p>

                      <IconButton href={url}>
                        <GetAppIcon />
                      </IconButton>
                      {showPdf != key + 1 ? (
                        <IconButton
                          onClick={
                            download
                          }
                        >
                          <VisibilityIcon />
                        </IconButton>
                      ) : (
                        <IconButton
                          onClick={() => {
                            setShowPdf("");
                          }}
                        >
                          <VisibilityOffIcon />
                        </IconButton>
                      )}

                      <IconButton
                        onClick={
                          download
}
                      >

                          <LaunchIcon />
                      </IconButton>
                    </Box>
                    {found ? (
                      found.map((asstitle, index) =>
                        asstitle === title.title ? (
                          <TreeItem
                            style={{ margin: "10px 0" }}
                            nodeId="2"
                            label="Show Submission"
                          >
                            Assignment {asstitle}.zip
                            <IconButton onClick={download}>
                              <GetAppIcon />
                            </IconButton>
                          </TreeItem>
                        ) : !found.includes(title.title) &&
                          index + 1 === found.length ? (
                          <p>No Submissions for Assignment {title.title}</p>
                        ) : null
                      )
                    ) : (
                      <p>No Submissions for Assignment {title.title}</p>
                    )}
                  </TreeItem>
                </TreeView>
              </div>
            ))
          )
        ) : (
          <h1>No Assignments Yet!!</h1>
        )}
        <div style={{ textAlign: "center", padding: "0 0 0 32%" }}>
          <Button
            onClick={!open ? handleOpen : upload}
            color="primary"
            variant="contained"
            disabled={loading}
          >
            {" "}
            {loading
              ? "loading..."
              : !open
              ? "Add Assignment"
              : !typed
              ? "x"
              : "done"}
          </Button>
        </div>

        <div
          className={clsx({
            [classes.root]: open,
            [classes.hide]: !open,
          })}
          style={{ alignItems: "baseline" }}
        >
          <FormControl
            variant="outlined"
            style={{
              width: "20%",
              textAlign: "center",
              marginRight: "15px",
            }}
          >
            <InputLabel
              style={{ color: error === "Enter Lesson Title" ? "red" : null }}
            >
              Enter lesson title
            </InputLabel>
            <Select
              onChange={(e) =>
                e.target.value.length == 0
                  ? (setTyped(false), setlesson(""))
                  : (setTyped(true), setlesson(e.target.value))
              }
              required
              error={error === "Enter Lesson Title"}
              label={"Enter lesson title"}
              onChange={(e) =>
                e.target.value.length == 0
                  ? (setTyped(false), setlesson(""))
                  : (setTyped(true), setlesson(e.target.value))
              }
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"1"}>1</MenuItem>
              <MenuItem value={"2"}>2</MenuItem>
              <MenuItem value={"3"}>3</MenuItem>
              <MenuItem value={"4"}>4</MenuItem>
              <MenuItem value={"5"}>5</MenuItem>
              <MenuItem value={"6"}>6</MenuItem>
              <MenuItem value={"7"}>7</MenuItem>
              <MenuItem value={"8"}>8</MenuItem>
              <MenuItem value={"9"}>9</MenuItem>
              <MenuItem value={"10"}>10</MenuItem>
            </Select>
          </FormControl>

          <div>
            <input
              id="contained-button-file"
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
                Upload Description
              </Button>
            </label>
          </div>
        </div>
      </Box>
    );
  } else if (props.role == "student") {
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
            assignment Uploaded
          </Alert>
        </Snackbar>
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          open={OpenFeature}
          onClose={setOpenFeature}
          TransitionComponent={Slide}
          autoHideDuration={1000}
        >
          <Alert variant="filled" severity="success">
            Feature Coming Soon
          </Alert>
        </Snackbar>
        {loading ? (
          <div style={{ maxWidth: "20%" }}>
            <Skeleton />
            <Skeleton /> <Skeleton />
          </div>
        ) : props.DesAssTitle ? (
          props.DesAssTitle.length === 0 ? (
            <h1>No Assignments Yet!!</h1>
          ) : (
            props.DesAssTitle.map((title, key) => (
              <div style={{ display: "flex", margin: "25px 0" }}>
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
                    onClick={() => downloadDes(title.title)}

                    label={
                      props.AssTitle ? (
                        <div
                          style={{ display: "flex", alignItems: "flex-end" }}
                        >
                          <p style={{ marginBottom: 0, marginRight: "10px" }}>
                            {"Assignment " + title.title}
                          </p>
                          <Chip
                            color={
                              !props.AssTitle.some(
                                (el) => el.title === title.title
                              )
                                ? "secondary"
                                : "success"
                            }
                            icon={
                              props.AssTitle.some(
                                (el) => el.title === title.title
                              ) ? (
                                <DoneIcon />
                              ) : (
                                <CloseIcon />
                              )
                            }
                            label={
                              !props.AssTitle.some(
                                (el) => el.title === title.title
                              )
                                ? "not submitted"
                                : "submitted"
                            }
                            size="small"
                          />
                        </div>
                      ) : (
                        <div
                          style={{ display: "flex", alignItems: "flex-end" }}
                        >
                          <p style={{ marginBottom: 0, marginRight: "10px" }}>
                            {"Assignment " + title.title}
                          </p>
                          <Chip
                            color={"secondary"}
                            icon={<CloseIcon />}
                            label={"not submitted"}
                            size="small"
                          />
                        </div>
                      )
                    }
                  >
                    <Box>
                      <p style={{ fontWeight: "bolder", display: "inline" }}>
                        Description
                      </p>

                      <IconButton href={url}>
                        <GetAppIcon />
                      </IconButton>
                      {showPdf != key + 1 ? (
                        <IconButton
                          onClick={
                            download
                          }
                        >
                          <VisibilityIcon />
                        </IconButton>
                      ) : (
                        <IconButton
                          onClick={() => {
                            setShowPdf("");
                          }}
                        >
                          <VisibilityOffIcon />
                        </IconButton>
                      )}

                      <IconButton
                        onClick={
                          download
                        }
                      >
                        <LaunchIcon />
                      </IconButton>
                    </Box>

                    {props.AssTitle ? (
                      props.AssTitle.map((asstitle, index) =>
                        asstitle.title === title.title ? (
                          <TreeItem
                            style={{ margin: "10px 0" }}
                            nodeId="2"
                            label="Show Submission"
                            onClick={() => downloadStudent(title.title)}
                          >
                            Assignment {asstitle.title}.pdf
                            <IconButton href={url}>
                              <GetAppIcon />
                            </IconButton>
                          </TreeItem>
                        ) : !props.AssTitle.some(
                            (el) => el.title === title.title
                          ) && index + 1 === props.AssTitle.length ? (
                          <div>
                            <Button
                              onClick={(e) => upload(title.title)}
                              key={key}
                              color="primary"
                              variant="contained"
                              style={{
                                display:
                                  Number(nodeid + 1) === Number(title.title) &&
                                  filename != 0
                                    ? "flex"
                                    : "none",
                              }}
                            >
                              Done
                            </Button>

                            <input
                              id="index"
                              type="file"
                              style={{ display: "none" }}
                              onChange={(e) =>
                                e.target.files[0].length == 0
                                  ? setfile("")
                                  : setfile(e.target.files[0])
                              }
                            />
                            <label htmlFor="index">
                              <Button
                                startIcon={<CloudUploadIcon />}
                                color="primary"
                                component="span"
                                onClick={() => Treenode(key)}
                              >
                                Upload submission
                              </Button>
                            </label>
                          </div>
                        ) : null
                      )
                    ) : (
                      <div>
                        <Button
                          onClick={() => upload(title.title)}
                          color="primary"
                          variant="contained"
                          style={{
                            display:
                              Number(nodeid + 1) === Number(title.title) &&
                              filename != 0
                                ? "flex"
                                : "none",
                          }}
                        >
                          Done
                        </Button>

                        <input
                          id={`${nodeid}`}
                          type="file"
                          style={{ display: "none" }}
                          onChange={(e) =>
                            e.target.files[0].length == 0
                              ? setfile("")
                              : setfile(e.target.files[0])
                          }
                        />
                        <label htmlFor={`${nodeid}`}>
                          <Button
                            startIcon={<CloudUploadIcon />}
                            color="primary"
                            component="span"
                            onClick={() => Treenode(key)}
                          >
                            Upload submission
                          </Button>
                        </label>
                      </div>
                    )}
                  </TreeItem>
                </TreeView>
              </div>
            ))
          )
        ) : (
          <h1>No Assignments Yet!!</h1>
        )}

        {/* <div>
               <Button
               key={index}
               onClick={
                 open != index
                   ?  handleOpen
                   : () => upload(asstitle.title)
               }
               color="primary"
               variant="contained"
             >
               {" "}
               {!open
                 ? "Add Assignment"
                 : filename.length == 0
                 ? "x"
                 : "done"}
             </Button>

             <div
               style={{
                 display: open ? "block" : "none",
               }}
             >
               <input
                 id="contained-button-file"
                 type="file"
                 style={{ display: "none" }}
                 onChange={(e) =>
                   e.target.files[0].length == 0
                     ? setfile("")
                     : setfile(e.target.files[0])
                 }
               />
               <label htmlFor="contained-button-file">
                 <Button
                   variant="contained"
                   color="primary"
                   component="span"
                 >
                   Upload submission
                 </Button>
               </label>
             </div>
         
              </div>  */}

        {/* {props.lessonTitles==null?
          <h1>no content found</h1>:
          props.lessonTitles.map((title)=>
          <div style={{color:'blue'}}>
  <Button startIcon={<ArrowRightIcon/>} onClick={()=>download(title)}>
  {title}
  </Button>
          </div>
  
          )} */}
      </Box>
    );
  }
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    AssTitle: state.list.AssTitle[0],
    DesAssTitle: state.list.DesAssTitle[0],
    error: state.list.error,
    pending: state.list.pending,
    role: state.user.role,
    name: state.user.name,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchAction: (status, data) => dispatch(fetchAction(status, data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Content);

/* { (
                        <div
                          style={{
                            textAlign: "center",
                            padding: "0 0 0 32%",
                          }}
                        >
                          <h1>No Submission for Assignment {title.title}</h1>
                          <Button
                            key={index}
                            onClick={
                              open != index
                                ? () => handleOpen(index)
                                : () => upload(title.title)
                            }
                            color="primary"
                            variant="contained"
                          >
                            {" "}
                            {open != index
                              ? "Add Assignment"
                              : filename.length == 0
                              ? "x"
                              : "done"}
                          </Button>

                          <div
                            style={{
                              display: open === index ? "block" : "none",
                            }}
                          >
                            <input
                              id="contained-button-file"
                              type="file"
                              style={{ display: "none" }}
                              onChange={(e) =>
                                e.target.files[0].length == 0
                                  ? setfile("")
                                  : setfile(e.target.files[0])
                              }
                            />
                            <label htmlFor="contained-button-file">
                              <Button
                                variant="contained"
                                color="primary"
                                component="span"
                              >
                                Upload submission
                              </Button>
                            </label>
                          </div>
                        </div>
                      )}} */
// {props.DesAssTitle ? (
//   props.DesAssTitle.length === 0 ? (
//     <h1>no content found</h1>
//   ) : (
//     props.DesAssTitle.map((title, index) => (
//       <div>
//         <TreeView
//           style={{
//             flexGrow: 1,

//             maxWidth: 400,
//           }}
//           defaultCollapseIcon={<ExpandMoreIcon />}
//           defaultExpandIcon={<ChevronRightIcon />}
//         >
//           <TreeItem
//             nodeId="1"
//             label={"Assignment " + title.title}
//             style={{ marginBottom: "10px" }}
//           >
//             <TreeItem
//               nodeId="2"
//               label="Show Describtion"
//               style={{ marginBottom: "10px" }}
//             >
//               <a onClick={() => downloadDes(title.title)}>
//                 {title.title}
//               </a>
//             </TreeItem>
//             <TreeItem
//               nodeId="3"
//               label="Show Submission"
//               style={{ marginBottom: "10px" }}
//             >
//               {found.length != 0 ? (
//                 found[index] ? (
//                   <div>
//                     <a onClick={() => download(found[index])}>
//                       {found[index]}
//                     </a>
//                   </div>
//                 ) : (
//                   <h1>No Submission for Assignment {title.title}</h1>
//                 )
//               ) : notfoundassi ? (
//                 <h1>No Submission for Assignment {title.title}</h1>
//               ) : null}
//             </TreeItem>
//           </TreeItem>
//         </TreeView>
//       </div>
//     ))
//   )
// ) : null}
