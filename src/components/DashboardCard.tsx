import { ReactNode } from "react";

interface DashboardCardProps {
  title: string;
  children: ReactNode;
  actions?: ReactNode;
}

export function DashboardCard({ title, children, actions }: DashboardCardProps) {
  return (
    <div className="card">
      <h3 className="card-title">{title}</h3>
      <div className="card-body">{children}</div>
      {actions && <div className="card-btns">{actions}</div>}
    </div>
  );
}