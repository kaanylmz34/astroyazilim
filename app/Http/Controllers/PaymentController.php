<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function index()
    {
        $payments = Payment::with('user')->get();
        return response()->json($payments);
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