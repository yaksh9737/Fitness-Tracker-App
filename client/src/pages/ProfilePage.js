import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Container, Typography, Box } from '@mui/material';

const ProfilePage = () => {
    const { user } = useContext(AuthContext);

    return (
        <Container>
            <Box mt={5}>
                <Typography variant="h4">Profile</Typography>
                <Typography>Name: {user.name}</Typography>
                <Typography>Email: {user.email}</Typography>
                <Typography>Role: {user.role}</Typography>
            </Box>
        </Container>
    );
};

export default ProfilePage;
