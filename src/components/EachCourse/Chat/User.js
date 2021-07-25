import { Box, makeStyles, Typography, Button } from "@material-ui/core";
import Badge from "@material-ui/core/Badge";
import Avatar from "@material-ui/core/Avatar";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const colortheme = createMuiTheme({
    palette: {
      error: {
        main: "rgb(0,220,0)",
      },
    },
  });
const useStyles = makeStyles(() => ({
container:{
    marginBottom:'10px'
}
  }));
const User =(props) =>{
const classes = useStyles();
const newtheme = colortheme;
console.log(props)
    return (
        <Box display='flex' alignItems='center' style={{padding:'10px'}}className={classes.container}>
            <ThemeProvider theme={newtheme}>
            <Badge
        overlap="circle"
        color="error"
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        style={{marginRight:'4%'}}
        variant="dot"
      >
        <Avatar onClick={onclick}  src="">
          {props.user.username.substring(0, 2).toUpperCase()}
        </Avatar>
      </Badge>
            </ThemeProvider>

    <h1>{props.user.username}</h1>

        </Box>
        );
}
export default User;