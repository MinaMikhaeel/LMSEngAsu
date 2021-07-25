


import { Box ,makeStyles,Typography, Button}from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { useState } from "react";
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import Alert from '@material-ui/lab/Alert';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
const useStyles = makeStyles((theme) => ({
    imgBox: {
      
        textAlign:'center',

    },
    logColor: {
        color:'#09B9DC',
        marginTop:'39px'
    },
    
    yearBox: {
      
        textAlign:'left',

    },
    bg: {
        height: '100vh',
        position: 'relative',
    },
    inpuut:{
        margin:'30px 0 0',
        display: 'block',
        margin: '5% 42% 0 42%',
       
    },
    label: {
        fontSize:'18px',     
        margin:'5px 0 2px 0 '
    },
    
    formControl: {
        marginTop: theme.spacing(1),
        minWidth: 150,
      }

}));

export default function Login(props) {
    const classes= useStyles()
const {token}=props
    const [year, setYear] = useState(null)
    const [course_code, setCourse_code] = useState(null)
    const [open, setOpen] = useState(false);

    const [openA, setOpenA] = useState(false);
    const [err, seterr] = useState('');

    const handleClick = (e) => {
  
        e.preventDefault();
        

        if (course_code!=null&&year!=null){
       
            fetch('http://localhost:8080/admins/enrollMultiple', {
                method: 'POST',
                headers: {    "Content-Type":"application/json",
                "Authorization" : `Bearer ${token}`},
                body: JSON.stringify({
                  course_code,        
                  year,
                })
              })
                 .then(res=>{
                    if(res.status==404)
                  {
                      throw Error('error in enroll = 404')
                  }
                  res.json()
                  setOpenA(true)
 
           
                  setCourse_code('')
           
                  setYear('')
                  seterr('')

                  Array.from(document.querySelectorAll("input")).forEach(
                  input => (input.value = null)
                
                )
                  })
                  .then(data => console.log(data))
            
                  .catch(error=>console.log(error.message))
              
                     
        }

            
               else if (!course_code){
                setOpen(true);
                seterr('course_code')
              }
              else if (!year){
                setOpen(true);
                seterr('student_code')
              }
             

        }

        const handleClose = () => {
            setOpen(false);
            setOpenA(false);
          };

    return (  

<Box>
<Snackbar
                    anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                                  }}
                        open={openA}
                        onClose={handleClose}
                        TransitionComponent={Slide}
                    
       
                >
                    <Alert variant="filled" severity="success">
year enrolled

</Alert>


                </Snackbar>

<Snackbar
                    anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                                  }}
                        open={open}
                        onClose={handleClose}
                        TransitionComponent={Slide}
                    
       
                >
                    <Alert variant="filled" severity="error">
  {err==='course_code'? 'please enter course code':
  err==='student_code'? 'please enter student code':'' } 
</Alert>


                </Snackbar>



<form noValidate autoComplete="off"   className={classes.imgBox}     onSubmit={handleClick} >

            <Typography  variant="h4" className={classes.logColor}>
                

            Enroll by year
                
            </Typography>
            <Box className={classes.yearBox}>
    
           
            <FormControl className={classes.formControl} >
        <InputLabel id="demo-controlled-open-select-label">course year</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          value={year}
          onChange={(e)=>setYear(e.target.value)}
        >
          <MenuItem value={0}>0</MenuItem>
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
        </Select>
      </FormControl>
         
            <TextField
            fullWidth
            onChange={(e)=> setCourse_code(e.target.value)}
            type="text"
            required
            label= 'Enter course code'
            InputProps={{
                classes: {
                  input: classes.label,
                },
            }}
            error={err=='Id'}

            />

      </Box>

            <Button 
            className = {classes.inpuut}
            variant="contained" 
            color="Primary"
             type="submit"
             >
        ENROLL
      </Button>

        </form>  

</Box>
    )}
