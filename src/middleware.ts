import { NextResponse, NextRequest } from "next/server";
import jwt_decode from "jwt-decode";
import { decode } from "querystring";
import { RemoveAllToken } from "./common/hooks/token";
import { destroyCookie } from "nookies";

export function middleware(req: NextRequest) {
  const storedUser:any = req.cookies.get("userToken");
 
  console.log("middleware:::", storedUser);

  // Decode the JWT to get the expiration timestamp
  var decoded:any = storedUser && jwt_decode(storedUser?.value)
  const currentTime = Math.floor(Date.now() / 1000);

  if (!storedUser ) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }else if( decoded?.exp < currentTime){
    destroyCookie(null, "userToken", { path: "/" });
   
      return NextResponse.redirect(new URL("/auth/login", req.url));

  }

  return NextResponse.next();
}

export const config = {
  matcher: "/",
};
