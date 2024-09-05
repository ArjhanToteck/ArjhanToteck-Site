import { Analytics } from "@vercel/analytics/react";
import { Inter } from "next/font/google";
import Image from "next/image";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "ArjhanToteck"
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8"></meta>
				<link rel="icon" type="image/png" href="/images/favicon.png" />
				<Analytics />
			</head>
			<body className={inter.className}>
				<header className="red">
					<a className="hiddenLink" href="/" style={{
						width: "85%",
						display: "flex",
						alignItems: "center",
						color: "white",
						textDecoration: "none",
						fontSize: "20px"
					}}>
						<Image alt="" src="/images/logo.png" width="50" height="50" />
						<span style={{ width: "10px" }}>&nbsp;</span>
						<h2 style={{ display: "inline-block", }}>ArjhanToteck</h2>
					</a>
				</header>
				{children}
				<footer className="red">
					<p style={{ textAlign: "center", lineHeight: 1.5 }}>
						Contact: <a href="mailto:rppfjwwt@duck.com">rppfjwwt@duck.com</a>

						<br></br>

						<a href="https://github.com/ArjhanToteck/ArjhanToteck-Site-Next">Source Code</a>

						<br></br>

						&copy; 2020-{new Date().getFullYear()} ArjhanToteck
					</p>
				</footer>
			</body>
		</html>
	);
}
