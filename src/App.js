import { DashboardProvider } from "./store/dashboardStore";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <div className="App">
      <DashboardProvider>
        <Dashboard />
      </DashboardProvider>
    </div>
  );
}

export default App;
