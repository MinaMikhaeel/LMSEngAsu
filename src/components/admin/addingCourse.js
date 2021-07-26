import { Box, Typography } from "@material-ui/core";
import Navbar from "../navbar";
import { makeStyles } from "@material-ui/core/styles";
import Form from "./studentForm/CourseForm";
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";
import { useEffect, useState } from "react";
import clsx from "clsx";
import DoneIcon from "@material-ui/icons/Done";
import CourseList from "./studentlist/CourseLists";
import { fetchAction } from "../../store/action/fetchAction";
import CourseInfo from "../admin/Info/courseinfo";
import { connect } from "react-redux";
import EnrollStudent from "../admin/studentForm/EnrollStudenForm";
import EnrollYear from "../admin/studentForm/enrollYear";
import { Redirect } from "react-router-dom";
import Login from "../home";
import {
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
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";
import { Edit } from "@material-ui/icons";

import Slide from "@material-ui/core/Slide";
import Alert from "@material-ui/lab/Alert";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import useWindowSize from "../../utiles/useWindowSize";
import Item from "antd/lib/list/Item";
import Skeleton from '@material-ui/lab/Skeleton';
import CircularProgress from '@material-ui/core/CircularProgress';
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
  linkDecorationSmall:{
    width: "100%",
    height:'100%',
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
  const [CourseSubmit, setCourseSubmit] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const [openYear, setOpenYear] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [YearVal, setYearVal] = useState("");
  const [openNew, setOpenNew] = useState(false);
  const [openOne, setOpenOne] = useState(false);
  const [Infocode, setInfoCode] = useState("");
  const [filename, setfile] = useState("");
  const [Created, setCreated] = useState(false);
  const [Errorreport, setErrorreport] = useState([]);
  const [openDialogue, setopenDialogue] = useState(false);
  const [openA, setOpenA] = useState(false);
  const [openUpdateSnack, setopenUpdateSnack] = useState(false);
  const [NotText, setNotText] = useState(false);
  const { width } = useWindowSize();
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setOpenA(false);
  };

  const handleOpenUpdateSnakc = () => {
    setOpenA(true);
    setopenUpdateSnack(true);
  };


  // const openAdd = () => {
  //   setOpen(!open);
  //   setOpenInfo(false);
  // };
  const submit = () => {
    setCourseSubmit(!CourseSubmit);
  };

  const abort = new AbortController();
  useEffect(() => {

    setLoading(true)

    fetch("https://eng-asu-lms.herokuapp.com/admins/courses", {
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
        props.fetchAction("courses done", data);
      })
      .then(   ()=>     {setLoading(false)}
      )
      .catch((error) => {
        if (error.name === "AbortError") {
          console.log("aborted");
        } else {
          props.fetchAction("courses error");
        }
        setLoading(false)

      });
    return () => abort.abort();
  }, [CourseSubmit]);
  if (localStorage.getItem("user") == null) {
    return <Login />;
  }

  const openNewC = () => {
    setOpenNew(!openNew);
    setOpenOne(false);
    setOpenInfo(false);
    setOpenYear(false);
  };
  // const openYearC = () => {
  //   setOpenNew(false)
  //     setOpenOne(false)
  //      setOpenInfo(false);
  //      setOpenYear(!openYear)
  //      }
  //  const openOneC = () => {
  //        setOpenNew(false)
  //        setOpenOne(!openOne)
  //         setOpenInfo(false);
  //         setOpenYear(false)

  //  }

  const Delete = (code) => {
    fetch("https://eng-asu-lms.herokuapp.com/admins/courses/delete", {
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
  };

  const Info = (information) => {
    setInfoCode(information);
    setOpenNew(false);
    setOpenYear(false);
    setOpenOne(false);
    if (!openInfo) {
      setOpenInfo(true);
    }
  };
  const close = () => {
    setOpenInfo(false);
    setOpenNew(false);
    setOpenYear(false);
    setOpenOne(false);
  };

  const Row = ({ index, style }) => (
    <div style={style}>
      <CourseList
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
                    user.code.toLowerCase().includes(searchVal.toLowerCase()) )
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
       className={width<900? classes.showClose:classes.show}
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
        <Box className={clsx(width<900?classes.toolbarsmall:classes.toolbar,{
          [width<900?classes.hide:null]:openNew||openInfo
        }) }>
          <Box className={classes.sticky}>
          <Box className={classes.headingcontainer}>

            <Box className={classes.Border}>
              <Tooltip
                style={{display:openNew? 'none':null}}
                  title="Add"
                  size="small"
                  onClick={openNewC}
                >
                  <Fab color="primary" className={classes.fab}>
                    <AddIcon />
                  </Fab>
                </Tooltip>
           
            </Box>
            <Typography variant="h4"  style={{marginTop:openNew?'40px':null}}className={classes.logColor}>
                Manage Courses
              </Typography>
            </Box>
            <Box style={{ 
               margin: ((width>=900&&width<1200)||width<570)?"15px 0 15px 5px":"15px 0 15px 25px",
                display: "flex",
                justifyContent: "space-between",
                paddingRight: "20px", }}>
<Box style={{ display: "flex",alignItems:'baseline', width: "100%" }}>
              <FormControl
                variant="outlined"
                style={{ width: ((width>=900&&width<1200)||width<570)?'30%':"20%", textAlign: "center" }}
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
              <Box style={{width: "100%"}}>

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
                placeholder={openSearch ? ((width>=900&&width<1200)||width<650)?"search Courses...":"Search Courses by name or code..." : null              }
                onChange={(e) => {
                  setSearchVal(e.target.value)
                }}
              />
                            </Box>

</Box>

              {props.datal ? (
                <Button
                  disabled
                  variant="outlined"
                  style={{
                    width:width<720||(width>=900&&width<1000)?'35%':'22%',
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
                          user.code.toLowerCase().includes(searchVal.toLowerCase()))).length === props.datal.length
                    ? props.datal.filter((user) =>
                        YearVal.length == 0
                          ? user.name.toLowerCase().includes(searchVal.toLowerCase()) ||
                            user.code.toLowerCase().includes(searchVal.toLowerCase()) 
  
                          : user.year.includes(YearVal) &&
                            (user.name.toLowerCase().includes(searchVal.toLowerCase()) ||
                              user.code.toLowerCase().includes(searchVal.toLowerCase())) 
    
                      ).length + "'s Courses"
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

          <Box  style={{height:width<900?'64%':width>1500?'67%':'60%',overflow:'hidden'}}>
                        {/* loading?               <CircularProgress className={classes.center}/> */}
                        { loading?               <CircularProgress className={classes.center}/> :
props.datal ?(
                           <AutoSizer >
                           {({width,height}) => (
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
            ) : props.pending ? (
              <CircularProgress className={classes.center}/>
            ) : props.error ? (
              <h1 className={classes.center}>Empty courses list</h1>
            ) : null}
          </Box>
        </Box>
        <Box
          className={clsx(width<900?classes.linkDecorationSmall : classes.linkDecoration, {
            [width<900?classes.block:classes.root]: openNew,
            [classes.hide]: !openNew,
          })}
        >
          <Form submit={submit} close={close} token={props.token} />
        </Box>
{/* 
        <Box
          className={clsx(classes.linkDecorationCreateOne, {
            [classes.block]: openOne,
            [classes.hide]: !openOne,
          })}
        >
          <EnrollStudent token={props.props.token} submit={submit} />
        </Box> */}
        {props.datal ? (
          <Box
          className={clsx(width<900?classes.linkDecorationInfonSmall :classes.linkDecorationInfo, {
            [classes.block]: openInfo,
            [classes.hide]: !openInfo,
          })}
        >
            <CourseInfo
              close={close}
              submit={submit}
              Icode={Infocode}
              token={props.props.token}
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
    datal: state.list.courseslist[0],
    error: state.list.error,
    pending: state.list.pending,
    token: state.user.token,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchAction: (status, data) => dispatch(fetchAction(status, data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Adding);

// import { Box, Button, Divider, Drawer, FormControl, InputLabel , MenuItem,Select} from '@material-ui/core';
// import Navbar from '../navbar';
// import { makeStyles } from '@material-ui/core/styles';
// import Form from './studentForm/CourseForm';
// import Fab from '@material-ui/core/Fab';
// import Tooltip from '@material-ui/core/Tooltip';
// import AddIcon from '@material-ui/icons/Add';
// import { useEffect, useState  } from "react";
// import clsx from 'clsx';
// import DoneIcon from '@material-ui/icons/Done';
// import CourseList from "./studentlist/CourseLists"
// import EnrollStudent from '../admin/studentForm/EnrollStudenForm';
// import { fetchAction } from "../../store/action/fetchAction";
// import { connect } from "react-redux";
// const useStyles = makeStyles(() => ({
//     root: {
//         display: 'flex',
//       },
//       hide: {
//         display: 'none',
//       },
//       show: {
//         background: 'linear-gradient(103deg, rgba(42,167,228,1) 0%, rgba(23,77,142,1) 84%, rgba(29,49,131,1) 100%)',
//         height:'calc(100vh - 64px)',
//         padding: '25px 0'
//     },
// toolbar: {
// width:'50%',

// backgroundColor: '#fff',
// borderRadius:'10px',
// boxShadow:'0px 0px 16px',
// height:'100%',
// padding: '25px',

// },
//   linkDecoration: {
//     width:'40%',
//     backgroundColor: '#fff',

//     borderRadius:'10px',
//     boxShadow:'0px 0px 16px',
//     padding: '0 30px 30px',
//   },
//   Border:{
//     borderBottom:'3px inset',
//     paddingBottom:'10px',
// },
// over:{
//   overflowY:'auto',
// height:'510px',
// },
// center:{
// textAlign:'center'
// }

// }))

// const Adding = (props) => {
//     const classes = useStyles();

//     const [openNew,setOpenNew]= useState(false)
//     const [openOne,setOpenOne]= useState(false)
//     const [courseinslist,setCourseinslist]= useState(false)
//     const [instcode,setInstcode]= useState('')
//     const [CourseSubmit,  setCourseSubmit] = useState(false);
//     const [openInfo, setOpenInfo] = useState(false);
//     const [Infocode, setInfoCode] = useState("");

// const courseInst = (code) =>{
//   setCourseinslist(true)
//   setInstcode(code)
// }

// const Delete = (code) => {
//   fetch("http://localhost:8080/admins/deleteUser", {
//     method: "DELETE",
//     headers: {
//       "Content-Type": "application/json",
//       "Authorization": `Bearer ${props.props.token}`,
//     },
//     body: JSON.stringify({ code }),
//   });
//   CourseSubmittion()
// };

// const Info = (information) => {
//   setInfoCode(information);
//   setOpenNew(false)
//   setOpenOne(false)
//   if (!openInfo) {
//     setOpenInfo(true);
//   }
// };

//     return (
// <Navbar   hide={props}>

//            <Box className={classes.show}  display='flex' alignItems='center' justifyContent='space-around'>
//                <Box className={classes.toolbar}>
//                 <Box className={classes.Border} display="flex" justifyContent="space-evenly" >
//                 <Tooltip title={openNew? "Done":'Enroll'}onClick={openNewC}>
//         {openNew?  <Fab color="primary"  className={classes.fab}>
//         <DoneIcon/>
//         </Fab>: <Fab color="primary" variant="contained">
//          new Course  </Fab>}

//       </Tooltip>

//       <Tooltip title={openOne? "Done":"Enroll"}onClick={openOneC}>
//         {openOne?  <Fab color="primary"  className={classes.fab}>
//         <DoneIcon/>
//         </Fab>: <Fab color="primary"  variant="contained">
//         student  </Fab>}

//       </Tooltip>
//      </Box>

//       <Box className={classes.over}>

//       {props.datal? props.datal.map((user) => (   <CourseList
//                     delete={Delete}
//                     Info={Info}
//                     student={user}
//                     key={user.code}
//                   />)):null}
//       {props.error? <h1 className={classes.center}>Empty courses list</h1>: null}
//       {props.pending ? <h1 className={classes.center}>loading...</h1> : null}

//       </Box>

//                </Box>
//                <Box className={clsx(classes.linkDecoration, {
//           [classes.root]: openNew,
//           [classes.hide]: !openNew
//           })}>
//                   <Form token={props.props.token} list={courseInst}/>

//                </Box>
//                <Box className={clsx(classes.linkDecoration, {
//           [classes.root]: openOne,
//           [classes.hide]: !openOne
//           })}>
//                   <EnrollStudent token={props.props.token} />

//                </Box>
//                <Box
//           className={clsx(classes.linkDecorationInfo, {
//             [classes.block]: openInfo,
//             [classes.hide]: !openInfo,
//           })}
//         >
// <h1>hello</h1>        </Box>
//            </Box>

//         </Navbar>

//     );
// }
// const mapStateToProps = (state) => {
//   console.log(state
//     );
//   return {
//     datal: state.list.courseslist[0],
//     error: state.list.error,
//     pending: state.list.pending,
//   };
// };
// const mapDispatchToProps = (dispatch) => {
//   return {
//     fetchAction: (status, data) => dispatch(fetchAction(status, data)),
//   };
// };
// export default connect(mapStateToProps, mapDispatchToProps)(Adding);
