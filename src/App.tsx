import { useState } from "react";
import "./App.css";

import { GiPokerHand } from "react-icons/gi";
import { FiUsers, FiArrowLeft, FiUserPlus } from "react-icons/fi";

interface Player {
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
  const [players, setPlayers] = useState<Player[]>([
  ]);

  const [cpfInput, setCpfInput] = useState<string>("");
  const [phoneInput, setPhoneInput] = useState<string>("");

  const activePlayersCount = players.filter(player => player.isActive).length;

  const [currentScreen, setCurrentScreen] = useState<"dashboard" | "register" | "cashier">("dashboard");

  const addHouseBalance = (amount: number) => {
    setHouseBalance(prevBalance => prevBalance + amount);
  };

  const addHouseChips = (amount: number) => {
    setHouseChips(prevChips => prevChips + amount);
  };
  
  // Função para lidar com a mudança no campo de CPF
  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove tudo que não é número
    if (value.length > 11) value = value.slice(0, 11); // Limita a 11 dígitos

    // Aplica a formatação 999.999.999-99
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    
    setCpfInput(value);
  };

  // Função para lidar com a mudança no campo de telefone
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove tudo que não é número
    if (value.length > 11) value = value.slice(0, 11); // Limita a 11 dígitos

    // Aplica a formatação (99) 99999-9999
    value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
    value = value.replace(/(\d{5})(\d)/, "$1-$2");
    
    setPhoneInput(value);
  };

  const handleCreatePlayer = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const name = formData.get("playerName") as string
    const cpf = formData.get("playerCpf") as string;
    const phone = formData.get("playerNumber") as string;
    const email = formData.get("playerEmail") as string;

    if (!name.trim()) return; // Validação simples para não salvar nome vazio

    addPlayer(name, cpf, phone, email);

    e.currentTarget.reset(); // Limpa os campos do formulário automaticamente

    setCpfInput(""); // Limpa o estado do CPF
    setPhoneInput(""); // Limpa o estado do telefone

    setCurrentScreen("dashboard"); // Redireciona o usuário de volta ao Dashboard
  };

  const handleCashierAction = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const depositAmount = parseFloat(formData.get("depositAmount") as string);
    const withdrawAmount = parseFloat(formData.get("withdrawAmount") as string);

    if(!isNaN(depositAmount) && depositAmount > 0) {
      addHouseBalance(depositAmount);
    }
    if(!isNaN(withdrawAmount) && withdrawAmount > 0) {
      addHouseBalance(-withdrawAmount);
    }

    e.currentTarget.reset(); // Limpa os campos do formulário automaticamente
  }


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
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-left">
          <h2>Poker Dash</h2>
        </div>
        <div className="header-right">
            <button className={`btn switch-screen ${currentScreen === "dashboard" ? "active" : ""}` } onClick={() => setCurrentScreen("dashboard")}>
              <FiArrowLeft /> Dashboard
            </button>

            <button className={`btn switch-screen ${currentScreen === "register" ? "active" : ""}`} onClick={() => setCurrentScreen("register")}>
              <FiArrowLeft /> Register New Player
            </button>

            <button className={`btn switch-screen ${currentScreen === "cashier" ? "active" : ""}`} onClick={() => setCurrentScreen("cashier")}>
              <FiArrowLeft /> Cashier
            </button>
        </div>
      </header>

      <main className="main-content">
        {currentScreen === "dashboard" && (
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
        )}
          {/* ABA DE CADASTRO */}
          {currentScreen === "register" && (
          <div className="management-section">
            <h2>Register New Player</h2>
            <form onSubmit={handleCreatePlayer} className="player-form">
              <input
                type="text"
                name="playerName"
                placeholder="Name"
                className="player-input"
                required
              />
              <input
                type="text"
                name="playerCpf"
                value={cpfInput}
                onChange={handleCpfChange}
                placeholder="CPF"
                className="player-input"
                required
              />
              <input
                type="text"
                name="playerNumber"
                value={phoneInput}
                onChange={handlePhoneChange}
                placeholder="Phone"
                className="player-input"
                required
              />
              <input
                type="email"
                name="playerEmail"
                placeholder="Email"
                className="player-input"
                required
              />
              <button type="submit" className="btn-submit">
                Save Registration
              </button>
            </form>
          </div>
          )}
          {/* ABA DO CAIXA */}
          {currentScreen === "cashier" && (
            <div className="cashier-section">
              <h2>Cashier</h2>
              <form onSubmit={handleCashierAction} className="cashier-form">
                <input
                  type="number"
                  name="depositAmount"  
                  placeholder="Deposit Amount"
                  className="cashier-input"
                />
                <input
                  type="number"
                  name="withdrawAmount"
                  placeholder="Withdraw Amount"
                  className="cashier-input"
                />
                <button type="submit" className="btn-submit">
                  Perform Transaction
                </button>
              </form>
            </div>
          )}
      </main>
    </div>
  );
}

export default App;