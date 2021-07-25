import {
  TextField,
  Button,
  FormControlLabel,
  FormControl,
  FormGroup,
  Box,
  Typography,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import { useState } from "react";
import clsx from "clsx";
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import Slide from "@material-ui/core/Slide";
import Alert from "@material-ui/lab/Alert";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
const coloortheme = createMuiTheme({
  palette: {
    error: {
      main: "rgb(255,0,0)",
    },
  },
});
const useStyles = makeStyles({
  root: {
    display: "flex",
  },
  hide: {
    display: "none",
  },
  inpuut: {
    marginTop: "30px",
  },
  label: {
    fontSize: "18px",
  },
  hide: {
    display: "none",
  },
  show: {
    display: "block",
  },
  Border: {
    borderBottom: "3px inset",
  },
});

const ChangePass = (props) => {
  const newthe = coloortheme;

  const { token } = props;
  const classes = useStyles();

  const [oldPassword, setoldPassword] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [err, seterr] = useState("");
  const [newerror, setnewpass] = useState(false);
  const [Confirmerror, setConfirmpass] = useState(false);
  const [olderror, setold] = useState(false);
  const [visible, setVisible] = useState(false);
  const [visibleCurrent, setvisibleCurrent] = useState(false);
  const [visibleNew, setvisibleNew] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();

    if (password != confirmPassword) {
      seterr("notequal");
    } else {
      if (props.update === "yes") {
        const old_code = props.code;
        fetch("https://eng-asu-lms.herokuapp.com/admins/users/update", {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ password, confirmPassword, old_code }),
        }).then(
          (res) => res.json(),
          console.log("updated"),
          props.close(),
          props.done(),
        );
      } else {
        fetch("https://eng-asu-lms.herokuapp.com/users/me", {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ oldPassword, password, confirmPassword }),
        })
          .then((res) => {
            if (res.status === 400) {
              throw Error("not found");
            }
            return res.json();
          })
      
          .then(() => {
            props.close()
            props.snackprofile()
          })
          .catch((e) => {
            console.log(e.message);
            if (e.message === "not found") {
              seterr("oldincorrect");
            }
          });      }
    }
  };
  const onChangetext = (e, field) => {
    if (field === "oldpass") {
      if (e.target.value.length <= 6 && e.target.value.length != 0) {
        setold("short");
      setoldPassword("");
      }
      else{
        setold("");
        setoldPassword(e.target.value);
      }
    } else if (field === "new") {
      if (e.target.value.length <= 6 && e.target.value.length != 0) {
        setnewpass(true)
      setpassword("");
      }else{
        setnewpass(false)
        setpassword(e.target.value);
      }
    } else if (field === "confirm") {
      if (e.target.value.length <= 6 && e.target.value.length != 0) {
        setConfirmpass(true)
        setconfirmPassword("");
        }else{
          setConfirmpass(false)
          setconfirmPassword(e.target.value);
        }
    }
  };

  return (
    <ThemeProvider theme={newthe}>
      <form autoComplete="off" onSubmit={handleClick}>
        <FormControl>
          {/* <Box  className={clsx( {
                        [classes.hide]: open,
                        [classes.show]: !open,
                      })}>
                          <Typography className={classes.Border} variant='h6'>
                            Verify With Your Old Password
                          </Typography>
    <TextField
                     className={clsx(classes.inpuut, {
                        [classes.hide]: err,
                        [classes.show]: !err,
    
                      })}
              type="password"
              variant='outlined'
              required
              fullWidth
              label= 'Enter Your password'
             InputProps={{
                  classes: {
                    input: classes.label,
                  },
              }}
              onChange={(e)=> setoldPassword(e.target.value)}
            
              />
                  <TextField
                className={clsx(classes.inpuut, {
                    [classes.hide]: !err,
                    [classes.show]: err,
    
                  })}
                  error
                  helperText="Incorrect Entry."
              type="password"
              variant='outlined'
              required
              fullWidth
              label= 'Enter Correct Password'
             InputProps={{
                  classes: {
                    input: classes.label,
                  },
              }}
              onChange={(e)=> setoldPassword(e.target.value)}
            
              />
            
    </Box> */}
          <Box /*{/*  className={clsx( {
                        [classes.hide]: !open,
                        [classes.show]: open,
    
                      })} */
          >
              <Typography className={classes.Border} variant="h6">
                   {props.update === "yes" ? 'Enter New Password ' : 'Change your Password'}
              </Typography>
            {props.update === "yes" ? null : (
              <TextField
                className={classes.inpuut}
                type= {visible?"text":"password"}
                variant="outlined"
                required
                fullWidth
                label="Enter old password"
                InputProps={{
                  classes: {
                    input: classes.label,
                  },
                  endAdornment: (
                    <InputAdornment style={{marginRight:'10px'}}>
                      <IconButton onClick={()=>{setVisible(!visible)}}>
                        {visible?<VisibilityIcon />:<VisibilityOffIcon/>}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                error={
                  olderror|| err === "oldincorrect" 
                }
                label={
                  olderror
                    ? "password is too short"
                    : err === "oldincorrect"
                    ? "the old password is incorrect"
                    
                    : "Enter old password"
                }
                onChange={(e) => onChangetext(e,'oldpass')}
              
              />
            )}

            
           

            <TextField
              className={classes.inpuut}
              type= {visibleNew?"text":"password"}
              variant="outlined"
              required
              fullWidth
              InputProps={{
                classes: {
                  input: classes.label,
                },
                endAdornment: (
                  <InputAdornment style={{marginRight:'10px'}}>
                    <IconButton onClick={()=>{setvisibleNew(!visibleNew)}}>
                      {visibleNew?<VisibilityIcon />:<VisibilityOffIcon/>}
                    </IconButton>
                  </InputAdornment>
                )
              }}
              error={newerror}
              label={
                newerror
                  ? "password is too short"
                  : "Enter New password"
              }
              onChange={(e) => onChangetext(e,'new')}

            />

            <TextField
              className={classes.inpuut}
              type= {visibleCurrent?"text":"password"}
              variant="outlined"
              required
              fullWidth
              InputProps={{
                classes: {
                  input: classes.label,
                },
                endAdornment: (
                  <InputAdornment style={{marginRight:'10px'}}>
                    <IconButton onClick={()=>{setvisibleCurrent(!visibleCurrent)}}>
                      {visibleCurrent?<VisibilityIcon />:<VisibilityOffIcon/>}
                    </IconButton>
                  </InputAdornment>
                )
              }}
              error={Confirmerror }
              label={
                Confirmerror
                  ? "password is too short"
                  : "Confirm password"
              }
              onChange={(e) =>  onChangetext(e,'confirm')}
            
            />

            <Typography
              className={clsx({
                [classes.block]: err == "notequal",
                [classes.hide]: err != "notequal",
              })}
              color="error"
            >
              Password Doesnt Match
            </Typography>
          </Box>

          <Button
            className={classes.inpuut}
            variant="contained"
            color="Primary"
            type="submit"
            fullWidth
            disabled={(oldPassword.length===0&&props.update!='yes')||password.length===0||confirmPassword.length===0}
          >
            submit
          </Button>
        </FormControl>
      </form>
    </ThemeProvider>
  );
};

export default ChangePass;
