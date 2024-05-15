import { Analytics } from '@vercel/analytics/react';
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "ArjhanToteck"
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<link rel="icon" type="image/png" href="/favicon.png" />
			<body className={inter.className}>
				{children}
				<div className="divider bottomDivider"></div>
				<footer className="red">
					<p style={{ textAlign: "center", lineHeight: 1.5 }}>
						Contact: <a href="mailto:rppfjwwt@duck.com">rppfjwwt@duck.com</a>

						<br></br>

						<a href="https://github.com/ArjhanToteck/ArjhanToteck-Site-Next">Source Code</a>

						<br></br>

						&copy; 2024 ArjhanToteck
					</p>
				</footer>
				<Analytics />
			</body>
		</html>
	);
}
