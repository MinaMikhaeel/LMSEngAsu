import {
  Box,
  makeStyles,
  Typography,
  Button,
  Modal,
  IconButton,
  InputBase
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { useEffect, useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Slide from "@material-ui/core/Slide";
import Alert from "@material-ui/lab/Alert";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Tooltip from "@material-ui/core/Tooltip";
import Fab from "@material-ui/core/Fab";
import DoneIcon from "@material-ui/icons/Done";
import EditIcon from "@material-ui/icons/Edit";
import { connect } from "react-redux";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Collapse } from "antd";
import "./collapse.css";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import ChangePass from "../../Students/changepass";
import Fade from "@material-ui/core/Fade";
import Backdrop from "@material-ui/core/Backdrop";
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
    marginRight: "10px",
  },
  logColorSmall: {
    color: "#09B9DC",
    marginBottom: "30px",
    textAlign: "center",
    marginRight: "10px",
  fontSize:'26px'
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
    width: "80%",
    margin: "auto",
  },
  LabelflexFinalExpand: {
    width: "80%",
    margin: "auto",
  },

  bg: {
    display: "inline",
    marginRight: "10px",
    width: "0%",
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
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: "10px",
    height: "320px",
    width: "320px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 2, 3),
    outline: 0,
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
  const { Icode } = props;
  const [name, setName] = useState(null);
  const { Panel } = Collapse;
  const { width } = useWindowSize();

  const [email, setEmail] = useState(null);
  const [code, setCode] = useState(null);
  const [year, setYear] = useState(null);
  const [searchcode, setsearchcode] = useState("");
  const [openA, setOpenA] = useState(false);
  const { datal, pending, error } = props;
  const [courses, setCourses] = useState([]);
  const [coursesError, setCoursesError] = useState(false);
  const [Edit, setEdit] = useState(false);
  const [Editname, setEditname] = useState('');
  const [open, setOpen] = useState(false);
  const [openDialogue, setopenDialogue] = useState(false);
  const [unEnrolled, setunenrolled] = useState(false);
  const [course_id, setCourse_id] = useState("");
  const [err400, seterr400] = useState("");
  const [err, seterr] = useState("");
  const [err400email, seterr400email] = useState("");
  const [erremail, seterremail] = useState("");
  const [openSearch, setOpenSearch] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const ClosePass = () => {
    setOpen(false);
  };
  const handleClick = () => {
    setOpen(true);
  };
  const close = () => {
    setopenDialogue(false);
  };
  const Unenroll = (user_id) => {
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
  const abort = new AbortController();

  useEffect(() => {
    const code = Icode.code;
    fetch(`https://eng-asu-lms.herokuapp.com/users/getEnrolledCourses/${code}`, {
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
  const openAdd = () => {
    setEdit(true);
    console.log(Icode);
    if(code!=Icode.code){

      setCode(Icode.code);

      setEmail(Icode.email);
  
      setName(Icode.name);
  
      setYear(Icode.year);
    }

    setsearchcode(Icode.code);

    console.log(code, email, name, year);
  };
  const onChangetext = (e, field) => {
    if (field === "code") {
      if (e.target.value.length < 7 && e.target.value.length != 0) {
        seterr("short");
      }  else {
        seterr("");
        if(e.target.value != Icode.oode){
          setCode(e.target.value)
        }
        else{
          setCode(Icode.code)
        } 
        
      }
    } else if (field === "email") {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (!e.target.value.match(re) && e.target.value.length != 0) {
        seterremail("wrongFormat");
      } else {
        seterremail("");
        if(e.target.value != Icode.email){
          setEmail(e.target.value)
        }
        else{
          setEmail(Icode.email)
        } 
        
      }
    }
  };
  const update = async() => {
  
try{
  const old_code = Icode.code;
  const res=await fetch("https://eng-asu-lms.herokuapp.com/admins/users/update", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${props.token}`,
    },
    body: JSON.stringify({
      name,
      email,
      code,
      year,
      old_code,
    }),
  })

    
    
  const result = await res.json();
  if (res.status === 200) {
    seterr400("");
    seterr400email('')
    props.submit();
    props.opensnack();
    setEditname(name)
    if(code===Icode.code){
      setCode(result.code);

      setEmail(result.email);
  
      setName(result.name);
  
      setYear(result.year);    
    }
  
    if (searchcode != code) {
      props.close();
    }
    setEdit(false);

  } else if (res.status === 400) {
    console.log("result", result);
    if (result.search("code") !== -1) {
      seterr400("This code is taken by another user");
    } else if (
      result.search("email") !== -1 &&
      result.search("validation") === -1
    ) {
      seterr400email("This email is taken by another user");
    }  else {
      seterr400("An error occured. Try again Later");
    }
  
}

} catch (error) {
console.log(error);
}
}
  const handleClose = () => {
    setOpenA(false);
  };
  const handleOpen = () => {
    setOpenA(true);
  };
  const check = () => {
    if (!Edit) {
      props.close();
    } else {
      alert("pleade done your updates");
    }
  };
  const handleUnenroll = (course_id) => {
    setCourse_id(course_id);
    setopenDialogue(true);
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
                  user.course_name.toLowerCase().includes(searchVal.toLowerCase()) ||
                  user.course_code.toLowerCase().includes(searchVal.toLowerCase())
              )
              .sort((a, b) =>
                a.course_name > b.course_name
                  ? 1
                  : b.course_name > a.course_name
                  ? -1
                  : 0
              )[index].course_name
          }
        </p>
        <p style={{ width: "40%", textAlign: "left" }}>
          {" "}
          {
            courses
              .filter(
                (user) =>
                  user.course_name.toLowerCase().includes(searchVal.toLowerCase()) ||
                  user.course_code.toLowerCase().includes(searchVal.toLowerCase())
              )
              .sort((a, b) =>
                a.course_name > b.course_name
                  ? 1
                  : b.course_name > a.course_name
                  ? -1
                  : 0
              )[index].course_code
          }
        </p>

        <Tooltip style={{ width: "5%" }} title="UnEnroll">
          <IconButton
            onClick={() =>
              handleUnenroll(
                courses
                  .filter(
                    (user) =>
                      user.course_name.toLowerCase().includes(searchVal.toLowerCase()) ||
                      user.course_code.toLowerCase().includes(searchVal.toLowerCase())
                  )
                  .sort((a, b) =>
                    a.course_name > b.course_name
                      ? 1
                      : b.course_name > a.course_name
                      ? -1
                      : 0
                  )[index].course_id
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

      <Dialog open={openDialogue} onClose={close}>
        <DialogTitle>{"Are you sure you want to delete Enrollment?"}</DialogTitle>
        <DialogActions>
          <Button onClick={() => Unenroll(Icode._id)} color="secondary">
            Yes
          </Button>
          <Button onClick={close} color="error">
            no
          </Button>
        </DialogActions>
      </Dialog>
      <Box className={classes.Border}>
        <Tooltip
          title={Edit ? "Done" : "Edit"}
          size="small"
          onClick={!Edit ? openAdd : update}
          disabled={Edit&&(err=='short'||erremail=='wrongFormat')}
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
      <Box display="flex" justifyContent="space-evenly" alignItems={width<400?"baseline":width<900?"end":width>980?"end":"baseline"}>
        <Typography variant="h4" className={width<400?classes.logColorSmall:width<900?classes.logColor:width>980?classes.logColor:classes.logColorSmall}>
          <span style={{ textTransform: "uppercase" }}>
            {name == null
              ? Icode.name:!Edit&&Icode.code===code?Editname:Icode.name}
          </span>
          's Info

        </Typography>

    <Button
          style={{ borderRadius: "25px" , marginTop:'5px'}}
          endIcon={<VpnKeyIcon />}
          color="primary"
          onClick={handleClick}
        >
          Change Password
        </Button>
      </Box>
      <Modal
        className={classes.modal}
        open={open}
        onClose={ClosePass}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 300,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <ChangePass
              token={props.token}
              close={ClosePass}
              update="yes"
              code={Icode.code}
              done={handleOpen}
            />
          </div>
        </Fade>
      </Modal>
      {datal &&
        datal
          .filter((user) => user.code === Icode.code)
          .map((info) => (
            <Box key={Icode.code}>
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
                      e.target.value != info.name
                        ? setName(e.target.value)
                        : setName(info.name)
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
                  Email:
                </Typography>
                {Edit ? (
                  <TextField
                    variant="outlined"  
                    helperText={
                      err400email === "This email is taken by another user"
                        ? "This email is taken by another user"
                        : erremail === "wrongFormat"
                        ? "Invalid email format"
                        : null
                    }
                    error={
                      erremail === "wrongFormat" ||
                      err400email === "This email is taken by another user"
                    }
                    className={classes.FlexBases}
                    defaultValue={info.email}
                    onChange={(e) =>onChangetext(e,'email')}
                  ></TextField>
                ) : (
                  <TextField
                    variant="outlined"
                    className={classes.FlexBases}
                    disabled
                    value={info.email}
                  ></TextField>
                )}
              </label>

              <label className={classes.Labelflex}>
                <Typography variant="h6" className={classes.bg}>
                  Code:
                </Typography>
                {Edit ? (
                  <TextField
                    variant="outlined"
                    helperText={
                      err400 === "This code is taken by another user"
                        ? "This code is taken by another user"
                        : err === "short"
                        ? "the code must be more than 6"
                        : null
                    }
                    error={
                      err400 === "This code is taken by another user" || err == "short"
                    }
                    className={classes.FlexBases}
                    defaultValue={info.code}
                    onChange={(e) =>onChangetext(e,'code')}

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

              <label className={classes.Labelflex}>
                <Typography variant="h6" className={classes.bg}>
                  Year:
                </Typography>
                {Edit ? (
                  <FormControl className={classes.FlexBases}>
                    <InputLabel>Year</InputLabel>

                    <Select
                      defaultValue={info.year}
                      onChange={(e) =>
                        e.target.value != info.year
                          ? setYear(e.target.value)
                          : setYear(info.year)
                      }
                    >
                      
                      <MenuItem value={'1'}>1</MenuItem>
                      <MenuItem value={'2'}>2</MenuItem>
                      <MenuItem value={'3'}>3</MenuItem>
                      <MenuItem value={'4'}>4</MenuItem>
                      <MenuItem value={'5'}>5</MenuItem>
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

                <Panel header={ coursesError? "0 Enrolled Courses" :(courses.filter((user) =>
 (user.course_name.toLowerCase().includes(searchVal.toLowerCase()) ||
        user.course_code.toLowerCase().includes(searchVal.toLowerCase()))
).length === courses.length
  ? courses.filter((user) =>
          (user.course_name.toLowerCase().includes(searchVal.toLowerCase()) ||
            user.course_code.toLowerCase().includes(searchVal.toLowerCase()))
    ).length 
  :courses.filter((user) =>
  (user.course_name.toLowerCase().includes(searchVal.toLowerCase()) ||
    user.course_code.toLowerCase().includes(searchVal.toLowerCase()))
    ).length +
    " out of " +
    courses.length)+" Enrolled Courses"}>
                  <Box style={{ display:'flex',justifyContent:'space-between', width: "100%" }}>
                   <Box>
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
                            ? "search Enrolled Courses..."
                            : "Search Enrolled Courses by name or code..."
                          : null
                      }
                      onChange={(e) => {
                        setSearchVal(e.target.value);
                      }}
                    />
                   </Box>

                  </Box>
                  {coursesError ? (
                    <p style={{ textAlign: "center", fontSize: "20px" }}>
                      No Courses found
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
                                  (user.course_name.toLowerCase().includes(
                                    searchVal.toLowerCase()
                                  ) ||
                                  user.course_code.toLowerCase().includes(
                                    searchVal.toLowerCase()
                                  ))
                              )
                              .sort((a, b) =>
                                a.course_name > b.course_name
                                  ? 1
                                  : b.course_name > a.course_name
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
      {pending && <h1>wait</h1>}
    </Box>
  );
}

const mapStateToProps = (state) => {
  return {
    datal: state.list.list[0],
    error: state.error,
    pending: state.pending,
    token: state.user.token,
    role: state.user.role,
  };
};

export default connect(mapStateToProps, null)(StudentInfo);
