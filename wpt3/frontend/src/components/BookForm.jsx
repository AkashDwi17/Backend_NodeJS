import React from "react";

export default function BookForm({ form, onChange, onSubmit, editId }) {
  return (
    <form onSubmit={onSubmit}>
      {["title", "author", "year", "genre", "status"].map((f) => (
        <input
          key={f}
          name={f}
          value={form[f]}
          onChange={onChange}
          placeholder={f.charAt(0).toUpperCase() + f.slice(1)}
          style={{ margin: "5px", padding: "5px" }}
          required
        />
      ))}
      <button type="submit">{editId ? "Update" : "Add"} Book</button>
    </form>
  );
}
