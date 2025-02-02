<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        
        $payments = Payment::query()
            ->where('user_id', auth()->id())
            ->when($search, function($query) use ($search) {
                $query->where(function($q) use ($search) {
                    $q->where('payment_method', 'like', "%{$search}%")
                      ->orWhere('payment_status', 'like', "%{$search}%")
                      ->orWhere('payment_date', 'like', "%{$search}%")
                      ->orWhere('amount', 'like', "%{$search}%");
                });
            })
            ->latest()
            ->paginate(10);

        return response()->json([
            'data' => $payments->map(function ($payment) {
                return [
                    'amount' => number_format($payment->amount, 2) . ' ₺',
                    'payment_date' => $payment->payment_date?->format('d.m.Y H:i'),
                    'payment_method' => $payment->payment_method,
                    'payment_status' => $payment->payment_status,
                    'user_note' => $payment->user_note
                ];
            }),
            'meta' => [
                'current_page' => $payments->currentPage(),
                'last_page' => $payments->lastPage(), 
                'per_page' => $payments->perPage(),
                'total' => $payments->total(),
            ]
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'amount' => 'required|numeric|min:0',
            'payment_method' => 'required|string|max:255',
            'payment_status' => 'required|string|in:pending,completed,failed,refunded',
            'payment_date' => 'required|date',
            'user_note' => 'nullable|string'
        ]);

        $validated['user_id'] = auth()->id();
        
        $payment = Payment::create($validated);
        
        return response()->json($payment, 201);
    }

    public function show(Payment $payment)
    {
        return response()->json($payment->load('user'));
    }

    public function update(Request $request, Payment $payment)
    {
        $validated = $request->validate([
            'amount' => 'sometimes|required|numeric|min:0',
            'payment_method' => 'sometimes|required|string|max:255',
            'payment_status' => 'sometimes|required|string|in:pending,completed,failed,refunded',
            'payment_date' => 'sometimes|required|date',
            'user_note' => 'nullable|string'
        ]);

        $payment->update($validated);
        
        return response()->json($payment);
    }

    public function destroy(Payment $payment)
    {
        $payment->delete();
        return response()->json(null, 204);
    }
} 