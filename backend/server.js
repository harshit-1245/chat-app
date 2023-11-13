// server.js
const express = require('express');
const cors=require('cors');
const app=express();
const connectDB=require('./config/db')
const colors=require('colors')
const userRoute=require('./routing/useRoute')
const {notFound,errorHandler}=require('./middleware/errorMiddleware')
app.use(express.json()); // Add this line to parse JSON data

app.use(cors());

connectDB();
const PORT = process.env.PORT || 5000;
app.use('/api/user',userRoute);
app.use(express.urlencoded({ extended: true })); // Add this line to parse URL-encoded data
app.use(notFound)
app.use(errorHandler)




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.yellow.bold);
});
