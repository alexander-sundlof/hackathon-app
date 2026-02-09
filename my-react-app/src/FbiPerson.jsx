export default function FbiPerson({ person }) {
  if (!person) return <p>Loading FBI data…</p>

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>{person.title}</h2>

      

      <p>{person.description}</p>
      <p><strong>Reward:</strong> {person.reward_text || "None listed"}</p>
    </div>
  )
}

