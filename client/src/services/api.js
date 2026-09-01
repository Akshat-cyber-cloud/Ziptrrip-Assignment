const API_BASE = '/api/todos';

export async function fetchTodos(params = {}) {
  const query = new URLSearchParams(params).toString();
  const url = query ? `${API_BASE}?${query}` : API_BASE;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch todos: ${res.statusText}`);
  }
  return res.json();
}

export async function fetchTodoById(id) {
  const res = await fetch(`${API_BASE}/${id}`);
  if (!res.ok) {
    if (res.status === 404) {
      throw new Error('Todo item not found');
    }
    throw new Error(`Failed to fetch todo item: ${res.statusText}`);
  }
  return res.json();
}

export async function createTodo(todoData) {
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todoData),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to create todo');
  }
  return res.json();
}

export async function updateTodo(id, updates) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to update todo');
  }
  return res.json();
}

export async function deleteTodo(id) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to delete todo');
  }
  return res.json();
}
