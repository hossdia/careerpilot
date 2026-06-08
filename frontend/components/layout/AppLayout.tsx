"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

const navItems = [
    {
        name: "Dashboard",
        href: "/",
        icon: "🏠",
    },
    {
        name: "Job Hunter",
        href: "/jobs",
        icon: "🎯",
    },
    {
        name: "CV Intelligence",
        href: "/cv",
        icon: "📄",
    },
    {
        name: "AI Assistant",
        href: "/assistant",
        icon: "🤖",
    },
    {
        name: "Tracker",
        href: "/tracker",
        icon: "📊",
    },
];

export default function AppLayout({ children }: Props) {
    const pathname = usePathname();

    return (
        <div
            style={{
                display: "flex",
                minHeight: "100vh",
            }}
        >
            {/* Sidebar */}

            <aside
                className="glass"
                style={{
                    width: 280,
                    padding: 24,
                    borderRight: "1px solid var(--glass-border)",
                    position: "sticky",
                    top: 0,
                    height: "100vh",
                }}
            >
                {/* Logo */}

                <div
                    style={{
                        marginBottom: 40,
                    }}
                >
                    <div
                        style={{
                            fontFamily: "var(--font-syne)",
                            fontWeight: 800,
                            fontSize: 28,
                            marginBottom: 8,
                        }}
                    >
                        Career<span className="grad-text">Pilot</span>
                    </div>

                    <p
                        style={{
                            color: "var(--text-muted)",
                            fontSize: 13,
                            lineHeight: 1.6,
                        }}
                    >
                        Your AI Career Operating System
                    </p>
                </div>

                {/* Navigation */}

                <nav
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 8,
                    }}
                >
                    {navItems.map((item) => {
                        const active = pathname === item.href;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                style={{
                                    padding: "14px 16px",
                                    borderRadius: 16,
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 12,
                                    transition: "all .2s ease",
                                    background: active
                                        ? "rgba(139,92,246,.15)"
                                        : "transparent",
                                    border: active
                                        ? "1px solid rgba(139,92,246,.3)"
                                        : "1px solid transparent",
                                }}
                            >
                                <span>{item.icon}</span>

                                <span
                                    style={{
                                        fontWeight: active ? 600 : 500,
                                    }}
                                >
                  {item.name}
                </span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Bottom Card */}

                <div
                    className="glass"
                    style={{
                        marginTop: "auto",
                        padding: 18,
                        borderRadius: 18,
                        marginTop: 32,
                    }}
                >
                    <div
                        style={{
                            fontSize: 12,
                            color: "var(--text-muted)",
                            marginBottom: 6,
                        }}
                    >
                        PROFILE HEALTH
                    </div>

                    <div
                        style={{
                            fontSize: 26,
                            fontWeight: 800,
                        }}
                    >
                        82%
                    </div>

                    <div
                        style={{
                            color: "var(--text-secondary)",
                            fontSize: 13,
                            marginTop: 4,
                        }}
                    >
                        Job readiness score
                    </div>
                </div>
            </aside>

            {/* Main */}

            <main
                style={{
                    flex: 1,
                    minWidth: 0,
                }}
            >
                {/* Topbar */}

                <header
                    className="glass"
                    style={{
                        height: 72,
                        padding: "0 32px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        borderBottom: "1px solid var(--glass-border)",
                        position: "sticky",
                        top: 0,
                        zIndex: 50,
                    }}
                >
                    <div>
                        <h3
                            style={{
                                fontFamily: "var(--font-syne)",
                                fontSize: 18,
                                fontWeight: 700,
                            }}
                        >
                            CareerPilot
                        </h3>
                    </div>

                    <div
                        style={{
                            display: "flex",
                            gap: 12,
                            alignItems: "center",
                        }}
                    >
                        <button className="btn-ghost">
                            Notifications
                        </button>

                        <button className="btn-primary">
                            Upgrade
                        </button>
                    </div>
                </header>

                {/* Content */}

                <div className="content-width">
                    {children}
                </div>
            </main>
        </div>
    );
}