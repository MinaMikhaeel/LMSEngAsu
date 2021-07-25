import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { Box, Button, Grid } from "@material-ui/core";
import { useEffect } from "react";
import { useState } from "react";
import Fab from "@material-ui/core/Fab";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import useWindowSize from "../../../utiles/useWindowSize";

const useStyles = makeStyles(() => ({
  button: {
    width: "100%",
    paddingBottom:0,
    paddingTop:0,
  },
  PR: {
    paddingLeft: "10px",
  },
  Flex: {
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
  },
}));

const Studentlist = (props) => {
  const classes = useStyles();
  const { width } = useWindowSize();

  const { student ,index } = props;
  const [openDialogue, setopenDialogue] = useState(false);
  const handleClick = () => {
    props.delete(student.code);
  };
  const openI = () => {
    props.Info(student);
  };
  const close = () => {
    setopenDialogue(false);
  };
  const handleDelete = () => {
    setopenDialogue(true);
  };
  return (
    <Box key={index}>
        <Dialog open={openDialogue} onClose={close}>
        <DialogTitle>      {"Are you sure you want to delete "+ student.name + ' course ?'}</DialogTitle>
        <DialogActions>
          <Button
            onClick={() => {close()
              handleClick()}}
            color="secondary"
          >
            Yes
          </Button>
          <Button onClick={close} color="error">
            no
          </Button>
        </DialogActions>
      </Dialog>
<List className={classes.button}  style={{ backgroundColor: index % 2 != 0 ? "rgba(0, 0, 0, 0.1)" : null }} >
          <ListItem style={{padding:0}}>
          <Box component={Button} style={{padding: '20px'}}  onClick={openI} className={classes.button}>
            <ListItemAvatar>
              <Avatar style={{
                    backgroundColor:
                      index % 2 != 0 ? "#FFF" : "rgba(0, 0, 0, 0.5)",
                    color: 
                    index % 2 === 0 ? "#FFF" : "rgba(0, 0, 0, 0.5)",

                }}
              >
                {student.name.slice(0, 2)}</Avatar>
            </ListItemAvatar>
            <ListItemText
          style={{ textTransform: "none" }}
          primary={
            <Typography
              type="body2"
              style={{ textTransform: "capitalize" }}
            >
              {student.name}
            </Typography>
          }
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    color="textPrimary"
                  >
                    CODE:
                  </Typography>{" "}
                  {student.code}
                  {width>=410?  <Typography
                    component="span"
                    variant="body2"
                    color="textPrimary"
                    className={classes.PR}
                  >
                  YEAR:
                  </Typography>:null}{width>=320? " "
                  +student.year:null}
                {width>=410?   <Typography
                    component="span"
                    variant="body2"
                    color="textPrimary"
                    className={classes.PR}
                  >
                  GRADE:
                  </Typography>:null}{width>=410? " "
                  +student.score:null}
                </React.Fragment>
              }
              className={classes.Flex}
            />
          </Box>

          <Tooltip title="Delete">
            <IconButton onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </ListItem>
      </List>
      <Divider />
    </Box>
  );
};

export default Studentlist;
