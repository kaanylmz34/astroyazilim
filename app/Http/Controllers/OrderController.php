<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        
        $orders = Order::query()
            ->where('user_id', auth()->id())
            ->with(['product', 'invoice' => function($query) {
                $query->with('payment');
            }])
            ->when($search, function($query) use ($search) {
                $query->where(function($q) use ($search) {
                    $q->whereHas('product', function($subQ) use ($search) {
                        $subQ->where('name', 'like', "%{$search}%")
                            ->orWhere('price', 'like', "%{$search}%");
                    })
                    ->orWhereHas('invoice', function($subQ) use ($search) {
                        $subQ->where(function($innerQ) use ($search) {
                            $innerQ->where('first_name', 'like', "%{$search}%")
                                  ->orWhere('last_name', 'like', "%{$search}%")
                                  ->orWhere('identification_number', 'like', "%{$search}%")
                                  ->orWhere('invoice_date', 'like', "%{$search}%");
                        });
                    })
                    ->orWhereHas('invoice.payment', function($subQ) use ($search) {
                        $subQ->where(function($innerQ) use ($search) {
                            $innerQ->where('payment_method', 'like', "%{$search}%")
                                  ->orWhere('payment_status', 'like', "%{$search}%")
                                  ->orWhere('payment_date', 'like', "%{$search}%")
                                  ->orWhere('amount', 'like', "%{$search}%");
                        });
                    });
                });
            })
            ->latest()
            ->paginate(10);

        return response()->json([
            'data' => $orders->map(function ($order) {
                return [
                    'product_name' => $order->product->name,
                    'product_price' => number_format($order->product->price, 2) . ' ₺',
                    'payment_amount' => number_format($order->invoice?->payment?->amount, 2) . ' ₺',
                    'invoice_date' => $order->invoice?->invoice_date?->format('d.m.Y H:i'),
                    'payment_date' => $order->invoice?->payment?->payment_date?->format('d.m.Y H:i'),
                    'payment_status' => match($order->invoice?->payment?->payment_status) {
                        'pending' => 'Beklemede',
                        'completed' => 'Tamamlandı',
                        'failed' => 'Başarısız',
                        'refunded' => 'İade Edildi',
                        default => $order->invoice?->payment?->payment_status,
                    },
                    'order_status' => match($order->status) {
                        'pending' => 'Beklemede',
                        'processing' => 'İşleniyor', 
                        'completed' => 'Tamamlandı',
                        'cancelled' => 'İptal Edildi',
                        default => $order->status,
                    },
                ];
            }),
            'meta' => [
                'current_page' => $orders->currentPage(),
                'last_page' => $orders->lastPage(),
                'per_page' => $orders->perPage(),
                'total' => $orders->total(),
            ]
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'invoice_id' => 'nullable|exists:invoices,id',
            'order_date' => 'required|date',
            'status' => 'required|string|in:pending,processing,completed,cancelled'
        ]);

        $validated['user_id'] = auth()->id();
        
        $order = Order::create($validated);
        
        return response()->json($order->load(['product', 'user', 'invoice']), 201);
    }

    public function show(Order $order)
    {
        return response()->json($order->load(['product', 'user', 'invoice']));
    }

    public function update(Request $request, Order $order)
    {
        $validated = $request->validate([
            'product_id' => 'sometimes|required|exists:products,id',
            'invoice_id' => 'nullable|exists:invoices,id',
            'order_date' => 'sometimes|required|date',
            'status' => 'sometimes|required|string|in:pending,processing,completed,cancelled'
        ]);

        $order->update($validated);
        
        return response()->json($order->load(['product', 'user', 'invoice']));
    }

    public function destroy(Order $order)
    {
        $order->delete();
        return response()->json(null, 204);
    }
} 