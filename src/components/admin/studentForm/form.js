import { Box, makeStyles, Typography, Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Slide from "@material-ui/core/Slide";
import Alert from "@material-ui/lab/Alert";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import { Label } from "@material-ui/icons";
import useWindowSize from "../../../utiles/useWindowSize";
const useStyles = makeStyles((theme) => ({
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
  labelInError: {
    fontSize: "18px",
    margin: "15px 0 2px 0 ",
  },
  labelError: {
    fontSize: "24px",
  },

  formControl: {
    marginTop: theme.spacing(1),
    minWidth: 150,
  },
}));

export default function Add(props) {
  const classes = useStyles();
const {width}=useWindowSize()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const role = "student";
  const [code, setCode] = useState("");
  const [year, setYear] = useState("");
  const [open, setOpen] = useState(false);
  const [openA, setOpenA] = useState(false);
  const [err, seterr] = useState("");
  const [emailerr, setemailerr] = useState("");
  const [err400, seterr400] = useState("");
  const [err400email, seterr400email] = useState("");

  const handleClick = async (e) => {
    e.preventDefault();

    const password = code;
    console.log(password);
    try {
      const response = await fetch("https://eng-asu-lms.herokuapp.com/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          role,
          code,
          year,
        }),
      });
      const result = await response.json();
      if (response.status === 201) {
        setOpenA(true);
        setName("");
        setEmail("");
        setCode("");
        setYear("");
        seterr("");
        seterr400("");
        setemailerr('')
        seterr400email("");
        props.submit();
        Array.from(document.querySelectorAll("input")).forEach(
          (input) => (input.value = "")
        );
      } else if (response.status === 400) {
        console.log("result", result);

        if (result.search("code") !== -1) {
          seterr400("This code is taken by another user");
          seterr400email("");

        } else if (
          result.search("email") !== -1 &&
          result.search("validation") === -1
        ) {
          seterr400email("This email is taken by another user");
          seterr400("");

        } else if (
          result.search("email") !== -1 &&
          result.search("validation") !== -1
        ) {
          seterr400("Please enter the email in the correct format");
          seterr400("");

        } else {
          seterr400("An error occured. Try again Later");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setOpenA(false);
  };
  const onChangetext = (e, field) => {
    seterr400("");
    seterr400email("");
    if (field === "code") {
      if (e.target.value.length < 7 && e.target.value.length != 0) {
        seterr("short");
        setCode("");
      } else if (e.target.value.length === 0) {
        seterr("");
        setCode("");
      } else {
        seterr("");
        setCode(e.target.value);
      }
    } else if (field === "email") {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (!e.target.value.match(re) && e.target.value.length != 0) {
        setemailerr("wrongFormat");
        setEmail("");
      } else if (e.target.value.length === 0) {
        setemailerr("");
        setEmail("");
      } else {
        setemailerr("");
        setEmail(e.target.value);
      }
    }
  };
  const snackname = name;
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
          { "Added"}
        </Alert>
      </Snackbar>
 <Tooltip
          style={{ fontSize: "26px" }}
          title="close"
          size="small"
          onClick={props.close}
        >
          <Fab color="primary">&times;</Fab>
        </Tooltip>
      {/* <Snackbar
          anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={open}
        onClose={handleClose}
        TransitionComponent={Slide}
      >
        <Alert variant="filled" severity="error">
          {err === "username"
            ? "please enter your username"
            : err === "year"
            ? "please enter your year"
            : err === "email"
            ? "please enter your email"
            : err === "pass"
            ? "please enter your pass"
            : err === "Id"
            ? "please enter your Code"
            : err === "short"
            ? "please enter Code more than 8"
            : err === "incorrect"
            ? "incorrect password & email"
            : ""}
        </Alert>
      </Snackbar>

       */}
      <form
        autoComplete="off"
        className={classes.imgBox}
        onSubmit={handleClick}
        style={{   display: width<900? 'flex':null,
        alignItems: width<900? 'center':null ,flexDirection:width<900?'column':null}}
      >
        <Typography variant="h4" className={classes.logColor}>
          Add Student
        </Typography>
        <Box className={classes.yearBox}>
          <TextField
            onChange={(e) => setName(e.target.value)}
            fullWidth
            type="text"
            required
            label="Enter Student Name"
            InputProps={{
              classes: {
                input: classes.label,
              },
            }}
          />

          <TextField
            onChange={(e) => onChangetext(e, "email")}
            fullWidth
            type="email"
            required
            label={
              err400email === "This email is taken by another user"
                ? "This email is taken by another user"
                : err === "wrongFormat"
                ? "Invalid email format"
                : "Enter Student Email"
            }
            InputProps={{
              classes: {
                input:
                  err400email === "This email is taken by another user"
                    ? classes.labelInError
                    : classes.label,
              },
            }}
            InputLabelProps={{
              className:
                err400email === "This email is taken by another user"
                  ? classes.labelError
                  : null,
            }}
            style={{
              marginTop:
                err400email === "This email is taken by another user"
                  ? "10px"
                  : null,
            }}
            error={
              emailerr === "wrongFormat" ||
              err400email === "This email is taken by another user"
            }
          />

          <TextField
            fullWidth
            onChange={(e) => onChangetext(e, "code")}
            type="text"
            required
            label={
              err400 === "This code is taken by another user"
                ? "This code is taken by another user"
                : err === "short"
                ? "the code must be more than 7"
                : "Enter Student code"
            }
            InputProps={{
              classes: {
                input:
                  err400 === "This code is taken by another user"
                    ? classes.labelInError
                    : classes.label,
              },
            }}
            InputLabelProps={{
              className:
                err400 === "This code is taken by another user"
                  ? classes.labelError
                  : null,
            }}
            style={{
              marginTop:
                err400 === "This code is taken by another user" ? "10px" : null,
            }}
            error={
              err400 === "This code is taken by another user" || err == "short"
            }
          />
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-controlled-open-select-label">year</InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              value={year}
              error={err == "year"}
              onChange={(e) => setYear(e.target.value)}
            >
              <MenuItem value={""}>
                <em>NONE</em>
              </MenuItem>
              <MenuItem value={'1'}>1</MenuItem>
              <MenuItem value={'2'}>2</MenuItem>
              <MenuItem value={'3'}>3</MenuItem>
              <MenuItem value={'4'}>4</MenuItem>
              <MenuItem value={'5'}>5</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Button
          className={classes.inpuut}
          variant="contained"
          color="Primary"
          type="submit"
          disabled={
            year.length === 0 ||
            name.length === 0 ||
            email.length === 0 ||
            code.length === 0
          }
        >
          Submit
        </Button>
      </form>
    </Box>
  );
}
