import React, { useState, useEffect, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link, usePage } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

export default ({ title, columns, data, dataUrl, onSearch, onAdd, onFilter, onSort, onPageChange, pagination }) => {
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
    
    const buttonRef = useRef();
    const dropdownRef = useRef();
    const [xhrPagination, setXhrPagination] = useState(pagination);

    const [goPageInput, setGoPageInput] = useState('');

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true
        });
    }, []);

    // If dataUrl is provided, fetch data from the URL
    useEffect(() => {
        if (dataUrl) {
            axios.get(dataUrl)
                .then(response => {
                    setData(response.data);
                });
        }
    }, [dataUrl]);

    const [localData, setLocalData] = useState(data || []);
    const [loading, setLoading] = useState(false);

    // Handle data fetching and updates if dataUrl is provided
    const handleDataOperation = async (operation, params = {}) => {
        if (!dataUrl) return;

        setLoading(true);
        try {
            const response = await axios.get(dataUrl, { params });
            setLocalData(response.data.data);

            if (pagination) {
                const { current_page, last_page, from, to, total } = response.data;
                setXhrPagination({
                    currentPage: Number(current_page),
                    prevPage: Number(current_page) - 1,
                    nextPage: Number(current_page) + 1,
                    totalPages: last_page,
                    from,
                    to,
                    total,
                    pages: Array.from({ length: last_page }, (_, i) => i + 1)
                });
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }

        setLoading(false);
    };

    // Initialize data
    useEffect(() => {
        if (dataUrl) {
            handleDataOperation('fetch');
        } else {
            setLocalData(data);
        }
    }, [dataUrl, data]);

    // Handle search
    const handleSearch = (query) => {
        if (dataUrl) {
            handleDataOperation('search', { search: query });
        } else {
            const filtered = data.filter(item =>
                Object.values(item).some(val =>
                    String(val).toLowerCase().includes(query.toLowerCase())
                )
            );
            setLocalData(filtered);
        }
    };

    // Handle sort
    const handleSort = (key) => {
        if (dataUrl) {
            handleDataOperation('sort', { sort: key });
        } else {
            const sorted = [...localData].sort((a, b) => 
                String(a[key]).localeCompare(String(b[key]))
            );
            setLocalData(sorted);
        }
    };

    // Handle filter
    const handleFilter = (key, value) => {
        if (dataUrl) {
            handleDataOperation('filter', { [key]: value });
        } else {
            const filtered = data.filter(item =>
                String(item[key]).toLowerCase().includes(value.toLowerCase())
            );
            setLocalData(filtered);
        }
    };

    // Handle pagination
    const handlePageChange = (page) => {
        if (page < 1 || page > (dataUrl ? xhrPagination.totalPages : pagination.totalPages))
            return;

        if (dataUrl) {
            handleDataOperation('page', { page });
        }
        onPageChange && onPageChange(page);
    };

    return (
        <div className="bg-transparent backdrop-blur-sm rounded-lg border border-indigo-500/20 overflow-hidden">
            {/* Table Header with Search */}
            <div className="p-4 border-b border-indigo-500/20">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl text-white font-semibold">{title}</h2>
                    <div className="flex items-center space-x-3">
                        <input
                            type="text"
                            placeholder="Global Search..."
                            className="bg-black/30 border border-indigo-500/20 rounded-lg px-4 py-2 text-white/80 placeholder-white/40 focus:outline-none focus:border-indigo-500"
                            onChange={(e) => handleSearch(e.target.value)}
                        />
                        {onAdd && (
                            <button 
                                onClick={onAdd}
                                className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg transition-colors"
                            >
                                Add New
                            </button>
                        )}
                    </div>
                </div>
                
                {/* Column Headers with Filters */}
                <div className="grid gap-8" style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))` }}>
                    {columns.map((column) => (
                        <div key={column.key} className="space-y-4">
                            <input
                                type="text"
                                placeholder={`Filter ${column.label}...`}
                                className="w-full bg-black/30 border border-indigo-500/20 rounded px-3 py-1 text-sm text-white/80 placeholder-white/40 focus:outline-none focus:border-indigo-500"
                                onChange={(e) => handleFilter(column.key, e.target.value)}
                            />
                            <div className="flex items-center justify-between text-white/60 text-sm">
                                <span>{column.label}</span>
                                {column.sortable && (
                                    <svg 
                                        className="w-4 h-4 cursor-pointer hover:text-indigo-400" 
                                        fill="none" 
                                        stroke="currentColor" 
                                        viewBox="0 0 24 24"
                                        onClick={() => handleSort(column.key)}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0L3 8m4-4l4 4m-4 4v8m0 0l4-4m-4 4l-4-4" />
                                    </svg>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Table Body */}
            <div className="overflow-x-auto">
                <table className="w-full table-fixed">
                    <colgroup>
                        {columns.map((_, index) => (
                            <col key={index} style={{ width: `${100 / columns.length}%` }} />
                        ))}
                    </colgroup>
                    <tbody>
                        {localData.map((row, idx) => (
                                <tr key={idx} className={`${row.highlight || ''} hover:bg-indigo-500/10 transition-colors`}>
                                    {columns.map((column) => (
                                        <td key={column.key} className="p-4 text-white/80">
                                            {column.render ? column.render(row) : row[column.key]}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                {
                    loading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                            <svg className="w-8 h-8 text-white animate-spin" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" d="M16 12a4 4 0 11-8 0m8 0a4 4 0 11-8 0" stroke="currentColor" strokeWidth="4"></path>
                            </svg>
                        </div>
                    )
                }
            </div>

        {/* Pagination */}
        {((dataUrl && xhrPagination) || (!dataUrl && pagination)) && (
            <>
            <div className="p-4 border-t border-indigo-500/20">
                <div className="flex items-center justify-between">
                    <nav className="flex items-center gap-2">
                        {/* go first */}
                        <button
                            onClick={() => handlePageChange(dataUrl ? 1 : 1)}
                            disabled={dataUrl ? xhrPagination.currentPage == 1 : pagination.currentPage == 1}
                            className="px-3 py-1 rounded-lg bg-indigo-500/20 text-white/80 hover:bg-indigo-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            First
                        </button>

                        <button
                            onClick={() => handlePageChange(dataUrl ? xhrPagination.prevPage : pagination.prevPage)}
                            disabled={dataUrl ? xhrPagination.currentPage == 1 : pagination.currentPage == 1}
                            className="px-3 py-1 rounded-lg bg-indigo-500/20 text-white/80 hover:bg-indigo-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Previous
                        </button>
                        
                        {(() => {
                            const currentPage = dataUrl ? xhrPagination.currentPage : pagination.currentPage;
                            const totalPages = dataUrl ? xhrPagination.totalPages : pagination.totalPages;
                            const delta = 2;
                            const range = [];
                            
                            for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
                                range.push(i);
                            }
                            
                            if (currentPage - delta > 2) {
                                range.unshift('...');
                            }
                            if (currentPage + delta < totalPages - 1) {
                                range.push('...');
                            }
                            
                            range.unshift(1);
                            if (totalPages > 1) {
                                range.push(totalPages);
                            }
                            
                            return range.map((page, index) => (
                                <React.Fragment key={index}>
                                    {page === '...' ? (
                                        <span className="px-3 py-1 text-white/80">...</span>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                if (page === '...') return;
                                                handlePageChange(page);
                                            }}
                                            className={`px-3 py-1 rounded-lg ${
                                                page == currentPage 
                                                    ? 'bg-indigo-500 text-white' 
                                                    : 'bg-indigo-500/20 text-white/80 hover:bg-indigo-500/30'
                                            }`}
                                        >
                                            {page}
                                        </button>
                                    )}
                                </React.Fragment>
                            ));
                        })()}

                        <button
                            onClick={() => handlePageChange(dataUrl ? xhrPagination.nextPage : pagination.nextPage )}
                            disabled={dataUrl ? xhrPagination.currentPage == xhrPagination.totalPages : pagination.currentPage == pagination.totalPages}
                            className="px-3 py-1 rounded-lg bg-indigo-500/20 text-white/80 hover:bg-indigo-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Next
                        </button>

                        <button
                            onClick={() => handlePageChange(dataUrl ? xhrPagination.totalPages : pagination.totalPages)}
                            disabled={dataUrl ? xhrPagination.currentPage == xhrPagination.totalPages : pagination.currentPage == pagination.totalPages}
                            className="px-3 py-1 rounded-lg bg-indigo-500/20 text-white/80 hover:bg-indigo-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Last
                        </button>
                    </nav>
                    {/* go specific page input and button */}
                    <div className="flex items-center space-x-2">
                        <input
                            type="number"
                            value={goPageInput}
                            onChange={(e) => setGoPageInput(e.target.value)}
                            className="w-16 px-2 py-1 rounded-lg bg-black/30 text-white/80 focus:outline-none focus:border-indigo-500/20"
                        />
                        <button
                            onClick={() => handlePageChange(goPageInput)}
                            className="px-3 py-1 rounded-lg bg-indigo-500/20 text-white/80 hover:bg-indigo-500/30"
                        >
                            Go
                        </button>
                    </div>
                </div>
            </div>
            </>
        )}
        </div>
    );
}