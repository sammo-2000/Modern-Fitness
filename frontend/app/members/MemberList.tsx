"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

async function getMembers(input: string) {
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_FULL_DOMAIN + "/api/users/" + input,
    );
    return res.json();
  } catch (error) {
    console.log(error);
  }
}

export default function MemberList() {
  const [input, setInput] = useState("");
  const [members, setMembers] = useState([]);

  useEffect(() => {
    getMembers(input).then((res) => setMembers(res.users));
  }, [input]);

  return (
    <>
      <div className="flex w-full items-center rounded border bg-gray-100 p-2 focus-within:border-accent">
        <FaSearch />
        <input
          className="ml-2 w-full bg-gray-100 outline-none"
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
        {members.map((member: any) => (
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
              href=""
              className="self-end rounded-xl bg-blue-500 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700"
            >
              View Member
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

function calculateAge(dobString: string) {
  const today = new Date();
  const dob = new Date(dobString);
  let age = today.getFullYear() - dob.getFullYear();
  const month = today.getMonth() - dob.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  return age;
}
