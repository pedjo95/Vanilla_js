// Define UI variables
const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');

runEvents();

function runEvents() {
  // load local storage
  document.addEventListener('DOMContentLoaded', getTask);
  
  // add a task
  form.addEventListener('submit', addTask);

  // remove a task
  taskList.addEventListener('click', removeTask);

  // clear all task
  clearBtn.addEventListener('click', clearTask);

  // filter tasks
  filter.addEventListener('keyup', filterTask);
}

function getTask() {
  let tasks;

  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task) {
    // create li element
  const li = document.createElement('li');
  // add a class
  li.className = 'collection-item';
  // append the task to the li - text node
  li.appendChild(document.createTextNode(task));

  // create link
  const link = document.createElement('a');
  // add a class
  link.className = 'delete-item secondary-content';
  // add icon
  link.innerHTML = '<i class="fa fa-remove"></i> ';
  // append the link to li
  li.appendChild(link);
  
  // append li to the ul
  taskList.appendChild(li);
  })

}

function addTask(e) {
  if(taskInput.value === '') {
    alert('Add a task !!');

  } else {
    // create li element
    const li = document.createElement('li');
    // add a class
    li.className = 'collection-item';
    // append the task to the li - text node
    li.appendChild(document.createTextNode(taskInput.value));
  
    // create link
    const link = document.createElement('a');
    // add a class
    link.className = 'delete-item secondary-content';
    // add icon
    link.innerHTML = '<i class="fa fa-remove"></i> ';
    // append the link to li
    li.appendChild(link);
    
    // append li to the ul
    taskList.appendChild(li);

    // add to local storage
    storeTaskInLocalStorage(taskInput.value);
  }
    
  // clear the input
  taskInput.value = '';

  e.preventDefault();
};

function storeTaskInLocalStorage(task) {
  let tasks;

  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  
  tasks.push(task);
  
  localStorage.setItem('tasks', JSON.stringify(tasks));
  
}

function removeTask(e) {
  if(e.target.parentElement.classList.contains('delete-item')) {

    if(confirm('Are you sure you want to delete it ?')) {
      e.target.parentElement.parentElement.remove(); 

      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
};

function removeTaskFromLocalStorage(taskItem) {
  let tasks;

  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index) {
    console.log(task, index);
    if(taskItem.textContent === task) {
      // tasks.splice(index, 1)
      console.log('entrou');
    } 
  });

  console.log(tasks);
  console.log(taskItem);
  console.log(taskItem.textContent);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearTask() {
  // 1
  // taskList.innerHTML = '';

  // 2 - Faster (recommended)
  while(taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  clearTaskFromLocalStorage();

};

function clearTaskFromLocalStorage() {
  localStorage.clear();
}

function filterTask(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function(task) {
    const item = task.firstChild.textContent;

    if(item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none'
    }
  });

}

