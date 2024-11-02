import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './store/store';

import {
    Box,
    Tabs,
    Tab,
    TextField,
    Button,
    List,
    ListItem,
    ListItemText,
    IconButton,
    Container, Typography, Badge
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import { addTodo, deleteTodo, restoreTodo, toggleComplete, deleteAllTasks  } from "./store/todoSlice";
import AddIcon from '@mui/icons-material/Add';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router-dom";


const TodoList: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        navigate('/login');
    };

    const [newTodo, setNewTodo] = useState('');
    const [tabValue, setTabValue] = useState(0);
    const todos = useSelector((state: RootState) => state.todos.todos);
    const dispatch = useDispatch();
    const counters = useSelector((state: RootState) => state.todos.counters);

    const handleAddTodo = () => {
        if (newTodo.trim()) {
            dispatch(addTodo(newTodo.trim()));
            setNewTodo('');
        }
    };
    const handleDeleteAllTasks = () => {
        dispatch(deleteAllTasks());
    };

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const filteredTodos = todos.filter(todo => {
        switch (tabValue) {
            case 0:
                return !todo.completed && !todo.deleted;
            case 1:
                return !todo.deleted;
            case 2:
                return todo.completed && !todo.deleted;
            case 3:
                return todo.deleted;
            default:
                return true;
        }
    });

    return (
        <Container sx={{
            display:'flex',
            flexDirection: 'column',
            gap: 2,
            justifyContent:'center',
            alignItems: 'center',
            width: '50em',
        }}>
            <Typography variant="h4" component="h1">
                To-do list
            </Typography>
            <Box sx={{
                display:'flex',
                flexDirection: 'row',
                justifyContent:'space-between',
                gap: 5,
                background: 'rgb(136, 130, 140)',
                borderRadius: 6,
                padding: 3,
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                alignItems: 'end',
                width:'100%'
            }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddTodo}
                    sx={{ borderRadius: 2, height: '100%' }}
                    startIcon={<AddIcon />}
                >
                    Добавить
                </Button>
                <TextField
                    variant="standard"
                    placeholder="Введите задачу ..."
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    sx={{ borderRadius: '8px', border: 'none',  input: { color: 'white' },
                        '& .MuiInput-underline:before': { borderBottomColor: 'white' },
                        '& .MuiInput-underline:hover:not(.Mui-disabled):before': { borderBottomColor: 'white' },
                    }}
                />
                <Button
                    variant="contained"
                    color="error"
                    onClick={handleDeleteAllTasks}
                    sx={{ borderRadius: 2, height: '100%' }}
                    endIcon={<ClearAllIcon />}
                >
                    Очистить
                </Button>
            </Box>

        <Box sx={{
                display:'flex',
                flexDirection: 'column',
                background: 'rgb(136, 130, 140)',
                borderRadius: 6,
                px: 4,
                py: 2,
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                width:'100%',
                gap: 3,
        }}>
            <Tabs value={tabValue} onChange={handleTabChange} centered
                sx={{
                '& .MuiTab-root': { color: 'white' },
                '& .MuiTabs-indicator': { backgroundColor: 'primary' },
            }}>
                <Tab label={
                    <Badge badgeContent={counters.current} color="primary" sx={{pr:1}}>
                        Текущие дела
                    </Badge>
                } />
                <Tab label={
                    <Badge badgeContent={counters.all} color="secondary" sx={{pr:1}}>
                        Все дела
                    </Badge>
                } />
                <Tab label={
                    <Badge badgeContent={counters.completed} color="success" sx={{pr:1}}>
                        Выполненные дела
                    </Badge>
                } />

                <Tab label={
                    <Badge badgeContent={counters.trash} color="error" sx={{pr:1}}>
                        Корзина
                    </Badge>
                } />
            </Tabs>
            <List sx={{display:'flex', flexDirection:'column', gap: 2}}>
                {filteredTodos.map((todo) => (
                    <ListItem key={todo.id} sx={{border:'2px solid rgb(221, 204, 204)', borderRadius:'3px 15px'}}>
                        <ListItemText primary={todo.text}
                            sx={{'& .MuiListItemText-primary': { color: 'white'}, }}
                        />
                        <ListItem sx={{display:'flex', justifyContent:'flex-end', p: 0}}>
                            {!todo.deleted && (
                                <IconButton edge="end" onClick={() => dispatch(toggleComplete(todo.id))}>
                                    <CheckCircleOutlineIcon color={todo.completed ? "primary" : "action"} />
                                </IconButton>
                            )}
                            {todo.deleted ? (
                                <IconButton edge="end" onClick={() => dispatch(restoreTodo(todo.id))}>
                                    <RestoreFromTrashIcon />
                                </IconButton>
                            ) : (
                                <IconButton edge="end" onClick={() => dispatch(deleteTodo(todo.id))}>
                                    <DeleteIcon />
                                </IconButton>
                            )}
                        </ListItem >
                    </ListItem>
                ))}
            </List>
        </Box>
            <Button
                variant="contained"
                color="secondary"
                onClick={handleLogout}
                sx={{ borderRadius: 2, height: '100%'}}
            >
                Выйти
            </Button>
        </Container>
    );
};

export default TodoList;