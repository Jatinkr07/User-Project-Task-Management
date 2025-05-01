const API_URL = 'https://user-project-task-management-v2.onrender.com/api';


async function handleResponse(response) {
  const data = await response.json();
  
  if (!response.ok) {
    throw data;
  }
  
  return data;
}

// Auth API
export async function register(email, password, name, country) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password, name, country }),
    credentials: 'include',
  });
  
  return handleResponse(response);
}

export async function login(email, password) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
    credentials: 'include',
  });
  
  return handleResponse(response);
}

export async function logout() {
  await fetch(`${API_URL}/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  });
}

export async function getCurrentUser() {
  const response = await fetch(`${API_URL}/users/me`, {
    credentials: 'include',
  });
  
  return handleResponse(response);
}

// Projects API
export async function getProjects() {
  const response = await fetch(`${API_URL}/projects`, {
    credentials: 'include',
  });
  
  return handleResponse(response);
}

export async function getProject(id) {
  const response = await fetch(`${API_URL}/projects/${id}`, {
    credentials: 'include',
  });
  
  return handleResponse(response);
}

export async function createProject(title, description) {
  const response = await fetch(`${API_URL}/projects`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, description }),
    credentials: 'include',
  });
  
  return handleResponse(response);
}

export async function updateProject(id, title, description) {
  const response = await fetch(`${API_URL}/projects/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, description }),
    credentials: 'include',
  });
  
  return handleResponse(response);
}

export async function deleteProject(id) {
  const response = await fetch(`${API_URL}/projects/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  
  return handleResponse(response);
}

// Tasks API
export async function getTasks(projectId) {
  const response = await fetch(`${API_URL}/projects/${projectId}/tasks`, {
    credentials: 'include',
  });
  
  return handleResponse(response);
}

export async function getTask(projectId, taskId) {
  const response = await fetch(`${API_URL}/projects/${projectId}/tasks/${taskId}`, {
    credentials: 'include',
  });
  
  return handleResponse(response);
}

export async function createTask(projectId, title, description) {
  const response = await fetch(`${API_URL}/projects/${projectId}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, description }),
    credentials: 'include',
  });
  
  return handleResponse(response);
}

export async function updateTask(projectId, taskId, data) {
  const response = await fetch(`${API_URL}/projects/${projectId}/tasks/${taskId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    credentials: 'include',
  });
  
  return handleResponse(response);
}

export async function deleteTask(projectId, taskId) {
  const response = await fetch(`${API_URL}/projects/${projectId}/tasks/${taskId}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  
  return handleResponse(response);
}