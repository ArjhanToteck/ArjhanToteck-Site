import { NextResponse } from "next/server";

const CORS_ALLOWED_DOMAINS = JSON.parse(process.env.CORS_ALLOWED_DOMAINS);

export async function middleware(request) {
	const response = NextResponse.next();

	// get request origin
	const origin = request.headers.get("origin");

	// check if allowed
	if (!!origin && CORS_ALLOWED_DOMAINS.includes(origin)) {
		response.headers.set("Access-Control-Allow-Origin", origin);
	}

	return response;
}

export const config = {
	matcher: "/api/:path*"
};