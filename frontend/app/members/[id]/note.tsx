"use client";
import { useState } from "react";
import Cookie from "../../utils/getCookie";

const Note = ({ note, id }: { note: string; id: string }) => {
  const [myNote, setMyNote] = useState(note || "");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const Token = Cookie("token") || "";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setMessage("");
    setError("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_FULL_DOMAIN}/api/user/${id}`,
        {
          method: "PATCH",
          body: JSON.stringify({ note: myNote }),
          headers: {
            "Content-Type": "application/json",
            authorization: Token,
          },
        },
      );
      const data = await res.json();
      if (res.ok) setMessage("Note added successfully");
      else setError(data.message);
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  return (
    <>
      <form
        className="mx-4 mt-2 flex flex-col gap-2 rounded-lg border p-3"
        onSubmit={handleSubmit}
      >
        <label htmlFor="note" className="font-bold">
          Note
        </label>
        <textarea
          onChange={(e) => setMyNote(e.target.value)}
          className="rounded-lg border p-2"
          name="note"
          id="note"
          placeholder="note"
          rows={5}
        >
          {note}
        </textarea>
        {message ? (
          <p className="rounded bg-green-100 p-2 text-green-500">{message}</p>
        ) : null}
        {error ? (
          <p className="rounded bg-red-100 p-2 text-red-500">{error}</p>
        ) : null}
        <button
          type="submit"
          className="ml-auto w-fit rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Save
        </button>
      </form>
    </>
  );
};

export default Note;
