import { hideRewardAmount, cleanText } from "./textFunctions";
export default function FbiPerson({ person, showReward, showRealReward }) { if (!person) return <p>Loading FBI data…</p>;
     return ( <div
         style={{ marginTop: "20px" }}>
            <h2>{person.title}</h2> <h2>{"Gender: " + person.sex}</h2> <h2>{person.weight}</h2><h2>{person.hair}</h2> <p>{person.description}</p> {showReward && ( <p> <strong>Reward:</strong> {hideRewardAmount(person.reward_text) || "None listed"} </p> )} {showRealReward && ( <p> <strong>Reward:</strong> {person.reward_text || "None listed"} </p> )} </div> ); }
