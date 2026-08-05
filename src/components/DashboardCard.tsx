import { ReactNode } from "react";
import { Card, CardContent, Typography, Box, Stack } from "@mui/material";

interface DashboardCardProps {
  title: string;
  children: ReactNode;
  actions?: ReactNode;
}

export function DashboardCard({ title, children, actions }: DashboardCardProps) {
  return (
    <Card
      sx={{
        width: 250,
        bgcolor: "#2a2a2a",
        borderRadius: 2,
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <CardContent>
        <Typography
          variant="caption"
          component="h3"
          sx={{ color: "#aaaaaa", textTransform: "uppercase", letterSpacing: "0.5px" }}
        >
          {title}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1.25 }}>
          {children}
        </Box>

        {actions && (
          <Stack direction="row" spacing={1} sx={{ mt: 1.875, width: "100%" }}>
            {actions}
          </Stack>
        )}
      </CardContent>
    </Card>
  );
}
