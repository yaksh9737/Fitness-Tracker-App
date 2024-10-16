import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, createTheme, ThemeProvider } from '@mui/material';
import axios from '../services/api';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#39FF14', // Neon Green
        },
        background: {
            default: '#121212', // Dark Background
            paper: '#1E1E1E',   // Dark Paper Background
        },
        text: {
            primary: '#FFFFFF', // White Text
            secondary: '#B0BEC5', // Light Gray for secondary text
        },
    },
});

const WorkoutForm = ({ initialData, onSuccess }) => {
    const [activity, setActivity] = useState(initialData?.activity || '');
    const [duration, setDuration] = useState(initialData?.duration || '');
    const [caloriesBurned, setCaloriesBurned] = useState(initialData?.caloriesBurned || '');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const workoutData = { activity, duration, caloriesBurned };
        try {
            if (initialData) {
                await axios.put(`/workouts/${initialData._id}`, workoutData);
            } else {
                await axios.post('/workouts', workoutData);
            }
            onSuccess();
        } catch (error) {
            console.error('Workout submission failed', error);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="sm">
                <Box mt={3} border={1} borderColor="grey.300" borderRadius={2} p={3} bgcolor="#1E1E1E">
                    <Typography variant="h6" align="center" color="primary">
                        {initialData ? 'Edit' : 'Add'} Workout
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Activity"
                            fullWidth
                            margin="normal"
                            value={activity}
                            onChange={(e) => setActivity(e.target.value)}
                            required
                            InputLabelProps={{ style: { color: '#B0BEC5' } }} // Light gray label
                            InputProps={{ style: { color: '#FFFFFF' } }} // White text in input
                            sx={{
                                '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#39FF14', // Neon green border
                                },
                                '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#39FF14', // Neon green border on hover
                                },
                                '& .MuiInputBase-input': {
                                    backgroundColor: '#1E1E1E', // Dark background for input
                                },
                            }}
                        />
                        <TextField
                            label="Duration (minutes)"
                            fullWidth
                            margin="normal"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            required
                            InputLabelProps={{ style: { color: '#B0BEC5' } }} // Light gray label
                            InputProps={{ style: { color: '#FFFFFF' } }} // White text in input
                            sx={{
                                '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#39FF14', // Neon green border
                                },
                                '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#39FF14', // Neon green border on hover
                                },
                                '& .MuiInputBase-input': {
                                    backgroundColor: '#1E1E1E', // Dark background for input
                                },
                            }}
                        />
                        <TextField
                            label="Calories Burned"
                            fullWidth
                            margin="normal"
                            value={caloriesBurned}
                            onChange={(e) => setCaloriesBurned(e.target.value)}
                            required
                            InputLabelProps={{ style: { color: '#B0BEC5' } }} // Light gray label
                            InputProps={{ style: { color: '#FFFFFF' } }} // White text in input
                            sx={{
                                '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#39FF14', // Neon green border
                                },
                                '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#39FF14', // Neon green border on hover
                                },
                                '& .MuiInputBase-input': {
                                    backgroundColor: '#1E1E1E', // Dark background for input
                                },
                            }}
                        />
                        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                            {initialData ? 'Update' : 'Add'} Workout
                        </Button>
                    </form>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default WorkoutForm;
