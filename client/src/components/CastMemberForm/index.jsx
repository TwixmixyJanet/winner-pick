import React, { useState } from "react";

export default function CastMemberForm({ onAddCastMember }) {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAddCastMember(name);
    setName("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter cast member name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit">Add Cast Member</button>
    </form>
  );
}
