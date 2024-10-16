const express = require('express');
const {
    getAllUsers,
    deleteUser,
    getStatistics,
} = require('../controllers/adminController');
const { authMiddleware, adminMiddleware } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/users', authMiddleware, adminMiddleware, getAllUsers);
router.delete('/users/:id', authMiddleware, adminMiddleware, deleteUser);
router.get('/statistics', authMiddleware, adminMiddleware, getStatistics);

module.exports = router;
