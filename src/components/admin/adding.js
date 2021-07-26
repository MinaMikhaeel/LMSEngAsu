import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputBase,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  Typography,
} from "@material-ui/core";
import Navbar from "../navbar";
import { makeStyles } from "@material-ui/core/styles";
import Form from "./studentForm/form";
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import { useEffect, useState } from "react";
import clsx from "clsx";
import DoneIcon from "@material-ui/icons/Done";
import Studentlist from "./studentlist/studentlist";
import { fetchAction } from "../../store/action/fetchAction";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import StudentInfo from "./Info/StudentInfo";
import { connect } from "react-redux";
import { Edit, InsertDriveFile } from "@material-ui/icons";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import Alert from "@material-ui/lab/Alert";
import { DialogContent } from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import useWindowSize from "../../utiles/useWindowSize";
import Skeleton from '@material-ui/lab/Skeleton';
import CircularProgress from '@material-ui/core/CircularProgress';

import Item from "antd/lib/list/Item";
const useStyles = makeStyles((theme) => ({
  scroll: {
    "@global": {
      "*::-webkit-scrollbar": {
        width: "0.4em",
      },
      "*::-webkit-scrollbar-track": {
        "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
      },
      "*::-webkit-scrollbar-thumb": {
        backgroundColor: "rgba(0,0,0,.1)",
        outline: "1px solid slategrey",
      },
    },
  },

  root: {
    display: "flex",
  },
  block: {
    display: "block",
  },
  hide: {
    display: "none",
  },
  show: {
    background:
      "linear-gradient(103deg, rgba(42,167,228,1) 0%, rgba(23,77,142,1) 84%, rgba(29,49,131,1) 100%)",
    height: "calc(100vh - 64px)",
    padding: "25px 0",
    "@global": {
      "*::-webkit-scrollbar": {
        width: "0.4em",
      },
      "*::-webkit-scrollbar-track": {
        "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
      },
      "*::-webkit-scrollbar-thumb": {
        backgroundColor: "rgba(0,0,0,.1)",
        outline: "1px solid slategrey",
      },
    },
  },
  showClose: {
    background:
      "linear-gradient(103deg, rgba(42,167,228,1) 0%, rgba(23,77,142,1) 84%, rgba(29,49,131,1) 100%)",
    height: "calc(100vh - 64px)",
    "@global": {
      "*::-webkit-scrollbar": {
        width: "0.4em",
      },
      "*::-webkit-scrollbar-track": {
        "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
      },
      "*::-webkit-scrollbar-thumb": {
        backgroundColor: "rgba(0,0,0,.1)",
        outline: "1px solid slategrey",
      },
    },
  },
  toolbar: {
    width: "50%",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0px 0px 16px",
    height: "100%",
    overflow: "auto",
    position: "relative",
  },
  toolbarMedium: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0px 0px 16px",
    height: "100%",
    overflow: "auto",
    position: "relative",
  },
  toolbarsmall: {
    width: "100%",
    backgroundColor: "#fff",
    height: "100%",
    overflow: "auto",
    position: "relative",
  },
  linkDecoration: {
    width: "40%",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0px 0px 16px",
    padding: "30px",
  },
  linkDecorationSmall: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    padding: "30px",
  },
  logColor: {
    color: "#09B9DC",
    textAlign: "center",
    width: "100%",
  },
  linkDecorationInfo: {
    width: "40%",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0px 0px 16px",
    height: "100%",
    overflow: "auto",
  },
  linkDecorationInfonSmall: {
    backgroundColor: "#fff",
    height: "100%",
    overflow: "auto",
    width: "100%",
  },
  Border: {
    display: "flex",
    padding: "20px 20px 0",
  },
  headingcontainer: {
    borderBottom: "3px inset",
    paddingBottom: "10px",
  },
  sticky: {
    position: "sticky",
    top: "0",
    background: "#fff",
    zIndex: "5",
  },
  center: {
    position: "absolute",
    top: "50%",
    left: "50%",

    fontSize: "39px",
    transform: "translate(-50%, -50%)",
  },
  button: {
    width: "100%",
  },
  input: {
    border: "1px solid #bfbfbf",
    borderRadius: "17px",
    width: "75%",
    marginTop: "10px",
    height: "34px",
    padding: "16px",
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

const Adding = (props) => {
  const classes = useStyles();
  const [submitted, setSubmit] = useState(false);
  const [YearVal, setYearVal] = useState("");
  const [loading, setLoading] = useState(false);
  const submit = () => {
    setSubmit(!submitted);
  };

  const abort = new AbortController();
  useEffect(() => {
    setLoading(true)
    fetch(`https://eng-asu-lms.herokuapp.com/admins/getAllStudents`, {
      signal: abort.signal,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${props.props.token}`,
      },
    })
      .then((res) => {
        if (res.status === 404) {
          throw Error("404");
        }

        return res.json();
      })
      .then((data) => {
        props.fetchAction("done", data);
      })
      .then(   ()=>     {setLoading(false)}
      )
      .catch((error) => {
        setLoading(false)
        if (error.name === "AbortError") {
          console.log("aborted");
        } else {
          props.fetchAction("error");
        }
        setLoading(false)

      });
    return () => abort.abort();
  }, [submitted]);
  const [open, setOpen] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [openInfo, setOpenInfo] = useState(false);
  const [Infocode, setInfoCode] = useState("");
  const [searchcode, setsearchcode] = useState("");
  const [filename, setfile] = useState("");
  const [Created, setCreated] = useState(false);
  const [Errorreport, setErrorreport] = useState({
    indicesOfFailedSaving: "",
    numberOfSavedSuccessfuly: "",
  });
  const [openDialogue, setopenDialogue] = useState(false);
  const [openA, setOpenA] = useState(false);
  const [openUpdateSnack, setopenUpdateSnack] = useState(false);
  const [NotText, setNotText] = useState(false);
  const role = "student";
  const [loadingfile, setloadingfile] = useState(false);
  const { width } = useWindowSize();
  const handleClose = () => {
    setOpenA(false);
  };
  const handleCloseUpdateSnakc = () => {
    setopenUpdateSnack(false);
  };
  const handleOpenUpdateSnakc = () => {
    setOpenA(true);
    setopenUpdateSnack(true);
  };
const  closeDial=()=>{
  setopenDialogue(false);
}

  const handleOpenDial = () => {
    setErrorreport({ indicesOfFailedSaving: "", numberOfSavedSuccessfuly: "" });
    setopenDialogue(true);
  };
  const openAdd = () => {
    setOpen(!open);
    setOpenInfo(false);
  };

  const Delete = (code) => {
    console.log(code);
    fetch("https://eng-asu-lms.herokuapp.com/admins/deleteUser", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${props.props.token}`,
      },
      body: JSON.stringify({ code }),
    })
    .then( ()=> submit())
    .then(()=>{
      setOpenA(true)
    })
    .then(()=>{setLoading(false)})
    .catch(alert('error occured! please try again later'))
  };

  const Info = (information) => {
    setInfoCode(information);
    setOpen(false);
    if (!openInfo) {
      setOpenInfo(true);
    }
  };
  const close = () => {
    setOpenInfo(false);
    setOpen(false);
  };
  const createFile = async () => {
    if (filename.length != 0) {
      var formData = new FormData();
      formData.append(`upload`, filename);
      setNotText(false);
      console.log(filename);
      try {
        setloadingfile(true);
        const response = await fetch(
          `https://eng-asu-lms.herokuapp.com/usersAuto/${role}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${props.token}`,
            },
            body: formData,
          }
        );
        const result = await response.json();
        console.log(result);
        if (response.status === 201) {
          setOpenA(true);
          setCreated(true);
          setErrorreport({
            indicesOfFailedSaving: "",
            numberOfSavedSuccessfuly: "",
          });
          closeDial();
          submit();
          setloadingfile(false);
          Array.from(document.querySelectorAll("input")).forEach(
            (input) => (input.value = "")
          );
        } else if (response.status === 400) {
          setCreated(false);
          setErrorreport(result);
          setloadingfile(false);
          if(result.numberOfSavedSuccessfuly[0].number_of_saved_lines>0){
            submit()
            }
          console.log(Errorreport, Created);
        } else if (response.status === 500) {
          console.log("here", result);
        }
      } catch (error) {
        setNotText(true);
        setloadingfile(false);
      }
    } else if (filename.toLowerCase().length == 0) {
      alert("please upload your file");
    }
  };

  const Row = ({ index, style }) => (
    <div style={style}>
      <Studentlist
        delete={Delete}
        Info={Info}
        student={
          props.datal
            .filter((user) =>
              YearVal.length == 0
                ? user.name.toLowerCase().includes(searchVal.toLowerCase()) ||
                  user.code.toLowerCase().includes(searchVal.toLowerCase())
                : user.year.includes(YearVal) &&
                  (user.name.toLowerCase().includes(searchVal.toLowerCase()) ||
                    user.code.toLowerCase().includes(searchVal.toLowerCase()))
            )
            .sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0))[
            index
          ]
        }
        index={index}
      />
    </div>
  );

  return (
    <Navbar hide={props}>
      <Box
        className={width < 900 ? classes.showClose : classes.show}
        display="flex"
        alignItems="center"
        justifyContent="space-around"
      >
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
            {'Done'}
          </Alert>
        </Snackbar>
        <Dialog
          className={classes.scroll}
          open={openDialogue}
          onClose={closeDial}
          fullWidth="xs"
        >
          <DialogTitle>
            {loadingfile?null: Errorreport.indicesOfFailedSaving.length > 0
              ? Errorreport.numberOfSavedSuccessfuly[0].number_of_saved_lines >
                0
                ? Errorreport.numberOfSavedSuccessfuly[0]
                    .number_of_saved_lines +
                  " out of " +
                  (Number(Errorreport.numberOfSavedSuccessfuly[0].number_of_failed_lines) + Number(Errorreport.numberOfSavedSuccessfuly[0].number_of_saved_lines)) +
                  " " +
                  role +
                  "s created"
                : "no " + role + "s created, ERRORS REPORT"
              : "Enter Your File"}
          </DialogTitle>
          <DialogContent
            style={{
              textAlign:
                Errorreport.indicesOfFailedSaving.length > 0
                  ? "left"
                  : "center",
            }}
          >
            {Errorreport.indicesOfFailedSaving.length > 0 ? (
              Errorreport.indicesOfFailedSaving.map((report) => (
                <h1>
                  line {report.index_of_line} :{" "}
                  {report.status.search("code") !== -1
                    ? "This code is taken by another user"
                    : report.status.search("email") !== -1 &&
                      report.status.search("validation") === -1
                    ? "This email is taken by another user"
                    : report.status.search("email") !== -1 &&
                      report.status.search("validation") !== -1
                    ? "Please enter the email in the correct format"
                    : report.status.search("role") !== -1
                    ? "not a " + role
                    : "Error"}
                </h1>
              ))
            ) : loadingfile ? (
              <div style={{width:'100%'}}>
              <Skeleton />
              <Skeleton animation={false} />
              <Skeleton animation="wave" />
            </div>
            ) : (
              <div>
                <input
                  id="contained-button-file"
                  type="file"
                  style={{ display: "none" }}
                  onChange={(e) => setfile(e.target.files[0])}
                />
                <label htmlFor="contained-button-file">
                  <Button
                    color="primary"
                    component="span"
                    variant="contained"
                    endIcon={<CloudUploadIcon />}
                  >
                    Upload File
                  </Button>
                </label>
                {NotText ? (
                  <p
                    style={{
                      fontSize: "20px",
                      marginTop: "20px",
                      color: "#f00",
                    }}
                  >
                    please upload a text file
                  </p>
                ) : null}
              </div>
            )}
          </DialogContent>
          <DialogActions style={{display:loadingfile? 'none':'flex'}}>
            {Errorreport.indicesOfFailedSaving.length > 0 ? null : (
              <Button onClick={createFile} color="primary">
                Create
              </Button>
            )}
            <Button onClick={closeDial} color="error">
              cancel
            </Button>
          </DialogActions>
        </Dialog>
        <Box
          className={clsx(
            width < 900 ? classes.toolbarsmall : classes.toolbar,
            {
              [width < 900 ? classes.hide : null]: open || openInfo,
            }
          )}
        >
          <Box className={classes.sticky}>
            <Box className={classes.headingcontainer}>
              <Box
                className={classes.Border}
                style={{ justifyContent: open ? "flex-end" : "space-between" }}
              >
                <Tooltip
                  style={{ display: open ? "none" : null }}
                  title={"Add"}
                  size="small"
                  onClick={openAdd}
                >
                  <Fab color="primary" className={classes.fab}>
                    <AddIcon />
                  </Fab>
                </Tooltip>

                <Tooltip
                  title={"Add File"}
                  size="small"
                  onClick={handleOpenDial}
                >
                  <Fab color="primary" className={classes.fab}>
                    <InsertDriveFile />
                  </Fab>
                </Tooltip>
              </Box>
              <Typography variant="h4" className={classes.logColor}>
                Manage Students
              </Typography>
            </Box>

            <Box
              style={{
                margin:
                  (width >= 900 && width < 1200) || width < 570
                    ? "15px 0 15px 5px"
                    : "15px 0 15px 25px",
                display: "flex",
                justifyContent: "space-between",
                paddingRight: "20px",
              }}
            >
              <Box
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  width: "100%",
                }}
              >
                <FormControl
                  variant="outlined"
                  style={{
                    width:
                      (width >= 900 && width < 1200) || width < 570
                        ? "30%"
                        : "20%",
                    textAlign: "center",
                  }}
                >
                  <InputLabel>Year</InputLabel>
                  <Select
                    onChange={(e) => {
                      setYearVal(e.target.value);
                    }}
                    label="Year"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                  </Select>
                </FormControl>
                <Box style={{ width: "100%" }}>
                  {openSearch ? (
                    <IconButton
                      onClick={(e) => (
                        setOpenSearch(false),
                        setSearchVal(""),
                        Array.from(document.querySelectorAll("input")).forEach(
                          (input) => (input.value = "")
                        )
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
                    className={openSearch ? classes.input : classes.inputClose}
                    placeholder={
                      openSearch
                        ? (width >= 900 && width < 1200) || width < 650
                          ? "search Students..."
                          : "Search Students by name or code..."
                        : null
                    }
                    onChange={(e) => {
                      setSearchVal(e.target.value);
                    }}
                  />
                </Box>
              </Box>

              {props.datal ? (
                <Button
                  disabled
                  variant="outlined"
                  style={{
                    width:
                      width < 720 || (width >= 900 && width < 1000)
                        ? "35%"
                        : "22%",
                    textTransform: "lowercase",
                    borderColor: "rgba(0, 0, 0, 0.4)",
                    color: "rgba(0, 0, 0, 0.6)",
                  }}
                >
                  {props.datal.filter((user) =>
                    YearVal.length == 0
                      ? user.name.toLowerCase().includes(searchVal.toLowerCase()) ||
                        user.code.toLowerCase().includes(searchVal.toLowerCase())
                      : user.year.includes(YearVal) &&
                        (user.name.toLowerCase().includes(searchVal.toLowerCase()) ||
                          user.code.toLowerCase().includes(searchVal.toLowerCase()))
                  ).length === props.datal.length
                    ? props.datal.filter((user) =>
                        YearVal.length == 0
                          ? user.name.toLowerCase().includes(searchVal.toLowerCase()) ||
                            user.code.toLowerCase().includes(searchVal.toLowerCase())
                          : user.year.includes(YearVal) &&
                            (user.name.toLowerCase().includes(searchVal.toLowerCase()) ||
                              user.code.toLowerCase().includes(searchVal.toLowerCase()))
                      ).length + "'s students"
                    : props.datal.filter((user) =>
                        YearVal.length == 0
                          ? user.name.toLowerCase().includes(searchVal.toLowerCase()) ||
                            user.code.toLowerCase().includes(searchVal.toLowerCase())
                          : user.year.includes(YearVal) &&
                            (user.name.toLowerCase().includes(searchVal.toLowerCase()) ||
                              user.code.toLowerCase().includes(searchVal.toLowerCase()))
                      ).length +
                      " out of " +
                      props.datal.length}
                </Button>
              ) : null}
            </Box>
          </Box>

          <Box
            style={{
              height: width < 900 ? "64%" : width > 1500 ? "67%" : "60%",
              overflow: "hidden",
            }}
          >
            {loading?               <CircularProgress className={classes.center}/> :
            props.datal ? (
              <AutoSizer>
                {({ width, height }) => (
                  <List
                    height={height}
                    itemCount={
                      props.datal.filter((user) =>
                        YearVal.length == 0
                          ? user.name.toLowerCase().includes(searchVal.toLowerCase()) ||
                            user.code.toLowerCase().includes(searchVal.toLowerCase())
                          : user.year.includes(YearVal) &&
                            (user.name.toLowerCase().includes(searchVal.toLowerCase()) ||
                              user.code.toLowerCase().includes(searchVal.toLowerCase()))
                      ).length
                    }
                    itemSize={95}
                    width={width}
                  >
                    {Row}
                  </List>
                )}
              </AutoSizer>
            ) : props.error ? (
              <h1 className={classes.center}>Empty student list</h1>
            ) : props.pending ? (
              <CircularProgress className={classes.center}/>
            ) : null}
          </Box>
        </Box>

        <Box
          className={clsx(
            width < 900 ? classes.linkDecorationSmall : classes.linkDecoration,
            {
              [width < 900 ? classes.block : classes.root]: open,
              [classes.hide]: !open,
            }
          )}
        >
          <Form close={close} submit={submit} />
        </Box>
        {props.datal ? (
          <Box
            className={clsx(
              width < 900
                ? classes.linkDecorationInfonSmall
                : classes.linkDecorationInfo,
              {
                [classes.block]: openInfo,
                [classes.hide]: !openInfo,
              }
            )}
          >
            <StudentInfo
              Icode={Infocode}
              token={props.token}
              submit={submit}
              close={close}
              opensnack={handleOpenUpdateSnakc}
            />
          </Box>
        ) : null}
      </Box>
    </Navbar>
  );
};
const mapStateToProps = (state) => {
  return {
    datal: state.list.list[0],
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

export default connect(mapStateToProps, mapDispatchToProps)(Adding);
