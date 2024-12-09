import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTasks = createAsyncThunk<any, void, { rejectValue: string; fulfillWithValue: string }>(
    'tasks/fetchTasks',
    async (_, { rejectWithValue, fulfillWithValue }) => {
        const response: Promise<Response> = fetch('http://localhost:3333/tasks', {
            credentials: 'include',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if ((await response).ok) {
            const data = await (await response).json();
            return fulfillWithValue(data);
        }

        return rejectWithValue(`${(await response).statusText}: ${(await response).status}`);
    }
);

export const addTask = createAsyncThunk('tasks/addTask', async (data: any) => {
    const response = await axios.post('http://localhost:3333/tasks', data);
    return response.data;
});

export const updateTask = createAsyncThunk('tasks/updateTask', async ({ id, data }: any) => {
    const response = await axios.put(`http://localhost:3333/tasks/${id}`, data);
    return response.data;
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (id: number) => {
    await axios.delete(`http://localhost:3333/tasks/${id}`);
    return id;
});

interface InitialState {
    tasks: any[];
}

const initialState: InitialState = {
    tasks: [],
};

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchTasks.fulfilled, (state, action) => {
            console.log('action.payload', action.payload);
            state.tasks = action.payload.data;
        });
        builder.addCase(addTask.fulfilled, (state, action) => {
            state.tasks.push(action.payload);
        });
        builder.addCase(updateTask.fulfilled, (state, action) => {
            const index = state.tasks.findIndex((task) => task.id === action.payload.id);
            if (index !== -1) {
                state.tasks[index] = action.payload;
            }
        });
        builder.addCase(deleteTask.fulfilled, (state, action) => {
            state.tasks = state.tasks.filter((task) => task.id !== action.payload);
        });
    },
});

export default tasksSlice.reducer;
