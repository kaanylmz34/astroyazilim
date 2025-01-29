import React, { useState, useEffect, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link, usePage } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';

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
                <header className="relative z-[9999] border-b border-indigo-500/20 backdrop-blur-sm bg-black/10">
                    <div className="container relative mx-auto px-8 py-6">
                        <div className="flex relative items-center justify-between">
                            <div className="text-3xl font-bold text-white tracking-tight">
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">Astro</span>
                                <span className="text-white/90">Yazılım</span>
                            </div>
                            <div className="flex relative items-center space-x-6">
                                <div className="relative">
                                    <input 
                                        type="text" 
                                        placeholder="Ara..." 
                                        className="bg-black/20 border border-indigo-500/20 rounded-lg px-4 py-2 text-white/80 placeholder-white/40 focus:outline-none focus:border-indigo-500"
                                        onFocus={() => setIsSearchFocused(true)}
                                    />
                                </div>
                                <div className="flex relative items-center space-x-4">
                                    <div className="relative z-[999]" onClick={() => setShowNotificationDropdown(!showNotificationDropdown)} ref={buttonRef}>
                                        <svg className="w-6 h-6 text-white/80 hover:text-indigo-400 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="</svg>round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                        </svg>
                                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>

                                    <AnimatePresence>
                                        {showNotificationDropdown && (
                                            <motion.div
                                                ref={dropdownRef}
                                                initial={{ opacity: 0, y: -20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -20 }}
                                                className="absolute right-0 mt-2 w-80 rounded-lg bg-black/90 backdrop-blur-lg border border-indigo-500/20 shadow-2xl shadow-indigo-500/20 overflow-hidden z-[9999]"
                                            >
                                                <div className="p-4 border-b border-indigo-500/20" onClick={(e) => e.stopPropagation()}>
                                                    <div className="flex items-center justify-between">
                                                        <h3 className="text-white font-medium">Bildirimler</h3>
                                                        <span className="text-xs text-indigo-400 cursor-pointer hover:text-indigo-300">Tümünü Okundu İşaretle</span>
                                                    </div>
                                                </div>
                                                <div className="max-h-96 overflow-y-auto">
                                                    {[1, 2, 3].map((item, index) => (
                                                        <motion.div
                                                            key={index}
                                                            initial={{ opacity: 0, x: -20 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: index * 0.1 }}
                                                            className="p-4 hover:bg-white/5 border-b border-indigo-500/10 cursor-pointer group"
                                                        >
                                                            <div className="flex gap-3">
                                                                <div className="w-2 h-2 mt-2 rounded-full bg-indigo-500"></div>
                                                                <div>
                                                                    <p className="text-white/90 text-sm">New activity in your project</p>
                                                                    <p className="text-white/50 text-xs mt-1">2 minutes ago</p>
                                                                </div>
                                                            </div>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                                <div className="p-3 bg-indigo-500/5 hover:bg-indigo-500/10 transition-colors">
                                                    <button className="w-full text-center text-sm text-indigo-400 hover:text-indigo-300">
                                                        Tüm Bildirimleri Oku
                                                    </button>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                    </div>
                                    <div className="relative">
                                        <svg className="w-6 h-6 text-white/80 hover:text-indigo-400 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        <span className="absolute -top-1 -right-1 bg-indigo-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">5</span>
                                    </div>
                                    <div className="relative">
                                        <svg className="w-6 h-6 text-white/80 hover:text-indigo-400 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                        <span className="absolute -top-1 -right-1 bg-purple-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">2</span>
                                    </div>     
                                </div>
                                <div className="flex items-center space-x-3">
                                    <span className="text-white/80">John Doe</span>
                                    <img src="https://ui-avatars.com/api/?name=John+Doe" alt="Profile" className="w-10 h-10 rounded-full" />
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="container mx-auto px-4 py-8">
                    <div className="flex">
                        {/* Enhanced Sidebar */}
                        <div className="w-72 bg-black/20 backdrop-blur-sm rounded-lg border border-indigo-500/20 p-6 mr-6">
                            <nav className="space-y-8">
                                {/* User Quick Profile */}
                                <div className="pb-6 border-b border-indigo-500/20">
                                    <div className="flex items-center space-x-4 mb-4">
                                        <div className="relative">
                                            <img src="https://ui-avatars.com/api/?name=John+Doe" alt="Profile" 
                                                className="w-12 h-12 rounded-full border-2 border-indigo-500/40" />
                                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-black"></div>
                                        </div>
                                        <div>
                                            <h4 className="text-white font-medium">John Doe</h4>
                                            <p className="text-indigo-400 text-sm">Premium User</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Main Navigation */}
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-white/40 uppercase text-xs font-semibold tracking-wider mb-4">Main Menu</h3>
                                        <div className="space-y-2">
                                            <a href="#" className="flex items-center space-x-3 text-white/80 hover:text-indigo-400 p-2 rounded-lg hover:bg-indigo-500/10 transition-all group">
                                                <div className="bg-indigo-500/20 p-2 rounded-lg group-hover:bg-indigo-500/30 transition-all">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                                    </svg>
                                                </div>
                                                <span>Dashboard</span>
                                            </a>
                                            <a href="#" className="flex items-center space-x-3 text-white/80 hover:text-indigo-400 p-2 rounded-lg hover:bg-indigo-500/10 transition-all group">
                                                <div className="bg-indigo-500/20 p-2 rounded-lg group-hover:bg-indigo-500/30 transition-all">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                                    </svg>
                                                </div>
                                                <span>Analytics</span>
                                            </a>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-white/40 uppercase text-xs font-semibold tracking-wider mb-4">Management</h3>
                                        <div className="space-y-2">
                                            <a href="#" className="flex items-center justify-between text-white/80 hover:text-indigo-400 p-2 rounded-lg hover:bg-indigo-500/10 transition-all group">
                                                <div className="flex items-center space-x-3">
                                                    <div className="bg-indigo-500/20 p-2 rounded-lg group-hover:bg-indigo-500/30 transition-all">
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                                        </svg>
                                                    </div>
                                                    <span>Users</span>
                                                </div>
                                                <span className="bg-indigo-500/20 text-xs px-2 py-1 rounded-full">23</span>
                                            </a>
                                            <a href="#" className="flex items-center justify-between text-white/80 hover:text-indigo-400 p-2 rounded-lg hover:bg-indigo-500/10 transition-all group">
                                                <div className="flex items-center space-x-3">
                                                    <div className="bg-indigo-500/20 p-2 rounded-lg group-hover:bg-indigo-500/30 transition-all">
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                                        </svg>
                                                    </div>
                                                    <span>Tasks</span>
                                                </div>
                                                <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full">New</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </nav>

                            {/* Bottom Premium Card
                            <div className="mt-8 p-4 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-lg border border-indigo-500/20">
                                <h4 className="text-white font-medium mb-2">Upgrade to Premium</h4>
                                <p className="text-white/60 text-sm mb-3">Get access to all features</p>
                                <button className="w-full bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg px-4 py-2 text-sm transition-colors">
                                    Upgrade Now
                                </button>
                            </div>
                            */}
                        </div>

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

                                    {/* Search Overlay */}
            <AnimatePresence>
            {isSearchFocused && (
                <motion.div 
                    className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <div className="w-full max-w-4xl px-4" onClick={(e) => e.stopPropagation()}>
                        <div className="relative">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Ayar, özellik veya bilgi arayın..."
                                className="w-full bg-transparent text-4xl text-white border-none outline-none placeholder-white/40 border-transparent focus:border-transparent focus:ring-0"
                                onBlur={() => setIsSearchFocused(false)}
                                autoFocus
                            />
                            <button 
                                onClick={() => setIsSearchFocused(false)}
                                className="absolute right-0 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="mt-8">
                            <h3 className="text-white/60 text-sm mb-4">Sıklıkla Aratılanlar</h3>
                            <div className="flex flex-wrap gap-3">
                                {frequentSearches.map((term, index) => (
                                    <div
                                        key={index}
                                        data-aos="fade-up"
                                        data-aos-delay={index * 100}
                                        className="bg-white/10 hover:bg-white/20 rounded-full px-4 py-2 text-white/80 cursor-pointer transition-all"
                                    >
                                        {term}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
            </AnimatePresence>
        </>
    );

}