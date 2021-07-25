import { makeStyles } from '@material-ui/core/styles';
const usestyles=makeStyles({
    dom: {
        height:'100vh',
        width: '100%',
        border:'none'
    }
})
const View = (props) => {
    console.log(props)
    const classes=usestyles()
    return ( 
        <div>
            {console.log('heeeeeey')}
        <iframe className={classes.dom} src={`${props.file}`} name={`${props.title.lesson_name}`}></iframe>
        {document.title='in here'}
        </div>
    

     );
}
 
export default View;