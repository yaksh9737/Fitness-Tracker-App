import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from '../services/api';
import {
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    CircularProgress,
    Box,
    createTheme,
    ThemeProvider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#39FF14', // Neon Green
        },
        secondary: {
            main: '#FF073A', // Neon Red
        },
        background: {
            default: '#121212', // Dark Background
            paper: '#1E1E1E',   // Dark Card Background
        },
        text: {
            primary: '#FFFFFF', // White Text
            secondary: '#B0BEC5', // Light Gray for secondary text
        },
    },
});

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [workouts, setWorkouts] = useState([]);
    const [goals, setGoals] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }

        const fetchData = async () => {
            try {
                const workoutResponse = await axios.get('/workouts');
                const goalResponse = await axios.get('/goals');
                setWorkouts(workoutResponse.data);
                setGoals(goalResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        // eslint-disable-next-line
    }, []);

    if (loading) {
        return (
            <Container>
                <Typography variant="h4" align="center" mt={5}>
                    Loading...
                </Typography>
                <CircularProgress sx={{ display: 'block', margin: 'auto', marginTop: 2 }} />
            </Container>
        );
    }

    return (
        <ThemeProvider theme={theme}>
            <Container>
                <Box mt={5}>
                    <Typography style={{color:'#1c1c1c'}} variant="h4" align="center" gutterBottom>
                        Welcome, {user?.name}
                    </Typography>

                    <Typography style={{color:'#1c1c1c'}} variant="h5" gutterBottom align="center" sx={{ marginTop: 3 }}>
                        Recent Workouts
                    </Typography>
                    <Grid container spacing={3} justifyContent="center">
                        {workouts.length === 0 ? (
                            <Typography style={{color:'#1c1c1c'}} variant="body1" color="textSecondary" align="center" sx={{ marginTop: '20px' }}>
                                No recent workouts found.
                            </Typography>
                        ) : (
                            workouts.map((workout) => (
                                <Grid item xs={12} sm={6} md={4} key={workout._id}>
                                    <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                                        <Card elevation={3} sx={{ borderRadius: 2, backgroundColor: '#1E1E1E' }}>
                                            <CardContent>
                                                <Typography variant="h6" color="primary">
                                                    {workout.activity}
                                                </Typography>
                                                <Typography color="textSecondary">Duration: {workout.duration} mins</Typography>
                                                <Typography color="textSecondary">Calories Burned: {workout.caloriesBurned}</Typography>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                </Grid>
                            ))
                        )}
                    </Grid>

                    <Typography style={{color:'#1c1c1c'}} variant="h5" gutterBottom align="center" mt={5}>
                        Your Goals
                    </Typography>
                    <Grid container spacing={3} justifyContent="center">
                        {goals.length === 0 ? (
                            <Typography variant="body1" color="textSecondary" align="center" sx={{ marginTop: '20px' }}>
                                No goals found.
                            </Typography>
                        ) : (
                            goals.map((goal) => (
                                <Grid item xs={12} sm={6} md={4} key={goal._id}>
                                    <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                                        <Card elevation={3} sx={{ borderRadius: 2, backgroundColor: '#1E1E1E' }}>
                                            <CardContent>
                                                <Typography variant="h6" color="primary">
                                                    Goal: {goal.goalType}
                                                </Typography>
                                                <Typography color="textSecondary">Progress: {goal.progress}</Typography>
                                                <Typography color="textSecondary">Time Frame: {goal.timeFrame}</Typography>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                </Grid>
                            ))
                        )}
                    </Grid>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default Dashboard;
