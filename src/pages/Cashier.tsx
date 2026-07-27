interface CashierProps {
  addHouseBalance: (amount: number) => void;
}

export function Cashier({ addHouseBalance }: CashierProps) {
  const handleCashierAction = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const depositAmount = parseFloat(formData.get("depositAmount") as string);
    const withdrawAmount = parseFloat(formData.get("withdrawAmount") as string);

    if (!isNaN(depositAmount) && depositAmount > 0) {
      addHouseBalance(depositAmount);
    }
    if (!isNaN(withdrawAmount) && withdrawAmount > 0) {
      addHouseBalance(-withdrawAmount);
    }

    e.currentTarget.reset();
  };

  return (
    <div className="cashier-section">
      <h2>Cashier</h2>
      <form onSubmit={handleCashierAction} className="cashier-form">
        <input
          type="number"
          name="depositAmount"
          placeholder="Deposit Amount"
          className="cashier-input"
        />
        <input
          type="number"
          name="withdrawAmount"
          placeholder="Withdraw Amount"
          className="cashier-input"
        />
        <button type="submit" className="btn-submit">
          Perform Transaction
        </button>
      </form>
    </div>
  );
}