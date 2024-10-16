const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const workoutRoutes = require('./routes/workoutRoutes');
const goalRoutes = require('./routes/goalRoutes');
const adminRoutes = require('./routes/adminRoutes');
const connectDB = require('./config');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
connectDB()

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/workouts', workoutRoutes);
app.use('/api/goals', goalRoutes);
app.use('/api/admin', adminRoutes);

app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});

app.get("/", (req,res) => {
    return res.status(200).send({message:"successfully"})
})

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})