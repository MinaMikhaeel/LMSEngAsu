import { Box, makeStyles, Typography, Button } from "@material-ui/core";
import Badge from "@material-ui/core/Badge";
import Avatar from "@material-ui/core/Avatar";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { useState } from "react";
import moment from 'moment'
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
const Conv = (props) => {

console.log(props);
  const classes = useStyles();
  const newtheme = colortheme;
const time = moment (props.Newone.message.createdAt).format('DD:MMM:YYYY h:mm a')
const [ShowTime, setShowTime] = useState(false);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems={props.own ? "flex-end" : null}
      className={classes.container}
    >
      {!props.own?null:    <Typography style={{ marginLeft: "10px" }} variant="overline">
{props.Newone.message.username}
      </Typography>}
      <h1  onDoubleClick={()=>{setShowTime(!ShowTime)}} className={classes.h1Container} style={{background:!props.own?'#1877f2':'#e4e6eb', color:!props.own? '#fff':'#000'}}>
          {props.Newone.message.text}
      </h1>
      {ShowTime?<Typography
        style={{
          margin: " 5px 0 0 10px",
        }}
        variant="caption"
      >
       {time}
      </Typography>:null}
    </Box>
  );
};
export default Conv;
