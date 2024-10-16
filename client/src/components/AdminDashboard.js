import React, { useEffect, useState } from 'react';
import axios from '../services/api';
import {
    CircularProgress,
} from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const AdminDashboard = () => {
    const [userStatistics, setUserStatistics] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/admin/statistics');
                setUserStatistics(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="container mx-auto mt-10 px-4">
            <h1 className="text-3xl font-bold text-center mb-8">Admin Dashboard</h1>

            {loading ? (
                <div className="flex justify-center mt-10">
                    <CircularProgress />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {userStatistics.map(({ user, goals, workouts }) => (
                        <div key={user._id} className="bg-white rounded-lg shadow-lg p-4 transition-transform transform hover:scale-105">
                            <div className="flex items-center mb-4">
                                <div className="bg-blue-500 text-white rounded-full p-3">
                                    <AccountCircleIcon fontSize="large" />
                                </div>
                                <div className="ml-4">
                                    <h2 className="text-xl font-semibold">{user.name}</h2>
                                    <p className="text-gray-600">{user.email}</p>
                                </div>
                            </div>

                            <div className="border-b mb-4"></div>

                            <div className="flex items-center mb-2">
                                <EmojiEventsIcon className="text-blue-500" />
                                <h3 className="ml-2 font-semibold">Goals</h3>
                            </div>
                            <div className="bg-gray-100 p-2 rounded mb-4">
                                {goals.length > 0 ? (
                                    goals.map((goal) => (
                                        <p key={goal._id} className="text-gray-700">
                                            {goal.goalType} - Target: {goal.targetValue} - Progress: {goal.progress}
                                        </p>
                                    ))
                                ) : (
                                    <p className="text-gray-500">No goals available</p>
                                )}
                            </div>

                            <div className="border-b mb-4"></div>

                            <div className="flex items-center mb-2">
                                <FitnessCenterIcon className="text-green-500" />
                                <h3 className="ml-2 font-semibold">Workouts</h3>
                            </div>
                            <div className="bg-gray-100 p-2 rounded mb-4">
                                {workouts.length > 0 ? (
                                    workouts.map((workout) => (
                                        <p key={workout._id} className="text-gray-700">
                                            {workout.activity} - Duration: {workout.duration} min
                                        </p>
                                    ))
                                ) : (
                                    <p className="text-gray-500">No workouts available</p>
                                )}
                            </div>

                            <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
                                View Details
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
