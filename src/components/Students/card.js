import {
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  Typography,
  Box,
} from "@material-ui/core";
import usefetch from "../fetch";
import { makeStyles } from "@material-ui/core/styles";
import Image from "react-random-image";

const useStyles = makeStyles((theme) => ({
  Border: {
    borderTop: "1px inset",
    marginTop: "15px",
    paddingTop: "15px",
    height: "50px",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
  ph: {
    height: "60px",
    overflow: "hidden",
  },
  width: {
    width: "100%",
  },
}));

const Courses = (props) => {
  const classes = useStyles();
  const { course } = props;
  const url = [
    "https://cdn.fs.teachablecdn.com/eNaCbKy3S1iBBLz7aGq4",
    "https://sabrangindia.in/sites/default/files/inline-images/elearning-getty.jpg",
    "https://images.idgesg.net/images/article/2020/07/stack_of_books_one_open_scattering_flying_letters_language_reading_education_dictionary_by_domin_domin_gettyimages-157719194_abstract_binary_by_aleksei_derin_gettyimages-914850254_cso_2400x1600-100853104-large.jpg",
    "https://cdn.fs.teachablecdn.com/eNaCbKy3S1iBBLz7aGq4",
    "https://sabrangindia.in/sites/default/files/inline-images/elearning-getty.jpg",
    "https://images.idgesg.net/images/article/2020/07/stack_of_books_one_open_scattering_flying_letters_language_reading_education_dictionary_by_domin_domin_gettyimages-157719194_abstract_binary_by_aleksei_derin_gettyimages-914850254_cso_2400x1600-100853104-large.jpg",
    "https://cdn.fs.teachablecdn.com/eNaCbKy3S1iBBLz7aGq4",
    "https://sabrangindia.in/sites/default/files/inline-images/elearning-getty.jpg",
    "https://images.idgesg.net/images/article/2020/07/stack_of_books_one_open_scattering_flying_letters_language_reading_education_dictionary_by_domin_domin_gettyimages-157719194_abstract_binary_by_aleksei_derin_gettyimages-914850254_cso_2400x1600-100853104-large.jpg",

  ];
  return (
    <Card elevation={3}>
      <CardActionArea>
        <CardMedia component="img" style={{maxHeight:'150px'}} height="140" image={url[props.index]} />
        <CardContent>
          <Box className={classes.ph}>
            {props.role === "instructor" ? course.name : course.course_name}
          </Box>
          <Typography
            className={classes.Border}
            variant="body2"
            color="textSecondary"
          >
            TEACHED BY :{" "}
            {props.role === "instructor" ? props.name : course.instructor_name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default Courses;
