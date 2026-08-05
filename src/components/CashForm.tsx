import { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Stack,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Chip,
} from "@mui/material";

import PaymentsIcon from "@mui/icons-material/Payments";
import PersonIcon from "@mui/icons-material/Person";
import CloseIcon from "@mui/icons-material/Close";
import { Player } from "../App";

interface CashierFormProps {
  players: Player[];
  onSubmitCash: (playerId: number, amount: number) => void;
}

export function CashierForm({ players, onSubmitCash }: CashierFormProps) {
  const [searchInput, setSearchInput] = useState<string>("");
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [depositInput, setDepositInput] = useState<string>("");

  const filteredPlayers = searchInput.trim()
    ? players.filter((player) => {
        const searchClean = searchInput.replace(/\D/g, "");
        const playerCpfClean = player.cpf ? player.cpf.replace(/\D/g, "") : "";

        const matchesCpf = searchClean.length > 0 && playerCpfClean.includes(searchClean);
        const matchesName = player.name.toLowerCase().includes(searchInput.toLowerCase());

        return matchesCpf || matchesName;
      })
    : [];

  const handleSelectPlayer = (player: Player) => {
    setSelectedPlayer(player);
    setSearchInput("");
  };

  const handleClearPlayer = () => {
    setSelectedPlayer(null);
    setDepositInput("");
  };

  const handleDepositChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    value = value.replace(",", ".");
    value = value.replace(/[^0-9.]/g, "");

    const parts = value.split(".");
    if (parts.length > 2) {
      value = parts[0] + "." + parts.slice(1).join("");
    }

    if (parts[1] && parts[1].length > 2) {
      value = parts[0] + "." + parts[1].slice(0, 2);
    }

    setDepositInput(value);
  };

  const handleDepositSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const deposit = parseFloat(depositInput);

    if (!selectedPlayer || isNaN(deposit) || deposit <= 0) return;

    onSubmitCash(selectedPlayer.id, deposit);

    setSelectedPlayer(null);
    setDepositInput("");
  };

  return (
    <Box sx={{ maxWidth: 500, width: "100%" }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Stack spacing={2} sx={{ mb: 3, alignItems: "center" }}>
          <PaymentsIcon color="primary" sx={{ fontSize: 40 }} />
          <Typography variant="h5" component="h2" sx={{ fontWeight: "bold" }}>
            New Deposit
          </Typography>
        </Stack>

        <Box component="form" onSubmit={handleDepositSubmit} noValidate>
          <Stack spacing={3}>
            {selectedPlayer ? (
              <Chip
                icon={<PersonIcon />}
                label={`${selectedPlayer.name} — CPF: ${selectedPlayer.cpf}`}
                onDelete={handleClearPlayer}
                deleteIcon={<CloseIcon />}
                color="primary"
                variant="outlined"
                sx={{ py: 2.5, fontSize: 14, alignSelf: "flex-start" }}
              />
            ) : (
              <Box>
                <TextField
                  label="Search Player by name or CPF"
                  variant="outlined"
                  fullWidth
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Name or CPF"
                />

                {searchInput.trim() && (
                  <Paper variant="outlined" sx={{ mt: 1, maxHeight: 220, overflowY: "auto" }}>
                    {filteredPlayers.length > 0 ? (
                      <List disablePadding>
                        {filteredPlayers.map((player) => (
                          <ListItem key={player.id} disablePadding>
                            <ListItemButton onClick={() => handleSelectPlayer(player)}>
                              <ListItemText primary={player.name} secondary={`CPF: ${player.cpf}`} />
                            </ListItemButton>
                          </ListItem>
                        ))}
                      </List>
                    ) : (
                      <Typography sx={{ p: 2, color: "text.secondary" }} variant="body2">
                        No player found.
                      </Typography>
                    )}
                  </Paper>
                )}
              </Box>
            )}

            <TextField
              label="Deposit Amount"
              name="depositAmount"
              variant="outlined"
              fullWidth
              required
              placeholder="00.00"
              value={depositInput}
              onChange={handleDepositChange}
              disabled={!selectedPlayer}
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              disabled={!selectedPlayer}
              sx={{
                mt: 2,
                py: 1.5,
                fontWeight: "bold",
                backgroundColor: "#2e7d32",
                "&:hover": { backgroundColor: "#1b5e20" },
              }}
            >
              Deposit
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
}
