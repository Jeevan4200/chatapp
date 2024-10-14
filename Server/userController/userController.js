const User = require("../Models/userModel");
const bcrypt = require('bcrypt');

const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // Check if username already exists
        const usernamecheck = await User.findOne({ name });
        if (usernamecheck) {
            return res.status(409).json({ msg: "User already existed", status: false });
        }

        // Check if email already exists
        const emailcheck = await User.findOne({ email });
        if (emailcheck) {
            return res.status(409).json({ msg: "Email already existed", status: false });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const user = await User.create({
            email,
            name,
            password: hashedPassword,
        });

        // Exclude password from response
        delete user.password;

        return res.status(201).json({ status: true, user });
    } catch (error) {
        console.error("Error during registration:", error);
        next(error);
    }
};
const login = async (req, res, next) => {
    try {
        const { name,  password } = req.body;

        // Check if username already exists
        const usernamecheck = await User.findOne({ name });
        if (!usernamecheck) {
            return res.status(409).json({ msg: "User doesnt  exist", status: false });
        }

        // Check if email already exists
        const ispasswordValid = await bcrypt.compare(password,usernamecheck.password);
                  if(!ispasswordValid){
                    return res.json({msg:"Incorrect username or password",status:false});
                    delete usernamecheck.password;
                  }

        return res.status(201).json({ status: true, usernamecheck });
    } catch (error) {
        console.error("Error during registration:", error);
        next(error);
    }
};

module.exports = {
    register,
    login,
};
