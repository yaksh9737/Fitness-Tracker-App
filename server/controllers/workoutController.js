const Workout = require('../models/Workout');

exports.createWorkout = async (req, res) => {
    const { activity, duration, caloriesBurned } = req.body;
    try {
        const workout = new Workout({
            user: req.user.id,
            activity,
            duration,
            caloriesBurned,
        });
        await workout.save();
        res.status(201).json(workout);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getWorkouts = async (req, res) => {
    try {
        const workouts = await Workout.find({ user: req.user.id });
        res.json(workouts);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.updateWorkout = async (req, res) => {
    try {
        const workout = await Workout.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.json(workout);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.deleteWorkout = async (req, res) => {
    try {
        await Workout.findByIdAndDelete(req.params.id);
        res.json({ message: 'Workout deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
