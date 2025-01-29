import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function GetOffer() {

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true
        });
    }, []);

    const technologies = [
        { name: 'React', icon: '⚛️' },
        { name: 'Laravel', icon: '🔥' },
        { name: 'Vue.js', icon: '💚' },
        { name: 'Node.js', icon: '💫' }
    ];

    const [currentStep, setCurrentStep] = useState(1);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted');
    }

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-black">
                <header className="border-b border-indigo-500/20 backdrop-blur-sm bg-black/10">
                    <div className="container mx-auto px-8 py-6">
                        <div className="flex items-center justify-between">
                            <div className="text-3xl font-bold text-white tracking-tight">
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">Astro</span>
                                <span className="text-white/90">Yazılım</span>
                            </div>
                        </div>
                    </div>
                </header>
                
                <main className="container mx-auto px-8 py-12">
                    <div className="max-w-5xl mx-auto">
                        <div className="mb-12 text-center" data-aos="fade-down">
                            <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 mb-4">Projeniz için Teklif İsteyin</h1>
                            <p className="text-gray-400 text-lg">Projenizi hayata geçirmek için ilk adımı atın</p>
                        </div>

                        <div className="flex justify-center mb-12">
                            <div className="flex items-center w-full max-w-3xl">
                                {[1, 2, 3].map((step) => (
                                    <React.Fragment key={step}>
                                        <div className="relative flex items-center">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${currentStep >= step ? 'bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg shadow-indigo-500/30' : 'bg-gray-800'}`}>
                                                <span className="text-white font-medium">{step}</span>
                                            </div>
                                            <span className={`ml-3 font-medium transition-all duration-300 ${currentStep >= step ? 'text-indigo-300' : 'text-gray-500'}`}>
                                                {step === 1 ? 'Müşteri Bilgileri' : step === 2 ? 'Proje Detayları' : 'Zaman & Bütçe'}
                                            </span>
                                        </div>
                                        {step < 3 && <div className={`flex-1 h-0.5 mx-4 transition-all duration-300 ${currentStep > step ? 'bg-gradient-to-r from-indigo-600 to-purple-600' : 'bg-gray-700'}`}></div>}
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="bg-gray-900/30 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-indigo-500/10">
                            {currentStep === 1 && (
                                <div data-aos="fade-right" className="space-y-6">
                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-gray-300 mb-2 font-medium">Ad Soyad</label>
                                            <input type="text" className="w-full bg-gray-800/50 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 border border-indigo-500/20 transition-all duration-300 hover:bg-gray-800/70" />
                                        </div>
                                        <div>
                                            <label className="block text-gray-300 mb-2 font-medium">E-posta</label>
                                            <input type="email" className="w-full bg-gray-800/50 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 border border-indigo-500/20 transition-all duration-300 hover:bg-gray-800/70" />
                                        </div>
                                        <div>
                                            <label className="block text-gray-300 mb-2 font-medium">Telefon</label>
                                            <input type="tel" className="w-full bg-gray-800/50 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 border border-indigo-500/20 transition-all duration-300 hover:bg-gray-800/70" />
                                        </div>
                                        <div>
                                            <label className="block text-gray-300 mb-2 font-medium">Şirket Adı</label>
                                            <input type="text" className="w-full bg-gray-800/50 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 border border-indigo-500/20 transition-all duration-300 hover:bg-gray-800/70" />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {currentStep === 2 && (
                                <div data-aos="fade-right" className="space-y-6">
                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-gray-300 mb-2 font-medium">Proje Adı</label>
                                            <input type="text" className="w-full bg-gray-800/50 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 border border-indigo-500/20 transition-all duration-300 hover:bg-gray-800/70" />
                                        </div>
                                        <div>
                                            <label className="block text-gray-300 mb-2 font-medium">Proje Türü</label>
                                            <select className="w-full bg-gray-800/50 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 border border-indigo-500/20 transition-all duration-300 hover:bg-gray-800/70">
                                                <option>Web Uygulaması</option>
                                                <option>Mobil Uygulama</option>
                                                <option>E-ticaret</option>
                                                <option>Kurumsal Yazılım</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-gray-300 mb-2 font-medium">Proje Detayları</label>
                                        <textarea rows="4" className="w-full bg-gray-800/50 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 border border-indigo-500/20 transition-all duration-300 hover:bg-gray-800/70"></textarea>
                                    </div>
                                    <div>
                                        <label className="block text-gray-300 mb-2 font-medium">Teknolojiler</label>
                                        <div className="grid grid-cols-4 gap-4">
                                            {technologies.map((tech) => (
                                                <div 
                                                    key={tech.name} 
                                                    className="group relative flex flex-col items-center p-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl cursor-pointer hover:from-indigo-900/30 hover:to-purple-900/30 border border-indigo-500/20 hover:border-indigo-500/50 transition-all duration-300"
                                                >
                                                    <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                                                        {tech.icon}
                                                    </div>
                                                    <span className="text-white font-medium group-hover:text-indigo-300 transition-colors duration-300">
                                                        {tech.name}
                                                    </span>
                                                    <div className="absolute inset-0 bg-indigo-500/10 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300"></div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-gray-300 mb-2 font-medium">Ek Dosyalar</label>
                                        <div className="border-2 border-dashed border-indigo-500/20 rounded-lg p-6 text-center hover:border-indigo-500/40 transition-all duration-300">
                                            <input type="file" className="hidden" />
                                            <button type="button" className="text-indigo-400 hover:text-indigo-300 transition-colors duration-300">Dosya Yükle</button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {currentStep === 3 && (
                                <div data-aos="fade-right" className="space-y-6">
                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-gray-300 mb-2 font-medium">Aciliyet Durumu</label>
                                            <select className="w-full bg-gray-800/50 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 border border-indigo-500/20 transition-all duration-300 hover:bg-gray-800/70">
                                                <option>Normal</option>
                                                <option>Acil</option>
                                                <option>Çok Acil</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-gray-300 mb-2 font-medium">Beklenen Teslim Tarihi</label>
                                            <input type="date" className="w-full bg-gray-800/50 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 border border-indigo-500/20 transition-all duration-300 hover:bg-gray-800/70" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-gray-300 mb-2 font-medium">Bütçe Aralığı</label>
                                        <select className="w-full bg-gray-800/50 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 border border-indigo-500/20 transition-all duration-300 hover:bg-gray-800/70">
                                            <option>10.000 - 25.000 TL</option>
                                            <option>25.000 - 50.000 TL</option>
                                            <option>50.000 - 100.000 TL</option>
                                            <option>100.000 TL üzeri</option>
                                        </select>
                                    </div>
                                </div>
                            )}

                            <div className="mt-8 flex justify-between">
                                {currentStep > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => setCurrentStep(currentStep - 1)}
                                        className="px-6 py-3 rounded-lg bg-gray-800/70 text-white hover:bg-gray-700/70 transition-all duration-300 border border-indigo-500/20"
                                    >
                                        Geri
                                    </button>
                                )}
                                <button
                                    type="button"
                                    onClick={() => currentStep < 3 ? setCurrentStep(currentStep + 1) : handleSubmit()}
                                    className="ml-auto px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 shadow-lg shadow-indigo-500/30"
                                >
                                    {currentStep === 3 ? 'Gönder' : 'İleri'}
                                </button>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </>
    );

}