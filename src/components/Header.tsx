import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

interface HeaderProps {
  currentScreen: "dashboard" | "register" | "cashier";
  setCurrentScreen: (screen: "dashboard" | "register" | "cashier") => void;
}

const navItems = [
  { key: "dashboard", label: "Dashboard", icon: <DashboardIcon /> },
  { key: "register", label: "New Player", icon: <PersonAddAlt1Icon /> },
  { key: "cashier", label: "Cashier", icon: <AttachMoneyIcon /> },
] as const;

export function Header({ currentScreen, setCurrentScreen }: HeaderProps) {
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        bgcolor: "#111111",
        borderBottom: "1px solid #222",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6" component="h2" sx={{ fontWeight: "bold", color: "#fff" }}>
          Your Poker House
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
          {navItems.map((item) => {
            const isActive = currentScreen === item.key;
            return (
              <Button
                key={item.key}
                onClick={() => setCurrentScreen(item.key)}
                startIcon={item.icon}
                sx={{
                  bgcolor: isActive ? "#fff" : "transparent",
                  color: isActive ? "#000" : "#fff",
                  border: isActive ? "none" : "1px solid rgba(255,255,255,0.3)",
                  borderRadius: "10px",
                  textTransform: "none",
                  fontWeight: "bold",
                  fontSize: 14,
                  px: 2,
                  "&:hover": {
                    bgcolor: isActive ? "#d1cece" : "rgba(255,255,255,0.08)",
                  },
                }}
              >
                {item.label}
              </Button>
            );
          })}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
