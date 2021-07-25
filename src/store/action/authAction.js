
export const signin= (email,password) =>{


  // // //https://eng-asu-lms.herokuapp.com/
    return async(dispatch) => {
      dispatch({type:'loading',loading:true})
      try{
        const res= await  fetch("https://eng-asu-lms.herokuapp.com/users/login", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({email,password}),
          })
          const result = await res.json()
          if(res.status===200){
            dispatch({
              type: 'success',
              authError:null,
              data:result,
              loading:false
          })
          }
          else if(res.status===400){
            dispatch({
              type: 'failed',
              data:'',
              loading:false
           }) 
          }
         } 
         catch(error){
           console.log(error)
         }
            
            
    
    }
}