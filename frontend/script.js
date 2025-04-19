const API_URL = "http://localhost:8080/api/v1/tasks";

const taskForm = document.querySelector("#taskForm");
const taskList = document.querySelector("#tasks");

const updateForm = document.querySelector("#updateForm");
const updateTitle = document.querySelector("#updateTitle");
const updateDescription = document.querySelector("#updateDescription");
const updateStatus = document.querySelector("#updateStatus");
const updateBtn = document.querySelector("#update-btn");
const deleteBtn = document.querySelector("#delete-btn");
const cancleBtn = document.querySelector("#cancel-btn");

const bgOverlay = document.querySelector(".bg");

let selectedTaskId = null;

// Create Task ✔️
taskForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.querySelector("#title").value;
  const description = document.querySelector("#description").value;

  try {
    await axios.post(API_URL, {
      title,
      description,
    });
    taskForm.reset();
    loadTasks();
  } catch (error) {
    console.error("Error creating task:", error);
  }
});

//
function getStatusIcon(status) {
  switch (status) {
    case "Completed":
      return `<i class="fa-solid fa-check" style="color:green"></i>`;
    case "In Progress":
      return `<i class="fa-solid fa-spinner" style="color:orange"></i>`;
    default:
      return `<i class="fa-solid fa-xmark" style="color:red"></i>`;
  }
}

// Read Tasks 🔄
async function loadTasks() {
  try {
    const response = await axios.get(API_URL);
    const tasks = response.data;

    taskList.innerHTML = "";

    if (tasks.length === 0) {
      taskList.innerHTML = "<p>No tasks available</p>";
      return;
    }
    tasks.forEach((task) => {
      const taskItem = document.createElement("li");
      taskItem.className = "task-item";
      taskItem.innerHTML = `
      
        <h3>${task.title}</h3>
        <p>${task.description}</p>
         <p class="status">Status:
           <span class="${task.status.replace(/\s/g, "").toLowerCase()}">
      ${task.status} ${getStatusIcon(task.status)}
    </span>
         </p>
          <button class="edit-btn" onclick="editTask('${task._id}', '${
        task.title
      }', '${task.description}', '${task.status}')">Update</button>
        `;
      taskList.appendChild(taskItem);
    });
  } catch (error) {
    console.error("Error loading tasks:", error.message);
  }
}

// Open Update form ✔️
window.editTask = (id, title, description, status) => {
  selectedTaskId = id;
  updateTitle.value = title;
  updateDescription.value = description;
  updateStatus.value = status;
  updateForm.style.display = "block";
  bgOverlay.style.display = "block";
};

// Update Task ✔️
updateBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  if (!selectedTaskId) return;

  try {
    await axios.put(`${API_URL}/${selectedTaskId}`, {
      title: updateTitle.value,
      description: updateDescription.value,
      status: updateStatus.value,
    });

    closeUpdateForm();
    loadTasks();
  } catch (error) {
    console.error("Error updating task:", error.message);
  }
});

// ❌ Delete Task
deleteBtn.addEventListener("click", async () => {
  if (!selectedTaskId) return;

  try {
    await axios.delete(`${API_URL}/${selectedTaskId}`);
    closeUpdateForm();
    loadTasks();
  } catch (error) {
    console.error("Error deleting task:", error.message);
  }
});

// 🚫 Cancel Edit
cancleBtn.addEventListener("click", () => {
  closeUpdateForm();
});

// 🧹 Close Form Utility
function closeUpdateForm() {
  updateForm.style.display = "none";
  bgOverlay.style.display = "none";
  selectedTaskId = null;
}

loadTasks();
