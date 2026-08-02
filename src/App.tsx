import { useState } from "react";
import "./App.css";

import { Header } from "./components/Header";
import { Dashboard } from "./pages/Dashboard";
import { Register } from "./pages/Register";
import { Cashier } from "./pages/Cashier";

import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#2e7d32', // Verde do Poker
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
});

export interface Player {
  id: number;
  name: string;
  cpf?: string;
  phone?: string;
  email?: string;
  balance: number;
  isActive: boolean;
}

function App() {
  const [houseBalance, setHouseBalance] = useState<number>(0);
  const [houseChips, setHouseChips] = useState<number>(0);
  const [players, setPlayers] = useState<Player[]>([]);

  const [currentScreen, setCurrentScreen] = useState<"dashboard" | "register" | "cashier">("dashboard");

  const activePlayersCount = players.filter((player) => player.isActive).length;

  const addHouseBalance = (amount: number) => {
    setHouseBalance((prevBalance) => prevBalance + amount);
  };

  const addHouseChips = (amount: number) => {
    setHouseChips((prevChips) => prevChips + amount);
  };

  const addPlayer = (name: string, cpf: string, phone: string, email: string) => {
    const newPlayer: Player = {
      id: players.length + 1,
      name,
      cpf,
      phone,
      email,
      balance: 0,
      isActive: true,
    };
    setPlayers([...players, newPlayer]);
    setCurrentScreen("dashboard");
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="app-container">
        <Header currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />

        <main className="main-content">
          {currentScreen === "dashboard" && (
            <Dashboard
              houseBalance={houseBalance}
              houseChips={houseChips}
              activePlayersCount={activePlayersCount}
              addHouseBalance={addHouseBalance}
              addHouseChips={addHouseChips}
            />
          )}

          {currentScreen === "register" && <Register onAddPlayer={addPlayer} />}

          {currentScreen === "cashier" && <Cashier onAddCash={addHouseBalance} />}
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;