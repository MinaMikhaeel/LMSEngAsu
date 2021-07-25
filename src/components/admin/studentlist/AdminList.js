import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { Box, Button } from '@material-ui/core';


const useStyles = makeStyles(() => ({
  
button:{
  width:'100%',
  paddingBottom:0,
  paddingTop:0,
},
PR:{
  paddingLeft: '10px',

},
Flex:{
  display:'flex',
  alignItems:'flex-start',
  flexDirection:'column',
}
}))


const Studentlist = (props) => {
  const classes = useStyles();

    const{student,index}=props;
 
    const openI=()=> {
      props.Info(student)
          }
            
   
        return (  
<Box index={index}>
<List className={classes.button}  style={{ backgroundColor: index % 2 != 0 ? "rgba(0, 0, 0, 0.1)" : null }} >

                 <ListItem style={{padding:0}}>
                             <Box component={Button} style={{padding: '20px'}} onClick={openI} className={classes.button}>
                 
                   <ListItemAvatar>
                   <Avatar     style={{
                    backgroundColor:
                      index % 2 != 0 ? "#FFF" : "rgba(0, 0, 0, 0.5)",
                    color: 
                    index % 2 === 0 ? "#FFF" : "rgba(0, 0, 0, 0.5)",

                }}
              >
                {student.name.slice(0, 2)}
              </Avatar>
                   </ListItemAvatar>
                   <ListItemText
                                 style={{ textTransform: "none" }}

                                 primary={
                                  <Typography
                                    type="body2"
                                    style={{ textTransform: "capitalize" }}
                                  >
                                    {'Mr. '+student.name}
                                  </Typography>
                                }                     secondary={
                       <React.Fragment>
                       <Typography
                         component="span"
                         variant="body2"
                         color="textPrimary"
                       >
                         Code:
                         </Typography>
                       {" "}{student.code}
                    
                     </React.Fragment>
                     }
                     className={classes.Flex}
                   />
                   
              </Box>
           
          
                   
                 </ListItem>
                 </List>
                 <Divider/>
              
</Box>
              
                 

        
              
    );
}
 
export default Studentlist;