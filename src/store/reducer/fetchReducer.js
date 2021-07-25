const initStates = {
  list: [],
  instlist: [],
  adminlist: [],
  lessonTitles: [],
  AssTitle:[],
  DesAssTitle:[],
  quizzes: [],
  oneQuiz: [],
  courseslist: [],
  instcourses: [],
  studentCourseslist: [],
  course: [],
  studentCourse: [],
  error: false,
  pending: true,
};

const fetchReducer = (state = initStates, action) => {
  switch (action.type) {
    case "fetch done":
      return {
        ...state,
        error: false,
        pending: false,
        list: [action.data],
      };
    case "empty list":
      return {
        ...state,
        list: [],
        error: true,
        pending: false,
      };
    case "instructor fetch done":
      return {
        ...state,
        error: false,
        pending: false,
        instlist: [action.data],
      };
    case " instructor empty list":
      return {
        ...state,
        instlist: [],
        error: true,
        pending: false,
      };
    case "admin fetch done":
      return {
        ...state,
        adminlist: [action.data],
        error: false,
        pending: false,
      };
    case "admin empty list":
      return {
        ...state,
        adminlist: [],
        error: true,
        pending: false,
      };
    case "courses fetch done":
      return {
        ...state,
        courseslist: [action.data],
        error: false,
        pending: false,
      };
    case "courses empty list":
      return {
        ...state,
        courseslist: [],
        error: true,
        pending: false,
      };
    case "instructor list courses done fetch done":
      return {
        ...state,
        instcourses: [action.data],
        error: false,
        pending: false,
      };
    case "instructor list courses empty list":
      return {
        ...state,
        instcourses: [],
        error: true,
        pending: false,
      };
    case "course retrive fetch done":
      return {
        ...state,
        course: [action.data],
        error: false,
        pending: false,
      };
    case "course retrive empty list":
      return {
        ...state,
        course: [],
        error: true,
        pending: false,
      };
    case "course students fetch done":
      return {
        ...state,
        studentCourse: [action.data],
        error: false,
        pending: false,
      };
    case "course students empty list":
      return {
        ...state,
        studentCourse: [],
        error: true,
        pending: false,
      };
    case "lessons fetch done":
      return {
        ...state,
        lessonTitles: [action.data],
        error: false,
        pending: false,
      };
    case "lessons empty list":
      return {
        ...state,
        lessonTitles: [],
        error: true,
        pending: false,
      };
    case "Ass fetch done":
        return {
          ...state,
          AssTitle: [action.data],
          error: false,
          pending: false,
        };
    case "Ass empty list":
        return {
          ...state,
          AssTitle: [],
          error: true,
          pending: false,
        };
    case "student list courses done fetch done":
        return {
          ...state,
          studentCourseslist: [action.data],
          error: false,
          pending: false,
        };
    case "student list courses empty list":
        return {
          ...state,
          studentCourseslist: [],
          error: true,
          pending: false,
        };
    case "quizzes fetch done":
          return {
            ...state,
            quizzes: [action.data],
            error: false,
            pending: false,
          };
    case "quizzes empty list":
          return {
            ...state,
            quizzes: [],
            error: true,
            pending: false,
          };
    case "one quiz fetch done":
            return {
              ...state,
              oneQuiz: [action.data],
              error: false,
              pending: false,
            };
    case "one quiz empty list":
            return {
              ...state,
              oneQuiz: [],
              error: true,
              pending: false,
            };
    case "Des Ass fetch done":
              return {
                ...state,
                DesAssTitle: [action.data],
                error: false,
                pending: false,
              };
    case "Des Ass empty list":
    
              return {
                ...state,
                DesAssTitle: [],    
                error: true,   
                pending: false,
    
              };
    default:
      return state;
  }
};
export default fetchReducer;
