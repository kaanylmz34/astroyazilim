import React, { useState, useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <>
            <Head title="Giriş Yap" />
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
                            <h2 className="text-3xl font-bold text-white tracking-tight">Hoş Geldiniz</h2>
                            <p className="mt-3 text-gray-400">Hesabınıza giriş yapın</p>
                            {status && <div className="mb-4 text-sm text-green-400">{status}</div>}
                        </div>

                        <form onSubmit={submit} className="mt-10 space-y-6">
                            <div className="space-y-5">
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="email"
                                        value={data.email}
                                        onChange={e => setData('email', e.target.value)}
                                        placeholder="Telefon no veya E-posta"
                                        className="w-full rounded-xl border border-gray-700/50 bg-gray-800/40 p-4 text-white placeholder-gray-500 transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                                    />
                                    {errors.email && <div className="mt-1 text-sm text-red-400">{errors.email}</div>}
                                </div>
                                <div className="relative">
                                    <input
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        onChange={e => setData('password', e.target.value)}
                                        placeholder="Şifre"
                                        className="w-full rounded-xl border border-gray-700/50 bg-gray-800/40 p-4 text-white placeholder-gray-500 transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                                    />
                                    {errors.password && <div className="mt-1 text-sm text-red-400">{errors.password}</div>}
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <label className="flex items-center">
                                    <input 
                                        type="checkbox"
                                        name="remember"
                                        checked={data.remember}
                                        onChange={e => setData('remember', e.target.checked)}
                                        className="rounded border-gray-700 bg-gray-800/40 text-indigo-500" 
                                    />
                                    <span className="ml-2 text-sm text-gray-400">Beni hatırla</span>
                                </label>
                                {canResetPassword && (
                                    <Link href={route('password.request')} className="text-sm text-indigo-400 hover:text-indigo-300 transition">
                                        Şifremi unuttum
                                    </Link>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full rounded-xl bg-indigo-600 px-4 py-4 font-semibold text-white transition duration-200 hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/25 disabled:opacity-75"
                            >
                                {processing ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
                            </button>

                            <p className="text-center text-sm text-gray-400">
                                Hesabınız yok mu?{' '}
                                <Link href={route('register')} className="text-indigo-400 hover:text-indigo-300 transition">
                                    Hesap oluştur
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
