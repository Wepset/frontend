<?php

namespace App\Http\Controllers;

use App\Models\Consumer;
use Illuminate\Http\Request;

class ConsumerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(\App\Models\Consumer::all());
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Consumer  $consumer
     * @return \Illuminate\Http\Response
     */
    public function show(Consumer $consumer)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Consumer  $consumer
     * @return \Illuminate\Http\Response
     */
    public function edit(Consumer $consumer)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Consumer  $consumer
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Consumer $consumer)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Consumer  $consumer
     * @return \Illuminate\Http\Response
     */
    public function destroy(Consumer $consumer)
    {
        //
    }

    /**
     * Get an listing of products with some conditions.
     * 
     * @param Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function getconsumers(Request $request): \Illuminate\Http\JsonResponse
    {
        $consumer = \App\Models\Consumer::query();

        foreach ($request->all() as $key => $arg) {
            $consumer->where(strtolower($key), 'like', "%{$arg}%");
        }

        return response()->json($consumer->get());
    }
}
