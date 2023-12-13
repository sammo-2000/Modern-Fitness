import React from "react";
import Data from "./data";
import { GetSessionParams, getSession } from "next-auth/react";

function LogWorkout() {
  return <Data />;
}
// function LogWorkout({ id }: { id: { name: string } }) {
//   return <Data id={id} />;
// }

export default LogWorkout;

// export async function getServerSideProps(
//   context: GetSessionParams | undefined,
// ) {
//   const session = await getSession(context);

//   return {
//     props: {
//       id: session?.user || null,
//     },
//   };
// }
