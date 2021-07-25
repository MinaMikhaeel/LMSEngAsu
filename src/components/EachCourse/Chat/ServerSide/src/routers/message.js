const express =require('express')
const router = new express.Router()

router.get('/auth',async(req,res)=>{

    try{

        

        const course = await Course.findOne({code : req.params.course_code}   )

        if(!course){

            return res.status(404).send('can not find the course')

        }

        if(course.instructor_id != req.user._id.toString()){

            return res.status(403).send('unauthorized')

        }

        res.send('authorized')



    }catch(e){

        res.send('server error')

    }

})
