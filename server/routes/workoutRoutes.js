const express = require('express');
const {
    createWorkout,
    getWorkouts,
    updateWorkout,
    deleteWorkout,
} = require('../controllers/workoutController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, createWorkout);
router.get('/', authMiddleware, getWorkouts);
router.put('/:id', authMiddleware, updateWorkout);
router.delete('/:id', authMiddleware, deleteWorkout);

module.exports = router;
