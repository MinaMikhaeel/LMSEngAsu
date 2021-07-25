import { Box ,makeStyles,Typography, Button, Container}from '@material-ui/core';
import Image from './../assets/img/h1.jpg';
import TextField from '@material-ui/core/TextField';
import clsx from 'clsx';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { useState , useEffect } from "react";
import Typed from 'react-typed';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import Alert from '@material-ui/lab/Alert';
const themme = createMuiTheme ({
    palette: {
       primary: {
           main:'rgb(0,117,255)',

       }
    }
    
})
const useStyles = makeStyles((theme) => ({
    
    root:{
        display: 'flex',
        alignItems: 'center',
        borderRadius: '20px',
        boxShadow:'4px 1px 38px',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)', 
        background: '#fff',
        borderRadius: '20px',


    },
    bg: {
        background: 'linear-gradient(45deg, rgba(12,198,239,1) 35%, rgba(1,139,177,1) 71%)',
        height: '100vh',
        position: 'relative',

    },
    imgBox: {
    
        overflow:'hidden',
        borderRadius: '20px',

    },
        imwidth:{
            width: '50%',
            background:'#fff',

        },
    img: {
        borderRadius: '20px',

        width: '100%',
        display: 'block',
    },
    formBg: {
        padding: '0 30px 30px 30px',
        height: '100%',
        borderRadius: '20px',

    },
    formwidth:{
        width: '50%',
        borderRadius: '20px',

    },
inpuut:{
    margin:'30px 0 0',
   
},
label: {
    fontSize:'18px',     
    
},
logColor: {
    color:'#09B9DC',
},
logmargin: {
    marginTop:'20px',
}
}));

  export default function Login() {
    
        const classes= useStyles()
        const [duration,setduration] =useState(false);
        const [username, setUsername] = useState('')
        const [pass, setpass] = useState('')
        const [open, setOpen] = useState(false);
        
        const [err, seterr] = useState('');
      
        const handleClick = (e) => {

            e.preventDefault()
            if (username&&(pass.length>8)){
                fetch('http://localhost:8000/login',{
                  method: 'POST',
                  headers: {"content-type":"application/json"},
                  body:JSON.stringify({username,pass})
                })
                .then(()=>{
                    if (username == 'mina' && pass=='123456789') {
                        console.log('right'); 
                     }
                    else {
                        setOpen(true);
                    seterr('incorrect')
                         
                     }
            {/* .then(response => response.json())
                .then(result => {
                d  console.log('Success:', result);
                }) */
            }
                })
            }
                   if (username==''){
                    setOpen(true);
                    seterr('username')
                  }
                 else if (pass==''){
                    setOpen(true);
                    seterr('pass')
                  }
                  else if ((pass.length<8)&&pass!=''){
                    setOpen(true);
                    seterr('short')
                  }
           
            }
          
      
          const handleClose = () => {
            setOpen(false);
          };
        
    useEffect(() => {
        setTimeout(() => {
            setduration(true)
        }, 1500);
    },[]);
      
    

    return (  
        <ThemeProvider theme={themme}>
            <Box className={classes.bg}>
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
  {err==='username'? 'please enter your username':
  err==='pass'? 'please enter your pass' :
  err==='short'? 'please enter password more than 8' : 
  err==='incorrect'? 'incorrect password & email': '' } 
</Alert>
                </Snackbar>
                <Container >
                    <Box className={classes.root}>
                    <Box className={classes.imwidth} >    
        
        <img src={Image} className={classes.img}/>
        <Typography className={classes.logColor} variant="h3">
                    <Typed
                    strings ={["Welcome Back"]}  
                    typeSpeed={60}
                    startDelay={1500}
                    /> 
                 </Typography>
    </Box>
    <Box className={classes.formwidth}>
        <form noValidate autoComplete="off" className={classes.formBg}
    onSubmit={handleClick} >
             
               
                <Typography className={clsx(classes.logColor, {
        [classes.logmargin]: true,
       
      })} variant="h4">
                    

                login
                    
                </Typography>
               
                <TextField
                onChange={(e)=> setUsername(e.target.value)}
                fullWidth
                type="Email"
                required   
                label= 'Enter Your Email'
                InputProps={{
                    classes: {
                      input: classes.label,
                    },
                }}
                >
                </TextField>
               
                <TextField
                fullWidth
                onChange={(e)=> setpass(e.target.value)}
                className={classes.inpuut}
                type="password"
                required
                label= 'Enter Your password'
                InputProps={{
                    classes: {
                      input: classes.label,
                    },
                }}
                
                >
                </TextField>
               
                <Button 
                className = {classes.inpuut}
                variant="contained" 
                color="Primary"
                 type="submit"
                 >
            submit
          </Button>
            </form>  
    
    </Box>
  
                    </Box>

  
    </Container>


</Box>   


   




        </ThemeProvider>


);

 
}
