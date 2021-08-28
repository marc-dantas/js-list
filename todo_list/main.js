// Input Reference
let input = window.document.querySelector('input[name=tarefa]');

// Button Reference
let registerButton = window.document.querySelector('#register_button');

// List Reference
let tasks = window.document.querySelector('#list');

// Card Reference
let card = window.document.querySelector('.card');

// Tasks array
let allTasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Bring the tasks from the "allTasks" array into the HTML to be displayed on the page
function renderTasks() {
    // Clear item listing before render again the screen
    tasks.innerHTML = '';

    // List iteration
    for (task of allTasks) {
        // Create list item
        let taskItem = window.document.createElement('li');
        
        // Set class attribute to list item
        taskItem.setAttribute('class', 'list-group-item list-group-item-action');

        // Add click event for list item
        taskItem.onclick = function() {
            deleteTask(this);
        }

        // Create text
        let textItem = window.document.createTextNode(task);

        // Add the text to task item
        taskItem.appendChild(textItem);

        // Add the task item to to-do list
        tasks.appendChild(taskItem);
    }
}

renderTasks();

// Listen to the registration button event
registerButton.onclick = function() {
    // Get text from task input
    let newTask = input.value;

    // Check if the text entered is blank or not
    if (newTask !== '') {
        // Update task list (array) and render new tasks to html
        allTasks.push(newTask);
        renderTasks();

        // Clear the input
        input.value = '';

        // Remove error messages
        removeWarnings();

        // Save new list to database
        saveTasks();
    } else {
        // Remove error messages
        removeWarnings();

        // Show a error message on card div
        let span = window.document.createElement('span');
        span.setAttribute('class', 'alert alert-warning');
        let msg = window.document.createTextNode("You have to enter some task to be added to the list.");
        span.appendChild(msg);
        card.appendChild(span);
    }
}

// Remove generated warnings (if any)
function removeWarnings() {
    let warnings = window.document.querySelectorAll('span');

    // Interaction for warnings
    for (let i = 0; i < warnings.length; i++) {
        card.removeChild(warnings[i]); // Remove each warning
    }
}

// Delete task
function deleteTask(task) {
    // Remove the task from 'allTasks' array
    allTasks.splice(allTasks.indexOf(task.textContent), 1);

    // Render all tasks again
    renderTasks();

    // Save new list to database
    saveTasks();
}

// Save task array to web browser storage
function saveTasks() {
    let jsonData = JSON.stringify(allTasks);
    localStorage.setItem('tasks', jsonData);
}