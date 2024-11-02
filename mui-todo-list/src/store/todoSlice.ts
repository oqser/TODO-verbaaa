import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Todo {
    id: number;
    text: string;
    completed: boolean;
    deleted: boolean;
}

interface TodoState {
    todos: Todo[];
    counters: {
        current: number;
        all: number;
        completed: number;
        trash: number;
    };
}

const loadState = (): TodoState => {
    try {
        const serializedState = localStorage.getItem('todoState');
        if (serializedState === null) {
            return {
                todos: [],
                counters: { current: 0, all: 0, completed: 0, trash: 0 }
            };
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return {
            todos: [],
            counters: { current: 0, all: 0, completed: 0, trash: 0 }
        };
    }
};

const saveState = (state: TodoState) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('todoState', serializedState);
    } catch {
    }
};

const initialState: TodoState = loadState();

const updateCounters = (state: TodoState) => {
    state.counters = {
        current: state.todos.filter(todo => !todo.completed && !todo.deleted).length,
        all: state.todos.filter(todo => !todo.deleted).length,
        completed: state.todos.filter(todo => todo.completed && !todo.deleted).length,
        trash: state.todos.filter(todo => todo.deleted).length,
    };
};

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<string>) => {
            state.todos.push({
                id: Date.now(),
                text: action.payload,
                completed: false,
                deleted: false,
            });
            updateCounters(state);
            saveState(state);
        },
        toggleComplete: (state, action: PayloadAction<number>) => {
            const todo = state.todos.find(todo => todo.id === action.payload);
            if (todo) {
                todo.completed = !todo.completed;
            }
            updateCounters(state);
            saveState(state);
        },
        deleteTodo: (state, action: PayloadAction<number>) => {
            const todo = state.todos.find(todo => todo.id === action.payload);
            if (todo) {
                todo.deleted = true;
            }
            updateCounters(state);
            saveState(state);
        },
        restoreTodo: (state, action: PayloadAction<number>) => {
            const todo = state.todos.find(todo => todo.id === action.payload);
            if (todo) {
                todo.deleted = false;
            }
            updateCounters(state);
            saveState(state);
        },
        deleteAllTasks: (state) => {
            state.todos = [];
            updateCounters(state);
            saveState(state);
        },
    },
});

export const { addTodo, toggleComplete, deleteTodo, restoreTodo, deleteAllTasks } = todoSlice.actions;
export default todoSlice.reducer;
