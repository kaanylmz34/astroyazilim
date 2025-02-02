import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header({ 
    isSearchFocused, 
    setIsSearchFocused, 
    showNotificationDropdown, 
    setShowNotificationDropdown,
    buttonRef,
    dropdownRef,
    auth
}) {
    const [searchQuery, setSearchQuery] = useState('');

    const frequentSearches = [
        'Pano',
        'Kullanıcılar',
        'Ayarlar',
        'Ödemeler',
        'Raporlar',
    ];

    return (
        <>
            <header className="relative z-[9999] border-b border-indigo-500/20 backdrop-blur-sm bg-black/10">
                <div className="container relative mx-auto px-8 py-6">
                    <div className="flex relative items-center justify-between">
                        <div className="text-3xl font-bold text-white tracking-tight">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">Astro</span>
                            <span className="text-white/90">Yazılım</span>
                        </div>
                        
                        {/* Sağ taraftaki ikonlar */}
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
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
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
                                                {/* Bildirim içeriği */}
                                                <div className="p-4 border-b border-indigo-500/20">
                                                    <div className="flex items-center justify-between">
                                                        <h3 className="text-white font-medium">Bildirimler</h3>
                                                        <span className="text-xs text-indigo-400 cursor-pointer hover:text-indigo-300">Tümünü Okundu İşaretle</span>
                                                    </div>
                                                </div>
                                                {/* Bildirim listesi */}
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
                                <span className="text-white/80">
                                    {auth?.user?.name || 'Kullanıcı'}
                                </span>
                                <img 
                                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(auth?.user?.name || 'Kullanıcı')}`} 
                                    alt="Profile" 
                                    className="w-10 h-10 rounded-full" 
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Arama Overlay */}
            <AnimatePresence>
                {isSearchFocused && (
                    <motion.div 
                        className="fixed inset-0 bg-black/20 flex items-center justify-center backdrop-blur-sm z-[9999]"
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