import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const { token, user } = await req.json();
    cookies().set("token", token, {
      secure: true,
      expires: new Date(Date.now() + 60 * 60 * 24 * 14 * 1000),
    });

    cookies().set("role", user.role, {
      secure: true,
      expires: new Date(Date.now() + 60 * 60 * 24 * 14 * 1000),
    });

    return new Response(
      JSON.stringify({ success: true, message: "Cookies are set" }),
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ success: false, message: error.message }),
    );
  }
}
