"use client";
import React, { useEffect, useState } from "react";
import { useFetchedData } from "../context/MemberIdContext";

function AddNote() {
  const { MemberId } = useFetchedData();

  const [note, setNote] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmission = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_FULL_DOMAIN}/api/user/${MemberId}`,
        {
          method: "PATCH",
          body: JSON.stringify({ note }),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (res.ok) {
        // Content successfully updated
        setMessage("Note added successfully");
        console.log("Note updated successfully");
      } else {
        // Handle errors if needed
        setMessage("Failed to add note");
        console.error("Failed to update content");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Failed to add note");
    }
  };

  return (
    <form onSubmit={handleSubmission} className="mx-4 flex flex-col">
      <textarea
        placeholder="Add note..."
        onChange={(e) => setNote(e.target.value)}
        className="block w-full rounded-xl"
        value={note}
      />
      <button
        type="submit"
        className="mb-2 mt-6 self-end rounded-xl bg-blue-500 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700"
      >
        Add Note
      </button>
      {message && (
        <p
          className={`mb-6 rounded-lg px-5 py-2 ${
            message.includes("Failed")
              ? "bg-red-100 text-red-600"
              : "bg-green-100 text-green-600"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
}

export default AddNote;
