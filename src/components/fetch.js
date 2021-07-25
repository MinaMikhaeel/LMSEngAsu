import { useEffect,useState } from "react";
import {fetchAction} from "../store/action/fetchAction";
import { connect } from "react-redux";
const useFetch=(url, token,props)=>{


    
    useEffect(()=>{

        const abort= new AbortController();
        fetch(url, {
            signal:abort.signal,
            method:'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization" : `Bearer ${token}`
            }})
        .then( res =>{
            if(res.status==404)
            {
                throw Error('404')
            }
           
            return res.json();
        } 
           )
        .then ( data =>{
              props.fetchAction('done',data)
           })
        .catch(error=>{
            if(error.name==='AbortError'){
console.log('aborted');
            }
            else{
                props.fetchAction('error')

            }
         
        })
        return()=>abort.abort();
  

        },[url]
    )
     
}

 
 
 // const mapStateToProps = (state) => {

//   return {
//     datal: state.list.list[0],
//     error: state.error,
//     pending:  state.pending,
    
//   };
// };
const mapDispatchToProps = (dispatch) => {
  return {
     fetchAction: (status,data) => dispatch(fetchAction(status,data)),
  };
 };
 
export default connect(null, mapDispatchToProps)(useFetch);
