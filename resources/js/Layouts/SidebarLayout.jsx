import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { 
    LayoutDashboard, 
    Users, 
    Wifi, 
    CreditCard, 
    Settings, 
    Menu, 
    X, 
    LogOut,
    Bell,
    ChevronDown,
    User
} from 'lucide-react';

export default function SidebarLayout({ children }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    
    // --- FIX IS HERE ---
    // We get 'url' from the page object directly
    // We get 'auth' (user info) from the props
    const { url } = usePage();
    const { auth } = usePage().props; 

    const navItems = [
        { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
        { name: 'Subscribers', href: '/users', icon: Users },
        { name: 'WiFi Packages', href: '/packages', icon: Wifi },
        { name: 'Payments', href: '/payments', icon: CreditCard },
        { name: 'Settings', href: '/settings', icon: Settings },
    ];

    return (
        <div className="flex h-screen bg-gray-100 font-sans">
            
            {/* --- MOBILE OVERLAY --- */}
            {isMobileMenuOpen && (
                <div 
                    className="fixed inset-0 z-20 bg-black bg-opacity-50 md:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                ></div>
            )}

            {/* --- SIDEBAR --- */}
            <aside className={`
                fixed inset-y-0 left-0 z-30 w-64 bg-gray-900 text-white transform transition-transform duration-300 ease-in-out shadow-2xl
                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
                md:relative md:translate-x-0
            `}>
                <div className="flex items-center justify-between h-16 px-6 bg-gray-800 border-b border-gray-700">
                    <span className="text-xl font-bold tracking-wider text-purple-400">
                        WIFI ADMIN
                    </span>
                    <button 
                        className="md:hidden text-gray-400 hover:text-white"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        <X size={24} />
                    </button>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-2">
                    {navItems.map((item) => {
                        // Now 'url' exists, so this won't crash!
                        const isActive = url.startsWith(item.href);
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 group ${
                                    isActive 
                                        ? 'bg-purple-600 text-white shadow-lg' 
                                        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                                }`}
                            >
                                <item.icon size={20} className={`mr-3 ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-white'}`} />
                                <span className="font-medium">{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>
            </aside>

            {/* --- MAIN CONTENT --- */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="flex items-center justify-between h-16 px-6 bg-white border-b border-gray-200 shadow-sm z-10">
                    <div className="flex items-center">
                        <button 
                            className="p-2 mr-4 text-gray-500 rounded-md md:hidden hover:bg-gray-100"
                            onClick={() => setIsMobileMenuOpen(true)}
                        >
                            <Menu size={24} />
                        </button>
                        <h2 className="text-lg font-semibold text-gray-700 hidden sm:block">
                            Welcome back
                        </h2>
                    </div>

                    <div className="flex items-center space-x-4">
                        <button className="relative p-2 text-gray-400 hover:text-purple-600 transition-colors rounded-full hover:bg-purple-50">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                        </button>

                        <div className="h-8 w-px bg-gray-200 mx-2"></div>

                        <div className="relative">
                            <button 
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="flex items-center space-x-3 focus:outline-none"
                            >
                                <div className="text-right hidden md:block">
                                    <p className="text-sm font-semibold text-gray-700">Admin</p>
                                    <p className="text-xs text-gray-500">Super Admin</p>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-purple-100 border-2 border-purple-200 flex items-center justify-center text-purple-700 font-bold shadow-sm">
                                    A
                                </div>
                                <ChevronDown size={16} className="text-gray-400" />
                            </button>

                            {isProfileOpen && (
                                <>
                                    <div 
                                        className="fixed inset-0 z-10 cursor-default" 
                                        onClick={() => setIsProfileOpen(false)}
                                    ></div>
                                    <div className="absolute right-0 z-20 w-48 mt-2 bg-white rounded-lg shadow-xl border border-gray-100 py-2 animate-in fade-in zoom-in-95 duration-200">
                                        <Link 
                                            href="/logout" 
                                            method="post" 
                                            as="button" 
                                            className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                        >
                                            <LogOut size={16} className="mr-2" />
                                            Log Out
                                        </Link>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}