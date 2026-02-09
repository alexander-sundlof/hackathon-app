import { useEffect, useState } from "react";
import { extractRewardAmount } from "./extractReward";

export default function FbiPerson() {
  const [person, setPerson] = useState(null);

  useEffect(() => {
    fetch("https://api.fbi.gov/wanted/v1/list")
      .then(res => res.json())
      .then(data => {
        setPerson(data.items[10]); // first wanted person
      })
      .catch(err => console.error(err));
  }, []);

  if (!person) {
    return <p>Loading FBI data…</p>;
  }

  const reward = extractRewardAmount(person.reward_text)
  console.log(reward)

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>{person.title}</h2>
      <p>{reward ? `$${reward.toLocaleString()}` : "No reward listed"}</p>
      <p><strong>Reward:</strong> {person.reward_text || "None listed"}</p>
    </div>
  )
}

