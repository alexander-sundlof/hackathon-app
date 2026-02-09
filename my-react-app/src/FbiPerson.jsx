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
      <h2>FBI Wanted Person</h2>
      <h3>{person.title}</h3>
      <p>{reward ? `$${reward.toLocaleString()}` : "No reward listed"}</p>
    </div>
  );
}
