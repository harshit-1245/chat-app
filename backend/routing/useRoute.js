const express = require('express');
const User = require('../models/userModel');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Define your secret key
const secretKey = 'your-secret-key'; // Replace with your actual secret key


router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({message:"User Access"}); // Sending the user data as JSON
    } catch (error) {
        res.status(404).json({ message: "Bad Request" });
    }
});



router.post('/register', async (req, res) => {
    const { name, email, password, pic } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(404).json({ message: "Email is already Registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });

    try {
        await newUser.save();
        const token = jwt.sign({ email: newUser.email }, secretKey, { expiresIn: '1h' });
        res.status(201).json({ message: "Registration Successfully", token });
    } catch (error) {
        res.status(500).json({ message: 'Registration failed' });
    }
});
router.post('/login',async(req,res)=>{
    const {email,password}=req.body;
    if(!email && !password){
        return res.status(400).json({message:"Email and Password are required"});
    }
    const user=await User.findOne({email});
    if(!user){
        return res.status(404).json({ message: 'User not found' });
    }
    const passwordMatch=await bcrypt.compare(password,user.password);
    if(!passwordMatch){
        return res.status(401).json({ message: 'Incorrect password' });
       }
       const token=jwt.sign({email:user.email},secretKey,{expiresIn: '1h'})
   res.status(200).json({ message: 'Login successful', token });
})




module.exports = router;
