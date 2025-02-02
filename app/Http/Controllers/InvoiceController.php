<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use Illuminate\Http\Request;

class InvoiceController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        
        $invoices = Invoice::query()
            ->where('user_id', auth()->id())
            ->when($search, function($query) use ($search) {
                $query->where(function($q) use ($search) {
                    $q->where('first_name', 'like', "%{$search}%")
                      ->orWhere('last_name', 'like', "%{$search}%")
                      ->orWhere('identification_number', 'like', "%{$search}%")
                      ->orWhere('company_name', 'like', "%{$search}%")
                      ->orWhere('invoice_date', 'like', "%{$search}%");
                });
            })
            ->latest()
            ->paginate(10);

        return response()->json([
            'data' => $invoices->map(function ($invoice) {
                return [
                    'first_name' => $invoice->first_name,
                    'last_name' => $invoice->last_name,
                    'identification_number' => $invoice->identification_number,
                    'company_name' => $invoice->company_name,
                    'address' => $invoice->address,
                    'invoice_date' => $invoice->invoice_date?->format('d.m.Y H:i'),
                    'file' => $invoice->file ? route('invoices.download', $invoice->id) : null
                ];
            }),
            'meta' => [
                'current_page' => $invoices->currentPage(),
                'last_page' => $invoices->lastPage(),
                'per_page' => $invoices->perPage(),
                'total' => $invoices->total(),
            ]
        ]);
    }

    public function download(Request $request, Invoice $invoice)
    {
        if ($request->user()->id !== $invoice->user_id) {
            abort(403, 'Unauthorized');
        }
        
        return response()->download($invoice->file);
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