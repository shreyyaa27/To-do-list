document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const addButton = document.getElementById("addButton");
    const taskList = document.getElementById("taskList");
    const allButton = document.getElementById("allButton");
    const activeButton = document.getElementById("activeButton");
    const completedButton = document.getElementById("completedButton");
  
    addButton.addEventListener("click", addTask);
    taskList.addEventListener("click", toggleTask);
    allButton.addEventListener("click", filterAll);
    activeButton.addEventListener("click", filterActive);
    completedButton.addEventListener("click", filterCompleted);
  
    // Load tasks from local storage on page load
    loadTasks();
  
    function addTask() {
      const taskText = taskInput.value.trim();
      if (taskText !== "") {
        const taskItem = document.createElement("li");
        taskItem.innerHTML = `
          <span>${taskText}</span>
          <button class="toggleButton">Done</button>
          <button class="deleteButton">Delete</button>
        `;
        taskList.appendChild(taskItem);
        taskInput.value = "";
        saveTasks();
      }
    }
  
    function toggleTask(event) {
      if (event.target.classList.contains("toggleButton")) {
        const taskItem = event.target.parentElement;
        taskItem.classList.toggle("completed");
        saveTasks();
      } else if (event.target.classList.contains("deleteButton")) {
        const taskItem = event.target.parentElement;
        taskList.removeChild(taskItem);
        saveTasks();
      }
    }
  
    function filterAll() {
      const tasks = taskList.querySelectorAll("li");
      tasks.forEach((task) => task.style.display = "flex");
    }
  
    function filterActive() {
      const tasks = taskList.querySelectorAll("li");
      tasks.forEach((task) => {
        if (!task.classList.contains("completed")) {
          task.style.display = "flex";
        } else {
          task.style.display = "none";
        }
      });
    }
  
    function filterCompleted() {
      const tasks = taskList.querySelectorAll("li");
      tasks.forEach((task) => {
        if (task.classList.contains("completed")) {
          task.style.display = "flex";
        } else {
          task.style.display = "none";
        }
      });
    }
  
    function saveTasks() {
      const tasks = [];
      const taskItems = taskList.querySelectorAll("li");
      taskItems.forEach((task) => {
        const taskText = task.querySelector("span").innerText;
        const isCompleted = task.classList.contains("completed");
        tasks.push({ text: taskText, completed: isCompleted });
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  
    function loadTasks() {
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks.forEach((task) => {
        const taskItem = document.createElement("li");
        if (task.completed) {
          taskItem.classList.add("completed");
        }
        taskItem.innerHTML = `
          <span>${task.text}</span>
          <button class="toggleButton">Done</button>
          <button class="deleteButton">Delete</button>
        `;
        taskList.appendChild(taskItem);
      });
    }
  });
  