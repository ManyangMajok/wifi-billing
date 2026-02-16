import React from 'react';
import SidebarLayout from '@/Layouts/SidebarLayout';
import { Head } from '@inertiajs/react';
import { Save, Server, Smartphone, Globe } from 'lucide-react';

export default function Index({ app_name, mpesa_shortcode, router_ip }) {
    return (
        <SidebarLayout>
            <Head title="Settings" />

            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800">System Settings</h2>
                <p className="text-gray-500">Configure your ISP parameters.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* --- NETWORK SETTINGS --- */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                        <Server className="mr-2 text-purple-600" size={20} />
                        Router Configuration
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">MikroTik IP Address</label>
                            <input type="text" defaultValue={router_ip} className="w-full border-gray-300 rounded-lg shadow-sm focus:border-purple-500 focus:ring-purple-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">API Username</label>
                            <input type="text" defaultValue="admin" className="w-full border-gray-300 rounded-lg shadow-sm focus:border-purple-500 focus:ring-purple-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">API Password</label>
                            <input type="password" placeholder="••••••••" className="w-full border-gray-300 rounded-lg shadow-sm focus:border-purple-500 focus:ring-purple-500" />
                        </div>
                    </div>
                </div>

                {/* --- PAYMENT SETTINGS --- */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                        <Smartphone className="mr-2 text-green-600" size={20} />
                        M-Pesa Integration
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Paybill / Till Number</label>
                            <input type="text" defaultValue={mpesa_shortcode} className="w-full border-gray-300 rounded-lg shadow-sm focus:border-purple-500 focus:ring-purple-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Consumer Key</label>
                            <input type="password" value="************************" readOnly className="w-full bg-gray-50 border-gray-300 rounded-lg shadow-sm text-gray-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Consumer Secret</label>
                            <input type="password" value="************************" readOnly className="w-full bg-gray-50 border-gray-300 rounded-lg shadow-sm text-gray-500" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6 flex justify-end">
                <button className="flex items-center px-6 py-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition shadow-lg">
                    <Save size={18} className="mr-2" />
                    Save Changes
                </button>
            </div>
        </SidebarLayout>
    );
}