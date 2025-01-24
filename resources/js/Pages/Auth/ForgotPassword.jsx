import React, { useState, useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {

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

            <div className="flex min-h-[calc(100vh-88px)] items-center justify-center px-4">
                <div className="w-full max-w-md space-y-8 rounded-2xl bg-gray-900/50 backdrop-blur-xl p-10 shadow-2xl border border-gray-800/50">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-white tracking-tight">Şifre Sıfırlama</h2>
                        <p className="mt-3 text-gray-400">Şifrenizi sıfırlamak için e-posta adresinizi girin</p>
                    </div>

                    <form className="mt-10 space-y-6">
                        <div className="space-y-5">
                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder="E-posta"
                                    className="w-full rounded-xl border border-gray-700/50 bg-gray-800/40 p-4 text-white placeholder-gray-500 transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                                />
                            </div>
                            <div className="relative">
                                <div className="h-14 rounded-xl border border-gray-700/50 bg-gray-800/40">
                                    {/* Captcha alanı */}
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full rounded-xl bg-indigo-600 px-4 py-4 font-semibold text-white transition duration-200 hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/25"
                        >
                            Şifre Sıfırlama Bağlantısı Gönder
                        </button>

                        <p className="text-center text-sm text-gray-400">
                            <Link href="/login" className="text-indigo-400 hover:text-indigo-300 transition">
                                Giriş sayfasına dön
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
        </>
    );
}

