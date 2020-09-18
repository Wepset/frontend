<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ProductController extends Controller
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
        $product = Product::query();

        foreach ($request->all() as $key => $arg) {
            $product->whereIn($key, [$arg]);
        }

        return response()->json($product->get());
    }
}
