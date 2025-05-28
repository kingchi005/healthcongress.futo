import {
	Link,
	Links,
	Meta,
	MetaFunction,
	Outlet,
	Scripts,
	ScrollRestoration,
	useRouteError,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

import "./tailwind.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Toaster } from "sonner";

export const links: LinksFunction = () => [
	{ rel: "preconnect", href: "https://fonts.googleapis.com" },
	{
		rel: "preconnect",
		href: "https://fonts.gstatic.com",
		crossOrigin: "anonymous",
	},
	{
		rel: "stylesheet",
		href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
	},
];

export const meta: MetaFunction = () => [{ title: "SICT'3RD SYMPOSIUM" }];
export function ErrorBoundary() {
	const error = useRouteError() as { status: string; statusText: string };
	console.log(error);

	return (
		<div className="max-w-md mx-auto w-full  rounded-lg p-8 text-center">
			<h1 className="text-6xl font-bold text-darkerGreen mb-4">
				{error.status}
			</h1>
			<h2 className="text-2xl font-semibold text-gray-800 mb-4">Error</h2>
			<p className="text-gray-600 mb-8">
				{error.statusText}
				{/* Oops! The page you're looking for doesn't exist or has been moved. */}
			</p>
			<Link
				className="inline-block bg-[var(--dark-blue)] text-white font-bold py-2 px-4 rounded hover:bg-[var(--dark-blue) transition-colors duration-200"
				to="/"
			>
				Go Back Home
			</Link>
		</div>
	);
}

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body className="bg-blue-900/20">
				<Header />
				<main className="bg-neutral-50">{children}</main>
				<Footer />
				<Toaster position="top-right" />
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export default function App() {
	return <Outlet />;
}
