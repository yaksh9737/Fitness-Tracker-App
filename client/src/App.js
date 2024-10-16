import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';
import WorkoutsPage from './pages/WorkoutsPage';
import GoalsPage from './pages/GoalsPage';
import AdminPage from './pages/AdminPage';
import { motion } from 'framer-motion'
import Dashboard from './components/Dashboard';
import './App.css'

const App = () => {
    return (
        <AuthProvider>
            <Router>
                < >
                <Navbar />
                <Routes>
                    <Route path="/login" element={<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><LoginPage /></motion.div>} />
                    <Route path="/signup" element={<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><SignupPage /></motion.div>} />
                    <Route path="/profile" element={<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><ProfilePage /></motion.div>} />
                    <Route path="/" element={<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><Dashboard /></motion.div>} />
                    <Route path="/workouts" element={<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><WorkoutsPage /></motion.div>} />
                    <Route path="/goals" element={<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><GoalsPage /></motion.div>} />
                    <Route path="/admin" element={<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><AdminPage /></motion.div>} />
                </Routes>
                </>
            </Router>
        </AuthProvider>
    );
};

export default App;
