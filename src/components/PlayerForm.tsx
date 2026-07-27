import { useState } from "react";

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
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const name = formData.get("playerName") as string;
    const cpf = formData.get("playerCpf") as string;
    const phone = formData.get("playerNumber") as string;
    const email = formData.get("playerEmail") as string;

    if (!name.trim()) return;

    onSubmitPlayer(name, cpf, phone, email);

    e.currentTarget.reset();
    setCpfInput("");
    setPhoneInput("");
  };

  return (
    <div className="management-section">
      <h2>Register New Player</h2>
      <form onSubmit={handleSubmit} className="player-form">
        <input
          type="text"
          name="playerName"
          placeholder="Name"
          className="player-input"
          required
        />
        <input
          type="text"
          name="playerCpf"
          value={cpfInput}
          onChange={handleCpfChange}
          placeholder="CPF"
          className="player-input"
          required
        />
        <input
          type="text"
          name="playerNumber"
          value={phoneInput}
          onChange={handlePhoneChange}
          placeholder="Phone"
          className="player-input"
          required
        />
        <input
          type="email"
          name="playerEmail"
          placeholder="Email"
          className="player-input"
          required
        />
        <button type="submit" className="btn-submit">
          Save Registration
        </button>
      </form>
    </div>
  );
}