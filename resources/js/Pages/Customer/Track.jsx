import React, { useState, useEffect, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link, usePage } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import CustomerLayout from '@/Components/Layout/CustomerLayout';

export default function Track() {
    const { project = {} } = usePage().props;
    const tasks = project?.tasks || [];

    console.log(project);

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

    // Proje ilerleme yüzdesini hesapla
    const progressPercentage = tasks.length > 0 
        ? Math.round((tasks.filter(task => task.status === 'completed').length / tasks.length) * 100)
        : 0;

    // Durum rengini belirle
    const getStatusColor = (status) => {
        switch (status) {
            case 'completed':
                return 'bg-green-500/20 text-green-400';
            case 'in_progress':
                return 'bg-yellow-500/20 text-yellow-400';
            case 'cancelled':
                return 'bg-red-500/20 text-red-400';
            default:
                return 'bg-gray-500/20 text-gray-400';
        }
    };

    return (
        <CustomerLayout>
            <div className="flex">
                <div className="flex-1 space-y-6">
                    {/* Proje Genel Bakış Kartı */}
                    <div className="bg-black/20 backdrop-blur-sm rounded-lg border border-indigo-500/20 p-6">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h2 className="text-2xl font-semibold text-white">{project?.name || 'Proje Adı'}</h2>
                                <div className="flex items-center mt-2 space-x-3">
                                    <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(project?.status)}`}>
                                        {project?.status_text || 'Durum'}
                                    </span>
                                    <span className="text-white/60">{project?.due_date || 'Tarih'}</span>
                                </div>
                            </div>
                            <button className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg px-4 py-2 text-sm transition-colors" onClick={() => setShowAddTaskModal(true)}>
                                Görev Ekle
                            </button>
                        </div>

                        <div className="mb-6">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-white/80">Proje İlerlemesi</span>
                                <span className="text-white/80">{progressPercentage}%</span>
                            </div>
                            <div className="w-full bg-black/40 rounded-full h-2">
                                <div 
                                    className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full" 
                                    style={{ width: `${progressPercentage}%` }}
                                ></div>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mb-6">
                            <div className="bg-black/30 rounded-lg p-4">
                                <div className="text-3xl font-semibold text-white mb-1">{tasks.length}</div>
                                <div className="text-white/60">Toplam Görev</div>
                            </div>
                            <div className="bg-black/30 rounded-lg p-4">
                                <div className="text-3xl font-semibold text-green-400 mb-1">
                                    {tasks.filter(task => task.status === 'completed').length}
                                </div>
                                <div className="text-white/60">Tamamlanan</div>
                            </div>
                            <div className="bg-black/30 rounded-lg p-4">
                                <div className="text-3xl font-semibold text-yellow-400 mb-1">
                                    {tasks.filter(task => task.status === 'in_progress').length}
                                </div>
                                <div className="text-white/60">Devam Eden</div>
                            </div>
                        </div>
                    </div>

                    {/* Görev Yönetimi */}
                    <div className="bg-black/20 backdrop-blur-sm rounded-lg border border-indigo-500/20">
                        <div className="p-6 border-b border-indigo-500/20">
                            <h3 className="text-xl font-semibold text-white">Görevler</h3>
                        </div>
                        <div className="p-6">
                            {tasks.length > 0 ? (
                                tasks.map((task) => (
                                    <div key={task.id} className="flex items-center justify-between p-4 hover:bg-white/5 rounded-lg transition-colors mb-2">
                                        <div className="flex items-center space-x-4">
                                            <div className={`w-2 h-2 rounded-full ${getStatusColor(task.status)}`}></div>
                                            <div>
                                                <h4 className="text-white font-medium">{task.title}</h4>
                                                <p className="text-white/60 text-sm">Atanan: {task.assignee?.name || 'Atanmamış'}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(task.status)}`}>
                                                {task.status_text}
                                            </span>
                                            <span className="text-white/60 text-sm">{task.due_date}</span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8 text-white/60">
                                    Henüz görev bulunmuyor
                                </div>
                            )}
                        </div>
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

            {/* Görev Ekleme Modalı */}
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
                                    <h3 className="text-2xl font-semibold text-white mb-2">Yeni Görev Oluştur</h3>
                                    <p className="text-white/60">Proje iş akışınıza yeni bir görev ekleyin</p>
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
                                        <label htmlFor="taskTitle" className="text-white/60 text-sm block mb-2">Görev Başlığı</label>
                                        <input 
                                            type="text" 
                                            id="taskTitle" 
                                            className="w-full bg-black/30 border border-indigo-500/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-indigo-500 transition-colors"
                                            placeholder="Görev başlığını girin"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label htmlFor="taskDescription" className="text-white/60 text-sm block mb-2">Görev Açıklaması</label>
                                        <textarea 
                                            id="taskDescription" 
                                            className="w-full bg-black/30 border border-indigo-500/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-indigo-500 transition-colors"
                                            rows="4"
                                            placeholder="Görev detaylarını açıklayın"
                                        ></textarea>
                                    </div>

                                    <div>
                                        <label className="text-white/60 text-sm block mb-2">Öncelik Seviyesi</label>
                                        <div className="flex space-x-4">
                                            {['Düşük', 'Orta', 'Yüksek'].map((priority) => (
                                                <button
                                                    key={priority}
                                                    className={`px-4 py-2 rounded-lg transition-colors ${
                                                        priority === 'Yüksek' ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' :
                                                        priority === 'Orta' ? 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30' :
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
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-white/60 text-sm block mb-2">Başlangıç Tarihi</label>
                                            <input 
                                                type="date" 
                                                className="w-full bg-black/30 border border-indigo-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-white/60 text-sm block mb-2">Bitiş Tarihi</label>
                                            <input 
                                                type="date" 
                                                className="w-full bg-black/30 border border-indigo-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-white/60 text-sm block mb-2">Ekler</label>
                                        <div className="border-2 border-dashed border-indigo-500/20 rounded-lg p-4 text-center hover:border-indigo-500/40 transition-colors">
                                            <input type="file" className="hidden" id="taskFiles" multiple />
                                            <label htmlFor="taskFiles" className="cursor-pointer">
                                                <svg className="w-8 h-8 text-indigo-500/40 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                </svg>
                                                <span className="text-white/60 text-sm">Dosyaları buraya sürükleyin veya yüklemek için tıklayın</span>
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
                                    İptal
                                </button>
                                <button className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-colors transform hover:scale-105">
                                    Görev Oluştur
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </CustomerLayout>
    );
}