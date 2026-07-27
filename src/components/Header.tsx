import { FiGrid, FiUser, FiDollarSign } from "react-icons/fi";

interface HeaderProps {
  currentScreen: "dashboard" | "register" | "cashier";
  setCurrentScreen: (screen: "dashboard" | "register" | "cashier") => void;
}

export function Header({ currentScreen, setCurrentScreen }: HeaderProps) {
  return (
    <header className="app-header">
      <div className="header-left">
        <h2>Your Poker House</h2>
      </div>
      <div className="header-right">
        <button
          className={`btn switch-screen ${currentScreen === "dashboard" ? "active" : ""}`}
          onClick={() => setCurrentScreen("dashboard")}
        >
          <FiGrid /> Dashboard
        </button>

        <button
          className={`btn switch-screen ${currentScreen === "register" ? "active" : ""}`}
          onClick={() => setCurrentScreen("register")}
        >
          <FiUser /> New Player
        </button>

        <button
          className={`btn switch-screen ${currentScreen === "cashier" ? "active" : ""}`}
          onClick={() => setCurrentScreen("cashier")}
        >
          <FiDollarSign /> Cashier
        </button>
      </div>
    </header>
  );
}