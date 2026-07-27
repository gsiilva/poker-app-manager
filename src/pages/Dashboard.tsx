import { GiPokerHand } from "react-icons/gi";
import { FiUsers } from "react-icons/fi";
import { DashboardCard } from "../components/DashboardCard";

interface DashboardProps {
  houseBalance: number;
  houseChips: number;
  activePlayersCount: number;
  addHouseBalance: (amount: number) => void;
  addHouseChips: (amount: number) => void;
}

export function Dashboard({
  houseBalance,
  houseChips,
  activePlayersCount,
  addHouseBalance,
  addHouseChips,
}: DashboardProps) {
  return (
    <div className="dashboard-grid">
      {/* Card 1: Balance */}
      <DashboardCard
        title="House Balance"
        actions={
          <>
            <button className="btn addBalance" onClick={() => addHouseBalance(100)}>
              Add R$100
            </button>
            <button className="btn removeBalance" onClick={() => addHouseBalance(-50)}>
              Remove R$50
            </button>
          </>
        }
      >
        <p className="card-valueMoney">R$ {houseBalance.toFixed(2)}</p>
      </DashboardCard>

      {/* Card 2: Chips */}
      <DashboardCard
        title="Chips in Game"
        actions={
          <>
            <button className="btn addChips" onClick={() => addHouseChips(10)}>
              Add 10
            </button>
            <button className="btn removeChips" onClick={() => addHouseChips(-5)}>
              Remove 5
            </button>
          </>
        }
      >
        <GiPokerHand className="icon-chips" />
        <p className="card-valueChips">{houseChips}</p>
      </DashboardCard>

      {/* Card 3: Players */}
      <DashboardCard title="Active Players">
        <FiUsers className="icon-players" />
        <p className="card-valuePlayers">{activePlayersCount}</p>
      </DashboardCard>
    </div>
  );
}