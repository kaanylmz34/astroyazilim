import React from 'react';
import { motion } from "framer-motion";
import { useSpring, animated, config } from '@react-spring/web'
import { Link } from '@inertiajs/react';

const VideoBackground = () => {

    const fadeIn = useSpring({
        from: { opacity: 0 },
        to: { opacity: 1 },
        config: config.molasses
    })

    const titleAnimation = useSpring({
        from: { transform: 'translateY(-50px)', opacity: 0 },
        to: { transform: 'translateY(0)', opacity: 1 },
        config: config.gentle
    })

    const buttonAnimation = useSpring({
        from: { transform: 'scale(0.8)', opacity: 0 },
        to: { transform: 'scale(1)', opacity: 1 },
        config: { tension: 200, friction: 20 }
    })

    return (
        <div className="relative w-full h-screen overflow-hidden">
            <video
                 {...fadeIn} as={animated.video}
                className="absolute top-0 left-0 w-full h-full object-cover filter brightness-40"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                playbackRate={.25}
            >
                <source src="/homepage.mp4" type="video/mp4" />
                Tarayıcınız video etiketini desteklemiyor.
            </video>
            
            <div className="absolute top-6 right-8 z-20">
                <div className="group relative">
                    <div className="flex items-center space-x-3 cursor-pointer">
                        <span className="text-white/90 text-sm font-light hover:text-white transition-colors duration-300">
                            Müşteri Girişi
                        </span>
                        <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 
                                      flex items-center justify-center group-hover:bg-white/20 transition-all duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white/90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                    </div>
                    <div className="absolute right-0 top-full mt-2 w-48 invisible group-hover:visible opacity-0 group-hover:opacity-100 
                                  transition-all duration-300 transform scale-95 group-hover:scale-100">
                        <div className="bg-white/10 backdrop-blur-md rounded-lg shadow-xl border border-white/20 overflow-hidden">
                            <Link href={route('login')} className="block px-4 py-3 text-sm text-white/90 hover:bg-white/20 transition-colors duration-300">
                                Giriş Yap
                            </Link>
                            <Link href={route('register')} className="block px-4 py-3 text-sm text-white/90 hover:bg-white/20 transition-colors duration-300">
                                Hesap Oluştur
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="relative z-10 w-full h-full bg-gradient-to-b from-black/20 to-black/50"
            >
                
                <div className="flex flex-col items-center justify-center h-full text-white px-4">
                    <motion.h1
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="text-6xl font-light mb-8 tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400"
                    >
                        Astro Yazılım
                    </motion.h1>
                    
                    <motion.p
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-xl text-gray-100 mb-14 text-center max-w-2xl font-extralight leading-loose tracking-wide"
                    >
                        Geleceğin teknolojisini bugünden keşfedin
                    </motion.p>
                    
                    <motion.div 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="space-x-6"
                    >
                        <animated.button
                            style={buttonAnimation}
                            onClick={() => {
                                buttonAnimation.start({
                                    from: { transform: 'scale(0.9)' },
                                    to: { transform: 'scale(1)' },
                                    config: { tension: 300, friction: 10 }
                                })
                            }}
                            className="bg-white/10 backdrop-blur-sm text-white px-8 py-3 rounded-full 
                            hover:bg-white hover:text-black transition-all duration-500 font-light text-base border border-white/30"
                        >
                            Keşfet
                        </animated.button>
                        <animated.button
                            style={buttonAnimation}
                            onClick={() => {
                                buttonAnimation.start({
                                    from: { transform: 'scale(0.9)' },
                                    to: { transform: 'scale(1)' },
                                    config: { tension: 300, friction: 10 }
                                })
                            }}
                            className="bg-transparent px-8 py-3 rounded-full 
                            hover:bg-white/10 hover:backdrop-blur-sm transition-all duration-500 font-light text-base border border-white/30"
                        >
                            Projelerimiz
                        </animated.button>
                        <animated.button
                            style={buttonAnimation}
                            onClick={() => {
                                buttonAnimation.start({
                                    from: { transform: 'scale(0.9)' },
                                    to: { transform: 'scale(1)' },
                                    config: { tension: 300, friction: 10 }
                                })
                            }}
                            className="bg-transparent px-8 py-3 rounded-full 
                            hover:bg-white/10 hover:backdrop-blur-sm transition-all duration-500 font-light text-base border border-white/30"
                        >
                            İletişim
                        </animated.button>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );

};
    
export default VideoBackground;