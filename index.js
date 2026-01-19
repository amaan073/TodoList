const inputField = document.querySelector("#inputField");
const taskList = document.querySelector("ul.taskList");
const addBtn = document.querySelector("#addBtn");

// Load tasks on page load
document.addEventListener("DOMContentLoaded", loadTasks);

// Add task on Enter
inputField.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !addBtn.disabled) {
    addTask();
  }
});

inputField.addEventListener("input", () => {
  addBtn.disabled = inputField.value.trim() === "";
});

/* ---------------- ADD TASK ---------------- */
function addTask() {
  const taskName = inputField.value.trim();

  if (taskName === "") {
    return;
  }

  const tasks = getTasks();
  tasks.push({ text: taskName, completed: false });
  saveTasks(tasks);

  renderTasks();
  inputField.value = "";
  // Focus input
  inputField.focus();
}

/* ---------------- DELETE TASK ---------------- */
function deleteTask(index) {
  const tasks = getTasks();
  tasks.splice(index, 1);
  saveTasks(tasks);
  renderTasks();
}

/* ---------------- TOGGLE TASK ---------------- */
function toggleTask(index) {
  const tasks = getTasks();
  tasks[index].completed = !tasks[index].completed;
  saveTasks(tasks);
  renderTasks();
}

/* ---------------- STORAGE HELPERS ---------------- */
function getTasks() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

/* ---------------- RENDER ---------------- */
function renderTasks() {
  const tasks = getTasks();
  taskList.innerHTML = "";

  if (tasks.length === 0) {
    taskList.classList.add("hidden");
    return;
  }

  taskList.classList.remove("hidden");

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task.text;

    if (task.completed) {
      li.classList.add("checked");
    }

    li.addEventListener("click", () => toggleTask(index));

    const dltBtn = document.createElement("span");
    dltBtn.innerHTML = "\u00d7"; // cross sign
    dltBtn.classList.add("dltBtn");

    dltBtn.addEventListener("click", (e) => {
      e.stopPropagation(); // prevent toggle
      deleteTask(index);
    });

    li.appendChild(dltBtn);
    taskList.appendChild(li);
  });
}

/* ---------------- INITIAL LOAD (scalable) ---------------- */
function loadTasks() {
  renderTasks();
}
