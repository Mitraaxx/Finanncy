const { addExpense, getExpense, deleteExpense } = require('../controllers/expense');
const { addIncome, getIncome, deleteIncome} = require('../controllers/income');
const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

const router = require('express').Router()

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d', // Token expires in 30 days
    });
};

router.post('/add-income', auth, addIncome)
 .get('/get-income', auth, getIncome)
 .delete('/delete-income/:id', auth, deleteIncome)
 .post('/add-expense', auth, addExpense)
 .get('/get-expense', auth, getExpense)
 .delete('/delete-expense/:id', auth, deleteExpense);


// User registration
router.post('/register', async (req, res) => {
    console.log(req.body); // Log incoming request body
    try {
        const { username, email, password } = req.body;
        
        // Check if username is already taken
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ message: "Username already exists" });
        }
        
        // Check if email is already taken (only if email is provided)
        if (email) {
            const existingEmail = await User.findOne({ email });
            if (existingEmail) {
                return res.status(400).json({ message: "Email already exists" });
            }
        }
        
        // Create new user
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const userData = {
            username,
            password: hashedPassword
        };
        
        // Only add email if it's provided
        if (email && email.trim() !== '') {
            userData.email = email;
        }
        
        const user = new User(userData);
        await user.save();
        
        // Generate token and return it
        res.status(201).json({ 
            token: generateToken(user._id),
            message: "Registration successful" 
        });
    } catch (error) {
        console.error("Registration error:", error); // Log the error
        res.status(400).json({ message: error.message });
    }
});

// User login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        
        if (!user) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }
        
        res.json({ 
            token: generateToken(user._id),
            message: "Login successful" 
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router