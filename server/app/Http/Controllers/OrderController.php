<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $order = new \App\Models\Order();

        $products = $order->leftJoin('products', 'products.id', '=', 'orders.product_id')->get();

        foreach($products as $product) {
            $product->total_venda = 0;
            $price = $product->preco_venda;
            $product->total_venda = $product->quantity * $product->preco_venda;

            $product->preco_venda = [
                [
                    "value" => $price * 1.00,
                    "label" => ($price * 1.00) ." -> 0%",
                    "selected" => true
                ],
                [
                    "value" => $price * 0.96,
                    "label" => ($price * 0.96) ." -> 4%",
                    "selected" => false
                ],
                [
                    "value" => $price * 0.92,
                    "label" => ($price * 0.92) ." -> 8%",
                    "selected" => false
                ],
                [
                    "value" => 0.00,
                    "label" => "--OUTROS--",
                    "selected" => false
                ],
            ];
        }

        return response()->json($products);
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
        $order = Order::where('product_id', $request->id)->first();

        if ($order) {
            $order->quantity += 1;
        } else {
            $order = new Order();
            $order->product_id = $request->id;
            $order->quantity = 1;
        }

        $order->save();
        $product = Product::find($order->product_id);
        $product->quantity = $order->quantity;
        $product->total_venda = $product->quantity * $product->preco_venda;
        $price = $product->preco_venda;

        $product->preco_venda = [
            [
                "value" => $price * 1.00,
                "label" => ($price * 1.00) ." -> 0%",
                "selected" => true
            ],
            [
                "value" => $price * 0.96,
                "label" => ($price * 0.96) ." -> 4%",
                "selected" => false
            ],
            [
                "value" => $price * 0.92,
                "label" => ($price * 0.92) ." -> 8%",
                "selected" => false
            ],
            [
                "value" => $price * 0.00,
                "label" => "--OUTROS--",
                "selected" => false
            ],
        ];

        return response()->json($product);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function show(Order $order)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function edit(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Order $order)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function destroy(Order $order)
    {
        //
    }
}
