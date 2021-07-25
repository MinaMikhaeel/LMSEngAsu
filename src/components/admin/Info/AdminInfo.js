


import {
    Box,
    makeStyles,
    Typography,

  } from "@material-ui/core";
  import TextField from "@material-ui/core/TextField";
  import Tooltip from "@material-ui/core/Tooltip";
  import AddIcon from "@material-ui/icons/Add";
  import Fab from "@material-ui/core/Fab";
  
  const useStyles = makeStyles((theme) => ({
    FlexBases: {
      width: "55%",
    },
    logColor: {
      color: "#09B9DC",
      marginBottom: "30px",
      textAlign: "center",
    },
  
    Labelflex: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around",
      paddingBottom: "30px",
    },
    LabelflexFinal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around",
    },
    bg: {
      display: "inline",
      marginRight: "10px",

    },
    toolbar: {
      padding: "25px",
    },
  
    Border: {
      borderBottom: "3px inset",
      paddingBottom: "10px",
      marginBottom: "15px",
      width: "100%",
      
    },
  }));
  
  function StudentInfo(props) {
    const classes = useStyles();
    const { Icode, token } = props;

    const old_code = Icode.code;
  
        

    return (
      <Box className={classes.toolbar}>
         <Box className={classes.Border}>
        
                
                 <Tooltip 
              style={{    fontSize: "26px"}}
              title= "close"
          size="small"
          onClick={props.close}>
        <Fab color="primary">&times;</Fab>
        </Tooltip>
        </Box>
        <Typography variant="h4" className={classes.logColor}>
          Mr. {Icode.name} Info
        </Typography>

              <Box >
                <label className={classes.Labelflex}>
                  <Typography variant="h6" className={classes.bg}>
                    Admin Name:
                  </Typography>
                
                    <TextField
                      variant="outlined"
                      className={classes.FlexBases}
                      disabled
                      value={Icode.name}
                    ></TextField>
                  
                </label>
                <label className={classes.Labelflex}>
                  <Typography variant="h6" className={classes.bg}>
                  Admin Email:
                  </Typography>
               
                    <TextField
                      variant="outlined"
                      className={classes.FlexBases}
                      disabled
                      value={Icode.email}
                    ></TextField>
                  
                </label>
  
                <label className={classes.Labelflex}>
                  <Typography variant="h6" className={classes.bg}>
                  Admin Code:
                  </Typography> 
                    <TextField
                      variant="outlined"
                      className={classes.FlexBases}
                      disabled
                      value={Icode.code}
                    ></TextField>
                
                </label>
                </Box>
      </Box>
    );
  }

  
  export default StudentInfo;
 