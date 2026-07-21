import { useState } from "react";
import "./App.css";

import { GiPokerHand } from "react-icons/gi";
import { FiUsers, FiArrowLeft, FiUserPlus } from "react-icons/fi";

interface Player {
  id: number;
  name: string;
  balance: number;
  isActive: boolean;
}

function App() {
  const [houseBalance, setHouseBalance] = useState<number>(0);
  const [houseChips, setHouseChips] = useState<number>(0);
  const [players, setPlayers] = useState<Player[]>([
    { id: 1, name: "Player 1", balance: 1000, isActive: true },
    { id: 2, name: "Player 2", balance: 1500, isActive: true },
    { id: 3, name: "Player 3", balance: 2000, isActive: false },
  ]);

  const activePlayersCount = players.filter(player => player.isActive).length;

  const [currentScreen, setCurrentScreen] = useState<"dashboard" | "register">("dashboard");

  const addHouseBalance = (amount: number) => {
    setHouseBalance(prevBalance => prevBalance + amount);
  };

  const addHouseChips = (amount: number) => {
    setHouseChips(prevChips => prevChips + amount);
  };

  const handleCreatePlayer = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const name = formData.get("playerName") as string; // Nome alterado para bater com o input
    const balance = parseInt(formData.get("playerBalance") as string) || 0; // Se não digitar nada, vira 0

    if (!name.trim()) return; // Validação simples para não salvar nome vazio

    addPlayer(name, balance);

    e.currentTarget.reset(); // Limpa os campos do formulário automaticamente
    setCurrentScreen("dashboard"); // Redireciona o usuário de volta ao Dashboard
  };

  const addPlayer = (name: string, balance: number) => {
    const newPlayer: Player = {
      id: players.length + 1,
      name,
      balance,
      isActive: true
    };
    setPlayers([...players, newPlayer]);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-left">
          <h2>Poker Dash</h2>
        </div>
        <div className="header-right">
          {currentScreen === "dashboard" ? (
            <button className="btn switch-screen" onClick={() => setCurrentScreen("register")}>
              <FiUserPlus /> New Player
            </button>
          ) : (
            <button className="btn switch-screen" onClick={() => setCurrentScreen("dashboard")}>
              <FiArrowLeft /> Back to Dashboard
            </button>
          )}
        </div>
      </header>

      <main className="main-content">
        {currentScreen === "dashboard" ? (
          /* ABA DO DASHBOARD */
          <div className="dashboard-grid">
            {/* Card 1: Balance */}
            <div className="card">
              <h3 className="card-title">House Balance</h3>
              <div className="card-body">
                <p className="card-valueMoney">R$ {houseBalance.toFixed(2)}</p>
              </div>
              <div className="card-btns">
                <button className="btn addBalance" onClick={() => addHouseBalance(100)}>Add R$100</button>
                <button className="btn removeBalance" onClick={() => addHouseBalance(-50)}>Remove R$50</button>
              </div>
            </div>

            {/* Card 2: Chips */}
            <div className="card">
              <h3 className="card-title">Chips in Game</h3>
              <div className="card-body">
                <GiPokerHand className="icon-chips" />
                <p className="card-valueChips">{houseChips}</p>
              </div>
              <div className="card-btns">
                <button className="btn addChips" onClick={() => addHouseChips(10)}>Add 10</button>
                <button className="btn removeChips" onClick={() => addHouseChips(-5)}>Remove 5</button>
              </div>
            </div>

            {/* Card 3: Players */}
            <div className="card">
              <h3 className="card-title">Active Players</h3>
              <div className="card-body">
                <FiUsers className="icon-players" />
                <p className="card-valuePlayers">{activePlayersCount}</p>
              </div>
            </div>
          </div>
        ) : (
          /* ABA DE CADASTRO */
          <div className="management-section">
            <h2>Register New Player</h2>
            <form onSubmit={handleCreatePlayer} className="player-form">
              {/* Adicionado a propriedade 'name' que o FormData precisa */}
              <input
                type="text"
                name="playerName"
                placeholder="Player Name..."
                className="player-input"
              />
              {/* Adicionado o input para coletar o saldo inicial (balance) */}
              <input
                type="number"
                name="playerBalance"
                placeholder="Initial Buy-in (R$)..."
                className="player-input"
              />
              <button type="submit" className="btn-submit">
                Save Registration
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;