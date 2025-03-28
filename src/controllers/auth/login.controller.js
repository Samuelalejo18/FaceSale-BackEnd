const jwt = require('jsonwebtoken');
const bcrypt = require('bycryptjs');
const User = require('../../models/user');


exports.login = async (req, res) => {

    try {

        const {email, password} = req.body;

        // The first step is to check if the user exists
        const user = await User.findOne({ email });

        // If the user doesn´t exist return an error status
        if (!user) {

            return res.status(404).json({ message: "User not found"});

        }

        // If the user exists

        // Verify the password (Compared the stored password with the password enteredby the user) this is a bool value
        const passwordValid = await bcrypt.compare(password, user.password);

        if (!passwordValid) {

            return res.status(401).json({ message: "Invalid password"});

        }

        // If the password is valid

        // Generate the JWT Token
        const token = jwt.sign(

            { id: user._id , email: user.email },

            process.env.JWT_SECRET,

            // JWT Valid Time
            { expiresIn: '1h' }

        );

        // Return the token and the user object
        res.json({ token,  user: {

            id : user._id, email: user.email, name: user.name

        }});


    } catch (error) {

        res.status(500).json({ message: "Server error" });

    };
};

// Made by Julian :))))))))))))))))))))))))))))))))))))))))))))))))))