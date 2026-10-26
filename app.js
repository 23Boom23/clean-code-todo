const newTaskInput = document.getElementById('new-task');
const addTaskButton = document.getElementsByTagName('button')[0];
const todoList = document.getElementById('incompleteTasks');
const completedList = document.getElementById('completed-tasks');

const createElement = function (tagName, properties) {
  return Object.assign(document.createElement(tagName), properties);
};

const createTaskElement = function (taskText) {
  const taskItem = document.createElement('li');
  const checkbox = createElement('input', { type: 'checkbox' });
  const label = createElement('label', {
    innerText: taskText,
    className: 'task',
  });
  const editInput = createElement('input', { type: 'text', className: 'task' });
  const editButton = createElement('button', {
    innerText: 'Edit',
    className: 'edit',
  });
  const deleteButton = createElement('button', { className: 'delete' });
  const deleteIcon = createElement('img', { src: './remove.svg' });

  deleteButton.append(deleteIcon);
  taskItem.append(checkbox, label, editInput, editButton, deleteButton);
  return taskItem;
};

const addTask = function () {
  if (!newTaskInput.value) return;
  const taskItem = createTaskElement(newTaskInput.value);

  todoList.appendChild(taskItem);
  attachTaskEvents(taskItem);

  newTaskInput.value = '';
};

const editTask = function () {
  const taskItem = this.parentNode;

  const editInput = taskItem.querySelector('input[type=text]');
  const label = taskItem.querySelector('label');
  const editButton = taskItem.querySelector('.edit');
  const isEditing = taskItem.classList.contains('editMode');
  if (isEditing) {
    label.innerText = editInput.value;
    editButton.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editButton.innerText = 'Save';
  }

  taskItem.classList.toggle('editMode');
};

const deleteTask = function () {
  const taskItem = this.parentNode;
  const taskList = taskItem.parentNode;
  taskList.removeChild(taskItem);
};

const toggleTaskStatus = function () {
  const taskItem = this.parentNode;
  const destinationList = this.checked ? completedList : todoList;
  destinationList.appendChild(taskItem);
};

addTaskButton.addEventListener('click', addTask);

const attachTaskEvents = function (taskItem) {
  const checkbox = taskItem.querySelector('input[type=checkbox]');
  const editButton = taskItem.querySelector('button.edit');
  const deleteButton = taskItem.querySelector('button.delete');

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkbox.onchange = toggleTaskStatus;
};

for (let i = 0; i < todoList.children.length; i++) {
  attachTaskEvents(todoList.children[i]);
}

for (let i = 0; i < completedList.children.length; i++) {
  attachTaskEvents(completedList.children[i]);
}
