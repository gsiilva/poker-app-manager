import { Paper, Typography, List, ListItem, ListItemText, Divider, Box } from "@mui/material";
import { format } from "date-fns";
import { Transaction } from "../App";

interface TransactionHistoryProps {
  transactions: Transaction[];
}

export function TransactionHistory({ transactions }: TransactionHistoryProps) {
  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 2, width: "100%", maxWidth: 350 }}>
      <Typography variant="h6" component="h2" sx={{ fontWeight: "bold", mb: 2 }}>
        Recent Transactions
      </Typography>

      {transactions.length === 0 ? (
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          No transactions yet.
        </Typography>
      ) : (
        <List disablePadding sx={{ maxHeight: 420, overflowY: "auto" }}>
          {transactions.map((transaction, index) => (
            <Box key={transaction.id}>
              <ListItem
                disablePadding
                sx={{ py: 1.25 }}
                secondaryAction={
                  <Typography sx={{ fontWeight: "bold", color: "#4caf50" }}>
                    + R$ {transaction.amount.toFixed(2)}
                  </Typography>
                }
              >
                <ListItemText
                  primary={transaction.playerName}
                  secondary={format(transaction.timestamp, "dd/MM HH:mm")}
                />
              </ListItem>
              {index < transactions.length - 1 && <Divider />}
            </Box>
          ))}
        </List>
      )}
    </Paper>
  );
}
