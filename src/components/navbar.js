import React from "react";
import { useState } from "react";
import clsx from "clsx";

import Avatar from "@material-ui/core/Avatar";
import Collapse from "@material-ui/core/Collapse";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";

import MenuBookIcon from "@material-ui/icons/MenuBook";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import Popover from "@material-ui/core/Popover";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SchoolIcon from "@material-ui/icons/School";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListIcon from "@material-ui/icons/List";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Badge from "@material-ui/core/Badge";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { useEffect} from "react";
import { fetchAction } from "../store/action/fetchAction";

import usefetch from "./fetch";
import { Box } from "@material-ui/core";
import { blue } from "@material-ui/core/colors";
import Profile from "./Students/profile";
import { useRef } from "react";
import useWindowSize from "../utiles/useWindowSize";

const colortheme = createMuiTheme({
  palette: {
    error: {
      main: "rgb(0,255,0)",
    },
  },
});
const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  }, 
   block: {
    display: "block",
  },
  appBar: {
    background:
      "linear-gradient(103deg, rgba(42,167,228,1) 0%, rgba(23,77,142,1) 84%, rgba(29,49,131,1) 100%)",

    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  appBarShiftSmall: {
    marginLeft: '100%',
    width: `100%`,
  },
  drawerSmall: {
    width: '100%',
 
  },
  drawerOpenSmall: {
    width: '100%',
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.complex,
    }),
  },
  drawerCloseSmall: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.easeIn,
      duration: theme.transitions.duration.complex,
    }),
  },
  menuButton: {
    marginRight: 36,

  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    width: `calc(100% - ${drawerWidth}px)`,
    padding: '1%',
    background: '#f5f5f5',
    flexGrow: 1,
  },
  contentAdmin: {
    padding: theme.spacing(0),
  },
  btn: {
    paddingLeft: "9px",
  },
  nested: {
    paddingLeft: theme.spacing(4),
    whiteSpace: "initial",
    display: "flex",
    alignItems: "flex-start",
    "&:hover": {
      boxShadow: "9px 0px 6px",
    },
    wrap: {
      marginTop: "10px",
    },
  },
  logo: {
    flexGrow: 1,
  },
  cursorUnset: {
    cursor: "unset",
  },
  Avatarr: {
    cursor: "pointer",
    backgroundColor: blue[500],
    padding: "21px",
  },
  cursorUnset:{
    cursor: "pointer",

  }
}));

const MiniDrawer = (props) => {
  const { hide, children, lists } = props
  const abort = new AbortController();
  const { width } = useWindowSize();
  


  useEffect(()=>{
  if (hide.props.role=='instructor') {
    fetch("https://eng-asu-lms.herokuapp.com/instructors/InstructorCourses", {
      signal: abort.signal,
     method: "GET",
      headers: {
         "Content-Type": "application/json",
         "Authorization": `Bearer ${hide.props.token}`,
    },
    })
      .then((res) => {
       if (res.status === 404) {
          throw Error("404");
        }
   
        return res.json();
      })
      .then((data) => {
        props.fetchAction("instructor list courses done", data);
      })
      .catch((error) => {
        if (error.name === "AbortError") {
          console.log("aborted");
        } else {
          props.fetchAction("instructor list courses error");
        }
      });
  }
  else if (hide.props.role=='student'){
    fetch(`https://eng-asu-lms.herokuapp.com/users/getEnrolledCourses/${hide.props.code}`, {
        signal: abort.signal,
       method: "GET",
        headers: {
           "Content-Type": "application/json",
           "Authorization": `Bearer ${hide.props.token}`,
      },
      })
        .then((res) => {
         if (res.status === 404) {
            throw Error("404");
          }
     
          return res.json();
        })
        .then((data) => {
          props.fetchAction("student list courses done", data);
        })
        .catch((error) => {
          if (error.name === "AbortError") {
            console.log("aborted");
          } else {
            props.fetchAction("student list courses error");
          }
        });
  }
 
  },[])

  const classes = useStyles();
  const theme = useTheme();
  const newtheme = colortheme;
  const [open, setOpen] = useState(false);
  const [openPop, setoOpenPop] = useState(false);

  const [openS, setOpenS] = useState(false);

  const id = openPop ? "simple-popper" : undefined;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setOpenS(false);
  };
  const handleClick = () => {
    setOpenS(!openS);
  };

  const onclick = () => {
    setoOpenPop(true);
  };
  const onClose = () => {
    setoOpenPop(false);
  };

  return (
    <div  className={classes.root}>
      <CssBaseline />
      {/*NAVBAR*/}
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [width<900?classes.appBarShiftSmall:classes.appBarShift]: open,
        })}
      >
        {/*NAV content*/}

        <Toolbar >
          <Box /* className={clsx( {
              [classes.hide]:(hide.props.state==='student'),
             [classes.root]: !(hide.props.state==='student'),
              
            }) */
            style={{display:'flex',justifyContent:'space-between',
            alignItems: 'center',
            width: '100%',
        }}
          >
            <div style={{    display: 'flex',
    alignItems: 'center'}}>

            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <MenuIcon />
            </IconButton>

          {/*NAV LOGO*/}
<Typography
            variant="h6"
            style={{ color: "#fff" }}
            className={classes.logo}
            component={props.role==='admin'? null :Link} to= {props.role==='admin'? null : `/student/`} 
          >
            Education
          </Typography>
</div>
      
          
          <Box display="flex" alignItems="center">
            <Typography variant="body2" className={classes.menuButton}>
              {hide.props.role == "instructor"
                ? "prof. " + hide.props.name.toUpperCase()
                :hide.props.role == "admin"
                ? "Mr. "+hide.props.name.toUpperCase():
                hide.props.name.toUpperCase()}
            </Typography>
            <ThemeProvider theme={newtheme}>
              <Badge
                overlap="circle"
                color="error"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                variant="dot"
              >
                <Avatar onClick={onclick} className={classes.Avatarr} src="">
                  {hide.props.name.substring(0, 2).toUpperCase()}
                </Avatar>
              </Badge>
            </ThemeProvider>

            <Popover
              open={openPop}
              onClose={onClose}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
            >
              <Profile data={hide} />
            </Popover>
          </Box>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        variant={width<900? 'temporary':"permanent"}
        open={open}
        className={clsx(width<700?classes.drawerSmall:classes.drawer, {
          [width<700?classes.drawerOpenSmall:classes.drawerOpen]: open,
          [width<700?classes.drawerCloseSmall:classes.drawerClose]: !open,
          /* [classes.hide]: (hide.props.state=='student'),
          [classes.root]: !(hide.props.state=='student') */
        })}
        classes={{
          paper: clsx({
            [width<700?classes.drawerOpenSmall:classes.drawerOpen]: open,
            [width<700?classes.drawerCloseSmall:classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          {/*Menu Arrow*/}

          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />

        {/*The Line*/}
        {hide.props.role === "admin" ? (
          <List>
            <ListItem
              button
              component={Link}
              to={"/student"}
              className={classes.cursorUnset}
            >
              <ListItemIcon className={classes.btn}>
                <SchoolIcon />
              </ListItemIcon>
              <ListItemText primary="Manage students" />
            </ListItem>
            <Divider />
            <ListItem
              button
              component={Link}
              to={"/addCourse"}
              className={classes.cursorUnset}
            >
              <ListItemIcon className={classes.btn}>
                <MenuBookIcon />
              </ListItemIcon>
              <ListItemText primary="Manage Courses" />
            </ListItem>
            <Divider />

            <ListItem
              button
              component={Link}
              to={"/addInstructoor"}
              className={classes.cursorUnset}
            >
              <ListItemIcon className={classes.btn}>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Manage instructors" />
            </ListItem>
            <Divider />
            <ListItem
              button
              component={Link}
              to={"/addAdmin"}
              className={classes.cursorUnset}
            >
              <ListItemIcon className={classes.btn}>
                <SupervisorAccountIcon />
              </ListItemIcon>
              <ListItemText primary="Add New Admin" />
            </ListItem>
            <Divider />
          </List>
        ) : (
          <List>
            <ListItem button className={classes.cursorUnset}>
              <ListItemIcon className={classes.btn}>
                <ListIcon />
              </ListItemIcon>
              <ListItemText
                primary={
                  hide.props.role === "instructor"
                    ? "Courses you teach"
                    : hide.props.role === "student"
                    ? "Courses"
                    : null
                }
              />

              {openS ? (
                <ExpandLess
                  className={classes.cursorPointer}
                  onClick={handleClick}
                />
              ) : (
                <ExpandMore
                  className={classes.cursorPointer}
                  onClick={handleClick}
                />
              )}
            </ListItem>
            <Divider />

            <Collapse in={openS} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {props.role=='instructor'?
                  props.instcourses?
                  props.instcourses.map((course) => (
                    <div className={classes.wrap}>
                      
                      <ListItem
                        button
                        component={Link}
                        to= { hide.props.role=='instructor'? `/student/${course.code}`:`/student/${course.course_code}`}
                        className={classes.nested}
                      >
                        <ListItemIcon>
                          <ArrowRightIcon />
                        </ListItemIcon>
                        <ListItemText>
                          <Typography variant="body2">{ hide.props.role=='instructor'? course.name:course.course_name}</Typography>
                        </ListItemText>
                      </ListItem>
                      <Divider />
                    </div>
                  ))
                  :null 
                  : props.role=='student'? 
                  props.studentCourseslist?
                   props.studentCourseslist.map((course) => (
                    <div className={classes.wrap}>
                      
                      <ListItem
                        button
                        component={Link}
                        to= { hide.props.role=='instructor'? `/student/${course.code}`:`/student/${course.course_code}`}
                        className={classes.nested}
                      >
                        <ListItemIcon>
                          <ArrowRightIcon />
                        </ListItemIcon>
                        <ListItemText>
                          <Typography variant="body2">{ hide.props.role=='instructor'? course.name:course.course_name}</Typography>
                        </ListItemText>
                      </ListItem>
                      <Divider />
                    </div>
                  ))
                  :null:null
                  }
              </List>
            </Collapse>
          </List>
        )}
      </Drawer>

      <main
        className={clsx(classes.content, {
          [classes.contentAdmin]: hide.props.role === "admin",
        })}
      >
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
};
const mapStateToProps = (state) => {
  console.log(state)
    return {
      studentCourseslist:state.list.studentCourseslist[0],
      instcourses: state.list.instcourses[0],
      course: state.list.course[0],
      token: state.user.token,
      name: state.user.name,
      email: state.user.email,
      role: state.user.role,
      code: state.user.code,
      pending:state.list.pending
    };
  };
  const mapDispatchToProps = (dispatch) => {
    return {
      fetchAction: (status, data) => dispatch(fetchAction(status, data)),
    };
  };
  export default connect(mapStateToProps, mapDispatchToProps)(MiniDrawer);
  
