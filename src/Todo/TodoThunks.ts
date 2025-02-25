import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ITodo } from "../types";
import { BASE_URL } from "./Todo.tsx";

export const fetchTodo = createAsyncThunk<{ [key: string]: ITodo }, void>(
    'todo/fetchTodo',
    async () => {
        const response = await axios.get(`${BASE_URL}/todos.json`);
        return response.data ?? '';
    }
);

export const postTodo = createAsyncThunk<ITodo, ITodo>(
    'todo/postTodo',
    async (todo) => {
        const response = await axios.post(`${BASE_URL}/todos.json`, todo);
        return response.data;
    }
);

export const updateTodo = createAsyncThunk<ITodo, ITodo>(
    'todo/updateTodo',
    async (todo) => {
        const response = await axios.put(`${BASE_URL}/todos/${todo.id}.json`, todo);
        return response.data;
    }
);

export const deleteTodo = createAsyncThunk<string, string>(
    'todo/deleteTodo',
    async (id) => {
        await axios.delete(`${BASE_URL}/todos/${id}.json`);
        return id;
    }
);
