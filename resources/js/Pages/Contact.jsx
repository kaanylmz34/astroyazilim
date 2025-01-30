import React, { useState, useEffect } from 'react';
import { Link, useForm } from '@inertiajs/react';

export default function Contact({ status, canResetPassword }) {

    const { data, setData, post, processing, errors } = useForm({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        message: '',
        attachment: null
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('contact.store'));
    };

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
            <header className="border-b border-gray-800/50 backdrop-blur-sm bg-black/20">
                <div className="container mx-auto px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div className="text-3xl font-bold text-white tracking-tight">
                            <span className="text-indigo-500">Astro</span>Yazılım
                        </div>
                    </div>
                </div>
            </header>

                {/* Ana İçerik */}
                <div className="flex flex-col sm:flex-row">
                    {/* İletişim Bilgileri Bölümü */}
                    <div className="sm:w-1/2 p-12 flex flex-col justify-center">
                        <div className="max-w-lg mx-auto space-y-8">
                            <h2 className="text-4xl font-bold text-white bg-gradient-to-r from-purple-500 to-indigo-600 bg-clip-text text-transparent">
                                İletişim
                            </h2>
                            <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700 shadow-xl">
                                <iframe
                                    className="w-full h-72 rounded-xl mb-6 shadow-lg"
                                    src="https://www.google.com/maps/embed?pb=YOUR_MAP_EMBED_URL"
                                    allowFullScreen
                                ></iframe>
                                <div className="space-y-6 text-gray-300">
                                    <div className="flex items-center space-x-4">
                                        <svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                                        </svg>
                                        <Link href="mailto:contact@astroyazilim.com">contact@astroyazilim.com</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* İletişim Formu Bölümü */}
                    <div className="sm:w-1/2 p-12 bg-gray-800/30">
                        <div className="max-w-lg mx-auto">
                            <form onSubmit={submit} className="space-y-6">
                                <div className="flex space-x-4">
                                    <input
                                        type="text"
                                        value={data.first_name}
                                        onChange={e => setData('first_name', e.target.value)}
                                        className="block w-1/2 rounded-xl bg-gray-800/50 border border-gray-700 text-white px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                                        placeholder="Ad"
                                    />
                                    <input
                                        type="text"
                                        value={data.last_name}
                                        onChange={e => setData('last_name', e.target.value)}
                                        className="block w-1/2 rounded-xl bg-gray-800/50 border border-gray-700 text-white px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                                        placeholder="Soyad"
                                    />
                                </div>

                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                    className="block w-full rounded-xl bg-gray-800/50 border border-gray-700 text-white px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                                    placeholder="E-posta"
                                />

                                <input
                                    type="tel"
                                    value={data.phone}
                                    onChange={e => setData('phone', e.target.value)}
                                    className="block w-full rounded-xl bg-gray-800/50 border border-gray-700 text-white px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                                    placeholder="Telefon"
                                />

                                <textarea
                                    value={data.message}
                                    onChange={e => setData('message', e.target.value)}
                                    className="block w-full rounded-xl bg-gray-800/50 border border-gray-700 text-white px-4 py-3 h-32 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                                    placeholder="Mesaj"
                                ></textarea>

                                <div className="relative">
                                    <input
                                        type="file"
                                        onChange={e => setData('attachment', e.target.files[0])}
                                        className="block w-full text-white focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 transition"
                                    />
                                </div>

                                <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700">
                                    <div className="h-16 bg-gray-700/50 rounded-lg"></div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold py-3 px-6 rounded-xl hover:opacity-90 transition duration-150 ease-in-out shadow-lg"
                                >
                                    {processing ? 'Gönderiliyor...' : 'Mesaj Gönder'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

}