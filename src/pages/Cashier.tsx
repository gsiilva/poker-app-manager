import { Box } from "@mui/material";
import { CashierForm } from "../components/CashForm";
import { TransactionHistory } from "../components/TransactionHistory";
import { Player, Transaction } from "../App";

interface CashierProps {
  players: Player[];
  transactions: Transaction[];
  onDeposit: (playerId: number, amount: number) => void;
}

export function Cashier({ players, transactions, onDeposit }: CashierProps) {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 3,
        justifyContent: "center",
        alignItems: "flex-start",
        flexWrap: "wrap",
        mt: 15,
      }}
    >
      <CashierForm players={players} onSubmitCash={onDeposit} />
      <TransactionHistory transactions={transactions} />
    </Box>
  );
}
