const ExpenseSchema = require("../models/ExpenseModels")
const redisClient = require("../App");

exports.addExpense = async(req, res) => {
    const { title, amount, category, description, date } = req.body
    const userId = req.user._id; // Access _id from the user object
    
    // Parse amount to ensure it's a number
    const parsedAmount = parseFloat(amount);

    const expense = ExpenseSchema({
        title,
        amount: parsedAmount, // Use the parsed amount
        category,
        description,
        date,
        userId // Include the user ID
    })

    try {
        // Validation
        if(!title || !category || !description || !date) {
            return res.status(400).json({message: 'All fields are required!'})
        }
        
        // Check if amount is a valid number
        if(isNaN(parsedAmount) || parsedAmount <= 0) {
            return res.status(400).json({message: 'Amount must be a positive number!'})
        }
        
        await expense.save()
        await redisClient.del(`expense:${userId}`);
        res.status(200).json({message: 'Expense Added'})
    } catch(error) {
        console.error("Add expense error:", error);
        res.status(500).json({message: 'Server error'})
    }
}
 
exports.getExpense = async(req, res) => {
    try {
        const userId = req.user._id; // Access _id from the user object

        const cacheKey = `expense:${userId}`
        const cached = await redisClient.get(cacheKey)
        if(cached){
            return res.status(200).json(JSON.parse(cached))
        }

        const expenses = await ExpenseSchema.find({ userId }).sort({ createdAt: -1 }) // Filter by user ID
        await redisClient.setEx(cacheKey, 300, JSON.stringify(expenses));

        res.status(200).json(expenses)
    } catch(error) {
        console.error("Get expense error:", error);
        res.status(500).json({message: 'Server Error'})
    }
}

exports.deleteExpense = async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id; // Access _id from the user object

    try {
        const expense = await ExpenseSchema.findOneAndDelete({ _id: id, userId });
        
        if (!expense) {
            return res.status(404).json({ message: 'Expense not found or does not belong to the user' });
        }
        
        await redisClient.del(`expense:${userId}`);
        res.status(200).json({message: 'Expense Deleted'})
    } catch(err) {
        console.error("Delete expense error:", err);
        res.status(500).json({message: 'Server Error'})
    }
}