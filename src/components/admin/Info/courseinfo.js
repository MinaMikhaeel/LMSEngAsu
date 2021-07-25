import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  InputBase,
  Paper,
  Typography,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Snackbar from "@material-ui/core/Snackbar";
import Slide from "@material-ui/core/Slide";
import Alert from "@material-ui/lab/Alert";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import usefetch from "../../fetch";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import DoneIcon from "@material-ui/icons/Done";
import { Label, SentimentVerySatisfiedSharp, Update } from "@material-ui/icons";
import EditIcon from "@material-ui/icons/Edit";
import { connect } from "react-redux";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Collapse } from "antd";
import "./collapse.css";
import DeleteIcon from "@material-ui/icons/Delete";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import useWindowSize from "../../../utiles/useWindowSize";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
const useStyles = makeStyles((theme) => ({
  "@global": {
    ".ant-collapse-item:last-child > .ant-collapse-content": {
      height: "480px",
    },
    ".ant-collapse-content > .ant-collapse-content-box": {
      height: "100%",
    },
  },
  FlexBases: {
    width: "55%",
  },
  logColor: {
    color: "#09B9DC",
    marginBottom: "30px",
    textAlign: "center",
  },
  logColorSmall: {
    color: "#09B9DC",
    marginBottom: "30px",
    textAlign: "center",
    marginRight: "10px",
    fontSize: "26px",
  },
  Labelflex: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    paddingBottom: "30px",
  },
  LabelflexFinal: {
    alignItems: "center",
    justifyContent: "space-around",
    width: "90%",
    margin: "auto",
  },
  bg: {
    display: "inline",
    marginRight: "10px",
  },
  toolbar: {
    paddingTop: 0,
  },

  Border: {
    borderBottom: "3px inset",
    paddingBottom: "10px",
    marginBottom: "15px",
    width: "100%",
    display: "flex",
    position: "sticky",
    top: "0%",
    padding: "25px",
    background: "#fff",
    justifyContent: "space-between",
    zIndex: "5",
  },
  input: {
    width: "75%",
    transition: theme.transitions.create(["width", "border"], {
      easing: theme.transitions.easing.easeIn,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  inputClose: {
    border: "none",

    width: "0",
  },
}));

function StudentInfo(props) {
  const classes = useStyles();
  const { Panel } = Collapse;
  const { Icode, token } = props;
  const [name, setName] = useState(null);
  const [password, setPass] = useState(null);
  const [code, setCode] = useState(null);
  const [year, setYear] = useState(null);
  const [score, setScore] = useState(null);
  const [searchcode, setsearchcode] = useState("");
  const { width } = useWindowSize();

  const old_code = Icode.code;
  const [courses, setCourses] = useState([]);
  const [coursesError, setCoursesError] = useState(false);
  const [openDialogue, setopenDialogue] = useState(false);
  const [unEnrolled, setunenrolled] = useState(false);
  const [user_id, setuser_id] = useState("");
  const [err400, seterr400] = useState("");
  const [err, seterr] = useState("");
  const [err400email, seterr400email] = useState("");
  const [erremail, seterremail] = useState("");
  const { datal, pending, error } = props;
  const [Editname, setEditname] = useState("");
  const [Edit, setEdit] = useState(false);
  const [openA, setOpenA] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const abort = new AbortController();

  const openAdd = () => {
    setEdit(true);
    if (code != Icode.code) {
      setCode(Icode.code);

      setScore(Icode.score);

      setName(Icode.name);

      setYear(Icode.year);
    }

    setsearchcode(Icode.code);
  };
  const onChangetext = (e, field) => {
    if (field === "code") {
      if (e.target.value.length === 0) {
        seterr("short");
      } else {
        seterr("");
        if (e.target.value != Icode.oode) {
          setCode(e.target.value);
        } else {
          setCode(Icode.code);
        }
      }
    } else if (field === "score") {
      if (e.target.value > 100 && e.target.value.length != 0) {
        seterremail("less100");
      } else if (e.target.value.length === 0) {
        seterremail("Please Enter Course Score");
      } else {
        seterremail("");
        if (e.target.value != Icode.score) {
          setScore(e.target.value);
        } else {
          setScore(Icode.score);
        }
      }
    }
  };
  const update = async () => {
    try {
      const old_code = Icode.code;
      const res = await fetch("https://eng-asu-lms.herokuapp.com/admins/courses/update", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${props.token}`,
        },
        body: JSON.stringify({
          name,
          score,
          code,
          year,
          old_code,
        }),
      });

      const result = await res.json();
      console.log("result", result);
      console.log(year);
      if (res.status === 200) {
        seterr400("");
        seterr400email("");
        setunenrolled(!unEnrolled);
        props.submit();
        props.opensnack();
        setEditname(name);
        if (code === Icode.code) {
          setCode(result.code);

          setScore(result.score);

          setName(result.name);

          setYear(result.year);
        }

        if (searchcode != code) {
          props.close();
        }
        setEdit(false);
      } else if (res.status === 404) {
        console.log("result", result);
        seterr400("An error occured. Try again Later");
        if (result.search("year") !== -1) {
          seterr400email("there are no students in this year !");
        }
      } else if (res.status === 500) {
        console.log("result", result);
        if (result.search("code") !== -1) {
          seterr400("This code is taken by another course");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    setOpenA(false);
  };
  const handleOpen = () => {
    setOpenA(true);
  };
  const close = () => {
    setopenDialogue(false);
  };
  const Unenroll = (course_id) => {
    fetch("https://eng-asu-lms.herokuapp.com/admins/students/deleteEnroll", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${props.token}`,
      },
      body: JSON.stringify({
        course_id,
        user_id,
      }),
    })
      .then(() => close(), setunenrolled(!unEnrolled))
      .catch((error) => console.log(error.message));
  };
  useEffect(() => {
    const code = Icode.code;
    fetch(`https://eng-asu-lms.herokuapp.com/admins/courses/course/students/${code}`, {
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
        setCourses(data);
        setCoursesError(false);
      })
      .catch((error) => {
        if (error.name === "AbortError") {
          console.log("aborted");
        } else {
          setCoursesError(true);
        }
      });
    return () => abort.abort();
  }, [Icode.code, unEnrolled]);
  const handleUnenroll = (user_id) => {
    setuser_id(user_id);
    setopenDialogue(true);
  };
  const check = () => {
    if (!Edit) {
      props.close();
    } else {
      alert("pleade done your updates");
    }
  };
  const Row = ({ index, style }) => (
    <div style={style}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="baseline"
        style={{
          fontSize: "20px",
          padding: "0 10px",
          borderBottom: index + 1 == courses.length ? "none" : "3px inset",
        }}
      >
        <p>{index + 1}</p>
        <p
          style={{
            fontWeight: "bolder",
            width: "40%",
            textAlign: "left",
          }}
        >
          {" "}
          {
            courses
              .filter(
                (user) =>
                  user.studentName.toLowerCase().includes(searchVal.toLowerCase()) ||
                  user.studentCode.toLowerCase().includes(searchVal.toLowerCase())
              )
              .sort((a, b) =>
                a.studentName > b.studentName
                  ? 1
                  : b.studentName > a.studentName
                  ? -1
                  : 0
              )[index].studentName
          }
        </p>
        <p style={{ width: "40%", textAlign: "left" }}>
          {" "}
          {
            courses
              .filter(
                (user) =>
                  user.studentName.toLowerCase().includes(searchVal.toLowerCase()) ||
                  user.studentCode.toLowerCase().includes(searchVal.toLowerCase())
              )
              .sort((a, b) =>
                a.studentName > b.studentName
                  ? 1
                  : b.studentName > a.studentName
                  ? -1
                  : 0
              )[index].studentCode
          }
        </p>

        <Tooltip style={{ width: "5%" }} title="UnEnroll">
          <IconButton
            onClick={() =>
              handleUnenroll(
                courses
                  .filter(
                    (user) =>
                      user.studentName.toLowerCase().includes(searchVal.toLowerCase()) ||
                      user.studentCode.toLowerCase().includes(searchVal.toLowerCase())
                  )
                  .sort((a, b) =>
                    a.studentName > b.studentName
                      ? 1
                      : b.studentName > a.studentName
                      ? -1
                      : 0
                  )[index].studentID
              )
            }
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </div>
  );

  return (
    <Box className={classes.toolbar}>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={openA}
        onClose={handleClose}
        TransitionComponent={Slide}
        autoHideDuration={1000}
      >
        <Alert variant="filled" severity="success">
          Updated
        </Alert>
      </Snackbar>

      <Box className={classes.Border}>
        <Tooltip
          title={Edit ? "Done" : "Edit"}
          size="small"
          onClick={!Edit ? openAdd : update}
          disabled={
            Edit &&
            (err == "short" ||
              erremail == "less100" ||
              erremail === "Please Enter Course Score")
          }
        >
          <Fab color="primary">{Edit ? <DoneIcon /> : <EditIcon />}</Fab>
        </Tooltip>
        <Tooltip
          style={{ fontSize: "26px" }}
          title="close"
          size="small"
          onClick={check}
        >
          <Fab color="primary">&times;</Fab>
        </Tooltip>
      </Box>
      <Dialog open={openDialogue} onClose={close}>
        <DialogTitle>{"Are you sure you want to unenroll?"}</DialogTitle>
        <DialogActions>
          <Button onClick={() => Unenroll(Icode._id)} color="secondary">
            Yes
          </Button>
          <Button onClick={close} color="error">
            no
          </Button>
        </DialogActions>
      </Dialog>
      <Typography
        variant="h4"
        className={
          width < 400
            ? classes.logColorSmall
            : width < 900
            ? classes.logColor
            : width > 980
            ? classes.logColor
            : classes.logColorSmall
        }
      >
        <span style={{ textTransform: "uppercase" }}>
          {name == null
            ? Icode.name
            : !Edit && Icode.code === code
            ? Editname
            : Icode.name}
        </span>
        's Info
      </Typography>
      {props.datal &&
        props.datal
          .filter((user) => user.code == Icode.code)
          .map((info) => (
            <Box key={old_code}>
              <label className={classes.Labelflex}>
                <Typography variant="h6" className={classes.bg}>
                  Name:
                </Typography>
                {Edit ? (
                  <TextField
                    variant="outlined"
                    className={classes.FlexBases}
                    defaultValue={info.name}
                    onChange={(e) =>
                      e.target.value != Icode.name
                        ? setName(e.target.value)
                        : setName(Icode.name)
                    }
                  ></TextField>
                ) : (
                  <TextField
                    variant="outlined"
                    className={classes.FlexBases}
                    disabled
                    value={info.name}
                  ></TextField>
                )}
              </label>
              <label className={classes.Labelflex}>
                <Typography variant="h6" className={classes.bg}>
                  code:
                </Typography>
                {Edit ? (
                  <TextField
                    variant="outlined"
                    className={classes.FlexBases}
                    defaultValue={info.code}
                    onChange={(e) => onChangetext(e, "code")}
                    helperText={
                      err400 === "This code is taken by another course"
                        ? "This code is taken by another course"
                        : err === "short"
                        ? "Please Enter Course Code"
                        : null
                    }
                    error={
                      err400 === "This code is taken by another course" ||
                      err == "short"
                    }
                  ></TextField>
                ) : (
                  <TextField
                    variant="outlined"
                    className={classes.FlexBases}
                    disabled
                    value={info.code}
                  ></TextField>
                )}
              </label>
              {/* <label className={classes.Labelflex}>
                <Typography variant="h6" className={classes.bg}>
                  teached by:
                </Typography>
                {(
                  <TextField
                    variant="outlined"
                    className={classes.FlexBases}
                    disabled
                    value={info.instructor_id}
                  ></TextField>
                )}
              </label> */}

              <label className={classes.Labelflex}>
                <Typography variant="h6" className={classes.bg}>
                  score:
                </Typography>
                {Edit ? (
                  <TextField
                    variant="outlined"
                    helperText={
                      erremail === "less100"
                        ? "The code must be less than or equal 100"
                        : erremail === "Please Enter Course Score"
                        ? "Please Enter Course Score"
                        : null
                    }
                    error={
                      erremail === "less100" ||
                      erremail === "Please Enter Course Score"
                    }
                    className={classes.FlexBases}
                    defaultValue={info.score}
                    onChange={(e) => onChangetext(e, "score")}
                    type="number"
                  ></TextField>
                ) : (
                  <TextField
                    variant="outlined"
                    className={classes.FlexBases}
                    disabled
                    value={info.score}
                  ></TextField>
                )}
              </label>

              <label className={classes.Labelflex}>
                <Typography variant="h6" className={classes.bg}>
                  Year:
                </Typography>
                {Edit ? (
                  <FormControl className={classes.FlexBases}>
                    <InputLabel
                      style={{
                        color:
                          err400email === "there are no students in this year !"
                            ? "red"
                            : null,
                      }}
                    >
                      {" "}
                      {err400email === "there are no students in this year !"
                        ? "there are no students in this year !"
                        : "Year"}
                    </InputLabel>

                    <Select
                      defaultValue={info.year}
                      onChange={(e) =>
                        e.target.value != info.year
                          ? setYear(e.target.value)
                          : setYear(info.year)
                      }
                      error={
                        err400email === "there are no students in this year !"
                      }
                    >
                      <MenuItem value={"1"}>1</MenuItem>
                      <MenuItem value={"2"}>2</MenuItem>
                      <MenuItem value={"3"}>3</MenuItem>
                      <MenuItem value={"4"}>4</MenuItem>
                      <MenuItem value={"5"}>5</MenuItem>
                    </Select>
                  </FormControl>
                ) : (
                  <TextField
                    variant="outlined"
                    className={classes.FlexBases}
                    disabled
                    value={info.year}
                  ></TextField>
                )}
              </label>
              <Collapse
                className={classes.LabelflexFinal}
                expandIconPosition={"right"}
                expandIcon={({ isActive }) => (
                  <ExpandMoreIcon
                    style={{
                      transform: isActive ? "rotate(180deg)" : "rotate(0deg)",
                      fontSize: "20px",
                      top: "31%",
                    }}
                  />
                )}
                style={{ position: "sticky", top: "1000px" }}
              >
              <Panel header={ coursesError? "0 Enrolled Students" :(courses.filter((user) =>
 (user.studentName.toLowerCase().includes(searchVal.toLowerCase()) ||
        user.studentCode.toLowerCase().includes(searchVal.toLowerCase()))
).length === courses.length
  ? courses.filter((user) =>
          (user.studentName.toLowerCase().includes(searchVal.toLowerCase()) ||
            user.studentCode.toLowerCase().includes(searchVal.toLowerCase()))
    ).length 
  :courses.filter((user) =>
  (user.studentName.toLowerCase().includes(searchVal.toLowerCase()) ||
    user.studentCode.toLowerCase().includes(searchVal.toLowerCase()))
    ).length +
    " out of " +
    courses.length)+" Enrolled Students"}>                  <Box style={{ width: "100%" }}>
                    {openSearch ? (
                      <IconButton
                        onClick={(e) => (
                          setOpenSearch(false),
                          setSearchVal(""),
                          Array.from(
                            document.querySelectorAll("input")
                          ).forEach((input) => (input.value = ""))
                        )}
                      >
                        <CloseIcon />
                      </IconButton>
                    ) : (
                      <IconButton
                        onClick={() => {
                          setOpenSearch(true);
                        }}
                      >
                        <SearchIcon />
                      </IconButton>
                    )}
                    <InputBase
                      className={
                        openSearch ? classes.input : classes.inputClose
                      }
                      placeholder={
                        openSearch
                          ? (width >= 900 && width < 1200) || width < 650
                            ? "search Enrolled Students..."
                            : "Search Enrolled Students by name or code..."
                          : null
                      }
                      onChange={(e) => {
                        setSearchVal(e.target.value);
                      }}
                    />
                  </Box>
                  {coursesError ? (
                    <p style={{ textAlign: "center", fontSize: "20px" }}>
                      No student found
                    </p>
                  ) : (
                    <AutoSizer>
                      {({ width, height }) => (
                        <List
                          height={height}
                          itemCount={
                            courses
                              .filter(
                                (user) =>
                                  (user.studentName.toLowerCase().includes(
                                    searchVal.toLowerCase()
                                  ) ||
                                  user.studentCode.toLowerCase().includes(
                                    searchVal.toLowerCase()
                                  ))
                              )
                              .sort((a, b) =>
                                a.studentName > b.studentName
                                  ? 1
                                  : b.studentName > a.studentName
                                  ? -1
                                  : 0
                              ).length
                          }
                          itemSize={95}
                          width={width}
                        >
                          {Row}
                        </List>
                      )}
                    </AutoSizer>
                  )}
                </Panel>
              </Collapse>
            </Box>
          ))}
    </Box>
  );
}

const mapStateToProps = (state) => {
  return {
    datal: state.list.courseslist[0],
  };
};

export default connect(mapStateToProps, null)(StudentInfo);
