import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

const syne = Syne({
    subsets: ["latin"],
    variable: "--font-syne",
});

export const metadata: Metadata = {
    title: "CareerPilot",
    description: "Your AI Career Operating System",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={`${inter.variable} ${syne.variable}`}
            suppressHydrationWarning
        >
        {children}
        </body>
        </html>
    );
}