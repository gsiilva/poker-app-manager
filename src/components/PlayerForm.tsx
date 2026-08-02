import { useState } from "react";
// Importações dos componentes do MUI
import { 
  TextField, 
  Button, 
  Typography, 
  Box, 
  Paper, 
  Stack 
} from "@mui/material";
// Ícones do MUI
import PersonAddIcon from '@mui/icons-material/PersonAdd';

interface PlayerFormProps {
  onSubmitPlayer: (name: string, cpf: string, phone: string, email: string) => void;
}

export function PlayerForm({ onSubmitPlayer }: PlayerFormProps) {
  const [cpfInput, setCpfInput] = useState<string>("");
  const [phoneInput, setPhoneInput] = useState<string>("");

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 11) value = value.slice(0, 11);
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    setCpfInput(value);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 11) value = value.slice(0, 11);
    value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
    value = value.replace(/(\d{5})(\d)/, "$1-$2");
    setPhoneInput(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // nao recarrega a tela ao enviar o formulário
    const formData = new FormData(e.currentTarget);
    const name = formData.get("playerName") as string;
    const cpf = cpfInput;
    const phone = phoneInput;
    const email = formData.get("playerEmail") as string;

    if (!name.trim() || !cpf.trim() || !phone.trim() || !email.trim()) return;

    onSubmitPlayer(name, cpf, phone, email);
    e.currentTarget.reset();
    setCpfInput("");
    setPhoneInput("");
  };

  return (
    <Box sx={{ maxWidth: 500, margin: "auto", mt: 15 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2}}>
        <Stack spacing={2} sx={{ mb: 3, alignItems: "center" }}>
          <PersonAddIcon color="primary" sx={{ fontSize: 40 }} />
          <Typography variant="h5" component="h2" sx={{ fontWeight: "bold" }}>
            Register New Player
          </Typography>
        </Stack>

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Stack spacing={3}>
            <TextField
              label="Full Name"
              name="playerName"
              variant="outlined"
              fullWidth
              required
            />

            <TextField
              label="CPF"
              name="playerCpf"
              variant="outlined"
              fullWidth
              required
              value={cpfInput}
              onChange={handleCpfChange}
              placeholder="000.000.000-00"
            />

            <TextField
              label="Phone"
              name="playerNumber"
              variant="outlined"
              fullWidth
              required
              value={phoneInput}
              onChange={handlePhoneChange}
              placeholder="(00) 00000-0000"
            />

            <TextField
              label="Email Address"
              name="playerEmail"
              type="email"
              variant="outlined"
              fullWidth
              required
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
              }}
            >
              Save Registration
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
}