import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
export default withAuth(
  function middleware(req) {
    const cookieStore = cookies();
    const role = cookieStore.get("role");
    console.log(req.nextUrl.pathname);
    console.log(req.nextauth.token.role);

    if (
      req.nextUrl.pathname.startsWith("/members") &&
      role.value != "trainer" &&
      role.value != "manager"
    ) {
      return NextResponse.rewrite(new URL("/Denied", req.url));
    }

    if (
      req.nextUrl.pathname.startsWith("/events/create") &&
      role.value != "trainer" &&
      role.value != "manager"
    ) {
      return NextResponse.rewrite(new URL("/Denied", req.url));
    }

    if (
      req.nextUrl.pathname.startsWith("/events/edit") &&
      role.value != "trainer" &&
      role.value != "manager"
    ) {
      return NextResponse.rewrite(new URL("/Denied", req.url));
    }

    if (
      req.nextUrl.pathname.startsWith("/createTrainer") &&
      role.value != "manager"
    ) {
      return NextResponse.rewrite(new URL("/Denied", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  },
);

export const config = { matcher: ["/members", "/createTrainer", "/events/create", "/events/edit"] };
