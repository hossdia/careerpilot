"use client";

import AppLayout from "@/components/layout/AppLayout";
import { useState } from "react";

export default function AssistantPage() {
    const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = { role: "user", text: input };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setLoading(true);

        try {
            const response = await fetch("http://localhost:8080/api/assistant/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: "user_123", // Matches our local session ID
                    message: input
                })
            });

            const data = await response.json();

            setMessages((prev) => [...prev, { role: "ai", text: data.answer }]);
        } catch (error) {
            setMessages((prev) => [...prev, { role: "ai", text: "Error connecting to backend server!" }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AppLayout>
            <div className="page-container" style={{ padding: "30px", maxWidth: "700px", margin: "0 auto" }}>
                <h1 style={{ fontFamily: "Syne", fontSize: "28px", marginBottom: "20px" }}>🤖 AI Career Assistant</h1>

                {/* Chat Log Window */}
                <div style={{
                    border: "1px solid var(--glass-border)",
                    borderRadius: "12px",
                    padding: "20px",
                    height: "400px",
                    overflowY: "auto",
                    background: "rgba(255,255,255,0.05)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px"
                }}>
                    {messages.length === 0 && <p style={{ color: "gray" }}>Ask me anything about your career path or uploaded CV skills...</p>}
                    {messages.map((m, i) => (
                        <div key={i} style={{
                            alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                            background: m.role === "user" ? "#7c3aed" : "rgba(255,255,255,0.1)",
                            padding: "10px 14px",
                            borderRadius: "8px",
                            maxWidth: "80%",
                            color: "#fff"
                        }}>
                            <strong>{m.role === "user" ? "You: " : "AI: "}</strong> {m.text}
                        </div>
                    ))}
                    {loading && <div style={{ color: "gray" }}>AI is thinking...</div>}
                </div>

                {/* Input Controls */}
                <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type a message..."
                        style={{ flex: 1, padding: "12px", borderRadius: "8px", border: "1px solid #ccc", color: "#000" }}
                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    />
                    <button onClick={handleSend} style={{ padding: "12px 24px", background: "#7c3aed", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer" }}>
                        Send
                    </button>
                </div>
            </div>
        </AppLayout>
    );
}