import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { deleteTodo, fetchTodo, postTodo, updateTodo } from "./TodoThunks";
import Loader from "../UI/Loader/Loader.tsx";

export const BASE_URL = 'https://nurlybek-27-js-default-rtdb.europe-west1.firebasedatabase.app/';


const Todo = () => {
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const todoLoading = useSelector((state: RootState) => state.todo.loading);
    const todos = useSelector((state: RootState) => state.todo.todos);
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTodo());
    }, [dispatch]);

    const handleAddTodo = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newTaskTitle.trim()) {
            const newTodo = { id: Date.now().toString(), title: newTaskTitle, status: false };
            await dispatch(postTodo(newTodo));
            dispatch(fetchTodo());
            setNewTaskTitle('');
        }
    };

    const handleStatusChange = (id: string, status: boolean, title: string) => {
        const updatedTodo = { id, title, status: !status };
        dispatch(updateTodo(updatedTodo));
    };

    const handleDeleteTodo = (id: string) => {
        dispatch(deleteTodo(id));
    };

    return (
        <div className='mt-2'>
            {todoLoading && <Loader/>}
            <form className='formTodo' onSubmit={handleAddTodo}>
                <input
                    type="text"
                    className='todoInput'
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    placeholder="Enter new task"
                />
                <button type="submit" className='btn btn-primary' style={{fontSize: '12px'}}>Add Task</button>
            </form>
            <ul style={{ listStyleType: 'none' }}>
                {todos.length > 0 ? (
                    todos.map((todo) => (
                        <li key={todo.id} className='task'>
                            <input
                                type="checkbox"
                                checked={todo.status}
                                onChange={() => handleStatusChange(todo.id, todo.status, todo.title)}
                            />
                            {todo.title} - {todo.status ? 'Completed' : 'Not completed'}
                            <button className='btn btn-danger' onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
                        </li>
                    ))
                ) : (
                    <p>No tasks available.</p>
                )}
            </ul>
        </div>
    );
};

export default Todo;
