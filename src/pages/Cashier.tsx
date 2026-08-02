import { CashierForm } from "../components/CashForm";

interface CashierProps {
  onAddCash: (amount: number) => void;
}

export function Cashier({ onAddCash }: CashierProps) {
  return <CashierForm onSubmitCash={onAddCash} />;
}