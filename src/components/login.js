import { Box, makeStyles, Typography, Button, IconButton, FormControl } from "@material-ui/core";
import Image from "./../assets/img/attachment_118607159.jpeg";
import TextField from "@material-ui/core/TextField";
import clsx from "clsx";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { useState, useEffect } from "react";
import Typed from "react-typed";
import Snackbar from "@material-ui/core/Snackbar";
import Slide from "@material-ui/core/Slide";
import Alert from "@material-ui/lab/Alert";
import { useHistory } from "react-router-dom";
import { signin } from "../store/action/authAction";
import { connect } from "react-redux";
import WarningIcon from '@material-ui/icons/Warning';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import InputAdornment from "@material-ui/core/InputAdornment";
import useWindowSize from "../utiles/useWindowSize";
import CircularProgress from '@material-ui/core/CircularProgress';

const themme = createMuiTheme({
  palette: {
    primary: {
      main: "rgb(0,117,255)",
    },
  },
});
const useStyles = makeStyles((theme) => ({
  bg: {
    textAlign: "center",
    background:
      "linear-gradient(103deg, rgba(42,208,228,1) 0%, rgba(42,167,228,1) 34%, rgba(23,77,142,1) 84%, rgba(29,49,131,1) 100%)",
    height: "100vh",
    position: "relative",
  },
  imgBox: {
    position: "absolute",
    top: "50%",
    left: "50%",
    height: '90%',
    transform: "translate(-50%,-50%)",
    borderRadius: "20px",
    background:'#fff',
    overflow: "hidden",
    boxShadow: "4px 1px 38px",
  },
  formSmall:{
    height: '100%',
    background:'#fff',
    overflow: "hidden",
  },
  img: {
    width: "100%",
    display: "block",
    transform: "translateY(0px)",
  },
  imgclose: {
    transform: "translateY(-54%)",
    transition: theme.transitions.create(["transform"], {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  formBg: {
    position: "absolute",
    top: "70%",
    left: "50%",
    transform: "translate(-50%,50%)",
    padding: "0 30px 0 30px",
    width: "100%",
    height: "70%",
  },

  formopen: {
    transform: "translate(-50%,-52%)",
    transition: theme.transitions.create(["transform"], {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  inpuut: {
    margin: '0'
  },
  inpuutsuccess: {
    margin: '0'
  },
  label: {
    fontSize: "18px",
  },
  logColor: {
    color: "#09B9DC",
  },


  error:{
    display:'flex',
    color: "red",   
  }
}));

function Login(props) {
  const history = useHistory();
  const classes = useStyles();
  const [duration, setduration] = useState(false);
  const [email, setUsername] = useState("");
  const [password, setpass] = useState("");
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [err, seterr] = useState("");
  const [errpass, seterrpass] = useState("");
  const { width } = useWindowSize();
  const handleClick = (e) => {
    e.preventDefault();

props.signin(email, password);

      /* .then(response => response.json())
                .then(result => {
        localStorage.setItem('token', JSON.stringify(result))
                }) */

  };

  useEffect(() => {
    setTimeout(() => {
      setduration(true);
    }, 1500);
  }, []);
  const  onChangetext=(e,field)=> {
    
    if (field==='pass'){
      if (e.target.value.length < 7&& e.target.value.length != 0) {
        seterrpass('short')
        setpass('')   
     } else if ( e.target.value.length === 0) {
      seterrpass('')
      setpass('')   

   } 
    else {
      seterrpass('')
       setpass(e.target.value)   
       }
 
    }
    else if (field==='email'){
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if((!(e.target.value.match(re)))&& e.target.value.length != 0)
     {
       seterr('wrongFormat')
       setUsername('')  
     }
     else if ( e.target.value.length === 0) {
      seterr('')
      setUsername('')  

   } else {
       seterr('')
       setUsername(e.target.value)  
        }
 
    }

  } 
  return (
    <ThemeProvider theme={themme}>
      <Box className={classes.bg}>
     
        <Box className={width>583? classes.imgBox:classes.formSmall}>
          <img
            src={Image}
            className={clsx(classes.img, {
              [classes.imgclose]: duration,
            })}
          />
         {/* <Typography
              className={classes.logColor}
              style={{ fontSize: '70px',display:duration?'none':'block' }}

              variant="h4"
            >
              E-learning
            </Typography>
           */}
          <form
             
            className={clsx(classes.formBg, {
              [classes.formopen]: duration,
            })}
            onSubmit={handleClick}
          >
<Box display='flex'
    flexDirection= 'column'
    alignItems= 'center'
    style={{ height: '92%'}}
    justifyContent= 'space-evenly'>
     <Typography
              className={classes.logColor}
              style={{ fontSize: width<770? '50px': '70px'  }}
              variant="h4"
            >
              E-learning
            </Typography>

            <Typography className={classes.logColor} style={{fontSize: '34px'}} variant="h3">
              <Typed
                strings={["Welcome Back"]}
                typeSpeed={60}
                startDelay={1500}
                cursorChar=""
              />
            </Typography>



            <TextField
              onChange={(e) => onChangetext(e,'email')}
              fullWidth
              type="Email"
              error={err==='wrongFormat'}
              label={err==='wrongFormat'?'invalid email format':"Enter Your Email*"}
              InputProps={{
                classes: {
                  input: classes.label,
                },
              }}
              
            />
            <TextField
              fullWidth
              onChange={(e) => onChangetext(e,'pass')}
              className={ props.authError==='failed'?classes.inpuut:classes.inpuutsuccess}
              type= {visible?"text":"password"}
              error={errpass === "short"}
              label={errpass==='short'?"password must be at least 7 characters":"Enter Your password*"}
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
            />
              
              
              {props.laoding?<CircularProgress/>:      
           props.authError == "failed" ? (
             <div>
             <div className={classes.error}>
             <WarningIcon style={{fontSize:'18px',marginRight:'10px'}}/>
             <h5 style={{color: "red"}}>Incorrect email or password</h5> 
             </div>
             <Button
              className={ props.authError==='failed'?classes.inpuut:classes.inpuutsuccess}
              variant="contained"
              color="Primary"
              type="submit"
              disabled={email.length===0||password.length===0}
            >
              Login
            </Button>
            </div>
            ) : props.authError == "success" ? (
              localStorage.setItem(
                "user",
                JSON.stringify({
                  token: props.token,
                  name: props.name,
                  email: props.email,
                  code: props.code,
                  role: props.role,
                  year: props.year,
                })
              )
            ) : <Button
            className={ props.authError==='failed'?classes.inpuut:classes.inpuutsuccess}
            variant="contained"
            color="Primary"
            type="submit"
            disabled={email.length===0||password.length===0}
          >
            Login
          </Button>}
            {localStorage.getItem("user") ? history.push("/student") : null}

         
         </Box>
          </form>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    authError: state.user.authError,
    token: state.user.token,
    name: state.user.name,
    email: state.user.email,
    role: state.user.role,
    code: state.user.code,
    year: state.user.year,
    laoding:state.user.loading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signin: (email, password) => dispatch(signin(email, password)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps) (Login);
