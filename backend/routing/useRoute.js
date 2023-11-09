const express = require('express');
const User = require('../models/userModel');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Define your secret key
const secretKey = 'your-secret-key'; // Replace with your actual secret key

router.post('/register', async (req, res) => {
    // Extract data from the request body
    const { name, email, password, pic } = req.body;

    // Check if the required fields are provided
    if (!name || !email || !password) {
        // If any of the required fields is missing, respond with a 400 Bad Request status and a message
        res.status(400).json({ message: "Fill the required Area" });
    }

    // Check if a user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        // If a user with the same email exists, respond with a 400 Bad Request status and a message
        res.status(400).json({ message: "User already exists" });
    }

    // Hash the provided password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the hashed password
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        pic,
    });

    if (user) {
        // Generate a JWT token for the newly created user
        const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });

        // Respond with a 201 Created status and user data including the token
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token,
        });
    } else {
        // If user creation fails, respond with a 500 Internal Server Error status and a message
        res.status(500).json({ message: 'Failed to create the User' });
    }
});
router.get('/', async (req, res) => {
    try {
      const user = await User.find();
      res.send(user);
    } catch (error) {
      res.status(400).json({ message: "Bad request" });
    }
  });
  

router.post('/login', async (req, res) => {
    // Extract email and password from the request body
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
        // If either email or password is missing, respond with a 400 Bad Request status and a message
        res.status(400).json("Email and Password Required");
    }

    // Find the user with the provided email
    const user = await User.findOne({ email });

    if (!user) {
        // If no user is found with the provided email, respond with a 400 Bad Request status and a message
        res.status(400).json({ message: "User not found" });
    }

    // Compare the provided password with the stored hashed password using bcrypt
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        // If the passwords don't match, respond with a 401 Unauthorized status and a message
        return res.status(401).json({ message: 'Incorrect password' });
    }

    // Generate a JWT token for the authenticated user
    const token = jwt.sign({ email: user.email }, secretKey, { expiresIn: '1h' });

    // Respond with a 200 OK status and the token
    res.status(200).json({ message: 'Login successful', token });
});

module.exports = router;
