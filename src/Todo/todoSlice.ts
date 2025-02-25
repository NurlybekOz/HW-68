import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteTodo, fetchTodo, postTodo, updateTodo } from "./TodoThunks";
import { ITodo } from "../types";

interface TodoState {
    todos: ITodo[];
    loading: boolean;
    error: boolean;
}

const initialState: TodoState = {
    todos: [],
    loading: false,
    error: false,
};

export const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodo.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(fetchTodo.fulfilled, (state, action) => {
                state.loading = false;
                state.todos = Object.keys(action.payload).map((key) => ({
                    ...action.payload[key],
                    id: key,
                }));
            })
            .addCase(fetchTodo.rejected, (state) => {
                state.loading = false;
                state.error = true;
            })
            .addCase(postTodo.fulfilled, (state, action: PayloadAction<ITodo>) => {
                state.loading = false;
                state.todos.push(action.payload);
            })
            .addCase(updateTodo.fulfilled, (state, action: PayloadAction<ITodo>) => {
                state.loading = false;
                state.todos = state.todos.map((todo) =>
                    todo.id === action.payload.id ? { ...todo, status: action.payload.status } : todo
                );
            })
            .addCase(deleteTodo.fulfilled, (state, action: PayloadAction<string>) => {
                state.loading = false;
                state.todos = state.todos.filter((todo) => todo.id !== action.payload);
            });
    },
});

export const todoReducer = todoSlice.reducer;
