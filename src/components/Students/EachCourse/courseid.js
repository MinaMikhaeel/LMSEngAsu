import Tabs from './Tabs';
import Navbar from '../../navbar';
import usefetch from '../../fetch';
import { Box, Typography } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { connect } from "react-redux";
import { useEffect,useState} from "react";
import { fetchAction } from "../../../store/action/fetchAction";
import { Link, Redirect } from 'react-router-dom';
import Skeleton from '@material-ui/lab/Skeleton';

const CourseId = (props) => {


    const { id } =useParams();
    const [code,setCode] = useState(id)
    const username = props.name
    const [loading,setLoading]=useState(false)
const setting=()=>{
  setCode(id)
}
  
    const abort = new AbortController();

    useEffect(() => {
      setting()
      setLoading(true)
      if (props.role==='instructor'){

      fetch(`https://eng-asu-lms.herokuapp.com/courses/course/${code}`, {
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
         props.fetchAction("course retrive done", data);
       })
       .then(()=>{      setLoading(false)       })
       .catch((error) => {
         if (error.name === "AbortError") {
           console.log("aborted");
         } else {
           props.fetchAction("course retrive error");
         }
         setLoading(false)      
       });
     return () => abort.abort();
    }
    else if (props.role==='student')
    {
      setLoading(true)

     
        fetch(`https://eng-asu-lms.herokuapp.com/courses/course/${code}`, {
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
            props.fetchAction("course retrive done", data);
          })
          .then(()=>{      setLoading(false)       })
          .catch((error) => {
            if (error.name === "AbortError") {
              console.log("aborted");
            } else {
              props.fetchAction("course retrive error");
            }
            setLoading(false)      
          });
    }

    }, [code,id,props.role]);

  
    if(!localStorage.getItem('user'))
    {
      return <Redirect to={'/'} />
    }

  
if(props.role==='instructor')
{
  return ( 
    <div>
                <Navbar hide={props}>
        {!loading?<div>
          <Skeleton/>
          <Skeleton/>
          <Skeleton fade/>
          <Skeleton/>
        </div>:props.course && 
         
        <Box >

            <Box mx={2} my={3}>
<Typography variant='h4'>
{props.course.course.name}
    </Typography>
    <Typography variant='body2' color='textSecondary'>
     Teached By : {props.course.instructor_name}
    </Typography>

            </Box>
    <Tabs props={props} code={code} course={props.course} />

        </Box>
   
  
    }
              </Navbar>


    


    </div>

 );
}
else if (props.role==='student')
{
  return (
    <div style={{background:'#f5f5f5' ,width:'100%'}}>
    <Navbar hide={props} >
    {props.course && 
  
  <Box >
  
  <Box mx={3} my={4}>
  {loading?    <div style={{ maxWidth: "20%" }}>
<Skeleton /></div>:<Typography variant='h4'>
  { props.course.course.name}
  </Typography>}
  {loading?    <div style={{ maxWidth: "10%" }}>
<Skeleton /></div>:<Typography variant='body2' color='textSecondary'>
  Teached By : {'prof. '+props.course.instructor_name}
  </Typography>}
  
  </Box>
  {loading?  <div style={{width: 500,margin:'auto'}}>
      <Skeleton />
      <Skeleton animation={false} />
      <Skeleton animation="wave" />
    </div>:<Tabs  props={props} code={code} course={props.course} />}
  
  </Box>
  
  
  }
  </Navbar>
  
  
  
  
  
  </div>
  
  );

}
}
 
const mapStateToProps = (state) => {
    return {
      studentCourseslist:state.list.studentCourseslist[0],
      instcourses: state.list.instcourses[0],
      course: state.list.course[0],
      token: state.user.token,
      name: state.user.name,
      email: state.user.email,
      role: state.user.role,
      code: state.user.code,
    };
  };
  const mapDispatchToProps = (dispatch) => {
    return {
      fetchAction: (status, data) => dispatch(fetchAction(status, data)),
    };
  };
  export default connect(mapStateToProps, mapDispatchToProps)(CourseId);
  