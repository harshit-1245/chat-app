const mongoose=require('mongoose');
const colors=require('colors');

const connectDB= async()=>{
    try {
        const conn=await mongoose.connect('mongodb://127.0.0.1:27017/chat-app',{
            useNewUrlParser:true,
           
            
        });
        console.log(`MongoDB connected: ${conn.connection.host}`.green.bold)
    } catch (error) {
        console.error(`Error: ${error.message}`.red.bold)
        process.exit();
    }
}
module.exports=connectDB;