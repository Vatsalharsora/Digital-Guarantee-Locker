import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface DashboardProps {
    onLogout: () => void;
    onNavigate?: (view: string) => void;
}

export const Dashboard = ({ onLogout, onNavigate }: DashboardProps) => {
    const [activeTab, setActiveTab] = useState("overview");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [sidebarMinimized, setSidebarMinimized] = useState(false);
    const [sortBy, setSortBy] = useState<'name' | 'expiry' | 'status' | 'value'>('expiry');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    // Handle keyboard shortcuts and remove size-based conditions
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === "b") {
                e.preventDefault();
                setSidebarMinimized(!sidebarMinimized); // Works on all sizes
            }
            if (e.key === "Escape" && sidebarOpen) {
                setSidebarOpen(false);
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [sidebarMinimized, sidebarOpen]);

    const menuItems = [
        { id: "overview", label: "Dashboard", icon: "📊" },
        { id: "guarantees", label: "My Guarantees", icon: "📄" },
        { id: "upload", label: "Upload Document", icon: "📤" },
        { id: "reminders", label: "Reminders", icon: "⏰" },
        { id: "contact", label: "Contact Us", icon: "📞" },
        { id: "profile", label: "Profile", icon: "👤" },
    ];

    const stats = [
        { label: "Total Guarantees", value: "12", icon: "📋", color: "bg-blue-500" },
        { label: "Expiring Soon", value: "3", icon: "⚠️", color: "bg-orange-500" },
        { label: "Active Warranties", value: "9", icon: "✅", color: "bg-green-500" },
        { label: "Total Value", value: "₹45,000", icon: "💰", color: "bg-purple-500" },
    ];

    // Helper functions for table functionality
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Active':
                return 'bg-green-50 text-green-700 border-green-200';
            case 'Expiring Soon':
                return 'bg-orange-50 text-orange-700 border-orange-200';
            case 'Expired':
                return 'bg-red-50 text-red-700 border-red-200';
            default:
                return 'bg-gray-50 text-gray-700 border-gray-200';
        }
    };

    const sortGuarantees = (guarantees: typeof recentGuarantees, sortBy: string, sortOrder: 'asc' | 'desc') => {
        return [...guarantees].sort((a, b) => {
            let aVal: string | number, bVal: string | number;
            
            switch (sortBy) {
                case 'name':
                    aVal = a.name.toLowerCase();
                    bVal = b.name.toLowerCase();
                    break;
                case 'expiry':
                    aVal = new Date(a.expiry).getTime();
                    bVal = new Date(b.expiry).getTime();
                    break;
                case 'status':
                    aVal = a.status;
                    bVal = b.status;
                    break;
                case 'value':
                    aVal = parseInt(a.value.replace(/[₹,]/g, ''));
                    bVal = parseInt(b.value.replace(/[₹,]/g, ''));
                    break;
                default:
                    aVal = (a as Record<string, unknown>)[sortBy] as string;
                    bVal = (b as Record<string, unknown>)[sortBy] as string;
            }

            if (sortOrder === 'asc') {
                return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
            } else {
                return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
            }
        });
    };

    const handleSort = (column: 'name' | 'expiry' | 'status' | 'value') => {
        if (sortBy === column) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(column);
            setSortOrder('asc');
        }
    };

    const recentGuarantees = [
        { 
            id: 1, 
            name: "Samsung Galaxy S24 Ultra", 
            brand: "Samsung",
            category: "Electronics", 
            expiry: "2025-08-15", 
            purchaseDate: "2024-08-15",
            warrantyPeriod: "12 months",
            status: "Active",
            value: "₹89,999",
            daysLeft: 142
        },
        { 
            id: 2, 
            name: "LG 260L Double Door Refrigerator", 
            brand: "LG",
            category: "Appliances", 
            expiry: "2025-03-20", 
            purchaseDate: "2023-03-20",
            warrantyPeriod: "24 months",
            status: "Expiring Soon",
            value: "₹28,500",
            daysLeft: 42
        },
        { 
            id: 3, 
            name: "Dell Inspiron 15 3000 Laptop", 
            brand: "Dell",
            category: "Electronics", 
            expiry: "2026-01-10", 
            purchaseDate: "2025-01-10",
            warrantyPeriod: "12 months",
            status: "Active",
            value: "₹45,990",
            daysLeft: 367
        },
        { 
            id: 4, 
            name: "Godrej Steel Almirah", 
            brand: "Godrej",
            category: "Furniture", 
            expiry: "2027-05-30", 
            purchaseDate: "2022-05-30",
            warrantyPeriod: "60 months",
            status: "Active",
            value: "₹12,750",
            daysLeft: 875
        },
        { 
            id: 5, 
            name: "Sony WH-1000XM4 Headphones", 
            brand: "Sony",
            category: "Electronics", 
            expiry: "2025-02-28", 
            purchaseDate: "2024-02-28",
            warrantyPeriod: "12 months",
            status: "Expiring Soon",
            value: "₹29,990",
            daysLeft: 22
        },
        { 
            id: 6, 
            name: "Whirlpool 1.5 Ton AC", 
            brand: "Whirlpool",
            category: "Appliances", 
            expiry: "2029-12-15", 
            purchaseDate: "2024-12-15",
            warrantyPeriod: "60 months",
            status: "Active",
            value: "₹42,000",
            daysLeft: 1802
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar Overlay - Only on mobile when sidebar is open */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <motion.div
                className={`
                    fixed inset-y-0 left-0 z-50 bg-white shadow-xl border-r border-gray-200
                    lg:relative lg:translate-x-0 lg:shadow-none
                    ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
                    transition-all duration-300 ease-in-out
                `}
                style={{ 
                    width: sidebarMinimized ? "80px" : "256px",
                    minWidth: sidebarMinimized ? "80px" : "256px"
                }}
                initial={{ x: -250 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.3 }}
            >
                {/* Sidebar Header */}
                <div className="p-6 border-b border-gray-200 relative flex items-center justify-between">
                    <div
                        className={`flex items-center ${sidebarMinimized ? "justify-center" : "space-x-3"
                            }`}
                    >
                        <motion.div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center" whileHover={{ scale: 1.05 }}>
                            <span className="text-white font-bold">🔐</span>
                        </motion.div>
                        {!sidebarMinimized && (
                            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.2 }}>
                                <h2 className="font-semibold text-gray-900">Digital Guarantee</h2>
                                <p className="text-sm text-gray-600">Locker</p>
                            </motion.div>
                        )}
                    </div>

                    {/* Toggle Sidebar */}
                    <motion.button
                        onClick={() => setSidebarMinimized(!sidebarMinimized)}
                        className="ml-2 flex items-center justify-center w-9 h-9 rounded-full bg-gray-100"
                    >
                        <motion.svg
                            className="w-5 h-5 text-gray-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            animate={{ rotate: sidebarMinimized ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 19l-7-7 7-7"
                            />
                        </motion.svg>
                    </motion.button>
                </div>

                {/* Navigation */}
                <nav className="p-3 lg:p-4 space-y-1 lg:space-y-2">
                    {menuItems.map((item, index) => (
                        <div key={item.id} className="relative group">
                            <motion.button
                                onClick={() => {
                                    if (item.id === "overview" || item.id === "profile") {
                                        setActiveTab(item.id);
                                        setSidebarOpen(false);
                                    } else if (onNavigate) {
                                        onNavigate(item.id);
                                        setSidebarOpen(false); // Close mobile sidebar when navigating
                                    }
                                }}
                                className={`w-full flex items-center ${
                                    sidebarMinimized ? "justify-center px-2" : "space-x-3 px-3 lg:px-4"
                                } py-2.5 lg:py-3 rounded-xl text-left transition-all duration-200 ${
                                    activeTab === item.id && (item.id === "overview" || item.id === "profile")
                                        ? "bg-blue-50 text-blue-700 border border-blue-200 shadow-sm"
                                        : "text-gray-700 hover:bg-gray-100 hover:shadow-sm"
                                }`}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                            >
                                <span className="text-lg lg:text-xl flex-shrink-0">{item.icon}</span>
                                {!sidebarMinimized && <span className="font-medium text-sm lg:text-base">{item.label}</span>}
                            </motion.button>

                            {/* Tooltip - Only show on desktop when minimized */}
                            {sidebarMinimized && (
                                <motion.div
                                    className="absolute left-full ml-3 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-2 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-lg pointer-events-none z-60 hidden lg:block"
                                    initial={{ opacity: 0, x: -10 }}
                                >
                                    {item.label}
                                    <div className="absolute left-0 top-1/2 transform -translate-x-1 -translate-y-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
                                </motion.div>
                            )}
                        </div>
                    ))}
                </nav>

                {/* Logout */}
                <div className="absolute bottom-3 lg:bottom-4 left-3 lg:left-4 right-3 lg:right-4">
                    <motion.button
                        onClick={() => {
                            onLogout();
                            setSidebarOpen(false);
                        }}
                        className={`w-full flex items-center ${
                            sidebarMinimized ? "justify-center px-2" : "space-x-3 px-3 lg:px-4"
                        } py-2.5 lg:py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 group relative`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <span className="text-lg lg:text-xl">🚪</span>
                        {!sidebarMinimized && <span className="font-medium text-sm lg:text-base">Logout</span>}
                        
                        {/* Tooltip for logout when minimized */}
                        {sidebarMinimized && (
                            <motion.div
                                className="absolute left-full ml-3 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-2 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-lg pointer-events-none z-60 hidden lg:block"
                                initial={{ opacity: 0, x: -10 }}
                            >
                                Logout
                                <div className="absolute left-0 top-1/2 transform -translate-x-1 -translate-y-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
                            </motion.div>
                        )}
                    </motion.button>
                </div>
            </motion.div>

            {/* Floating Drawer Toggle - Mobile only */}
            <motion.button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="fixed bottom-6 right-6 z-30 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 lg:hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <motion.svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    animate={{ rotate: sidebarOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </motion.svg>
            </motion.button>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 transition-all duration-300">
                {/* Header */}
                <header className="bg-white border-b border-gray-200 p-4 lg:p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 lg:space-x-4 min-w-0">
                            <motion.button
                                onClick={() => setSidebarOpen(true)}
                                className="p-2 lg:p-3 text-gray-600 hover:bg-gray-100 rounded-xl lg:hidden"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </motion.button>
                            
                            {/* Desktop sidebar toggle
                            <motion.button
                                onClick={() => setSidebarMinimized(!sidebarMinimized)}
                                className="hidden lg:flex p-2 lg:p-3 text-gray-600 hover:bg-gray-100 rounded-xl items-center justify-center"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                title={`${sidebarMinimized ? 'Expand' : 'Minimize'} sidebar (Ctrl+B)`}
                            >
                                <motion.svg
                                    className="w-5 h-5 lg:w-6 lg:h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    animate={{ rotate: sidebarMinimized ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 19l-7-7 7-7"
                                    />
                                </motion.svg>
                            </motion.button>
                             */}
                            <div className="min-w-0">
                                <h1 className="text-lg lg:text-xl font-semibold text-gray-900 truncate">
                                    {menuItems.find((item) => item.id === activeTab)?.label}
                                </h1>
                                <p className="text-xs lg:text-sm text-gray-600 hidden sm:block">Welcome back, Vatsal!</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2 lg:space-x-4">
                            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg relative">
                                <span className="text-lg lg:text-xl">🔔</span>
                                <span className="absolute -top-1 -right-1 w-4 h-4 lg:w-5 lg:h-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                                    3
                                </span>
                            </button>
                            <div className="w-7 h-7 lg:w-8 lg:h-8 bg-blue-600 rounded-full flex items-center justify-center">
                                <span className="text-white text-xs lg:text-sm font-bold">V</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <main className="flex-1 p-4 lg:p-6 overflow-auto pb-20 lg:pb-6">
                    {activeTab === "overview" && (
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }} 
                            animate={{ opacity: 1, y: 0 }} 
                            transition={{ duration: 0.5 }}
                            className="space-y-4 lg:space-y-6"
                        >
                            {/* Stats */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                                {stats.map((stat, index) => (
                                    <motion.div 
                                        key={stat.label} 
                                        className="bg-white rounded-lg border p-4 lg:p-6 hover:shadow-lg transition-shadow duration-200"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.3, delay: index * 0.1 }}
                                        whileHover={{ scale: 1.02 }}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="min-w-0 flex-1">
                                                <p className="text-xs lg:text-sm text-gray-600 mb-1 truncate">{stat.label}</p>
                                                <p className="text-xl lg:text-2xl font-bold text-gray-900">{stat.value}</p>
                                            </div>
                                            <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-lg ${stat.color} flex items-center justify-center flex-shrink-0 ml-3`}>
                                                <span className="text-white text-lg lg:text-xl">{stat.icon}</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Recent Guarantees */}
                            <motion.div 
                                className="bg-white rounded-lg border shadow-sm"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                <div className="p-4 lg:p-6 border-b border-gray-100">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-lg font-semibold text-gray-900">Recent Guarantees</h3>
                                        <div className="flex items-center space-x-2">
                                            <span className="text-sm text-gray-500">
                                                {recentGuarantees.length} items
                                            </span>
                                            <button
                                                onClick={() => onNavigate && onNavigate('guarantees')}
                                                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                                            >
                                                View All
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Mobile Card View */}
                                <div className="lg:hidden">
                                    {sortGuarantees(recentGuarantees, sortBy, sortOrder).slice(0, 4).map((g, index) => (
                                        <motion.div 
                                            key={g.id} 
                                            className="p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors duration-150"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.3, delay: index * 0.1 }}
                                        >
                                            <div className="space-y-3">
                                                <div className="flex items-start justify-between">
                                                    <div className="min-w-0 flex-1">
                                                        <h4 className="font-medium text-gray-900 truncate">{g.name}</h4>
                                                        <p className="text-sm text-gray-600">{g.brand} • {g.category}</p>
                                                    </div>
                                                    <span
                                                        className={`px-2 py-1 rounded-full text-xs font-medium border flex-shrink-0 ml-3 ${getStatusColor(g.status)}`}
                                                    >
                                                        {g.status}
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-between text-sm">
                                                    <div>
                                                        <span className="text-gray-500">Expires: </span>
                                                        <span className={`${g.daysLeft <= 30 ? 'text-orange-600 font-medium' : 'text-gray-700'}`}>
                                                            {new Date(g.expiry).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                    <div className="text-gray-900 font-medium">{g.value}</div>
                                                </div>
                                                {g.daysLeft <= 30 && (
                                                    <div className="flex items-center text-xs text-orange-600">
                                                        <span className="mr-1">⚠️</span>
                                                        {g.daysLeft} days remaining
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                                
                                {/* Desktop Table View */}
                                <div className="hidden lg:block overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-gray-50 border-b border-gray-200">
                                            <tr>
                                                <th 
                                                    className="px-6 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer hover:text-gray-900 transition-colors group"
                                                    onClick={() => handleSort('name')}
                                                >
                                                    <div className="flex items-center space-x-1">
                                                        <span>Product</span>
                                                        <div className="flex flex-col">
                                                            <svg className={`w-3 h-3 ${sortBy === 'name' && sortOrder === 'asc' ? 'text-blue-600' : 'text-gray-400'} group-hover:text-gray-600`} fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </th>
                                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Brand</th>
                                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Category</th>
                                                <th 
                                                    className="px-6 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer hover:text-gray-900 transition-colors group"
                                                    onClick={() => handleSort('expiry')}
                                                >
                                                    <div className="flex items-center space-x-1">
                                                        <span>Expiry Date</span>
                                                        <div className="flex flex-col">
                                                            <svg className={`w-3 h-3 ${sortBy === 'expiry' && sortOrder === 'asc' ? 'text-blue-600' : 'text-gray-400'} group-hover:text-gray-600`} fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </th>
                                                <th 
                                                    className="px-6 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer hover:text-gray-900 transition-colors group"
                                                    onClick={() => handleSort('value')}
                                                >
                                                    <div className="flex items-center space-x-1">
                                                        <span>Value</span>
                                                        <div className="flex flex-col">
                                                            <svg className={`w-3 h-3 ${sortBy === 'value' && sortOrder === 'asc' ? 'text-blue-600' : 'text-gray-400'} group-hover:text-gray-600`} fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </th>
                                                <th 
                                                    className="px-6 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer hover:text-gray-900 transition-colors group"
                                                    onClick={() => handleSort('status')}
                                                >
                                                    <div className="flex items-center space-x-1">
                                                        <span>Status</span>
                                                        <div className="flex flex-col">
                                                            <svg className={`w-3 h-3 ${sortBy === 'status' && sortOrder === 'asc' ? 'text-blue-600' : 'text-gray-400'} group-hover:text-gray-600`} fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </th>
                                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 bg-white">
                                            {sortGuarantees(recentGuarantees, sortBy, sortOrder).slice(0, 5).map((g, index) => (
                                                <motion.tr 
                                                    key={g.id} 
                                                    className="hover:bg-gray-50 transition-colors duration-150"
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                                >
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center">
                                                            <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                                                <span className="text-lg">
                                                                    {g.category === 'Electronics' ? '📱' : 
                                                                     g.category === 'Appliances' ? '🏠' : '🪑'}
                                                                </span>
                                                            </div>
                                                            <div className="ml-3">
                                                                <p className="font-medium text-gray-900 truncate max-w-48" title={g.name}>
                                                                    {g.name}
                                                                </p>
                                                                <p className="text-sm text-gray-500">
                                                                    {g.warrantyPeriod} warranty
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-900">{g.brand}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-600">{g.category}</td>
                                                    <td className="px-6 py-4 text-sm">
                                                        <div className="flex flex-col">
                                                            <span className={`${g.daysLeft <= 30 ? 'text-orange-600 font-medium' : 'text-gray-700'}`}>
                                                                {new Date(g.expiry).toLocaleDateString()}
                                                            </span>
                                                            {g.daysLeft <= 30 && (
                                                                <span className="text-xs text-orange-500">
                                                                    {g.daysLeft} days left
                                                                </span>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{g.value}</td>
                                                    <td className="px-6 py-4">
                                                        <span
                                                            className={`inline-flex items-center px-2.5 py-1.5 rounded-full text-xs font-medium border ${getStatusColor(g.status)}`}
                                                        >
                                                            {g.status === 'Active' && <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5"></span>}
                                                            {g.status === 'Expiring Soon' && <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-1.5"></span>}
                                                            {g.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm">
                                                        <div className="flex items-center space-x-2">
                                                            <button className="text-blue-600 hover:text-blue-800 font-medium">
                                                                View
                                                            </button>
                                                            <span className="text-gray-300">|</span>
                                                            <button className="text-gray-600 hover:text-gray-800">
                                                                Edit
                                                            </button>
                                                        </div>
                                                    </td>
                                                </motion.tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    
                                    {/* Table Footer */}
                                    <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                                        <div className="flex items-center justify-between">
                                            <div className="text-sm text-gray-700">
                                                Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of{' '}
                                                <span className="font-medium">{recentGuarantees.length}</span> results
                                            </div>
                                            <button
                                                onClick={() => onNavigate && onNavigate('guarantees')}
                                                className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors duration-150"
                                            >
                                                View All Guarantees →
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}

                    {activeTab === "profile" && (
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }} 
                            animate={{ opacity: 1, y: 0 }} 
                            transition={{ duration: 0.5 }}
                            className="space-y-4 lg:space-y-6"
                        >
                            <div className="bg-white rounded-lg border p-4 lg:p-6 shadow-sm">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4 lg:mb-6">Profile Settings</h2>
                                <div className="space-y-4 lg:space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                        <input
                                            type="text"
                                            defaultValue="Vatsal Harsora"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                        <input
                                            type="email"
                                            defaultValue="vatsal@example.com"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Mobile</label>
                                        <input
                                            type="tel"
                                            defaultValue="+91 98765 43210"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200"
                                        />
                                    </div>
                                    <motion.button 
                                        className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        Save Changes
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </main>
            </div>
        </div>
    );
};