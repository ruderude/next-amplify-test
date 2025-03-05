'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = async () => {
    const title = prompt('New Todo:');
    if (!title) return;
  
    const { error } = await supabase.from('todos').insert([{ title }]);
  
    if (error) {
      console.error('Error adding todo:', error);
    } else {
      window.location.reload();
    }
  };

  useEffect(() => {
    const fetchTodos = async () => {
      const { data, error } = await supabase
        .from('todos')
        .select('*')
        .order('created_at', { ascending: false });

      console.log('data:', data);
      if (error) {
        console.error('Error fetching todos:', error);
      } else {
        setTodos(data || []);
      }
    };

    fetchTodos();
  }, []);

  return (
    <div>
      <h1>My To-Do List</h1>
      <button onClick={addTodo}>Add Todo</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.title} {todo.completed ? '✅' : '❌'}
          </li>
        ))}
      </ul>
    </div>
  );
}
