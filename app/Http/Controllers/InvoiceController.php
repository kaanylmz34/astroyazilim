<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use Illuminate\Http\Request;

class InvoiceController extends Controller
{
    public function index()
    {
        $invoices = Invoice::with('user')->get();
        return response()->json($invoices);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'identification_number' => 'required|string|max:255',
            'company_name' => 'nullable|string|max:255',
            'address' => 'required|string',
            'invoice_date' => 'nullable|date',
        ]);

        $validated['user_id'] = auth()->id();
        
        $invoice = Invoice::create($validated);
        
        return response()->json($invoice, 201);
    }

    public function show(Invoice $invoice)
    {
        return response()->json($invoice->load('user'));
    }

    public function update(Request $request, Invoice $invoice)
    {
        $validated = $request->validate([
            'first_name' => 'sometimes|required|string|max:255',
            'last_name' => 'sometimes|required|string|max:255',
            'identification_number' => 'sometimes|required|string|max:255',
            'company_name' => 'nullable|string|max:255',
            'address' => 'sometimes|required|string',
            'invoice_date' => 'nullable|date',
        ]);

        $invoice->update($validated);
        
        return response()->json($invoice);
    }

    public function destroy(Invoice $invoice)
    {
        $invoice->delete();
        return response()->json(null, 204);
    }
} 