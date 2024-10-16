const express = require('express');
const {
    createGoal,
    getGoals,
    updateGoal,
    deleteGoal,
} = require('../controllers/goalController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, createGoal);
router.get('/', authMiddleware, getGoals);
router.put('/:id', authMiddleware, updateGoal);
router.delete('/:id', authMiddleware, deleteGoal);

module.exports = router;
