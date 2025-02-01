import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SearchOverlay({ 
    isSearchFocused, 
    searchQuery, 
    setSearchQuery, 
    setIsSearchFocused,
    frequentSearches 
}) {
    return (
        <AnimatePresence>
            {isSearchFocused && (
                <motion.div 
                    className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    {/* ... existing search overlay content ... */}
                </motion.div>
            )}
        </AnimatePresence>
    );
} 