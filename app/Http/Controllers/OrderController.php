<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'delivery_address' => 'required|string',
            'items' => 'required|array',
            'items.*.medicine_name' => 'required|string',
            'items.*.quantity' => 'required|integer',
            'items.*.price' => 'required|numeric',
        ]);

        $order = Order::create([
            'user_id' => Auth::id(),
            'delivery_address' => $request->delivery_address,
            'total_price' => array_reduce($request->items, function ($carry, $item) {
                return $carry + ($item['price'] * $item['quantity']);
            }, 0),
        ]);

        foreach ($request->items as $item) {
            OrderItem::create([
                'order_id' => $order->id,
                'medicine_name' => $item['medicine_name'],
                'quantity' => $item['quantity'],
                'price' => $item['price'],
            ]);
        }

        return response()->json($order->load('items'), 201);
    }

    public function index()
    {
        // For admin to view all orders
        $orders = Order::with('items')->get();
        return response()->json($orders);
    }
}
