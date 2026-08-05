import { useState } from "react";

import { Header } from "./components/Header";
import { Dashboard } from "./pages/Dashboard";
import { Register } from "./pages/Register";
import { Cashier } from "./pages/Cashier";

import { createTheme, ThemeProvider, CssBaseline, Box, Toolbar } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#2e7d32", // Verde do Poker
    },
    background: {
      default: "#1a1a1a",
      paper: "#1e1e1e",
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

export interface Transaction {
  id: number;
  playerId: number;
  playerName: string;
  amount: number;
  timestamp: Date;
}

function App() {
  const [houseBalance, setHouseBalance] = useState<number>(0);
  const [houseChips, setHouseChips] = useState<number>(0);
  const [players, setPlayers] = useState<Player[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

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

  // Credita o depósito no saldo do jogador selecionado, no caixa da casa,
  // e registra a transação no histórico do Cashier.
  const depositToPlayer = (playerId: number, amount: number) => {
    const player = players.find((p) => p.id === playerId);
    if (!player) return;

    setPlayers((prevPlayers) =>
      prevPlayers.map((p) =>
        p.id === playerId ? { ...p, balance: p.balance + amount } : p
      )
    );
    addHouseBalance(amount);

    const newTransaction: Transaction = {
      id: transactions.length + 1,
      playerId,
      playerName: player.name,
      amount,
      timestamp: new Date(),
    };
    setTransactions((prevTransactions) => [newTransaction, ...prevTransactions]);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
        <Header currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />

        {/* Compensa a altura do AppBar fixo */}
        <Toolbar />

        <Box component="main" sx={{ p: 2.5 }}>
          {currentScreen === "dashboard" && (
            <Dashboard
              houseBalance={houseBalance}
              houseChips={houseChips}
              activePlayersCount={activePlayersCount}
              players={players}
              addHouseBalance={addHouseBalance}
              addHouseChips={addHouseChips}
            />
          )}

          {currentScreen === "register" && <Register onAddPlayer={addPlayer} />}

          {currentScreen === "cashier" && (
            <Cashier players={players} transactions={transactions} onDeposit={depositToPlayer} />
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
