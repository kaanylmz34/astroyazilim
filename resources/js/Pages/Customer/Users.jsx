import React, { useState, useEffect, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link, usePage } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';

export default () => {

    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
    
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
                            
                            <div className="grid grid-cols-4 gap-6 mb-6">
                                {/* Active Users Card */}
                                <div className="bg-black/20 backdrop-blur-sm rounded-lg border border-indigo-500/20 p-6 relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                                    <div className="relative">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="bg-indigo-500/20 p-3 rounded-lg">
                                                <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                </svg>
                                            </div>
                                            <span className="text-green-400 flex items-center">
                                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                                                </svg>
                                                12%
                                            </span>
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-2">2,847</h3>
                                        <p className="text-white/60">Active Users</p>
                                    </div>
                                </div>

                                {/* Growth Rate Card */}
                                <div className="bg-black/20 backdrop-blur-sm rounded-lg border border-indigo-500/20 p-6 relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                                    <div className="relative">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="bg-purple-500/20 p-3 rounded-lg">
                                                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                                </svg>
                                            </div>
                                            <span className="text-purple-400 flex items-center">
                                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                                </svg>
                                                8.5%
                                            </span>
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-2">184.2K</h3>
                                        <p className="text-white/60">Monthly Growth</p>
                                    </div>
                                </div>

                                {/* Revenue Card */}
                                <div className="bg-black/20 backdrop-blur-sm rounded-lg border border-indigo-500/20 p-6 relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                                    <div className="relative">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="bg-green-500/20 p-3 rounded-lg">
                                                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                            <span className="text-green-400 flex items-center">
                                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                                                </svg>
                                                24%
                                            </span>
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-2">$32.4K</h3>
                                        <p className="text-white/60">Total Revenue</p>
                                    </div>
                                </div>

                                {/* Conversion Rate Card */}
                                <div className="bg-black/20 backdrop-blur-sm rounded-lg border border-indigo-500/20 p-6 relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                                    <div className="relative">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="bg-blue-500/20 p-3 rounded-lg">
                                                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                                </svg>
                                            </div>
                                            <span className="text-blue-400 flex items-center">
                                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                                                </svg>
                                                18%
                                            </span>
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-2">64.5%</h3>
                                        <p className="text-white/60">Conversion Rate</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-black/20 backdrop-blur-sm rounded-lg border border-indigo-500/20 overflow-hidden">
                                {/* Table Header with Search */}
                                <div className="p-4 border-b border-indigo-500/20">
                                    <div className="flex justify-between items-center mb-4">
                                        <h2 className="text-xl text-white font-semibold">Users</h2>
                                        <div className="flex items-center space-x-3">
                                            <input
                                                type="text"
                                                placeholder="Global Search..."
                                                className="bg-black/30 border border-indigo-500/20 rounded-lg px-4 py-2 text-white/80 placeholder-white/40 focus:outline-none focus:border-indigo-500"
                                            />
                                            <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg transition-colors">
                                                Add User
                                            </button>
                                        </div>
                                    </div>
                                    
                                    {/* Column Headers with Filters */}
                                    <div className="grid grid-cols-7 gap-4">
                                        {['Name', 'Surname', 'Email', 'Phone', 'Company', 'Projects', 'Status'].map((header) => (
                                            <div key={header} className="space-y-2">
                                                <input
                                                    type="text"
                                                    placeholder={`Filter ${header}...`}
                                                    className="w-full bg-black/30 border border-indigo-500/20 rounded px-3 py-1 text-sm text-white/80 placeholder-white/40 focus:outline-none focus:border-indigo-500"
                                                />
                                                <div className="flex items-center justify-between text-white/60 text-sm">
                                                    <span>{header}</span>
                                                    <svg className="w-4 h-4 cursor-pointer hover:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0L3 8m4-4l4 4m-4 4v8m0 0l4-4m-4 4l-4-4" />
                                                    </svg>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Table Body */}
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <tbody>
                                            {[
                                                { status: 'pending', highlight: 'bg-white/5' },
                                                { status: 'active', highlight: '' },
                                                { status: 'suspended', highlight: 'bg-red-500/10' },
                                            ].map((row, idx) => (
                                                <tr key={idx} className={`${row.highlight} hover:bg-indigo-500/10 transition-colors`}>
                                                    <td className="px-6 py-4 text-white/80">John</td>
                                                    <td className="px-6 py-4 text-white/80">Doe</td>
                                                    <td className="px-6 py-4 text-white/80">john@example.com</td>
                                                    <td className="px-6 py-4 text-white/80">+1234567890</td>
                                                    <td className="px-6 py-4 text-white/80">Tech Corp</td>
                                                    <td className="px-6 py-4">
                                                        <span className="bg-indigo-500/20 text-indigo-400 px-2 py-1 rounded-full text-sm">
                                                            12
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 flex justify-between items-center">
                                                        <span className={`px-3 py-1 rounded-full text-sm ${
                                                            row.status === 'active' ? 'bg-green-500/20 text-green-400' :
                                                            row.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                                                            'bg-red-500/20 text-red-400'
                                                        }`}>
                                                            {row.status}
                                                        </span>
                                                        <div className="relative group">
                                                            <svg className="w-6 h-6 text-white/60 hover:text-indigo-400 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                                            </svg>
                                                            <div className="absolute right-0 mt-2 w-48 invisible group-hover:visible bg-black/90 backdrop-blur-lg border border-indigo-500/20 rounded-lg shadow-lg z-50">
                                                                <div className="py-1">
                                                                    <a href="#" className="block px-4 py-2 text-sm text-white/80 hover:bg-indigo-500/20">View Details</a>
                                                                    <a href="#" className="block px-4 py-2 text-sm text-white/80 hover:bg-indigo-500/20">Edit User</a>
                                                                    <a href="#" className="block px-4 py-2 text-sm text-red-400 hover:bg-red-500/20">Delete User</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Pagination */}
                                <div className="p-4 border-t border-indigo-500/20 flex items-center justify-between">
                                    <span className="text-white/60 text-sm">Showing 1 to 10 of 100 entries</span>
                                    <div className="flex space-x-2">
                                        <button className="px-3 py-1 rounded-lg bg-indigo-500/20 text-white/80 hover:bg-indigo-500/30">Previous</button>
                                        <button className="px-3 py-1 rounded-lg bg-indigo-500 text-white">1</button>
                                        <button className="px-3 py-1 rounded-lg bg-indigo-500/20 text-white/80 hover:bg-indigo-500/30">2</button>
                                        <button className="px-3 py-1 rounded-lg bg-indigo-500/20 text-white/80 hover:bg-indigo-500/30">3</button>
                                        <button className="px-3 py-1 rounded-lg bg-indigo-500/20 text-white/80 hover:bg-indigo-500/30">Next</button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

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