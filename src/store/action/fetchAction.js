export const fetchAction = (status, data) => {
  return (dispatch) => {
    if (status === "done") {
      dispatch({
        type: "fetch done",
        data: data,
      });
    } else if (status === "error") {
      dispatch({
        type: "empty list",
        data: [],
      });
    } else if (status === "instructor done") {
      dispatch({
        type: "instructor fetch done",
        data: data,
      });
    } else if (status === "instructor error") {
      dispatch({
        type: " instructor empty list",
        data: [],
      });
    } else if (status === "Admin done") {
      dispatch({
        type: "admin fetch done",
        data: data,
      });
    } else if (status === "Admin error") {
      dispatch({
        type: "admin empty list",
        data: [],
      });
    } else if (status === "courses done") {
      dispatch({
        type: "courses fetch done",
        data: data,
      });
    } else if (status === "courses error") {
      dispatch({
        type: "courses empty list",
        data: [],
      });
    } else if (status === "instructor list courses done") {
      dispatch({
        type: "instructor list courses done fetch done",
        data: data,
      });
    } else if (status === "instructor list courses error") {
      dispatch({
        type: "instructor list courses empty list",
        data: [],
      });
    } else if (status === "course retrive done") {
      dispatch({
        type: "course retrive fetch done",
        data: data,
      });
    } else if (status === "course retrive error") {
      dispatch({
        type: "course retrive empty list",
        data: [],
      });
    } else if (status === "course students done") {
      dispatch({
        type: "course students fetch done",
        data: data,
      });
    } else if (status === "course students error") {
      dispatch({
        type: "course students empty list",
        data: [],
      });
    } else if (status === "lessons done") {
      dispatch({
        type: "lessons fetch done",
        data: data,
      });
    } else if (status === "lessons error") {
      dispatch({
        type: "lessons empty list",
        data: [],
      });
    } else if (status === "Ass done") {
      dispatch({
        type: "Ass fetch done",
        data: data,
      });
    } else if (status === "Ass error") {
      dispatch({
        type: "Ass empty list",
        data: [],
      });
    } else if (status === "student list courses done") {
      dispatch({
        type: "student list courses done fetch done",
        data: data,
      });
    } else if (status === "student list courses error") {
      dispatch({
        type: "student list courses empty list",
        data: [],
      });
    } else if (status === "quizzes done") {
      dispatch({
        type: "quizzes fetch done",
        data: data,
      });
    } else if (status === "quizzes error") {
      dispatch({
        type: "quizzes empty list",
        data: [],
      });
    } else if (status === "one quiz done") {
      dispatch({
        type: "one quiz fetch done",
        data: data,
      });
    } else if (status === "one quiz error") {
      dispatch({
        type: "one quiz empty list",
        data: [],
      });
    } else if (status === "Des Ass done") {

      dispatch({

        type: "Des Ass fetch done",

        data: data,

      });

    } else if (status === "Des Ass error") {

      dispatch({

        type: "Des Ass empty list",

        data: [],

      });
    }
  };
};

