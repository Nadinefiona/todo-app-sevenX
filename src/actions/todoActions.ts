import axios from 'axios';

export const getTodos = async () => {
  try {
    console.log('Fetching todos from API');
    const response = await axios.get('/api/todo/get');
    console.log('Fetched todos response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
};
export const addTodo = async (text: string) => {
  await axios.post('/api/todo/add', { text });
};

export const deleteTodo = async (id: number) => {
  await axios.delete(`/api/todo/delete?id=${id}`);
};

export const toggleTodo = async ({ id, done }: { id: number; done: boolean }) => {
  await axios.put(`/api/todo/Toogletodo?id=${id}`, { done });
};

export const editTodo = async ({ id, text }: { id: number; text: string }) => {
  await axios.put(`/api/todo/edit?id=${id}`, { text });
};
