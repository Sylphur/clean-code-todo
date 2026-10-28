const taskInput = document.getElementById('new-task');
const addButton = document.getElementsByTagName('button')[0];
const incompleteTaskHolder = document.getElementById('incompleteTasks');
const completedTasksHolder = document.getElementById('completed-tasks');

const createNewTaskElement = function (taskTitle) {
  const listItem = document.createElement('li');

  const checkBox = document.createElement('input');

  const label = document.createElement('label');

  const editInput = document.createElement('input');

  const editButton = document.createElement('button');

  const deleteButton = document.createElement('button');
  const deleteButtonImg = document.createElement('img');

  label.innerText = taskTitle;
  label.className = 'task';

  checkBox.type = 'checkbox';
  editInput.type = 'text';
  editInput.className = 'task';

  editButton.innerText = 'Edit'; //innerText encodes special characters, HTML does not.
  editButton.className = 'edit';

  deleteButton.className = 'delete';
  deleteButtonImg.src = './remove.svg';
  deleteButton.appendChild(deleteButtonImg);

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
};

const addTask = function () {
  if (!taskInput.value) return;
  const listItem = createNewTaskElement(taskInput.value);

  incompleteTaskHolder.appendChild(listItem);
  taskInput.value = '';
};

const editTask = function (listItem, editButton) {
  const editInput = listItem.querySelector('input[type=text]');
  const label = listItem.querySelector('label');
  const isEditMode = listItem.classList.contains('editMode');

  if (isEditMode) {
    label.innerText = editInput.value;
    editButton.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editButton.innerText = 'Save';
  }

  listItem.classList.toggle('editMode');
};

const deleteTask = function (listItem) {
  listItem.remove();
};

const taskCompleted = function (listItem) {
  completedTasksHolder.appendChild(listItem);
};

const taskIncomplete = function (listItem) {
  incompleteTaskHolder.appendChild(listItem);
};

addButton.addEventListener('click', addTask);

incompleteTaskHolder.addEventListener('click', function (event) {
  const target = event.target;
  const listItem = target.closest('li');
  if (!listItem) return;

  const editButton = target.closest('.edit');

  const deleteButton = target.closest('.delete');

  if (editButton) {
    editTask(listItem, editButton);
  } else if (deleteButton) {
    deleteTask(listItem);
  }
});

incompleteTaskHolder.addEventListener('change', function (event) {
  if (event.target.type === 'checkbox') {
    const listItem = event.target.closest('li');
    if (listItem) taskCompleted(listItem);
  }
});

completedTasksHolder.addEventListener('click', function (event) {
  const target = event.target;
  const listItem = target.closest('li');
  if (!listItem) return;

  const editButton = target.closest('.edit');
  const deleteButton = target.closest('.delete');

  if (editButton) {
    editTask(listItem, editButton);
  } else if (deleteButton) {
    deleteTask(listItem);
  }
});

completedTasksHolder.addEventListener('change', function (event) {
  if (event.target.type === 'checkbox') {
    const listItem = event.target.closest('li');
    if (listItem) taskIncomplete(listItem);
  }
});
