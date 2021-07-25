const initStates = localStorage.getItem('user')?
{
    authError:'success',
    token: JSON.parse(localStorage.getItem("user")).token,
    code: JSON.parse(localStorage.getItem("user")).code,
    email: JSON.parse(localStorage.getItem("user")).email,
    name: JSON.parse(localStorage.getItem("user")).name,
    role: JSON.parse(localStorage.getItem("user")).role, 
    year: JSON.parse(localStorage.getItem("user")).year,
}
:
{

    
    authError:'',
    token: null,
    name: null,
    email:null,
    role:null,
    code:null,
    year: null,
    loading:false,

}

const authReducer = ( state = initStates,action)=>{
switch (action.type) {
    case 'loading':

        return {
            ...state,
    authError:'',
    loading: action.loading,

        }
    case 'success'||'error':

        return {
            
    authError:'success',
    token: action.data.token,
    name: action.data.user.name,
    email: action.data.user.email,
    role: action.data.user.role,
    code: action.data.user.code,
    year: action.data.user.year,
    loading: action.loading,

        }
        case 'failed':


            return {
                authError:'failed',
                token: null,
                name: null,
                email:null,
                role:null,
                code:null,
                year: null,
                loading: action.loading,

            }
   case 'loggedout':

    localStorage.removeItem("user")

       return {
           
    authError: '',
    token: null,
    name: null,
    email:null,
    role:null,
    code:null,
    year: null,
    loading:false,
   }
    default:
        return state
}

};
export default authReducer;
