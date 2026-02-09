import { useState } from "react";

export default function AmountInput() {
  const [amount, setAmount] = useState("");

  return (
    <div style={{ marginBottom: "20px" }}>
      <label style={{ display: "block", marginBottom: "8px" }}>
        Enter the amount
      </label>

      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        style={{
          padding: "8px",
          borderRadius: "6px",
          border: "1px solid #ccc"
        }}
      />
    </div>
  );
}
