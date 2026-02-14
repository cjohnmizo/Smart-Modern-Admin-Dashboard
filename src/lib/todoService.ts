import api from './api';

export interface Todo {
    _id: string;
    task: string;
    completed: boolean;
    createdAt: string;
    dueDate?: string;
    priority: 'low' | 'medium' | 'high';
}

export const getTodos = async (): Promise<Todo[]> => {
    const response = await api.get('/todos');
    return response.data;
};

export const createTodo = async (task: string, priority: 'low' | 'medium' | 'high' = 'medium', dueDate?: string): Promise<Todo> => {
    const response = await api.post('/todos', { task, priority, dueDate });
    return response.data;
};

export const updateTodo = async (id: string, updates: Partial<Todo>): Promise<Todo> => {
    const response = await api.put(`/todos/${id}`, updates);
    return response.data;
};

export const deleteTodo = async (id: string): Promise<void> => {
    await api.delete(`/todos/${id}`);
};
