import React from "react";

async function getMembers() {
  const res = await fetch("http://localhost:4000/api/users/");

  return res.json();
}

export default async function MemberList() {
  const members = await getMembers();
  console.log(members);
  return JSON.stringify(members);
}
