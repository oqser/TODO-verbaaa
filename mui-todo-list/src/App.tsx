import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import TodoList from './TodoList';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';

const theme = createTheme({
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    background: 'linear-gradient(to left, rgb(85, 87, 102), rgb(134, 136, 151))',
                    minHeight: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                },
            },
        },
    },
    palette: {
        background: {
            default: 'transparent',
            paper: '#ffffff',
        },
    },
});

const App: React.FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/todos"
                        element={
                            <PrivateRoute>
                                <TodoList />
                            </PrivateRoute>
                        }
                    />
                    <Route path="/" element={<Navigate to="/todos" replace />} />
                </Routes>
            </Router>
        </ThemeProvider>
    );
};

export default App;
