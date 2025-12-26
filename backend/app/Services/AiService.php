<?php

namespace App\Services;

use Exception;
use OpenAI\OpenAI;

class AiService
{
    public function ask(string $message): array
    {
        try {
            // Crear cliente
            $client = \OpenAI::client(config('services.openai.key'));

            $response = $client->chat()->create([
                'model' => 'gpt-3.5-turbo',
                'messages' => [
                    [
                        'role' => 'system',
                        'content' => 'Eres un asistente que analiza situaciones y responde con un resumen y pasos claros.'
                    ],
                    [
                        'role' => 'user',
                        'content' => $message
                    ],
                ],
            ]);

            $content = $response->choices[0]->message->content;

            // Convertimos el texto en estructura simple
            return $this->formatResponse($content);
        } catch (Exception $e) {
            return [
                'summary' => 'Error al contactar con la IA.',
                'steps' => [
                    $e->getMessage()
                ]
            ];
        }
    }
    private function formatResponse(string $content): array
    {
        return [
            'summary' => $content,
            'steps' => [
                'Reflexiona sobre la situación',
                'Identifica una acción concreta',
                'Da el primer paso hoy'
            ]
        ];
    }
}
