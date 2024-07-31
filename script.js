document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');

    // Load tasks from local storage
    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        taskList.innerHTML = '';
        tasks.forEach(task => {
            addTaskToDOM(task);
        });
    };

    // Save tasks to local storage
    const saveTasks = (tasks) => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    // Add task to DOM
    const addTaskToDOM = (task) => {
        const taskItem = document.createElement('li');
        taskItem.classList.add('task-item');
        taskItem.dataset.id = task.id;

        const taskText = document.createElement('span');
        taskText.classList.add('task-text');
        taskText.textContent = task.text;
        if (task.completed) {
            taskText.classList.add('task-completed');
        }

        const editButton = document.createElement('button');
        editButton.classList.add('task-edit');
        editButton.textContent = '✎';
        editButton.addEventListener('click', () => editTask(task.id));

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('task-delete');
        deleteButton.textContent = '🗑️';
        deleteButton.addEventListener('click', () => deleteTask(task.id));

        const toggleButton = document.createElement('button');
        toggleButton.classList.add('task-toggle');
        toggleButton.textContent = task.completed ? '✔️' : '✖️';
        toggleButton.addEventListener('click', () => toggleTaskCompletion(task.id));

        taskItem.append(taskText, editButton, deleteButton, toggleButton);
        taskList.appendChild(taskItem);
    };

    // Add a new task
    const addTask = () => {
        const text = taskInput.value.trim();
        if (text) {
            const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            const newTask = {
                id: Date.now(),
                text,
                completed: false
            };
            tasks.push(newTask);
            saveTasks(tasks);
            addTaskToDOM(newTask);
            taskInput.value = '';
        }
    };

    // Edit a task
    const editTask = (id) => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const task = tasks.find(task => task.id === id);
        const newText = prompt('Edit task:', task.text);
        if (newText) {
            task.text = newText.trim();
            saveTasks(tasks);
            loadTasks();
        }
    };

    // Delete a task
    const deleteTask = (id) => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const updatedTasks = tasks.filter(task => task.id !== id);
        saveTasks(updatedTasks);
        loadTasks();
    };

    // Toggle task completion
    const toggleTaskCompletion = (id) => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const task = tasks.find(task => task.id === id);
        task.completed = !task.completed;
        saveTasks(tasks);
        loadTasks();
    };

    // Event listeners
    addTaskButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    // Initial load
    loadTasks();
});
