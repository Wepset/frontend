<?php

namespace App\Http\Controllers;

use App\Models\Consumer;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ConsumerController extends Controller
{
    /**
     * Get a listing of products with some conditions.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        $consumer = Consumer::query();

        foreach ($request->all() as $key => $arg) {
            $consumer->where(strtolower($key), 'like', "%{$arg}%");
        }

        return response()->json($consumer->get());
    }
}
