const mongoose = require('mongoose')
//mongodb+srv://LMSProject:a12b34c.@cluster0.73ugb.mongodb.net/LMSDataBase?retryWrites=true&w=majority
mongoose.connect('mongodb://127.0.0.1:27017/Chat',{
    useNewUrlParser : true , 
    useCreateIndex : true,
    useFindAndModify:false
})