import React from 'react';
import SidebarLayout from '@/Layouts/SidebarLayout';
import { Head } from '@inertiajs/react';
import { 
    DollarSign, 
    Users, 
    Wifi, 
    TrendingUp, 
    Clock, 
    ArrowRight 
} from 'lucide-react';

export default function Dashboard({ auth, stats, recent_payments }) {
    return (
        <SidebarLayout>
            <Head title="Dashboard" />

            {/* --- WELCOME HEADER --- */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-800">
                    Overview
                </h1>
                <p className="text-gray-500">
                    Here's what's happening with your network today.
                </p>
            </div>

            {/* --- STATS GRID --- */}
            <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
                
                <StatCard 
                    title="Revenue (This Month)" 
                    value={`KES ${stats.revenue_month}`} 
                    icon={DollarSign} 
                    color="bg-green-100 text-green-600" 
                />
                
                <StatCard 
                    title="Active Subscribers" 
                    value={stats.active_users} 
                    icon={Wifi} 
                    color="bg-blue-100 text-blue-600" 
                />

                <StatCard 
                    title="Total Users" 
                    value={stats.total_users} 
                    icon={Users} 
                    color="bg-purple-100 text-purple-600" 
                />

                <StatCard 
                    title="Total Revenue (All Time)" 
                    value={`KES ${stats.revenue_total}`} 
                    icon={TrendingUp} 
                    color="bg-yellow-100 text-yellow-600" 
                />
            </div>

            {/* --- RECENT TRANSACTIONS SECTION --- */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-800">
                        Recent Transactions
                    </h2>
                    <button className="text-sm font-medium text-purple-600 hover:text-purple-700 flex items-center">
                        View All <ArrowRight size={16} className="ml-1"/>
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-medium">
                            <tr>
                                <th className="px-6 py-3">User</th>
                                <th className="px-6 py-3">Package</th>
                                <th className="px-6 py-3">Amount</th>
                                <th className="px-6 py-3">Time</th>
                                <th className="px-6 py-3">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {recent_payments.length > 0 ? (
                                recent_payments.map((payment) => (
                                    <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600 mr-3">
                                                    {payment.user.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900">{payment.user}</p>
                                                    <p className="text-xs text-gray-400">{payment.phone}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-50 text-purple-600 border border-purple-100">
                                                {payment.package}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 font-semibold text-gray-700">
                                            KES {payment.amount}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500 flex items-center">
                                            <Clock size={14} className="mr-1.5 text-gray-400" />
                                            {payment.date}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                Completed
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center text-gray-400">
                                        No transactions found yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </SidebarLayout>
    );
}

// --- HELPER COMPONENT FOR CARDS ---
function StatCard({ title, value, icon: Icon, color }) {
    return (
        <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center hover:shadow-md transition-shadow">
            <div className={`p-4 rounded-full ${color} mr-4`}>
                <Icon size={24} />
            </div>
            <div>
                <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
                <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
            </div>
        </div>
    );
}