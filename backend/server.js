// server.js
const express = require('express');
const app=express();
const connectDB=require('./config/db')
const colors=require('colors')
const userRoute=require('./routing/useRoute')
const {notFound,errorHandler}=require('./middleware/errorMiddleware')
app.use(express.json()); // Add this line to parse JSON data


connectDB();
const PORT = process.env.PORT || 5000;
app.use('/api/user',userRoute);
app.use(express.urlencoded({ extended: true })); // Add this line to parse URL-encoded data
app.use(notFound)
app.use(errorHandler)

app.get('/',(req,res)=>{
  res.send('Api is running')
})


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.yellow.bold);
});
