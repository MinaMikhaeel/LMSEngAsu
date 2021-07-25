import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Chat from "../../EachCourse/Chat/Chat";
import Content from "../../EachCourse/contents/content";
import Assignment from "../../EachCourse/Assignment/Assignments";
import LOS from "../../instructors/lists/LOS";
import StudentQuiz from "../../EachCourse/quizzes/studentQuiz/StudentQuiz";
import Build from "../../EachCourse/quizzes/build";
import { Button } from "@material-ui/core";
import Titles from '../../EachCourse/quizzes/quizTitles'
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  
  },
}));

export default function ScrollableTabsButtonAuto(props) {
  const classes = useStyles();
  const { code, course } = props;
  const [value, setValue] = React.useState(0);
  const [ChatVAl, setChatVAl] = React.useState(false);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

 const herechat=()=>{
   setChatVAl(!ChatVAl)
 }
  return (
    <div className={classes.root}>
      <AppBar position="sticky" style={{top:'8.99%',    position: 'sticky' }} color="default" >
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="Lessons" {...a11yProps(0)} />
          <Tab label="quizzes" {...a11yProps(1)} />
          <Tab label="Assignments" {...a11yProps(2)} />
          <Tab  label="Course Chat" {...a11yProps(3)} />
          {props.props.role == "instructor" ? <Tab  label={props.props.role == "instructor" ? "Students":null} {...a11yProps(4)} />:null}

      </Tabs>
      </AppBar>
      
      <TabPanel value={value} index={0}  >
        <Content code={course.course._id} token={props.props.token} />
      </TabPanel>
      <TabPanel value={value} index={1} >
        {props.props.role == "instructor" ? (
          <Build
            course={course}
            instructor_code={props.props.code}
            token={props.props.token}
          />
        ) : (
          <Titles />
        )}
      </TabPanel>
      <TabPanel value={value} index={2}  >
        <Assignment
          code={code}
          course={course}
          token={props.props.token}
        />
      </TabPanel>
      <TabPanel value={value} index={3} >
        
        <Chat username={props.props.name} changechat={herechat} ChatVAl={ChatVAl} room={course.course.code}/>
      </TabPanel>
     
      {props.props.role == "instructor" ?
      <TabPanel value={value} index={4}    >
       <LOS code={code} /> 
      </TabPanel>
      :null}
   
  </div>
  );
}
