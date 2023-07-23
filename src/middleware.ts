import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { env } from "./env.mjs";

export default withAuth(
  async function middleware(req) {
    const pathname = req.nextUrl.pathname;
    const token = await getToken({ req });
    const isAuth = !!token;
    const isAuthPage = pathname.startsWith("/login");
    const sensitiveRoutes = ["/dashboard"];

    if (isAuthPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL("/", req.url));
      }

      return null;
    }

    if (!isAuth) {
      let from = pathname;
      const search = req.nextUrl.search;
      if (search) {
        from += search;
      }

      return NextResponse.redirect(
        new URL(`/login?from=${encodeURIComponent(from)}`, req.url)
      );
    }

    if (
      sensitiveRoutes.some((route) => pathname.startsWith(route)) &&
      req.nextauth.token?.email !== env.ADMIN_EMAIL
    ) {
      return new NextResponse("You're not authorized!");
    }
  },
  {
    callbacks: {
      async authorized() {
        // This is a work-around for handling redirect on auth pages.
        // We return true here so that the middleware function above
        // is always called.
        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/login", "/dashboard/:path*"],
};
