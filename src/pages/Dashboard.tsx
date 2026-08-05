import { Box, Button, Typography, Paper, List, ListItem, ListItemText, Divider } from "@mui/material";
import CasinoIcon from "@mui/icons-material/Casino";
import GroupsIcon from "@mui/icons-material/Groups";
import { DashboardCard } from "../components/DashboardCard";
import { Player } from "../App";

interface DashboardProps {
  houseBalance: number;
  houseChips: number;
  activePlayersCount: number;
  players: Player[];
  addHouseBalance: (amount: number) => void;
  addHouseChips: (amount: number) => void;
}

export function Dashboard({
  houseBalance,
  houseChips,
  activePlayersCount,
  players,
  addHouseBalance,
  addHouseChips,
}: DashboardProps) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Box sx={{ display: "flex", gap: 2.5, flexWrap: "wrap" }}>
        {/* Card 1: Balance */}
        <DashboardCard
          title="House Balance"
          actions={
            <>
              <Button
                fullWidth
                variant="contained"
                size="small"
                onClick={() => addHouseBalance(100)}
                sx={{
                  bgcolor: "#4caf50",
                  fontWeight: "bold",
                  fontSize: 12,
                  "&:hover": { bgcolor: "#43a047" },
                }}
              >
                Add R$100
              </Button>
              <Button
                fullWidth
                variant="contained"
                size="small"
                onClick={() => addHouseBalance(-50)}
                sx={{
                  bgcolor: "#f44336",
                  fontWeight: "bold",
                  fontSize: 12,
                  "&:hover": { bgcolor: "#e53935" },
                }}
              >
                Remove R$50
              </Button>
            </>
          }
        >
          <Typography sx={{ fontSize: 26, fontWeight: "bold", color: "#4caf50" }}>
            R$ {houseBalance.toFixed(2)}
          </Typography>
        </DashboardCard>

        {/* Card 2: Chips */}
        <DashboardCard
          title="Chips in Game"
          actions={
            <>
              <Button
                fullWidth
                variant="contained"
                size="small"
                onClick={() => addHouseChips(10)}
                sx={{
                  bgcolor: "#2196f3",
                  fontWeight: "bold",
                  fontSize: 12,
                  "&:hover": { bgcolor: "#1e88e5" },
                }}
              >
                Add 10
              </Button>
              <Button
                fullWidth
                variant="contained"
                size="small"
                onClick={() => addHouseChips(-5)}
                sx={{
                  bgcolor: "#f44336",
                  fontWeight: "bold",
                  fontSize: 12,
                  "&:hover": { bgcolor: "#e53935" },
                }}
              >
                Remove 5
              </Button>
            </>
          }
        >
          <CasinoIcon sx={{ fontSize: 26, color: "#2196f3" }} />
          <Typography sx={{ fontSize: 26, fontWeight: "bold", color: "#2196f3" }}>
            {houseChips}
          </Typography>
        </DashboardCard>

        {/* Card 3: Players */}
        <DashboardCard title="Active Players">
          <GroupsIcon sx={{ fontSize: 24, color: "#ff9800" }} />
          <Typography sx={{ fontSize: 26, fontWeight: "bold", color: "#ff9800" }}>
            {activePlayersCount}
          </Typography>
        </DashboardCard>
      </Box>

      {/* Lista de jogadores e saldo atual */}
      <Paper sx={{ bgcolor: "#2a2a2a", borderRadius: 2, p: 2.5, maxWidth: 500, width: "100%" }}>
        <Typography
          variant="caption"
          component="h3"
          sx={{ color: "#aaaaaa", textTransform: "uppercase", letterSpacing: "0.5px" }}
        >
          Players
        </Typography>

        {players.length === 0 ? (
          <Typography variant="body2" sx={{ color: "text.secondary", py: 2 }}>
            No players registered yet.
          </Typography>
        ) : (
          <List disablePadding sx={{ mt: 1 }}>
            {players.map((player, index) => (
              <Box key={player.id}>
                <ListItem
                  disablePadding
                  sx={{ py: 1 }}
                  secondaryAction={
                    <Typography sx={{ fontWeight: "bold", color: "#4caf50" }}>
                      R$ {player.balance.toFixed(2)}
                    </Typography>
                  }
                >
                  <ListItemText
                    primary={player.name}
                    secondary={player.isActive ? "Active" : "Inactive"}
                  />
                </ListItem>
                {index < players.length - 1 && <Divider sx={{ borderColor: "#3a3a3a" }} />}
              </Box>
            ))}
          </List>
        )}
      </Paper>
    </Box>
  );
}
