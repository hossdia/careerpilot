"use client";

import AppLayout from "@/components/layout/AppLayout";

export default function DashboardPage() {
    return (
        <AppLayout>
            <div className="page-container">
                <div
                    style={{
                        marginBottom: 32,
                    }}
                >
                    <p className="section-label">Dashboard</p>

                    <h1
                        style={{
                            fontSize: 42,
                            fontWeight: 800,
                            marginTop: 8,
                            marginBottom: 12,
                        }}
                    >
                        Welcome to <span className="grad-text">CareerPilot</span>
                    </h1>

                    <p
                        style={{
                            color: "var(--text-secondary)",
                            maxWidth: 700,
                        }}
                    >
                        Your AI-powered career operating system. Track applications,
                        discover opportunities, analyze skill gaps, and accelerate your
                        career growth.
                    </p>
                </div>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
                        gap: 20,
                        marginBottom: 30,
                    }}
                >
                    <div className="glass card">
                        <h3>Applications</h3>
                        <h1 style={{ marginTop: 12 }}>14</h1>
                    </div>

                    <div className="glass card">
                        <h3>Interviews</h3>
                        <h1 style={{ marginTop: 12 }}>2</h1>
                    </div>

                    <div className="glass card">
                        <h3>Goals Completed</h3>
                        <h1 style={{ marginTop: 12 }}>67%</h1>
                    </div>

                    <div className="glass card">
                        <h3>Readiness Score</h3>
                        <h1 style={{ marginTop: 12 }}>82%</h1>
                    </div>
                </div>

                <div className="glass card">
                    <h2
                        style={{
                            marginBottom: 16,
                        }}
                    >
                        AI Recommendations
                    </h2>

                    <ul
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 12,
                            color: "var(--text-secondary)",
                        }}
                    >
                        <li>Apply to 3 ML internships this week.</li>
                        <li>Improve SQL skills to increase fit score.</li>
                        <li>Complete your DSA roadmap milestone.</li>
                    </ul>
                </div>
            </div>
        </AppLayout>
    );
}