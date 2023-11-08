const mongoose = require('mongoose') // Import the mongoose library for MongoDB interaction.

const chatModel = mongoose.Schema({ // Define a Mongoose schema for the "Chat" model.
    chatName: {
        type: String,
        trim: true // Define a field "chatName" with a String type and trim whitespace.
    },
    isGroupChat: { type: Boolean, default: false }, // Define a field "isGroupChat" with a Boolean type and a default value of false.
    users: [
        { // Define a field "users" as an array of objects with references to the "User" model.
            type: mongoose.Schema.Types.ObjectId, // Each element in the array is an Object ID.
            ref: "User" // This refers to the "User" model.
        }
    ],
    latestMessage: {
        type: mongoose.Schema.Types.ObjectId, // Define a field "latestMessage" as an Object ID reference to the "Message" model.
        ref: "Message" // This refers to the "Message" model.
    },
    groupAdmin: {
        type: mongoose.Schema.Types.ObjectId, // Define a field "groupAdmin" as an Object ID reference to the "User" model.
        ref: 'User' // This refers to the "User" model.
    },
}, {
    timestamps: true, // Automatically add "createdAt" and "updatedAt" fields to the document.
})

const Chat = mongoose.model('Chat', chatModel) // Create a Mongoose model called "Chat" using the schema.

module.exports = Chat; // Export the "Chat" model for use in other parts of your application.
