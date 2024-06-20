<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function index()
    {
        $orders = Order::with('items', 'user')->get();
        return response()->json($orders);
    }

    public function show($id)
    {
        $order = Order::with('items', 'user')->findOrFail($id);
        return response()->json($order);
    }
}
