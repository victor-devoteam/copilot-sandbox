const STORAGE_KEY = "copilot-sandbox-tasks";

const form = document.querySelector("#add-form");
const input = document.querySelector("#task-input");
const list = document.querySelector("#task-list");
const emptyState = document.querySelector("#empty-state");
const count = document.querySelector("#task-count");
const summary = document.querySelector("#list-summary");
const statusMessage = document.querySelector("#status-message");
const filterButtons = document.querySelectorAll("[data-filter]");

let tasks = loadTasks();
let activeFilter = "all";

function loadTasks() {
  try {
    const savedTasks = localStorage.getItem(STORAGE_KEY);
    if (!savedTasks) return [];

    const parsedTasks = JSON.parse(savedTasks);
    if (!Array.isArray(parsedTasks)) {
      throw new Error("Les données sauvegardées ne sont pas une liste.");
    }

    return parsedTasks.filter(
      (task) =>
        task &&
        typeof task.id === "string" &&
        typeof task.title === "string" &&
        typeof task.completed === "boolean",
    );
  } catch (error) {
    statusMessage.textContent =
      "Impossible de lire les tâches sauvegardées. Tu peux continuer avec une liste vide.";
    console.error("Chargement des tâches impossible :", error);
    return [];
  }
}

function saveTasks() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    statusMessage.textContent = "";
  } catch (error) {
    statusMessage.textContent =
      "La sauvegarde a échoué. Vérifie les réglages de stockage de ton navigateur.";
    console.error("Sauvegarde des tâches impossible :", error);
  }
}

function getVisibleTasks() {
  if (activeFilter === "active") return tasks.filter((task) => !task.completed);
  if (activeFilter === "completed") return tasks.filter((task) => task.completed);
  return tasks;
}

function renderTasks() {
  list.replaceChildren();

  for (const task of getVisibleTasks()) {
    const item = document.createElement("li");
    item.className = `task-item${task.completed ? " is-completed" : ""}`;

    const checkbox = document.createElement("input");
    checkbox.className = "task-toggle";
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.setAttribute("aria-label", `Marquer « ${task.title} » comme terminée`);
    checkbox.addEventListener("change", () => {
      task.completed = checkbox.checked;
      saveTasks();
      renderTasks();
    });

    const title = document.createElement("span");
    title.className = "task-title";
    title.textContent = task.title;

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.type = "button";
    deleteButton.textContent = "×";
    deleteButton.setAttribute("aria-label", `Supprimer « ${task.title} »`);
    deleteButton.addEventListener("click", () => {
      tasks = tasks.filter((candidate) => candidate.id !== task.id);
      saveTasks();
      renderTasks();
    });

    item.append(checkbox, title, deleteButton);
    list.append(item);
  }

  const remaining = tasks.filter((task) => !task.completed).length;
  count.textContent = `${tasks.length} tâche${tasks.length === 1 ? "" : "s"}`;
  summary.textContent =
    tasks.length === 0
      ? "Les petites étapes font les grands projets."
      : remaining === 0
        ? "Tout est terminé, beau travail !"
        : `${remaining} tâche${remaining === 1 ? "" : "s"} à faire`;
  emptyState.hidden = getVisibleTasks().length > 0;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = input.value.trim();
  if (!title) {
    input.focus();
    return;
  }

  tasks.unshift({
    id: crypto.randomUUID(),
    title,
    completed: false,
  });
  input.value = "";
  activeFilter = "all";
  updateFilterButtons();
  saveTasks();
  renderTasks();
  input.focus();
});

function updateFilterButtons() {
  for (const button of filterButtons) {
    const selected = button.dataset.filter === activeFilter;
    button.classList.toggle("is-selected", selected);
    button.setAttribute("aria-pressed", String(selected));
  }
}

for (const button of filterButtons) {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    updateFilterButtons();
    renderTasks();
  });
}

renderTasks();
