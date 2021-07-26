import {
  Box,
  makeStyles,
  Typography,
  Button,
  InputAdornment,
  IconButton,
  DialogContent,
  DialogTitle,
  Dialog,
  DialogActions,
  Radio,
  Drawer,
  InputBase,
  Fab,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Slide from "@material-ui/core/Slide";
import Alert from "@material-ui/lab/Alert";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import ViewListIcon from "@material-ui/icons/ViewList";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import useWindowSize from "../../../utiles/useWindowSize";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles((theme) => ({
  "@global": {
    "span.MuiTypography-root.MuiFormControlLabel-label.MuiTypography-body1": {
      width: "100%",
    },
  },
  imgBox: {
    textAlign: "center",
    marginTop: "25px",
  },
  logColor: {
    color: "#09B9DC",
  },

  yearBox: {
    textAlign: "left",
  },
  bg: {
    height: "100vh",
    position: "relative",
  },
  inpuut: {
    margin: "30px 0 0",
    display: "block",
    margin: "5% 42% 0 42%",
  },
  label: {
    fontSize: "18px",
    margin: "5px 0 2px 0 ",
  },

  formControl: {
    marginTop: theme.spacing(1),
    minWidth: 150,
  },
  input: {
    width: "67%",
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

export default function Login(props) {
  const classes = useStyles();
  const { token } = props;
  const { width } = useWindowSize();

  const [name, setName] = useState("");
  const [score, setScore] = useState("");
  const [instructor_code, setinstructor_code] = useState("");
  const [code, setCode] = useState("");
  const [year, setYear] = useState("");
  const [open, setOpen] = useState(false);
  const [openA, setOpenA] = useState(false);
  const [err, seterr] = useState("");
  const [openDialogue, setopenDialogue] = useState(false);
  const [instructors, setinstructors] = useState([]);
  const [loadingfile, setloadingfile] = useState(false);
  const [errcode, seterrcode] = useState("");
  const [errscore, seterrscore] = useState("");
  const [openSearch, setOpenSearch] = useState(false);

  const [value, setValue] = useState("");
  const [searchVal, setSearchVal] = useState("");

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://eng-asu-lms.herokuapp.com/admins/addCourse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          instructor_code,
          code,
          name,
          year,
          score,
        }),
      });
      const result = await res.json();
      if (res.status === 201) {
        enroll(code);
        props.submit();
      } else if (res.status === 500) {
        if (result.search("code") !== -1) {
          seterr("This code is taken  by another course");
        } else if (result.search("score") !== -1) {
          seterr("Course score must be less than or equal to 100");
        } else {
          seterr("Server Error");
        }
      } else {
        //403 and 404

        seterr(result);
      }
    } catch (error) {
      alert('Error Occured!! Please Try Again later');
    }
  };
  const enroll = (code) => {
    const course_code = code;
    fetch("https://eng-asu-lms.herokuapp.com/admins/enrollMultiple", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        course_code,
        year,
      }),
    })
      .then((res) => {
        if (res.status == 404) {
          throw Error("error in enroll = 404");
        }
        res.json();
        setOpenA(true);
        setOpenA(true);
        setName("");
        setScore("");
        setinstructor_code("");
        setCode("");
        setYear("");
        seterr("");
        console.log("enroll done");
        props.submit();
        Array.from(document.querySelectorAll("input")).forEach(
          (input) => (input.value = null)
        );
      })
      .then((data) => console.log(data))

      .catch((error) => {if(error.message==="error in enroll = 404"){
          alert('Empty Year .. not enrolled')
      }else{
        alert('Error Occured!! Please Try Again later')
      }});
  };
  const handleClose = () => {
    setOpen(false);
    setOpenA(false);
  };
  const closeDial = () => {
    setValue("");
    setinstructor_code("");
    setopenDialogue(false);
  };
  const DoneDial = (value) => {
    setopenDialogue(false);
    setinstructor_code(value);
  };
  const getInstructors = async () => {
    setopenDialogue(true);
    const abort = new AbortController();
    try {
      setloadingfile(true);
      const res = await fetch(
        "https://eng-asu-lms.herokuapp.com/admins/getAllInstructors",
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
        setinstructors(result);
        setloadingfile(false);
      } else if (res.status === 404) {
        setinstructors([]);
        setloadingfile(false);
      }
    } catch (error) {
      setloadingfile(false);
      if (error.name === "AbortError") {
        console.log("aborted");
      } else {
        setinstructors([]);
        console.log(error);
      }
    }

    return () => abort.abort();
  };
  const onChangetext = (e, field) => {
    if (field === "score") {
      if (e.target.value > 100 && e.target.value.length != 0) {
        seterrscore("less100");
      } else {
        seterrscore("");
        setScore(e.target.value);
      }
    }
  };

  return (
    <Box>
      <Tooltip
        style={{ fontSize: "26px" }}
        title="close"
        size="small"
        onClick={props.close}
      >
        <Fab color="primary">&times;</Fab>
      </Tooltip>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={openA}
        onClose={handleClose}
        autoHideDuration={700}
        TransitionComponent={Slide}
      >
        <Alert variant="filled" severity="success">
          Course Added
        </Alert>
      </Snackbar>

      <Dialog open={openDialogue} onClose={closeDial} fullWidth="xs">
        <DialogTitle
          style={{
            borderBottom: "1px solid #00000012",
            boxShadow: "0px 0px 6px 0px",
          }}
        >
          {instructor_code.length === 0 && value.length === 0
            ? "instructors List"
            : value + " is selected"}
          {openSearch ? (
            <IconButton
              onClick={() => (
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
              openSearch ? "Search instructors by name or code..." : null
            }
            onChange={(e) => {
              setSearchVal(e.target.value);
            }}
          />
        </DialogTitle>
        <DialogContent
          style={{ textAlign: "center", padding: 0, minHeight: "420px" }}
        >
          {instructors.length > 0 ? (
            <Box>
              <RadioGroup
                value={value}
                onChange={(event) => setValue(event.target.value)}
              >
                <FormLabel
                  style={{
                    position: "sticky",
                    top: "0px",
                    zIndex: "200",

                    background: "#fff",
                  }}
                >
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    style={{ width: "100%", padding: "20px 30px 0" }}
                  >
                    <p style={{ width: "50%", textAlign: "left" }}>
                      Instuctor name
                    </p>
                    <p style={{ textAlign: "left", width: "40%" }}>
                      {" "}
                      Instuctor code
                    </p>
                  </Box>
                </FormLabel>

                {instructors
                  .filter(
                    (user) =>
                      user.name.includes(searchVal.toLowerCase()) ||
                      user.code.includes(searchVal.toLowerCase())
                  )
                  .sort((a, b) =>
                    a.name > b.name ? 1 : b.name > a.name ? -1 : 0
                  )
                  .map((instructor, index) => (
                    <FormControlLabel
                      style={{
                        borderBottom: "3px inset",
                        margin: "0",
                        paddingRight: "10px",
                      }}
                      value={instructor.code}
                      control={<Radio />}
                      labelPlacement="start"
                      label={
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                          style={{
                            width: "100%",
                            padding: "0 20px",
                            marginTop: "15px",
                          }}
                        >
                          <Box display="flex" style={{ width: "50%" }}>
                            <p
                              style={{
                                marginRight: "20px",
                                width: "5%",
                                textAlign: "left",
                              }}
                            >
                              {index + 1}
                            </p>
                            <p
                              style={{
                                fontWeight: "bolder",
                                width: "80%",
                                textAlign: "left",
                              }}
                            >
                              {instructor.name}
                            </p>
                          </Box>

                          <p style={{ width: "50%", textAlign: "center" }}>
                            {instructor.code}
                          </p>
                        </Box>
                      }
                    />
                  ))}
              </RadioGroup>
            </Box>
          ) : loadingfile ? (
            <p>loading...</p>
          ) : (
            <div>
              <p>no inst</p>
            </div>
          )}
        </DialogContent>
        {loadingfile ? null : (
          <DialogActions>
            <Button
              onClick={() => {
                DoneDial(value);
              }}
              color="primary"
            >
              Done
            </Button>
            <Button onClick={closeDial} color="error">
              null
            </Button>
          </DialogActions>
        )}
      </Dialog>

      <form
        noValidate
        autoComplete="off"
        className={classes.imgBox}
        onSubmit={handleClick}
        style={{
          display: width < 900 ? "flex" : null,
          alignItems: width < 900 ? "center" : null,
          flexDirection: width < 900 ? "column" : null,
        }}
      >
        <Typography variant="h4" className={classes.logColor}>
          Add course
        </Typography>
        <Box className={classes.yearBox}>
          <TextField
            onChange={(e) => setName(e.target.value)}
            fullWidth
            type="text"
            required
            label="Enter course Name"
            InputProps={{
              classes: {
                input: classes.label,
              },
            }}
          />

          <TextField
            onChange={(e) => onChangetext(e, "score")}
            fullWidth
            type="number"
            required
            label={
              err === "Course score must be less than or equal to 100"
                ? "Course score must be less than or equal to 100"
                : errscore === "less100"
                ? "Course score must be less than or equal to 100"
                : "Enter course score"
            }
            InputProps={{
              classes: {
                input: classes.label,
              },
            }}
            error={
              err === "Course score must be less than or equal to 100" ||
              errscore === "less100"
            }
          />

          <TextField
            fullWidth
            disabled
            type="text"
            required={instructor_code.length === 0}
            label={
              instructor_code.length === 0
                ? "Choose instructor code"
                : instructor_code
            }
            InputProps={{
              endAdornment: (
                <InputAdornment style={{ marginRight: "10px" }}>
                  <IconButton onClick={() => getInstructors()}>
                    <ViewListIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            onChange={(e) => setCode(e.target.value)}
            type="text"
            required
            label={
              err == "This code is taken  by another course"
                ? "This code is taken  by another course"
                : "Enter course code"
            }
            InputProps={{
              classes: {
                input: classes.label,
              },
            }}
            error={err == "This code is taken  by another course"}
          />
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-controlled-open-select-label">
              course year
            </InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            >
              <MenuItem value={""}>
                <em>none</em>
              </MenuItem>
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Button
          className={classes.inpuut}
          variant="contained"
          color="Primary"
          type="submit"
          disabled={
            name.length === 0 ||
            instructor_code.length === 0 ||
            code.length === 0 ||
            year.length === 0
          }
        >
          Submit
        </Button>
      </form>
    </Box>
  );
}
