const API_URL = 'http://localhost:8080/api/tasks';

// Fetch tasks and display them
const fetchTasks = () => {
  fetch(API_URL)
    .then((response) => response.json())
    .then((tasks) => {
      const taskList = document.getElementById('taskList');
      taskList.innerHTML = '';
      tasks.forEach((task) => {
        const li = document.createElement('li');
        li.textContent = task.title;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteTask(task.id);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
      });
    })
    .catch((error) => console.error('Error fetching tasks:', error));
};

// Add a new task
document.getElementById('taskForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const taskTitle = document.getElementById('taskInput').value;
  fetch(API_URL, { 
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: taskTitle }),
  })
    .then(() => {
      document.getElementById('taskInput').value = '';
      fetchTasks();
    }) 
    .catch((error) => console.error('Error adding task:', error));
});

// Delete a task
const deleteTask = (taskId) => {
  fetch(`${API_URL}/${taskId}`, { method: 'DELETE' })
    .then(() => fetchTasks())
    .catch((error) => console.error('Error deleting task:', error));
};

// Initial fetch
fetchTasks();
