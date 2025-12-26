"use client"
import React from 'react'
import { useState } from "react";
interface ResponseData {
    summary: string,
    steps: string[]
}
export default function ChatBot() {

    //Declaraciones de estado
    const [message, setMessage] = useState("");
    const [response, setResponse] = useState<ResponseData | null>(null);
    const [loading, setLoading] = useState(false);

    //Function al mandar el mensaje
    const sendMessage = async () => {
        setLoading(true);
        const res = await fetch("http://127.0.0.1:8000/api/ai/ask", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message }),
        });

        const data = await res.json();
        setResponse(data);
        setLoading(false);
    }

    return (
        <div className='w-full max-w-xl space-y-4'>
            {/*useState para asignar el valor que se está ingresando al textarea*/}
            <textarea
                className='w-full p-3 border rounded text-black'
                placeholder='Describe tu situación...'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />

            <button
                onClick={sendMessage}
                disabled={loading}
                className='bg-black text-white px-4 py-2 rounded'>
                {loading ? "Pensando..." : "Consultar"}
            </button>

            {response && (
                <div className='bg-gray-100 p-4 rounded space-y-2 text-black'>
                    <p className='font-semibold'>{response.summary}</p>
                    {/*.steps es una propiedad de la respuesta de la api*/}
                    <ul className='list-disc ml-5'>
                        {response.steps.map((step: string, i: number) => (
                            <li key={i}>{step}</li>
                        ))}
                    </ul>
                </div>
            )}

        </div>
    )
}
