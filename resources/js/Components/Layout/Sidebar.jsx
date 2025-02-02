import React from 'react';
import { Link } from '@inertiajs/react';

export default function Sidebar() {
    return (
        <div className="w-72 bg-black/20 backdrop-blur-sm rounded-lg border border-indigo-500/20 p-6 mr-6">
            <nav className="space-y-8">
                {/* Logo & Brand */}
                <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <span className="text-xl font-bold text-white">Panel</span>
                </div>

                {/* Ana Menü */}
                <div>
                    <h3 className="text-white/40 uppercase text-xs font-semibold mb-4">Ana Menü</h3>
                    <div className="space-y-2">
                        <Link href={route('customer.dashboard')} className="flex items-center space-x-3 text-white/60 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors group">
                            <svg className="w-5 h-5 group-hover:text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            <span>Pano</span>
                        </Link>

                        <Link href={route('customer.orders')} className="flex items-center space-x-3 text-white/60 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors group">
                            <svg className="w-5 h-5 group-hover:text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            <span>Siparişler</span>
                        </Link>

                        <Link href={route('customer.payments')} className="flex items-center space-x-3 text-white/60 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors group">
                            <svg className="w-5 h-5 group-hover:text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            <span>Ödemeler</span>
                        </Link>

                        <Link href={route('customer.invoices')} className="flex items-center space-x-3 text-white/60 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors group">
                            <svg className="w-5 h-5 group-hover:text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            <span>Faturalar</span>
                        </Link>

                        <Link href={route('customer.track')} className="flex items-center space-x-3 text-white/60 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors group">
                            <svg className="w-5 h-5 group-hover:text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                            </svg>
                            <span>Projeler</span>
                        </Link>
                    </div>
                </div>

                {/* Ayarlar */}
                <div>
                    <h3 className="text-white/40 uppercase text-xs font-semibold mb-4">Ayarlar</h3>
                    <div className="space-y-2">
                        <a href="#" className="flex items-center space-x-3 text-white/60 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors group">
                            <svg className="w-5 h-5 group-hover:text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>Genel Ayarlar</span>
                        </a>

                        <a href="#" className="flex items-center space-x-3 text-white/60 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors group">
                            <svg className="w-5 h-5 group-hover:text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            <span>Çıkış Yap</span>
                        </a>
                    </div>
                </div>
            </nav>
        </div>
    );
} 