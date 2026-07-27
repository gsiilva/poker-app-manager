import { PlayerForm } from "../components/PlayerForm";

interface RegisterProps {
  onAddPlayer: (name: string, cpf: string, phone: string, email: string) => void;
}

export function Register({ onAddPlayer }: RegisterProps) {
  return <PlayerForm onSubmitPlayer={onAddPlayer} />;
}