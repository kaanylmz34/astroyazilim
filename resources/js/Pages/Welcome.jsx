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
                        <h2 className="text-5xl font-light text-white tracking-wider">Astro Yazılım'a Hoşgeldiniz</h2>
                        <p className="mt-6 text-gray-400 text-lg">İşinizi pratikleştirmenin en iyi yolu</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div data-aos="fade-right" className="p-8 bg-zinc-900 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-all duration-300">
                            <h3 className="text-2xl font-light text-white mb-6">Profesyonel Çözümler</h3>
                            <p className="text-gray-400">Yılların deneyimi ve uzmanlığıyla, işletmenizin ihtiyaçlarına özel, kusursuz yazılım çözümleri sunuyoruz.</p>
                        </div>
                        <div data-aos="fade-up" className="p-8 bg-zinc-900 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-all duration-300">
                            <h3 className="text-2xl font-light text-white mb-6">Yenilikçi Teknoloji</h3>
                            <p className="text-gray-400">En son teknolojileri kullanarak, işletmenizi geleceğe taşıyacak modern ve güvenilir sistemler geliştiriyoruz.</p>
                        </div>
                        <div data-aos="fade-left" className="p-8 bg-zinc-900 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-all duration-300">
                            <h3 className="text-2xl font-light text-white mb-6">Müşteri Memnuniyeti</h3>
                            <p className="text-gray-400">Her projede %100 müşteri memnuniyetini hedefleyerek, beklentilerinizin ötesinde hizmet sunuyoruz.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Elegant Section 2 */}
            <section className="bg-zinc-900 py-24">
                <div className="container mx-auto px-4">
                    <div data-aos="zoom-in" className="max-w-3xl mx-auto text-center">
                        <h2 className="text-4xl font-light text-white mb-10 tracking-wide">Profesyonel Kurumsal Çözümler</h2>
                        <p className="text-gray-400 text-lg leading-relaxed">
                            İşletmenizin ihtiyaçlarına özel, kusursuz yazılım çözümleri sunuyoruz.
                        </p>
                    </div>
                </div>
            </section>

            {/* Footer ve Copyright */}
            <footer className="bg-zinc-800 py-12">
                <div className="container mx-auto px-4">
                    <p className="text-gray-400 text-center">
                        &copy; {new Date().getFullYear()} Astro Yazılım. Tüm hakları saklıdır.
                    </p>
                </div>
            </footer>
        </>
    );
}
