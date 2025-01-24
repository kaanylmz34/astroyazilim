import { Head, Link } from '@inertiajs/react';
import React, { useEffect } from 'react';
import VideoBackground from '@/Components/Home/VideoBackground';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Welcome({ auth }) {

    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    return (
        <>
            <VideoBackground />
            
            {/* Elegant Section 1 */}
            <section className="bg-black py-24">
                <div className="container mx-auto px-4">
                    <div data-aos="fade-up" className="text-center mb-16">
                        <h2 className="text-5xl font-light text-white tracking-wider">Welcome to Excellence</h2>
                        <p className="mt-6 text-gray-400 text-lg">Elevating Your Experience to New Heights</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div data-aos="fade-right" className="p-8 bg-zinc-900 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-all duration-300">
                            <h3 className="text-2xl font-light text-white mb-6">Sophistication</h3>
                            <p className="text-gray-400">Crafted with precision and attention to every detail.</p>
                        </div>
                        <div data-aos="fade-up" className="p-8 bg-zinc-900 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-all duration-300">
                            <h3 className="text-2xl font-light text-white mb-6">Elegance</h3>
                            <p className="text-gray-400">Where luxury meets innovative design philosophy.</p>
                        </div>
                        <div data-aos="fade-left" className="p-8 bg-zinc-900 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-all duration-300">
                            <h3 className="text-2xl font-light text-white mb-6">Excellence</h3>
                            <p className="text-gray-400">Delivering unprecedented quality and refinement.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Elegant Section 2 */}
            <section className="bg-zinc-900 py-24">
                <div className="container mx-auto px-4">
                    <div data-aos="zoom-in" className="max-w-3xl mx-auto text-center">
                        <h2 className="text-4xl font-light text-white mb-10 tracking-wide">Our Legacy</h2>
                        <p className="text-gray-400 text-lg leading-relaxed">
                            We pride ourselves on delivering unparalleled excellence through innovative solutions 
                            and meticulous attention to detail. Our commitment to perfection sets new standards 
                            in the industry.
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
}
