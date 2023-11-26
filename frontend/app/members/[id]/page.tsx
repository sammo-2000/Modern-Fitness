import { notFound } from "next/navigation";
import Link from "next/link";

import AddNote from "@/app/components/AddNote";
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
      <h2 className=" mb-2 text-lg font-bold">
        {member.first_name + " " + member.last_name}
      </h2>
      <div className="ml-4">
        <p>{member.gender}</p>
        <p>{member.dob}</p>
        <p>{member.email}</p>
        <p>{member.status}</p>
        <p>{member.role}</p>
      </div>
      <AddNote />
      <Link
        href="/workout"
        className="mt-6 self-end rounded-xl  px-4 py-2 text-sm font-bold text-blue-500 underline"
      >
        Create Program
      </Link>
    </div>
  );
}
