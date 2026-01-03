// Store tasks
let tasks = [];

// DOM references
const output = document.getElementById("output");
const commandInput = document.getElementById("commandInput");

// Print text to terminal
function print(text) {
  const line = document.createElement("div");
  line.className = "line";
  line.textContent = text;
  output.appendChild(line);
  output.scrollTop = output.scrollHeight;
}

// Show help
function showHelp() {
  print("Available commands:");
  print("add <task>      → Add a new task");
  print("list            → List all tasks");
  print("remove <number> → Remove task by number");
  print("clear           → Clear all tasks");
  print("help            → Show commands");
}

// Handle command
function handleCommand(command) {
  const parts = command.split(" ");
  const action = parts[0];
  const value = parts.slice(1).join(" ");

  switch (action) {
    case "add":
      if (!value) {
        print("❌ Task cannot be empty");
        return;
      }
      tasks.push(value);
      print(`✅ Task added: ${value}`);
      break;

    case "list":
      if (tasks.length === 0) {
        print("📭 No tasks found");
      } else {
        tasks.forEach((task, index) => {
          print(`${index + 1}. ${task}`);
        });
      }
      break;

    case "remove":
      const index = parseInt(value) - 1;
      if (isNaN(index) || !tasks[index]) {
        print("❌ Invalid task number");
        return;
      }
      const removed = tasks.splice(index, 1);
      print(`🗑 Removed: ${removed}`);
      break;

    case "clear":
      tasks = [];
      print("🧹 All tasks cleared");
      break;

    case "help":
      showHelp();
      break;

    default:
      print("❓ Unknown command. Type 'help'");
  }
}

// Listen for Enter key
commandInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    const command = commandInput.value.trim();
    if (command) {
      print(`> ${command}`);
      handleCommand(command);
    }
    commandInput.value = "";
  }
});

// Initial message
print("Welcome to TaskCLI");
print("Type 'help' to see available commands");
