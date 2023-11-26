"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useFetchedData } from "../context/MemberIdContext";
import { calculateAge } from "../utils/age";

async function getMembers(input: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_FULL_DOMAIN}/api/users/${input}`,
    );

    if (!res.ok) {
      throw new Error("Failed to fetch members");
    }

    const data = await res.json();

    if (!data || !data.users) {
      throw new Error("Invalid data format or empty response");
    }

    return data;
  } catch (error) {
    console.error(error);
    return { users: [] }; // Return empty array or handle error accordingly
  }
}

interface Member {
  _id: string;
  first_name: string;
  last_name: string;
  dob: string;
  status: string;
}

export default function MemberList() {
  const [input, setInput] = useState("");
  const [members, setMembers] = useState<Member[]>([]);
  const { handleViewMember } = useFetchedData();
  useEffect(() => {
    getMembers(input).then((res) => setMembers(res.users));
  }, [input]);

  return (
    <div className="w-full flex-1">
      <div className="mt-3 flex w-full items-center p-2 ">
        <input
          className="ml-2 h-14 w-full rounded-lg bg-gray-100 outline-none focus:ring-2 focus:ring-blue-400"
          id="searchbar"
          type="search"
          placeholder="Search for Member..."
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
      </div>
      <ul>
        {members.map((member: Member) => (
          <li
            key={member._id}
            className="my-6 flex items-center justify-between rounded p-4 shadow"
          >
            <div>
              <h3 className="text-lg">
                {member.first_name + " " + member.last_name}
              </h3>
              <p>
                <strong>Age:</strong> {calculateAge(member.dob)}
              </p>
              <p>
                <strong>Status:</strong> {member.status}
              </p>
            </div>

            <Link
              href={`/members/${member._id}`}
              className="self-end rounded-xl bg-blue-500 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700"
              onClick={() => handleViewMember(member._id)}
            >
              View Member
            </Link>
          </li>
        ))}
        {members.length === 0 && (
          <p className="p-4">No matching users "{input}"</p>
        )}
      </ul>
    </div>
  );
}
