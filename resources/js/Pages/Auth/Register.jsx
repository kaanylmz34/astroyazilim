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

            <div className="flex min-h-[calc(100vh-88px)] items-center justify-center px-4 py-8">
                <div className="w-full max-w-2xl space-y-8 rounded-2xl bg-gray-900/50 backdrop-blur-xl p-10 shadow-2xl border border-gray-800/50">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-white tracking-tight">Hesap Oluştur</h2>
                        <p className="mt-3 text-gray-400">Yeni bir hesap oluşturarak başlayın</p>
                    </div>

                    <form className="mt-10 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Ad"
                                    className="w-full rounded-xl border border-gray-700/50 bg-gray-800/40 p-4 text-white placeholder-gray-500 transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                                />
                            </div>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Soyad"
                                    className="w-full rounded-xl border border-gray-700/50 bg-gray-800/40 p-4 text-white placeholder-gray-500 transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                                />
                            </div>
                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder="E-posta"
                                    className="w-full rounded-xl border border-gray-700/50 bg-gray-800/40 p-4 text-white placeholder-gray-500 transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                                />
                            </div>
                            <div className="relative">
                                <input
                                    type="tel"
                                    placeholder="Telefon"
                                    className="w-full rounded-xl border border-gray-700/50 bg-gray-800/40 p-4 text-white placeholder-gray-500 transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                                />
                            </div>
                        </div>

                        <div className="space-y-5">
                            <div className="relative">
                                <input
                                    type="password"
                                    placeholder="Şifre"
                                    className="w-full rounded-xl border border-gray-700/50 bg-gray-800/40 p-4 text-white placeholder-gray-500 transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                                />
                                <div className="mt-2 space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <div className="h-1 flex-1 rounded bg-gray-700">
                                            <div className="h-full w-1/4 rounded bg-indigo-500"></div>
                                        </div>
                                        <span className="text-sm text-gray-400">Zayıf</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2 text-xs text-gray-400">
                                        <span className="rounded bg-gray-800 px-2 py-1">En az 8 karakter</span>
                                        <span className="rounded bg-gray-800 px-2 py-1">Büyük harf (A-Z)</span>
                                        <span className="rounded bg-gray-800 px-2 py-1">Küçük harf (a-z)</span>
                                        <span className="rounded bg-gray-800 px-2 py-1">Rakam (0-9)</span>
                                        <span className="rounded bg-gray-800 px-2 py-1">Özel karakter (!@#$%)</span>
                                    </div>
                                </div>
                            </div>
                            <div className="relative">
                                <input
                                    type="password"
                                    placeholder="Şifre (Tekrar)"
                                    className="w-full rounded-xl border border-gray-700/50 bg-gray-800/40 p-4 text-white placeholder-gray-500 transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                                />
                            </div>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Şirket Adı (Opsiyonel)"
                                    className="w-full rounded-xl border border-gray-700/50 bg-gray-800/40 p-4 text-white placeholder-gray-500 transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                                />
                            </div>
                            <div className="relative">
                                <select className="w-full rounded-xl border border-gray-700/50 bg-gray-800/40 p-4 text-gray-400 transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20">
                                    <option value="">Bizi nereden duydunuz?</option>
                                    <option value="google">Google</option>
                                    <option value="social">Sosyal Medya</option>
                                    <option value="other">Diğer</option>
                                </select>
                            </div>
                            <div className="relative">
                                <div className="h-14 rounded-xl border border-gray-700/50 bg-gray-800/40">
                                    {/* Captcha alanı */}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="flex items-center">
                                <input type="checkbox" className="rounded border-gray-700 bg-gray-800/40 text-indigo-500" />
                                <span className="ml-2 text-sm text-gray-400">
                                    <Link href="#" className="text-indigo-400 hover:text-indigo-300">KVKK Aydınlatma Metni</Link>'ni okudum ve kabul ediyorum
                                </span>
                            </label>
                            <label className="flex items-center">
                                <input type="checkbox" className="rounded border-gray-700 bg-gray-800/40 text-indigo-500" />
                                <span className="ml-2 text-sm text-gray-400">
                                    <Link href="#" className="text-indigo-400 hover:text-indigo-300">Gizlilik Politikası</Link>'nı okudum ve kabul ediyorum
                                </span>
                            </label>
                            <label className="flex items-center">
                                <input type="checkbox" className="rounded border-gray-700 bg-gray-800/40 text-indigo-500" />
                                <span className="ml-2 text-sm text-gray-400">
                                    <Link href="#" className="text-indigo-400 hover:text-indigo-300">Üyelik Sözleşmesi</Link>'ni okudum ve kabul ediyorum
                                </span>
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="w-full rounded-xl bg-indigo-600 px-4 py-4 font-semibold text-white transition duration-200 hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/25"
                        >
                            Hesap Oluştur
                        </button>

                        <p className="text-center text-sm text-gray-400">
                            Zaten hesabınız var mı?{' '}
                            <Link href="#" className="text-indigo-400 hover:text-indigo-300 transition">
                                Giriş yapın
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
        </>
    );
}
