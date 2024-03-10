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
				<Analytics />
			</body>
		</html>
	);
}
