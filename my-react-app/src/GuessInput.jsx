export default function GuessInput({ guess, setGuess, onSubmit }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <label style={{ display: "block", marginBottom: "8px" }}>
        Enter the amount
      </label>

      <input
        type="number"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        onKeyDown={handleKeyDown}
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
