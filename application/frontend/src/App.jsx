import "./App.css";
import "./styles/_index.css";
import LoginForm from "./components/LoginForm";
import Dashboard from "./components/Dashboard";
import useUserAuthStore from "./stores/userAuthStore";
import { DashboardProvider } from "./context/DashboardContext";

function App() {
  const { isLoggedIn } = useUserAuthStore();

  return !isLoggedIn ? (
    <LoginForm />
  ) : (
    <DashboardProvider>
      <Dashboard />
    </DashboardProvider>
  );
}

export default App;
