import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tasks: []
}

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        allTasks: (state, action) => {
            state.tasks = action.payload
        },
        insertTask: (state, action) => {
            state.tasks.push(action.payload)
        },
        delTask: (state, action) => {
            state.tasks = state.tasks.filter(c => c.id !== action.payload)
        },
        editTask: (state, action) => {
            var index = state.tasks.findIndex(c => c.id === action.payload.id);
            if(index > -1){
                state.tasks[index] = action.payload;
            }
        }
    }   
});


export const { allTasks, insertTask, delTask, editTask } = tasksSlice.actions
export default tasksSlice.reducer