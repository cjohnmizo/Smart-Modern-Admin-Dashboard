"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Check, Loader2, Calendar, AlertCircle, Edit2, X, Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from "@/components/ui/skeleton";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { getTodos, createTodo, updateTodo, deleteTodo, Todo } from '@/lib/todoService';

export default function TodoList() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState(true);

    // New Task State
    const [newTask, setNewTask] = useState('');
    const [newPriority, setNewPriority] = useState<'low' | 'medium' | 'high'>('medium');
    const [newDueDate, setNewDueDate] = useState('');
    const [adding, setAdding] = useState(false);

    // Editing State
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editTask, setEditTask] = useState('');
    const [editPriority, setEditPriority] = useState<'low' | 'medium' | 'high'>('medium');
    const [editDueDate, setEditDueDate] = useState('');

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const data = await getTodos();
            setTodos(data);
        } catch (error) {
            console.error('Failed to fetch todos', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddTodo = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTask.trim()) return;

        setAdding(true);
        try {
            const todo = await createTodo(newTask, newPriority, newDueDate || undefined);
            setTodos([...todos, todo]);
            setNewTask('');
            setNewPriority('medium');
            setNewDueDate('');
        } catch (error) {
            console.error('Failed to create todo', error);
        } finally {
            setAdding(false);
        }
    };

    const handleToggleTodo = async (id: string, completed: boolean) => {
        // Optimistic update
        setTodos(todos.map(todo =>
            todo._id === id ? { ...todo, completed: !completed } : todo
        ));

        try {
            await updateTodo(id, { completed: !completed });
        } catch (error) {
            // Revert on failure
            setTodos(todos.map(todo =>
                todo._id === id ? { ...todo, completed } : todo
            ));
            console.error('Failed to update todo', error);
        }
    };

    const handleDeleteTodo = async (id: string) => {
        // Optimistic update
        const previousTodos = [...todos];
        setTodos(todos.filter(todo => todo._id !== id));

        try {
            await deleteTodo(id);
        } catch (error) {
            // Revert on failure
            setTodos(previousTodos);
            console.error('Failed to delete todo', error);
        }
    };

    const startEditing = (todo: Todo) => {
        setEditingId(todo._id);
        setEditTask(todo.task);
        setEditPriority(todo.priority);
        setEditDueDate(todo.dueDate ? new Date(todo.dueDate).toISOString().split('T')[0] : '');
    };

    const cancelEditing = () => {
        setEditingId(null);
        setEditTask('');
        setEditPriority('medium');
        setEditDueDate('');
    };

    const saveEdit = async () => {
        if (!editingId || !editTask.trim()) return;

        const optimisticTodos = [...todos];
        setTodos(todos.map(t => t._id === editingId ? { ...t, task: editTask, priority: editPriority, dueDate: editDueDate || undefined } : t));

        try {
            await updateTodo(editingId, {
                task: editTask,
                priority: editPriority,
                dueDate: editDueDate || undefined // Send undefined if empty string to act as removal if needed, though backend might need explicit null to remove. For now assuming replacement.
            });
            setEditingId(null);
        } catch (error) {
            setTodos(optimisticTodos);
            console.error('Failed to update todo', error);
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high': return 'destructive';
            case 'medium': return 'default'; // or a custom yellow/orange if available, default is usually primary (blue/black)
            case 'low': return 'secondary';
            default: return 'outline';
        }
    };

    return (
        <Card className="h-full flex flex-col">
            <CardHeader>
                <CardTitle className="flex justify-between items-center text-xl font-semibold">
                    <span>Task List</span>
                    <span className="text-sm font-normal text-muted-foreground">{todos.filter(t => !t.completed).length} pending</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-4 overflow-hidden">
                {/* Add Task Form */}
                <form onSubmit={handleAddTodo} className="flex flex-col gap-2 p-1">
                    <div className="flex gap-2">
                        <Input
                            placeholder="Add a new task..."
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                            disabled={adding}
                            className="flex-1"
                        />
                        <Select
                            value={newPriority}
                            onValueChange={(val: 'low' | 'medium' | 'high') => setNewPriority(val)}
                        >
                            <SelectTrigger className="w-[100px]">
                                <SelectValue placeholder="Priority" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="low">Low</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="high">High</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex gap-2">
                        <Input
                            type="date"
                            className="flex-1"
                            value={newDueDate}
                            onChange={(e) => setNewDueDate(e.target.value)}
                            disabled={adding}
                        />
                        <Button type="submit" className="w-[100px]" disabled={adding || !newTask.trim()}>
                            {adding ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Add <Plus className="ml-2 h-4 w-4" /></>}
                        </Button>
                    </div>
                </form>

                <div className="flex-1 overflow-y-auto pr-2 -mr-2 space-y-2">
                    {loading ? (
                        <div className="space-y-2">
                            {[1, 2, 3].map((i) => (
                                <Skeleton key={i} className="h-12 w-full rounded-lg" />
                            ))}
                        </div>
                    ) : todos.length === 0 ? (
                        <div className="text-center text-muted-foreground py-8">
                            No tasks yet. Add one to get started!
                        </div>
                    ) : (
                        <AnimatePresence initial={false}>
                            {todos.map((todo) => (
                                <motion.div
                                    key={todo._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    layout
                                    className={`group flex flex-col gap-2 p-3 rounded-lg border transition-colors ${todo.completed ? 'bg-muted/50 border-transparent' : 'bg-card border-border hover:border-primary/50'
                                        }`}
                                >
                                    {editingId === todo._id ? (
                                        <div className="flex flex-col gap-2 w-full">
                                            <Input
                                                value={editTask}
                                                onChange={(e) => setEditTask(e.target.value)}
                                            />
                                            <div className="flex gap-2">
                                                <Select
                                                    value={editPriority}
                                                    onValueChange={(val: 'low' | 'medium' | 'high') => setEditPriority(val)}
                                                >
                                                    <SelectTrigger className="flex-1">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="low">Low</SelectItem>
                                                        <SelectItem value="medium">Medium</SelectItem>
                                                        <SelectItem value="high">High</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <Input
                                                    type="date"
                                                    className="flex-1"
                                                    value={editDueDate}
                                                    onChange={(e) => setEditDueDate(e.target.value)}
                                                />
                                            </div>
                                            <div className="flex justify-end gap-2">
                                                <Button size="sm" variant="ghost" onClick={cancelEditing}> <X className="h-4 w-4" /> </Button>
                                                <Button size="sm" onClick={saveEdit}> <Save className="h-4 w-4" /> </Button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={() => handleToggleTodo(todo._id, todo.completed)}
                                                className={`flex-shrink-0 rounded-full w-6 h-6 flex items-center justify-center border transition-colors ${todo.completed
                                                    ? 'bg-primary border-primary text-primary-foreground'
                                                    : 'border-muted-foreground text-transparent hover:border-primary'
                                                    }`}
                                            >
                                                <Check className="h-3.5 w-3.5" />
                                            </button>

                                            <div className="flex-1 flex flex-col">
                                                <span className={`${todo.completed ? 'text-muted-foreground line-through decoration-muted-foreground/50' : 'text-foreground font-medium'}`}>
                                                    {todo.task}
                                                </span>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <Badge variant={getPriorityColor(todo.priority) as any} className="text-[10px] px-1 py-0 h-5">
                                                        {todo.priority}
                                                    </Badge>
                                                    {todo.dueDate && (
                                                        <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                                                            <Calendar className="h-3 w-3" />
                                                            {new Date(todo.dueDate).toLocaleDateString()}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="flex gap-1 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => startEditing(todo)}
                                                    className="h-8 w-8 text-muted-foreground hover:text-primary"
                                                >
                                                    <Edit2 className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => handleDeleteTodo(todo._id)}
                                                    className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
