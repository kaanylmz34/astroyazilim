import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Controller, Scene } from 'react-scrollmagic';

export default function Projects() {

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true
        });
    }, []);

    return (
        <>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-black">
            <header className="fixed w-full z-50 border-b border-gray-800/30 backdrop-blur-md bg-black/10">
                <div className="container mx-auto px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="text-3xl font-bold text-white tracking-tighter hover:scale-105 transition-transform">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">Astro</span>Yazılım
                        </div>
                    </div>
                </div>
            </header>
            <main className="container mx-auto px-8 pt-32 pb-16">
                <h1 className="text-6xl font-bold text-white mb-20 text-center" data-aos="fade-down">
                    Bize Ait <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">Projeler</span>
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    <div className="group relative overflow-hidden rounded-2xl shadow-2xl shadow-indigo-500/10" data-aos="fade-up" data-aos-delay="100">
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-70 z-10 group-hover:opacity-50 transition-opacity"></div>
                        <img src="https://placehold.co/500x500" className="w-full h-[450px] object-cover transform group-hover:scale-110 transition-all duration-700 ease-in-out" alt="Project 1" />
                        <div className="absolute bottom-0 left-0 right-0 p-8 pb-12 z-20">
                            <h3 className="text-2xl font-bold text-white mb-3 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                                Innovative Platform
                            </h3>
                            <p className="text-gray-300 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                                A cutting-edge solution for modern businesses
                            </p>
                        </div>
                    </div>
                    <div className="group relative overflow-hidden rounded-2xl shadow-2xl shadow-indigo-500/10" data-aos="fade-up" data-aos-delay="200">
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-70 z-10 group-hover:opacity-50 transition-opacity"></div>
                        <img src="https://placehold.co/500x500" className="w-full h-[450px] object-cover transform group-hover:scale-110 transition-all duration-700 ease-in-out" alt="Project 2" />
                        <div className="absolute bottom-0 left-0 right-0 p-8 pb-12 z-20">
                            <h3 className="text-2xl font-bold text-white mb-3 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                                Smart Analytics
                            </h3>
                            <p className="text-gray-300 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                                Data-driven insights for informed decisions
                            </p>
                        </div>
                    </div>
                    <div className="group relative overflow-hidden rounded-2xl shadow-2xl shadow-indigo-500/10" data-aos="fade-up" data-aos-delay="300">
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-70 z-10 group-hover:opacity-50 transition-opacity"></div>
                        <img src="https://placehold.co/500x500" className="w-full h-[450px] object-cover transform group-hover:scale-110 transition-all duration-700 ease-in-out" alt="Project 3" />
                        <div className="absolute bottom-0 left-0 right-0 p-8 pb-12 z-20">
                            <h3 className="text-2xl font-bold text-white mb-3 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                                Digital Experience
                            </h3>
                            <p className="text-gray-300 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                                Creating memorable user interactions
                            </p>
                        </div>
                    </div>
                </div>
                <div className="mt-32 text-center">
                    <h2 className="text-4xl font-bold text-white mb-8" data-aos="fade-up">
                        İşbirliğine <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">hazır mısınız</span>?
                    </h2>
                    <p className="text-gray-300 max-w-2xl mx-auto mb-12" data-aos="fade-up" data-aos-delay="100">
                        Sizi dinlemek ve projenizde nasıl yardımcı olabileceğimizi öğrenmek isteriz.
                    </p>
                    <button className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg text-white font-semibold hover:scale-105 transition-transform" data-aos="fade-up" data-aos-delay="200">
                        Teklif İste
                    </button>
                </div>
            </main>
        </div>
        </>
    );

}