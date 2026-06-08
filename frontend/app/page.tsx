"use client";

import AppLayout from "@/components/layout/AppLayout";
import { useState, useEffect } from "react";

type JobMatch = {
    title: string;
    company: string;
    location: string;
    fitScore: number;
    reason: string;
};

export default function JobsPage() {
    const [jobs, setJobs] = useState<JobMatch[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch real computed match ratings from our Java controller
        fetch("http://localhost:8080/api/jobs/match")
            .then((res) => res.json())
            .then((data) => {
                setJobs(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    return (
        <AppLayout>
            <div className="page-container" style={{ padding: "30px", maxWidth: "800px", margin: "0 auto" }}>
                <h1 style={{ fontFamily: "Syne", fontSize: "28px", marginBottom: "10px" }}>🎯 Job Hunter Agent</h1>
                <p style={{ color: "gray", marginBottom: "20px" }}>Real-time match scores calculated mathematically from your active profile skills.</p>

                {loading ? (
                    <div>Loading potential career matches...</div>
                ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                        {jobs.map((job, idx) => (
                            <div key={idx} style={{
                                border: "1px solid var(--glass-border)",
                                borderRadius: "12px",
                                padding: "20px",
                                background: "rgba(255,255,255,0.03)",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center"
                            }}>
                                <div>
                                    <h3 style={{ margin: "0 0 5px 0" }}>{job.title}</h3>
                                    <p style={{ margin: "0", color: "gray", fontSize: "14px" }}>{job.company} • {job.location}</p>
                                    <p style={{ margin: "10px 0 0 0", color: "#a78bfa", fontSize: "13px" }}>✨ {job.reason}</p>
                                </div>
                                <div style={{
                                    background: job.fitScore > 50 ? "rgba(74,222,128,0.15)" : "rgba(248,113,113,0.15)",
                                    border: job.fitScore > 50 ? "1px solid #4ade80" : "1px solid #f87171",
                                    color: job.fitScore > 50 ? "#4ade80" : "#f87171",
                                    padding: "10px 15px",
                                    borderRadius: "8px",
                                    fontWeight: "bold",
                                    fontSize: "18px"
                                }}>
                                    {job.fitScore}% Match
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}