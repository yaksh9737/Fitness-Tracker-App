const User = require('../models/User');
const Workout = require('../models/Workout');
const Goal = require('../models/Goal');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getStatistics = async (req, res) => {
    try {
        const users = await User.find({ role: 'user' })
        console.log(users)
        
        const userStatistics = await Promise.all(users.map(async (user) => {
            const goals = await Goal.find({ user: user._id });
            const workouts = await Workout.find({ user: user._id });
            return {
                user,
                goals,
                workouts,
            };
        }));

        res.json(userStatistics);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};