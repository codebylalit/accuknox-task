Dashboard Assignment

A React-based dashboard assignment with dynamic categories and widgets.

# Features

Dynamic categories and widgets driven by src/data/widgets.json.
Add new widgets with name and text (optionally charts).
Remove widgets via cross icon.
Manage widgets per category with searchable list + checkboxes.
All changes persist to Local Storage.

# Getting Started

Prerequisites
Node.js 18+ installed
Setup

# Install dependencies

npm install

# Start development server

npm start
Then open <http://localhost:3000> in your browser.
Resetting Data

To reset the dashboard state, clear the browser’s Local Storage key:
accuknox-dashboard-state-v1

# Project Structure

src/
  data/widgets.json       # Initial categories & widget library
  store/dashboardStore.js # Context + Reducer store with persistence
  components/             # UI components (Dashboard, CategorySection, WidgetCard, Modals)

🛠 Scripts

npm start – Run dev server
npm test – Run test suite
npm run build – Build for production

thank you :)