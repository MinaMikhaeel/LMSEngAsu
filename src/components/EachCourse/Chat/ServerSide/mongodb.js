const {MongoClient,ObjectID}=require('mongodb')

const connectionURL='mongodb+srv://mai:mai.2207@cluster0.gthna.mongodb.net/quizDatabase?retryWrites=true&w=majority'
const databaseName='task-manager'



MongoClient.connect(connectionURL,{ useNewUrlParser:true },(error, client) =>{
    if(error) {
        return console.log('Unable to connect to database')
    }
    
    const db = client.db(databaseName)
})