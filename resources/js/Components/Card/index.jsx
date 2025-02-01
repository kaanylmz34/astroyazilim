import React from 'react';

export default function Card({ title, children, className = '' }) {
    return (
        <div className={`bg-black/20 backdrop-blur-sm rounded-lg border border-indigo-500/20 p-6 ${className}`}>
            {title && (
                <div className="mb-4">
                    <h2 className="text-white/90 text-lg font-semibold">{title}</h2>
                </div>
            )}
            <div className="text-white">
                {children}
            </div>
        </div>
    );
}
