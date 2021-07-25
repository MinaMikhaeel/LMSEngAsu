import { Box, makeStyles, Typography, Button } from "@material-ui/core";
import Badge from "@material-ui/core/Badge";
import Avatar from "@material-ui/core/Avatar";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { useState } from "react";

const colortheme = createMuiTheme({
  palette: {
    error: {
      main: "rgb(0,220,0)",
    },
  },
});
const useStyles = makeStyles(() => ({
  container: {
    marginBottom: "10px",
  },
  h1Container: {
    width: "fit-content",
    maxWidth:'50%',
    background: "#1877f2",
    borderRadius: "20px",
    padding: "1%",
    margin: "0",
    color: "#FFF",
  },
}));
const Messeges = (props) => {


  const classes = useStyles();
  const newtheme = colortheme;
  const [ShowTime, setShowTime] = useState(false);
//   if (props.name===props.mess.sendername||props.name===props.Newone.sendername){
//       setOwn(true)
//   }
//   else {
//       setOwn(false)
//   }
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems={props.own ? "flex-end" : null}
      className={classes.container}
    >
      {!props.own?null:      <Typography style={{ marginLeft: "10px" }} variant="overline">
        {props.mess.sendername}
      </Typography>}

      <h1 onDoubleClick={()=>{setShowTime(!ShowTime)}} className={classes.h1Container} style={{background:!props.own?'#1877f2':'#e4e6eb', color: !props.own? '#fff':'#000'}}>
          {props.mess.messagetext}
      </h1>
      {ShowTime?<Typography
        style={{
          margin: " 5px 0 0 10px",
        }}
        variant="caption"
      >
             {props.mess.sendingtime}
      </Typography>:null}
    </Box>
  );
};
export default Messeges;
