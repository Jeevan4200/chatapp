const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20,
        unique: true, // Unique name for the user
    },
    email: {
        type: String,
        required: true,
        maxlength: 50,
        unique: true, // Unique email for the user
    },
    password: { // Corrected to be a direct string
        type: String, // Direct string for the password
        required: true,
        minlength: 8,
    },
    isAvatarImageSet: {
        type: Boolean,
        default: false,
    },
    avatarImage: {
        type: String,
        default: "",
    },
});

module.exports = mongoose.model("User", userSchema); // Ensure consistent naming
