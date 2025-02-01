import React, { useState, useEffect, useRef } from 'react';
import { usePage } from '@inertiajs/react';
import AOS from 'aos';
import Header from './Header';
import Sidebar from './Sidebar';
import SearchOverlay from './SearchOverlay';

export default function CustomerLayout({ children }) {
    const { auth } = usePage().props;
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
    
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

    return (
        <>
            <div className={`min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-black`}>
                <Header 
                    isSearchFocused={isSearchFocused}
                    setIsSearchFocused={setIsSearchFocused}
                    showNotificationDropdown={showNotificationDropdown}
                    setShowNotificationDropdown={setShowNotificationDropdown}
                    buttonRef={buttonRef}
                    dropdownRef={dropdownRef}
                    auth={auth}
                />

                <div className="container mx-auto px-4 py-8">
                    <div className="flex">
                        <Sidebar />
                        <div className="flex-1 space-y-6">
                            {children}
                        </div>
                    </div>
                </div>
            </div>

            <SearchOverlay 
                isSearchFocused={isSearchFocused}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                setIsSearchFocused={setIsSearchFocused}
                frequentSearches={frequentSearches}
            />
        </>
    );
} 