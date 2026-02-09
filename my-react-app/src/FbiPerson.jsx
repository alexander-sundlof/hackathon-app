import { useEffect, useState } from "react";

export default function FbiPerson() {
  const [person, setPerson] = useState(null);

  useEffect(() => {
    fetch("https://api.fbi.gov/wanted/v1/list")
      .then(res => res.json())
      .then(data => {
        setPerson(data.items[1]); // first wanted person
      })
      .catch(err => console.error(err));
  }, []);

  if (!person) {
    return <p>Loading FBI data…</p>;
  }

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>FBI Wanted Person</h2>
      <h3>{person.title}</h3>

      

      <p>{person.description}</p>
    </div>
  );
}
