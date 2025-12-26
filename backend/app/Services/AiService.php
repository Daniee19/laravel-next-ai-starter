<?php

namespace App\Services;

class AiService
{
    public function ask(string $message): array
    {
        return [
            'summary' => 'Respuesta simulada de IA',
            'steps' => [
                'Paso 1: Analizar el problema',
                'Paso 2: Evaluar opciones',
                'Paso 3: Recomendar acción'
            ]
        ];
    }
}
