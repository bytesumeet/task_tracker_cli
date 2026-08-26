# Task Tracker CLI

**Project URL:** https://github.com/bytesumeet/task-tracker-cli

A lightweight, high-performance, terminal-based task management application built with Node.js and ES Modules. Effortlessly create, track, filter, and organize your daily developer tasks directly from your terminal with vibrant, color-coded output.

---

## 🌟 Features

- 📝 **Add Tasks**: Create new tasks instantly with auto-generated unique identifiers (UUIDv4).
- 🎨 **Visual Status Indicators**: Color-coded task status badges (`pending`, `in-progress`, `completed`) powered by `chalk`.
- 🔍 **Filtering & Listing**: View all registered tasks or filter them selectively by their current completion status.
- ✏️ **In-place Editing**: Modify task descriptions easily using unique task IDs.
- 🔄 **Quick Status Transitions**: Convenient commands (`mark-in-progress`, `mark-done`) to manage your workflow state.
- 🗑️ **Task Deletion**: Remove obsolete or completed tasks by ID.
- 💾 **Safe Local Persistence**: Data is saved locally in `task.json` with error handling to protect your dataset against corruption.

---

## 📁 Project Structure

```text
task_tracker_cli/
├── src/
│   └── index.js      # Main CLI logic & command router
├── task.json         # Local JSON datastore (auto-created)
├── package.json      # Project dependencies and script definitions
└── README.md         # Project documentation