<?php

namespace App\Services;

class AiService
{
    public function ask(string $message): array
    {
        $ch = curl_init();

        curl_setopt_array($ch, [
            CURLOPT_URL => 'https://api.groq.com/openai/v1/chat/completions',
            CURLOPT_POST => true,
            CURLOPT_HTTPHEADER => [
                'Authorization: Bearer ' . config('services.groq.token'),
                'Content-Type: application/json',
            ],

            //Convierte datos de PHP (arrays / objetos) en texto JSON, normalmente para enviarlos a una API.
            CURLOPT_POSTFIELDS => json_encode([
                'model' => 'llama-3.1-8b-instant',
                'messages' => [
                    [
                        'role' => 'system',
                        'content' => 'Devuelve exclusivamente un JSON válido con esta estructura:
                            {
                            "summary": string,
                            "steps": string[]
                            }
                            No incluyas markdown, explicaciones ni texto adicional.'
                    ],
                    [
                        'role' => 'user',
                        'content' => $message,
                    ],
                ],
                'temperature' => 0.2,
            ]),
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT => 30,
        ]);

        $response = curl_exec($ch);
        curl_close($ch);

        if ($response === false) {
            return [
                'summary' => 'Error de conexión con Groq',
                'steps' => [],
            ];
        }

        //Convierte la respuesta cruda de Groq (texto JSON) en un array de PHP para que puedas acceder a sus datos.
        $decoded = json_decode($response, true);

        //Estructura de respuesta de groq (simula OpenAI)
        //Groq no es OpenAI, pero se comporta como OpenAI para el desarrollador.
        $content = $decoded['choices'][0]['message']['content'] ?? null;

        if (!$content) {
            return [
                'summary' => 'Respuesta vacía de la IA',
                'steps' => [],
            ];
        }

        // 👇 AQUÍ está la clave
        $json = json_decode($content, true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            return [
                'summary' => 'La IA no devolvió JSON válido',
                'steps' => [],
            ];
        }

        return $json;
    }
}
