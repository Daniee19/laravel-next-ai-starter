'use client';

import { useState } from 'react';

interface Response {
    summary: string;
    steps: string[];
}

export default function ChatBox() {
    const [message, setMessage] = useState('');
    const [response, setResponse] = useState<Response | null>(null);
    const [loading, setLoading] = useState(false);

    const sendMessage = async () => {
        if (!message.trim()) return;

        setLoading(true);
        try {
            const res = await fetch('http://127.0.0.1:8000/api/ai/ask', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message }),
            });
            const data = await res.json();
            setResponse(data);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
            sendMessage();
        }
    };

    return (
        <div className="w-full max-w-3xl mx-auto space-y-6">
            {/* Input Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 block">
                        Your Question
                    </label>
                    <textarea
                        className="w-full p-4 border border-slate-300 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none disabled:bg-slate-50 disabled:text-slate-500"
                        placeholder="Describe your situation or ask a question..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        rows={4}
                        disabled={loading}
                    />
                    <p className="text-xs text-slate-500">
                        Press <kbd className="px-2 py-0.5 bg-slate-100 rounded border border-slate-300">⌘ + Enter</kbd> to send
                    </p>
                </div>

                <button
                    onClick={sendMessage}
                    disabled={loading || !message.trim()}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-slate-300 disabled:to-slate-400 text-white font-medium px-6 py-3.5 rounded-xl transition-all duration-200 disabled:cursor-not-allowed shadow-sm hover:shadow-md flex items-center justify-center gap-2"
                >
                    {loading ? (
                        <>
                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Analyzing...
                        </>
                    ) : (
                        <>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            Get Insights
                        </>
                    )}
                </button>
            </div>

            {/* Response Card */}
            {response && (
                <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden animate-fade-in">
                    {/* Summary Section */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b border-slate-200">
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 shadow-sm">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-sm font-semibold text-slate-700 mb-2 uppercase tracking-wide">
                                    Summary
                                </h3>
                                <p className="text-slate-900 font-medium text-lg leading-relaxed">
                                    {response.summary}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Steps Section */}
                    <div className="p-6">
                        <h3 className="text-sm font-semibold text-slate-700 mb-4 uppercase tracking-wide">
                            Action Steps
                        </h3>
                        <ul className="space-y-3">
                            {response.steps.map((step: string, i: number) => (
                                <li key={i} className="flex items-start gap-3 group">
                                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 text-slate-700 text-sm font-semibold flex-shrink-0 group-hover:bg-blue-100 group-hover:text-blue-700 transition-colors">
                                        {i + 1}
                                    </span>
                                    <span className="text-slate-700 leading-relaxed pt-0.5">
                                        {step}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}