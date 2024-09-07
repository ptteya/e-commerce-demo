const User = require('../models/User');
const bcrypt = require('bcrypt');
const authService = require('../services/authService');
const { getErrorMessage } = require('../utils/errorUtil');
const { generateToken } = require('../utils/tokenUtil');

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await authService.getUserByEmail(email);
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = generateToken(user);

        res.json({ token, user: { ...user, token } });
    } catch (error) {
        res.status(500).json({ error: getErrorMessage(error) });
    }
};

exports.register = async (req, res) => {
    try {
        const { email, username, password } = req.body;

        const validationError = await validateRegisterData(req.body);
        if (validationError) {
            return res.status(400).json({ error: validationError });
        }

        const hashedPass = await bcrypt.hash(password, 10);
        const newUser = new User({ email, username, password: hashedPass });
        await newUser.save();
        const token = generateToken(newUser);

        res.json({ token, user: { ...newUser, token } });
    } catch (error) {
        res.status(500).json({ error: getErrorMessage(error) });
    }
}

exports.logout = (req, res) => {
    res.status(204).json({});
}


async function validateRegisterData({ email, username, password, repeatPass }) {
    const existingUser = await authService.checkIfUserExists(email, username);
    if (existingUser) {
        return 'Email or username already exists';
    }

    if (!email || !username || !password) {
        return 'All Fields are required';
    }

    if (username.length < 4) {
        return 'Username should be at least 4 characters long!';
    }

    if (password !== repeatPass) {
        return 'Passwords do not match';
    }

    if (
        password.length < 6 ||
        !/[a-z]/.test(password) ||
        !/[A-Z]/.test(password) ||
        !/[0-9]/.test(password)
    ) {
        return 'Password must be at least 6 characters long, contain at least one number, one lowercase and one uppercase letter.';
    }

    return null;
}

