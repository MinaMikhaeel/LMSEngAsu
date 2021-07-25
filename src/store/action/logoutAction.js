
export const signout=(status) =>{


return (dispatch) => {

   
      
            if(status==='done')
            {
            dispatch({
                type: 'loggedout',

            })
          }
          else if (status==='error')   {    
             dispatch({
                type: 'error',

             }) 
          }
    
    }
}