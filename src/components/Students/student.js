import Navbar from '../navbar';
import Card from './card';
import usefetch from '../fetch';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Container, Grid } from "@material-ui/core"
import clsx from 'clsx';
import { useEffect, useState} from "react";
import { fetchAction } from "../../store/action/fetchAction";
import { connect } from "react-redux";
import { Link, Redirect } from 'react-router-dom';

import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
      },
      hide: {
        display: 'none',
      },
      show: {
        display: 'block',
        height:'100vh',
        background: '#f5f5f5'

      },
toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  linkDecoration: {
textDecoration:'none',
fontSize:'20px',

  }
}))

const Student = (props) => {

  const classes = useStyles();
  const history = useHistory();
    const abort = new AbortController();




useEffect(() => {
  if(props.role=='instructor'){
    fetch("https://eng-asu-lms.herokuapp.com/instructors/InstructorCourses", {
     signal: abort.signal,
    method: "GET",
     headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${props.token}`,
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
   return () => abort.abort();
    }
  else if (props.role=='student') {
  fetch(`https://eng-asu-lms.herokuapp.com/users/getEnrolledCourses/${props.code}`, {
    signal: abort.signal,
   method: "GET",
    headers: {
       "Content-Type": "application/json",
       "Authorization": `Bearer ${props.token}`,
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
}, [props.role]);  



    if(!localStorage.getItem('user'))
    {
      return <Redirect to={'/'} />
    }

return ( 

      <div className={classes.show}>
      {props.role=='instructor'?
        props.instcourses?
        <Navbar hide={props}>
     
 
     <Container style={{margin: 0}} >
           <Grid container spacing={3} alignItem='stretch' style={{marginTop:'1%'}}>
              {/* {((props.role==='instructor')?courses.instructorId : courses.userId )} */}
              {props.instcourses.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)).map((courses,index) => (
           
           <Grid item xs={12} sm={8}  md={6} lg={3} >
              <Box   className={classes.linkDecoration} component={Link} to={`/student/${courses.code}`}>
              <Card index={index} course={courses} role={props.props.role} name={props.props.name}/>
    
              </Box>
    
    
              </Grid>

    
              
      )) }


              </Grid>
              </Container>
         
   
         </Navbar>
      :null
      :
      props.role=='student'?
      props.studentCourseslist?  
      <Navbar hide={props}>



                    <Container style={{margin: 0}} >
     

                   
            <Grid container spacing={3}  alignItem='stretch' style={{marginTop:'1%'}}>
            
            {/* {((props.role==='instructor')?courses.instructorId : courses.userId )} */}
            { props.studentCourseslist.sort((a,b) => (a.course_name > b.course_name) ? 1 : ((b.course_name > a.course_name) ? -1 : 0)).map((courses,index) => (
    
            <Grid item xs={12} sm={8} md={6} lg={3}>
            
            <Box   className={classes.linkDecoration} component={Link} to={`/student/${courses.course_code}`}>
            <Card index={index} course={courses} name={props.props.name}/>
    
            </Box>
    
    
            </Grid>
    
    ))}

    
            </Grid>

            </Container>

 
      </Navbar>
      :null
      :null
      }
      {props.error? 
      <Navbar hide={props}>
        <h1>No Courses yet!!</h1>
      </Navbar>:null}
      
    {props.pending? 

          <h1>Loading...</h1>
        :null}
        </div>
         );
    
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchAction: (status, data) => dispatch(fetchAction(status, data)),
  };
};
const mapStateToProps = (state) => {
  return {
    studentCourseslist:state.list.studentCourseslist[0],
    instcourses: state.list.instcourses[0],
    error: state.list.error,
    pending: state.list.pending,
    token: state.user.token,
    name: state.user.name,
    email: state.user.email,
    role: state.user.role,
    code: state.user.code,
    year: state.user.year,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Student);
