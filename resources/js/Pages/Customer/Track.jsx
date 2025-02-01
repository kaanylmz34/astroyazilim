import React, { useState, useEffect, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link, usePage } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/Components/Layout/Header';
import Sidebar from '@/Components/Layout/Sidebar';
import SearchOverlay from '@/Components/Layout/SearchOverlay';

export default () => {

    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
    const [showFileModal, setShowFileModal] = useState(false);
    const [showAddTaskModal, setShowAddTaskModal] = useState(false);

    const buttonRef = useRef();
    const dropdownRef = useRef();

    const frequentSearches = [
        'Pano',
        'Kullanıcılar',
        'Ayarlar',
        'Ödemeler',
        'Raporlar',
    ];

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true
        });
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current && 
                !dropdownRef.current.contains(event.target) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target)
            ) {
                setShowNotificationDropdown(false);
            }
        };
    
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <>
            <div className={`min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-black ${isSearchFocused ? 'blur-sm' : ''}`}>
                <Header 
                    isSearchFocused={isSearchFocused}
                    setIsSearchFocused={setIsSearchFocused}
                    showNotificationDropdown={showNotificationDropdown}
                    setShowNotificationDropdown={setShowNotificationDropdown}
                    buttonRef={buttonRef}
                    dropdownRef={dropdownRef}
                />

                <div className="container mx-auto px-4 py-8">
                    <div className="flex">
                        <Sidebar />
                        
                        {/* Main Content */}
                        <div className="flex-1 space-y-6">
                            {/* Project Overview Card */}
                            <div className="bg-black/20 backdrop-blur-sm rounded-lg border border-indigo-500/20 p-6">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h2 className="text-2xl font-semibold text-white">E-Commerce Platform Redesign</h2>
                                        <div className="flex items-center mt-2 space-x-3">
                                            <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">Active</span>
                                            <span className="text-white/60">Due in 14 days</span>
                                        </div>
                                    </div>
                                    <button className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg px-4 py-2 text-sm transition-colors" onClick={() => setShowAddTaskModal(true)}>
                                        Add Task
                                    </button>
                                </div>

                                <div className="mb-6">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-white/80">Project Progress</span>
                                        <span className="text-white/80">68%</span>
                                    </div>
                                    <div className="w-full bg-black/40 rounded-full h-2">
                                        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full" style={{ width: '68%' }}></div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-4 mb-6">
                                    <div className="bg-black/30 rounded-lg p-4">
                                        <div className="text-3xl font-semibold text-white mb-1">24</div>
                                        <div className="text-white/60">Total Tasks</div>
                                    </div>
                                    <div className="bg-black/30 rounded-lg p-4">
                                        <div className="text-3xl font-semibold text-green-400 mb-1">16</div>
                                        <div className="text-white/60">Completed</div>
                                    </div>
                                    <div className="bg-black/30 rounded-lg p-4">
                                        <div className="text-3xl font-semibold text-yellow-400 mb-1">8</div>
                                        <div className="text-white/60">In Progress</div>
                                    </div>
                                </div>
                            </div>

                            {/* Task Management */}
                            <div className="bg-black/20 backdrop-blur-sm rounded-lg border border-indigo-500/20">
                                <div className="p-6 border-b border-indigo-500/20">
                                    <h3 className="text-xl font-semibold text-white">Tasks</h3>
                                </div>
                                <div className="p-6">
                                    {[
                                        { title: 'Design System Implementation', status: 'In Progress', assignee: 'Sarah Chen', dueDate: '2024-02-15' },
                                        { title: 'API Integration', status: 'Completed', assignee: 'Mike Ross', dueDate: '2024-02-10' },
                                        { title: 'User Testing', status: 'Pending', assignee: 'John Smith', dueDate: '2024-02-20' }
                                    ].map((task, index) => (
                                        <div key={index} className="flex items-center justify-between p-4 hover:bg-white/5 rounded-lg transition-colors mb-2">
                                            <div className="flex items-center space-x-4">
                                                <div className={`w-2 h-2 rounded-full ${
                                                    task.status === 'Completed' ? 'bg-green-500' :
                                                    task.status === 'In Progress' ? 'bg-yellow-500' : 'bg-red-500'
                                                }`}></div>
                                                <div>
                                                    <h4 className="text-white font-medium">{task.title}</h4>
                                                    <p className="text-white/60 text-sm">Assigned to {task.assignee}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-4">
                                                <span className={`px-3 py-1 rounded-full text-sm ${
                                                    task.status === 'Completed' ? 'bg-green-500/20 text-green-400' :
                                                    task.status === 'In Progress' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'
                                                }`}>{task.status}</span>
                                                <span className="text-white/60 text-sm">{task.dueDate}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Communication Section */}
                            <div className="bg-black/20 backdrop-blur-sm rounded-lg border border-indigo-500/20">
                                <div className="p-6 border-b border-indigo-500/20">
                                    <h3 className="text-xl font-semibold text-white">Communication</h3>
                                </div>
                                <div className="p-6 max-h-96 overflow-y-auto">
                                    {/* Messages */}
                                    <div className="space-y-4">
                                        {[
                                            { sender: 'Client', message: 'How is the progress going?', time: '10:30 AM' },
                                            { sender: 'Developer', message: 'We are on track. The design system is almost complete.', time: '10:35 AM' }
                                        ].map((msg, index) => (
                                            <div key={index} className={`flex ${msg.sender === 'Developer' ? 'justify-end' : 'justify-start'}`}>
                                                <div className={`max-w-[70%] ${msg.sender === 'Developer' ? 'bg-indigo-500/20' : 'bg-purple-500/20'} rounded-lg p-4`}>
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="text-white font-medium">{msg.sender}</span>
                                                        <span className="text-white/60 text-sm">{msg.time}</span>
                                                    </div>
                                                    <p className="text-white/80">{msg.message}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    
                                    {/* Message Input */}
                                    <div className="mt-6">
                                        <div className="relative flex items-center bg-black/30 border border-indigo-500/20 rounded-2xl p-2">
                                            <div className="flex-1 flex items-center">
                                                <input
                                                    type="text"
                                                    placeholder="Mesajınızı yazın..."
                                                    className="w-full bg-transparent px-4 py-3 text-white placeholder-white/40 focus:outline-none border-transparent focus:border-transparent focus:ring-0"
                                                />
                                            </div>
                                            
                                            <div className="flex items-center space-x-3 px-3">
                                                <button 
                                                    onClick={() => setShowFileModal(true)}
                                                    className="w-10 h-10 flex items-center justify-center rounded-full bg-indigo-500/20 hover:bg-indigo-500/30 transition-colors group"
                                                >
                                                    <svg className="w-5 h-5 text-indigo-400 group-hover:text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                                    </svg>
                                                </button>
                                                
                                                <button className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 transition-all transform hover:scale-105">
                                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* File Upload Modal */}
                                    <AnimatePresence>
                                        {showFileModal && (
                                            <motion.div 
                                                className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                onClick={() => setShowFileModal(false)}
                                            >
                                                <motion.div 
                                                    className="bg-black/90 backdrop-blur-xl border border-indigo-500/20 rounded-xl w-full max-w-md p-6"
                                                    initial={{ scale: 0.9, opacity: 0 }}
                                                    animate={{ scale: 1, opacity: 1 }}
                                                    exit={{ scale: 0.9, opacity: 0 }}
                                                    onClick={e => e.stopPropagation()}
                                                >
                                                    <div className="flex justify-between items-center mb-6">
                                                        <h3 className="text-xl font-semibold text-white">Dosya Yükle</h3>
                                                        <button 
                                                            onClick={() => setShowFileModal(false)}
                                                            className="text-white/60 hover:text-white"
                                                        >
                                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                    
                                                    <div className="border-2 border-dashed border-indigo-500/30 rounded-xl p-8 text-center hover:border-indigo-500/50 transition-colors">
                                                        <input type="file" className="hidden" id="fileInput" multiple />
                                                        <label htmlFor="fileInput" className="cursor-pointer">
                                                            <div className="mb-4">
                                                                <svg className="w-12 h-12 text-indigo-500/50 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                                </svg>
                                                            </div>
                                                            <p className="text-white/60 mb-2">Dosyaları sürükleyip bırakın veya seçin</p>
                                                            <p className="text-white/40 text-sm">PNG, JPG, PDF veya ZIP (max. 10MB)</p>
                                                        </label>
                                                    </div>
                                                    
                                                    <div className="mt-6 flex justify-end space-x-3">
                                                        <button 
                                                            onClick={() => setShowFileModal(false)}
                                                            className="px-4 py-2 text-white/60 hover:text-white"
                                                        >
                                                            İptal
                                                        </button>
                                                        <button className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-colors">
                                                            Yükle
                                                        </button>
                                                    </div>
                                                </motion.div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                    </div>
                                    </div>
                                    </div>
                                    </div>
                                    </div>
                                    </div>

            <AnimatePresence>
            {showAddTaskModal && (
                <motion.div 
                    className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setShowAddTaskModal(false)}
                >
                    <motion.div 
                        className="bg-black/90 backdrop-blur-xl border border-indigo-500/20 rounded-xl w-full max-w-2xl p-8"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <h3 className="text-2xl font-semibold text-white mb-2">Create New Task</h3>
                                <p className="text-white/60">Add a new task to your project workflow</p>
                            </div>
                            <button 
                                onClick={() => setShowAddTaskModal(false)}
                                className="text-white/60 hover:text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-6">
                                <div>
                                    <label htmlFor="taskTitle" className="text-white/60 text-sm block mb-2">Task Title</label>
                                    <input 
                                        type="text" 
                                        id="taskTitle" 
                                        className="w-full bg-black/30 border border-indigo-500/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-indigo-500 transition-colors"
                                        placeholder="Enter task title"
                                    />
                                </div>
                                
                                <div>
                                    <label htmlFor="taskDescription" className="text-white/60 text-sm block mb-2">Task Description</label>
                                    <textarea 
                                        id="taskDescription" 
                                        className="w-full bg-black/30 border border-indigo-500/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-indigo-500 transition-colors"
                                        rows="4"
                                        placeholder="Describe the task details"
                                    ></textarea>
                                </div>

                                <div>
                                    <label className="text-white/60 text-sm block mb-2">Priority Level</label>
                                    <div className="flex space-x-4">
                                        {['Low', 'Medium', 'High'].map((priority) => (
                                            <button
                                                key={priority}
                                                className={`px-4 py-2 rounded-lg transition-colors ${
                                                    priority === 'High' ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' :
                                                    priority === 'Medium' ? 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30' :
                                                    'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                                                }`}
                                            >
                                                {priority}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="text-white/60 text-sm block mb-2">Assignees</label>
                                    <div className="bg-black/30 border border-indigo-500/20 rounded-lg p-4">
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {['John Doe', 'Sarah Chen'].map((assignee) => (
                                                <div key={assignee} className="bg-indigo-500/20 text-indigo-400 px-3 py-1 rounded-full text-sm flex items-center">
                                                    {assignee}
                                                    <button className="ml-2 text-indigo-400 hover:text-indigo-300">×</button>
                                                </div>
                                            ))}
                                        </div>
                                        <input 
                                            type="text" 
                                            placeholder="Add team member..."
                                            className="w-full bg-transparent text-white placeholder-white/40 focus:outline-none"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-white/60 text-sm block mb-2">Start Date</label>
                                        <input 
                                            type="date" 
                                            className="w-full bg-black/30 border border-indigo-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-white/60 text-sm block mb-2">Due Date</label>
                                        <input 
                                            type="date" 
                                            className="w-full bg-black/30 border border-indigo-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-white/60 text-sm block mb-2">Attachments</label>
                                    <div className="border-2 border-dashed border-indigo-500/20 rounded-lg p-4 text-center hover:border-indigo-500/40 transition-colors">
                                        <input type="file" className="hidden" id="taskFiles" multiple />
                                        <label htmlFor="taskFiles" className="cursor-pointer">
                                            <svg className="w-8 h-8 text-indigo-500/40 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                            </svg>
                                            <span className="text-white/60 text-sm">Drop files here or click to upload</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 flex justify-end space-x-4">
                            <button 
                                onClick={() => setShowAddTaskModal(false)}
                                className="px-6 py-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-colors transform hover:scale-105">
                                Create Task
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
            </AnimatePresence>

            <SearchOverlay 
                isSearchFocused={isSearchFocused}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                setIsSearchFocused={setIsSearchFocused}
                frequentSearches={frequentSearches}
            />
        </>
    );

}