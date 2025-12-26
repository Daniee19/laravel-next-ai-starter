<?php

namespace App\Http\Controllers;

/*Se realizan las importaciones*/
use Illuminate\Http\Request;
use App\Services\AiService;

class AiController extends Controller
{
    public function ask(Request $request, AiService $ai)
    {
        $request->validate([
            'message' => 'required|string|min:5',
        ]);

        return response()->json(
            $ai->ask($request->message)
        );
    }
}
