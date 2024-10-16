import React, { useState, useEffect } from 'react';
import axios from '../services/api';
import { Container, List, ListItem, ListItemText, Typography, Box, Button, Paper, createTheme, ThemeProvider } from '@mui/material';
import GoalForm from '../components/GoalForm';

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
            paper: '#1E1E1E', // Dark Paper Background
        },
        text: {
            primary: '#FFFFFF', // White Text
            secondary: '#B0BEC5', // Light Gray for secondary text
        },
    },
});

const GoalsPage = () => {
    const [goals, setGoals] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [currentGoal, setCurrentGoal] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('/goals');
            setGoals(response.data);
        };
        fetchData();
    }, []);

    const handleAddGoal = () => {
        setCurrentGoal(null);
        setShowForm(true);
    };

    const handleEditGoal = (goal) => {
        setCurrentGoal(goal);
        setShowForm(true);
    };

    const handleDeleteGoal = async (id) => {
        try {
            await axios.delete(`/goals/${id}`);
            const response = await axios.get('/goals');
            setGoals(response.data);
        } catch (error) {
            console.error('Error deleting goal', error);
        }
    };

    const handleFormSuccess = async () => {
        setShowForm(false);
        const response = await axios.get('/goals');
        setGoals(response.data);
    };

    return (
        <ThemeProvider theme={theme}>
            <Container>
                <Box mt={5}>
                    <Typography variant="h4" align="center" color="primary">Your Goals</Typography>
                    <Button variant="contained" color="primary" onClick={handleAddGoal} sx={{ marginBottom: '16px' }}>
                        Add Goal
                    </Button>
                    {showForm && (
                        <GoalForm initialData={currentGoal} onSuccess={handleFormSuccess} />
                    )}
                    <Paper elevation={3} style={{ padding: '16px', marginTop: '16px', backgroundColor: theme.palette.background.paper }}>
                        <List>
                            {
                                goals.length === 0 ? (
                                    <Typography variant="body1" color="textSecondary" align="center" sx={{ marginTop: "20px" }}>No recent goals found.</Typography>
                                ) : (
                                    goals.map((goal) => (
                                        <ListItem key={goal._id}>
                                            <ListItemText
                                                primary={`Goal Type: ${goal.goalType}`}
                                                secondary={`Target Value: ${goal.targetValue}, Time Frame: ${goal.timeFrame}`}
                                            />
                                            <Box>
                                                <Button variant="outlined" color="primary" onClick={() => handleEditGoal(goal)} style={{ marginRight: '8px' }}>
                                                    Edit
                                                </Button>
                                                <Button variant="outlined" color="secondary" onClick={() => handleDeleteGoal(goal._id)}>
                                                    Delete
                                                </Button>
                                            </Box>
                                        </ListItem>
                                    ))
                                )}
                        </List>
                    </Paper>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default GoalsPage;
