import React from 'react';
import SidebarLayout from '@/Layouts/SidebarLayout';
import { Head, Link, router } from '@inertiajs/react';
import { 
    User, Phone, Mail, Calendar, CreditCard, 
    Wifi, Ban, CheckCircle, ArrowLeft, History 
} from 'lucide-react';

export default function Show({ customer, stats }) {
    
    // Helper to toggle status
    const toggleStatus = () => {
        if (confirm(`Are you sure you want to ${customer.status === 'active' ? 'SUSPEND' : 'ACTIVATE'} this user?`)) {
            router.post(`/users/${customer.id}/toggle`);
        }
    };

    return (
        <SidebarLayout>
            <Head title={`${customer.name} - Profile`} />

            {/* --- HEADER --- */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                    <Link href="/users" className="mr-4 p-2 bg-white rounded-full text-gray-500 hover:text-gray-800 shadow-sm">
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">{customer.name}</h1>
                        <p className="text-gray-500 flex items-center">
                            <span className={`w-2.5 h-2.5 rounded-full mr-2 ${customer.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                            {customer.status === 'active' ? 'Active Account' : 'Suspended Account'}
                        </p>
                    </div>
                </div>

                <div className="flex space-x-3">
                    {/* Action Buttons */}
                    <button 
                        onClick={toggleStatus}
                        className={`flex items-center px-4 py-2 rounded-lg font-bold text-white shadow-sm transition ${
                            customer.status === 'active' 
                            ? 'bg-red-500 hover:bg-red-600' 
                            : 'bg-green-500 hover:bg-green-600'
                        }`}
                    >
                        {customer.status === 'active' ? <><Ban size={18} className="mr-2"/> Suspend User</> : <><CheckCircle size={18} className="mr-2"/> Activate User</>}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* --- LEFT COLUMN: INFO CARD --- */}
                <div className="space-y-6">
                    {/* Profile Card */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex flex-col items-center mb-6">
                            <div className="w-24 h-24 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 text-3xl font-bold mb-4">
                                {customer.name.charAt(0)}
                            </div>
                            <h2 className="text-xl font-bold text-gray-800">{customer.name}</h2>
                            <p className="text-sm text-gray-500">Subscriber</p>
                        </div>
                        
                        <div className="space-y-4">
                            <InfoRow icon={Phone} label="Phone" value={customer.phone} />
                            <InfoRow icon={Mail} label="Email" value={customer.email || 'N/A'} />
                            <InfoRow icon={Calendar} label="Joined" value={stats.join_date} />
                            <div className="pt-4 border-t border-gray-100">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-500 text-sm">Lifetime Spend</span>
                                    <span className="font-bold text-green-600">KES {stats.total_spent.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Current Plan Card */}
                    <div className="bg-gradient-to-br from-purple-600 to-indigo-700 p-6 rounded-xl shadow-lg text-white">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <p className="text-purple-200 text-sm font-medium uppercase">Current Subscription</p>
                                <h3 className="text-2xl font-bold mt-1">
                                    {stats.active_sub?.package?.name || 'No Active Plan'}
                                </h3>
                            </div>
                            <Wifi className="text-purple-300" size={32} />
                        </div>
                        
                        {stats.active_sub ? (
                            <div>
                                <p className="text-sm opacity-90 mb-2">Expires on:</p>
                                <p className="font-mono text-lg font-semibold bg-white/20 inline-block px-3 py-1 rounded">
                                    {new Date(stats.active_sub.expires_at).toDateString()}
                                </p>
                            </div>
                        ) : (
                            <p className="text-sm text-purple-200">User is currently offline.</p>
                        )}
                    </div>
                </div>

                {/* --- RIGHT COLUMN: TABS/HISTORY --- */}
                <div className="lg:col-span-2 space-y-6">
                    
                    {/* Recent Payments */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 flex items-center">
                            <CreditCard className="mr-2 text-gray-400" size={20} />
                            <h3 className="font-bold text-gray-800">Payment History</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-gray-50 text-gray-500 uppercase font-medium text-xs">
                                    <tr>
                                        <th className="px-6 py-3">Date</th>
                                        <th className="px-6 py-3">Amount</th>
                                        <th className="px-6 py-3">Package</th>
                                        <th className="px-6 py-3">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {customer.payments.map(payment => (
                                        <tr key={payment.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-3">{new Date(payment.created_at).toLocaleDateString()}</td>
                                            <td className="px-6 py-3 font-medium">KES {payment.amount}</td>
                                            <td className="px-6 py-3">{payment.package?.name || 'Unknown'}</td>
                                            <td className="px-6 py-3">
                                                <span className={`px-2 py-0.5 rounded text-xs font-bold ${payment.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                    {payment.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                    {customer.payments.length === 0 && (
                                        <tr><td colSpan="4" className="px-6 py-8 text-center text-gray-400">No payments found</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Subscription Log */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 flex items-center">
                            <History className="mr-2 text-gray-400" size={20} />
                            <h3 className="font-bold text-gray-800">Subscription Log</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-gray-50 text-gray-500 uppercase font-medium text-xs">
                                    <tr>
                                        <th className="px-6 py-3">Package</th>
                                        <th className="px-6 py-3">Start Date</th>
                                        <th className="px-6 py-3">End Date</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {customer.subscriptions.map(sub => (
                                        <tr key={sub.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-3 font-medium text-gray-800">{sub.package?.name}</td>
                                            <td className="px-6 py-3 text-gray-500">{new Date(sub.starts_at).toLocaleDateString()}</td>
                                            <td className="px-6 py-3 text-gray-500">{new Date(sub.expires_at).toLocaleDateString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </SidebarLayout>
    );
}

// Simple Helper for Info Rows
function InfoRow({ icon: Icon, label, value }) {
    return (
        <div className="flex items-center justify-between p-2 rounded hover:bg-gray-50 transition">
            <div className="flex items-center text-gray-500">
                <Icon size={16} className="mr-3" />
                <span className="text-sm">{label}</span>
            </div>
            <span className="font-medium text-gray-800 text-sm">{value}</span>
        </div>
    );
}