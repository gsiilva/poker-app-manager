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
  ListItemText
} from "@mui/material";

import PaymentsIcon from '@mui/icons-material/Payments';
import { Player } from "../App";

interface CashierFormProps {
  onSubmitCash: (amount: number) => void;
}

interface PlayerListProps {
  players: Player[];
}

export function PlayerSearchList({ players }: PlayerListProps) {
  const [searchItem, setSearchItem] = useState<string>("");

  const filteredPlayers = players.filter((player) => {
    const searchClean = searchItem.replace(/\D/g, "");
    const playerCpfClean = player.cpf ? player.cpf.replace(/\D/g, "") : "";

    const matchesCpf = searchClean ? playerCpfClean.includes(searchClean) : false;
    const matchesName = player.name.toLowerCase().includes(searchItem.toLowerCase());

    return matchesCpf || matchesName;
  });

  return (
    <Box sx={{ mt: 2 }}>
      <TextField
        label="Search Player"
        variant="outlined"
        fullWidth
        value={searchItem}
        onChange={(e) => setSearchItem(e.target.value)}
      />
      <List>
        {filteredPlayers.map((player) => (
          <ListItem key={player.id}>
            <ListItemText primary={player.name} secondary={`CPF: ${player.cpf}`} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
} 

export function CashierForm({ onSubmitCash }: CashierFormProps) {
  const [cpfInput, setCpfInput] = useState<string>("");
  const [depositInput, setDepositInput] = useState<string>("");

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 11) value = value.slice(0, 11);
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    setCpfInput(value);
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

    if (!cpfInput.trim() || isNaN(deposit) || deposit <= 0) return;

    onSubmitCash(deposit);
    
    setCpfInput("");
    setDepositInput("");
  };

  return (
    <Box sx={{ maxWidth: 500, margin: "auto", mt: 15 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Stack spacing={2} sx={{ mb: 3, alignItems: "center" }}>
          <PaymentsIcon color="primary" sx={{ fontSize: 40 }} />
          <Typography variant="h5" component="h2" sx={{ fontWeight: "bold" }}>
            New Deposit
          </Typography>
        </Stack>

        <Box component="form" onSubmit={handleDepositSubmit} noValidate>
          <Stack spacing={3}>
            <TextField
              label="Search Player's CPF"
              name="PlayerCpf"
              variant="outlined"
              fullWidth
              required
              placeholder="000.000.000-00"
              value={cpfInput}
              onChange={handleCpfChange}
            />

            <TextField
              label="Deposit Amount"
              name="depositAmount"
              variant="outlined"
              fullWidth
              required
              placeholder="00.00"
              value={depositInput}
              onChange={handleDepositChange}
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              sx={{
                mt: 2,
                py: 1.5,
                fontWeight: 'bold',
                backgroundColor: '#2e7d32',
                '&:hover': { backgroundColor: '#1b5e20' }
              }}>
              Deposit
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
}