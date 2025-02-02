<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\ProjectAttachment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        
        $projects = Project::where('user_id', auth()->id())
            ->when($search, function($query) use ($search) {
                $query->where('name', 'like', "%{$search}%");
            })
            ->latest()
            ->paginate(10);

        return response()->json([
            'data' => $projects->map(function ($project) {  
                return [
                    'id' => $project->id,
                    'name' => $project->name,
                    'description' => $project->description,
                    'price' => $project->price . ' ₺',
                ];
            }),
            'meta' => [
                'current_page' => $projects->currentPage(),
                'last_page' => $projects->lastPage(),
                'per_page' => $projects->perPage(),
                'total' => $projects->total(),
            ]
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'technologies' => 'required|array',
            'attachments.*' => 'file|max:10240' // 10MB max dosya boyutu
        ]);

        $validated['user_id'] = auth()->id();
        $project = Project::create($validated);

        if ($request->hasFile('attachments')) {
            foreach ($request->file('attachments') as $file) {
                $path = $file->store('project-attachments');
                
                $project->attachments()->create([
                    'file_path' => $path,
                    'original_name' => $file->getClientOriginalName(),
                    'mime_type' => $file->getMimeType(),
                    'size' => $file->getSize()
                ]);
            }
        }

        return redirect()->route('projects.index')
            ->with('success', 'Proje başarıyla oluşturuldu.');
    }

    public function show(Project $project)
    {
        return Inertia::render('Customer/Track', [
            'project' => $project->load(['client', 'tasks.assignee']),
        ]);
    }

    public function update(Request $request, Project $project)
    {
        $this->authorize('update', $project);

        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'price' => 'sometimes|required|numeric|min:0',
            'technologies' => 'sometimes|required|array',
            'attachments.*' => 'file|max:10240'
        ]);

        $project->update($validated);

        if ($request->hasFile('attachments')) {
            foreach ($request->file('attachments') as $file) {
                $path = $file->store('project-attachments');
                
                $project->attachments()->create([
                    'file_path' => $path,
                    'original_name' => $file->getClientOriginalName(),
                    'mime_type' => $file->getMimeType(),
                    'size' => $file->getSize()
                ]);
            }
        }

        return redirect()->back()
            ->with('success', 'Proje başarıyla güncellendi.');
    }

    public function destroy(Project $project)
    {
        $this->authorize('delete', $project);

        foreach ($project->attachments as $attachment) {
            Storage::delete($attachment->file_path);
        }
        
        $project->delete();

        return redirect()->route('projects.index')
            ->with('success', 'Proje başarıyla silindi.');
    }

    public function deleteAttachment(Project $project, ProjectAttachment $attachment)
    {
        $this->authorize('update', $project);

        if ($attachment->project_id !== $project->id) {
            abort(403);
        }

        Storage::delete($attachment->file_path);
        $attachment->delete();

        return redirect()->back()
            ->with('success', 'Dosya başarıyla silindi.');
    }

    public function downloadAttachment(Project $project, ProjectAttachment $attachment)
    {
        $this->authorize('view', $project);

        if ($attachment->project_id !== $project->id) {
            abort(403);
        }

        return Storage::download(
            $attachment->file_path,
            $attachment->original_name
        );
    }
} 