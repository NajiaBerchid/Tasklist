//Define UI variables
const form = document.getElementById('task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.getElementById('filter');
const taskInput = document.getElementById('task');

//load all event listeners
loadEventListeners();
//function
function loadEventListeners(){
  //DOM load event
  document.addEventListener('DOMContentLoaded', getTasks )
  //add task
  form.addEventListener('submit', addTask);
  //remove task evernt
  taskList.addEventListener('click', removeTask)
  //Clear task event
  clearBtn.addEventListener('click', clearTasks)
  //filter tasks event
  filter.addEventListener('keyup', filterTasks)

}
//Get task from local Storage
function getTasks(){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function (task) {
    //create list element
  const li = document.createElement('li');
  //add class
  li.className = 'collection-item';
  //text node create and append to li
  li.appendChild(document.createTextNode(task));
  // add link element
  const link = document.createElement('a');
  //ad class
  link.className = 'delete-item secondary-content';
  //add icon html
  link.innerHTML = '<i class ="fa fa-remove"></i>';
  //append the link to li
  li.appendChild(link);
  //append to ul
  taskList.appendChild(li);
  });
}
//Add task
function addTask(e){
  if(taskInput.value === ''){
    alert('You Have Not Inputed Anything. Please Add A Task');
  }
  //create list element
  const li = document.createElement('li');
  //add class
  li.className = 'collection-item';
  //text node create and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  // add link element
  const link = document.createElement('a');
  //ad class
  link.className = 'delete-item secondary-content';
  //add icon html
  link.innerHTML = '<i class ="fa fa-remove"></i>';
  //append the link to li
  li.appendChild(link);
  //append to ul
  taskList.appendChild(li);
  //local storage
  storeToLocalStorage(taskInput.value);
  //clear input
  taskInput.value = '';
  e.preventDefault();
}
//store to local
function storeToLocalStorage(task){
  let tasks;
  if(localStorage.getItem('tasks') === null ){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}
//remove task
function removeTask(e){
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('Are you sure?')){
    e.target.parentElement.remove();
      //REMOVE FROM LS
      removeTaskFromLocalStorage(e.target.parentElement);
    }
  }
}

//remove from LS
function removeTaskFromLocalStorage(taskItem){
  let tasks;
  if(localStorage.getItem('tasks') === null ){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach((task, index) => {
    if(taskItem.textContent === task){
      task.splice(index, 1);
    }
  })
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
//clear tasks
function clearTasks(){
  //simpler method
  //taskList.innerHTML = '';

  //faster and better method
  while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild);
  }
  //clear from LS
  clearTasksFromLocalStorage();
}
//clear tasks from LS
function clearTasksFromLocalStorage(){
  localStorage.clear();
}
//Filter tasks
function filterTasks(e){
  const text = e.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach(function (task){
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1){
      task.style.display = 'block';
    }else {
      task.style.display = 'none';
    }
  });
}







