const Goal = require('../models/Goal');

exports.createGoal = async (req, res) => {
    const { goalType, targetValue, timeFrame } = req.body;
    try {
        const goal = new Goal({
            user: req.user.id,
            goalType,
            targetValue,
            timeFrame,
        });
        await goal.save();
        res.status(201).json(goal);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getGoals = async (req, res) => {
    try {
        const goals = await Goal.find({ user: req.user.id });
        res.json(goals);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.updateGoal = async (req, res) => {
    try {
        const goal = await Goal.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.json(goal);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.deleteGoal = async (req, res) => {
    try {
        await Goal.findByIdAndDelete(req.params.id);
        res.json({ message: 'Goal deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
