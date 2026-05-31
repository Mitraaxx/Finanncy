const IncomeSchema = require("../models/IncomeModels")
const { deleteCache, getCache, setCache } = require("../db/redisClient");

exports.addIncome = async(req, res) => {
    const {title, amount, category, description, date} = req.body
    const userId = req.user._id; // Access _id from the user object
    
    // Parse amount to ensure it's a number
    const parsedAmount = parseFloat(amount);

    const income = IncomeSchema({
        title,
        amount: parsedAmount, // Use the parsed amount
        category,
        description,
        date,
        userId // Include the user ID directly in the constructor
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
        
        await income.save();
        await deleteCache(`incomes:${req.user._id}`);
        res.status(200).json({message: 'Income Added'})
    } catch(error) {
        console.error("Add income error:", error);
        res.status(500).json({message: 'Server error'})
    }
}
 
exports.getIncome = async (req, res) => {
    try {
        const userId = req.user._id; 

        const cacheKey = `incomes:${userId}`;
        const cached = await getCache(cacheKey);
        if (cached) {
            return res.status(200).json(JSON.parse(cached));
        }

        const incomes = await IncomeSchema.find({ userId }).sort({ createdAt: -1 })
        await setCache(cacheKey, 300, JSON.stringify(incomes));

        res.status(200).json(incomes)
    } catch (error) {
        console.error("Get income error:", error);
        res.status(500).json({ message: 'Server Error' })
    }
}

exports.deleteIncome = async (req, res) => {
    const {id} = req.params;
    const userId = req.user._id; // Access _id from the user object
    
    try {
        // Check ownership before deletion like we do in deleteExpense
        const income = await IncomeSchema.findOneAndDelete({ _id: id, userId });
        if (!income) {
            return res.status(404).json({ message: 'Income not found or does not belong to the user' });
        }
        await deleteCache(`incomes:${req.user._id}`);
        res.status(200).json({message: 'Income Deleted'})
    } catch(err) {
        console.error("Delete income error:", err);
        res.status(500).json({message: 'Server Error'})
    }
}