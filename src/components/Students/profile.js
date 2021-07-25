import Avatar from "@material-ui/core/Avatar";
import Collapse from "@material-ui/core/Collapse";
import { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Box, Modal, Snackbar } from "@material-ui/core";
import { blue, green } from "@material-ui/core/colors";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Fade from "@material-ui/core/Fade";
import Backdrop from "@material-ui/core/Backdrop";
import Changepass from "./changepass";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { signout } from "../../store/action/logoutAction";
import { connect } from "react-redux";
import Alert from "@material-ui/lab/Alert";
import Slide from "@material-ui/core/Slide";

const coloortheme = createMuiTheme({
  palette: {
    error: {
      main: "rgb(0,255,0)",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  Avatarr: {
    backgroundColor: blue[500],
    width: theme.spacing(10),
    height: theme.spacing(10),
    fontSize: "40px",
  },
  Border: {
    borderBottom: "3px inset",
  },
  Pop: {
    width: "350px",
    padding: "20px",
  },
  marginT: {
    marginTop: "10px",
  },
  marginB: {
    marginBottom: "10px",
  },
  marginTBig: {
    marginTop: "20px",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: "10px",
    width: "320px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 2, 3),
    outline: 0,
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

function Profile(props) {
  const classes = useStyles();
  const history = useHistory();
  const newthe = coloortheme;
  const [open, setOpen] = useState(false);
  const [equal, setEqual] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleClick = () => {
    setOpen(true);
  };
  const Handlesnak = () => {
    setEqual(true);
  };
  const logout = () => {
   
    fetch("https://eng-asu-lms.herokuapp.com/users/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${props.token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw Error(res.status);
        }
        props.signout('done')
        history.push("/");

      })

      .then(console.log('done'))
      .catch(() => {
        props.signout('error');
      });

  };


  return (
    <ThemeProvider theme={newthe}>
      <Box className={classes.Pop}>
        <Box
          className={classes.Border}
          display="flex"
          alignItems="center"
          flexDirection="column"
        >
          <Badge
            overlap="circle"
            color="error"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            variant="dot"
          >
               <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          open={equal}
          onClose={()=>{setEqual(false)}}
          TransitionComponent={Slide}
          autoHideDuration={700}

        >
          <Alert variant="filled" severity="success">
            password changed successfully
          </Alert>
        </Snackbar>
            <Avatar className={classes.Avatarr} src="">
              {props.name.substring(0, 2).toUpperCase()}
            </Avatar>
          </Badge>

          <Typography variant="h6" className={classes.marginT}>
            {props.name.toUpperCase()}
          </Typography>

          <Typography variant="body2" color="textSecondary">
            code: {props.code}
          </Typography>
          {props.role == "admin" ? null :
          props.role == "instructor" ? null : (
            <Typography
              variant="body2"
              color="textSecondary"
              className={classes.marginB}
            >
              
              year: {props.year}
       
            </Typography>
          )}
          <Typography
            variant="body2"
            color="textSecondary"
            className={classes.marginB}
          >
            {props.email}
          </Typography>
        </Box>

        <Box
          display="flex"
          justifyContent="space-evenly"
          flexDirection="column"
          className={classes.marginTBig}
        >
          <Button
            onClick={handleClick}
            endIcon={<VpnKeyIcon />}
            color="primary"
          >
            Change Password
          </Button>
          <Button
            className={classes.marginT}
            endIcon={<ExitToAppIcon />}
            onClick={logout}
            variant="contained"
            color="primary"
          >
            Logout
          </Button>
        </Box>

        <Modal
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 300,
          }}
        >
          <Fade in={open}>
            <div className={classes.paper}>
              <Changepass snackprofile={Handlesnak} token={props.token} close={handleClose} />
            </div>
          </Fade>
        </Modal>
      </Box>
    </ThemeProvider>
  );
}

const mapStateToProps = (state) => {
  return {
    authError: state.user.authError,
    token: state.user.token,
    name: state.user.name,
    email: state.user.email,
    role: state.user.role,
    code: state.user.code,
    year: state.user.year,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signout: (status) => dispatch(signout(status)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
