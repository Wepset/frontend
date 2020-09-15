<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::resource('products', App\Http\Controllers\ProductController::class);

Route::get('getproducts', App\Http\Controllers\ProductController::class . '@getproducts')->name('getproducts');

Route::resource('consumers', App\Http\Controllers\ConsumerController::class);

Route::get('getconsumers', App\Http\Controllers\ConsumerController::class . '@getconsumers')->name('getconsumers');

Route::resource('orders', App\Http\Controllers\OrderController::class);
