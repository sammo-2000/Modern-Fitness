import { notFound } from "next/navigation";
import Link from "next/link";
import { calculateAge } from "@/app/utils/age";
import { capitalizeFirstLetter } from "@/app/utils/capitalize";

import AddNote from "@/app/components/AddNote";
import GetPrograms from "@/app/components/GetProgram";
interface Params {
  id: any;
}
export const dynamicParams = true;

export async function generateStaticParams() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_FULL_DOMAIN}/api/users`,
    {
      next: {
        revalidate: 0,
      },
    },
  );

  const members = await res.json();

  return members.users.map((member: any) => ({
    ...member,
  }));
}

export default async function MemberDetails({ params }: { params: Params }) {
  const members = await generateStaticParams(); // Fetch all members

  const member = members.find((m: any) => m._id === params.id);

  if (!member) {
    notFound();
  }

  return (
    <div className="w-full flex-1 p-3">
      <h2 className=" mx-2 mb-3 text-xl font-bold">
        {capitalizeFirstLetter(member.first_name) +
          " " +
          capitalizeFirstLetter(member.last_name)}
      </h2>
      <div className="mx-4 mb-6 overflow-x-auto rounded-xl px-4 py-2 shadow">
        <p>
          <strong>Gender:</strong> {capitalizeFirstLetter(member.gender)}
        </p>
        <p>
          <strong>Date of Birth:</strong>{" "}
          {new Date(member.dob).toLocaleDateString()}
        </p>
        <p>
          <strong>Age:</strong> {calculateAge(member.dob)}
        </p>
        <p>
          <strong>Email:</strong> {member.email}
        </p>
        <p>
          <strong>Status:</strong> {capitalizeFirstLetter(member.status)}
        </p>
        <p>
          <strong>Role:</strong> {capitalizeFirstLetter(member.role)}
        </p>
      </div>
      <AddNote />
      <Link
        href="workout"
        className="mt-6 self-end rounded-xl px-4 py-2 text-sm font-bold text-blue-500 underline"
      >
        Create Program
      </Link>
      <GetPrograms MemberId={params.id} />
    </div>
  );
}
