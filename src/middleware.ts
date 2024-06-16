import { NextResponse, NextRequest } from "next/server";
import { isExpired } from "react-jwt";
export function middleware(request: NextRequest) {
  const user = request.cookies.get("user");
  let url = request.url;
  // console.log("middleware says user", user);
  if (!user) {
    if (url.includes("/profile") || url.includes("/services")) {
      const url = request.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  } else {
    const userCookie = JSON.parse(user?.value);
    const accessToken = userCookie.accessToken;
    const refreshToken = userCookie.refreshToken;

    // console.log("aryant", "\n", accessToken, "\n", isExpired(accessToken));

    // for service and profile page
    if (
      isExpired(accessToken) &&
      (url.includes("/profile") || url.includes("/services"))
    ) {
      const url = request.nextUrl.clone();
      if (refreshToken) {
        if (!isExpired(refreshToken)) {
          console.log("refresh token not expired");
          url.pathname = "/session-expired";
          return NextResponse.redirect(url);
        } else {
          console.log("refresh token doesn't exist");
          url.pathname = "/";
          const response = NextResponse.redirect(url);
          response.cookies.delete("user");
          return response;
        }
      } else {
        console.log("refresh token doesn't exist");
        url.pathname = "/";
        const response = NextResponse.redirect(url);
        response.cookies.delete("user");
        return response;
      }
    }
  }

  // for session expired page
  if (user && url.includes("/session-expired")) {
    const userCookie = JSON.parse(user?.value);
    const accessToken = userCookie.accessToken;
    const refreshToken = userCookie.refreshToken;
    console.log(
      !(isExpired(accessToken) && refreshToken && !isExpired(refreshToken))
    );
    if (
      url.includes("/session-expired") &&
      !(isExpired(accessToken) && refreshToken && !isExpired(refreshToken))
    ) {
      const url = request.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }

  if (!user && url.includes("/session-expired")) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  // for accounts page
  if (user && url.includes("/account")) {
    const userCookie = JSON.parse(user?.value);
    const accessToken = userCookie.accessToken;
    const refreshToken = userCookie.refreshToken;

    if (!isExpired(accessToken) || (refreshToken && !isExpired(refreshToken))) {
      const url = request.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }
}
