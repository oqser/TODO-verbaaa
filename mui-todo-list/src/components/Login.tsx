import React, { useState, KeyboardEvent  } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography } from '@mui/material';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        if (username === 'admin' && password === 'admin') {
            localStorage.setItem('isLoggedIn', 'true');
            navigate('/todos');
        } else {
            setError('Неправильный логин или пароль');
        }
    };

    const handleKeyPress = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter') {
            handleLogin();
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                gap: 2,
            }}
            onKeyPress={handleKeyPress}
        >
            <Typography variant="h4" component="h1" sx={{ color: 'white' }}>
                Авторизация
            </Typography>
            <TextField
                label="Логин"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                sx={{ input: { color: 'white' }, label: { color: 'white' } }}
            />
            <TextField
                label="Пароль"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ input: { color: 'white' }, label: { color: 'white' } }}
            />
            <Button variant="contained" onClick={handleLogin}>
                Войти
            </Button>
            {error && <Typography color="error">{error}</Typography>}
        </Box>
    );
};

export default Login;
