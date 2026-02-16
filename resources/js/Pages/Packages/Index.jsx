import SidebarLayout from '@/Layouts/SidebarLayout';
import { Head, useForm, router } from '@inertiajs/react';
import React from 'react';
import { Plus, Trash2, Wifi, Zap } from 'lucide-react';

export default function Index({ packages }) {
    const { data, setData, post, processing, reset } = useForm({
        name: '',
        speed_limit: '',
        speed_profile: '',
        duration_value: 1,
        duration_unit: 'month',
        price: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('packages.store'), { 
            onSuccess: () => reset() 
        });
    };

    // Function to handle deletion
    const deletePackage = (id) => {
        if (confirm('Are you sure you want to delete this package?')) {
            router.delete(route('packages.destroy', id));
        }
    };

    return (
        <SidebarLayout>
            <Head title="WiFi Packages" />

            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Internet Packages</h2>
                <p className="text-gray-500">Manage your WiFi plans and speed profiles.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* --- CREATE PACKAGE FORM --- */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit">
                    <h3 className="text-lg font-semibold mb-6 flex items-center">
                        <Plus className="mr-2 text-purple-600" size={20} />
                        New Plan
                    </h3>

                    <form onSubmit={submit} className="space-y-4">
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-500 uppercase">Plan Name</label>
                            <input 
                                type="text" 
                                placeholder="e.g. Monthly Home" 
                                className="w-full border-gray-200 rounded-lg focus:ring-purple-500"
                                onChange={e => setData('name', e.target.value)}
                                value={data.name}
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-500 uppercase">Price (KES)</label>
                                <input 
                                    type="number" 
                                    placeholder="1500" 
                                    className="w-full border-gray-200 rounded-lg"
                                    onChange={e => setData('price', e.target.value)}
                                    value={data.price}
                                    required
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-500 uppercase">Display Speed</label>
                                <input 
                                    type="text" 
                                    placeholder="5 Mbps" 
                                    className="w-full border-gray-200 rounded-lg"
                                    onChange={e => setData('speed_limit', e.target.value)}
                                    value={data.speed_limit}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-500 uppercase">Router Profile (MikroTik)</label>
                            <input 
                                type="text" 
                                placeholder="5M/5M" 
                                className="w-full border-gray-200 rounded-lg"
                                onChange={e => setData('speed_profile', e.target.value)}
                                value={data.speed_profile}
                                required
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-500 uppercase">Duration</label>
                            <div className="flex space-x-2">
                                <input 
                                    type="number" 
                                    className="w-20 border-gray-200 rounded-lg"
                                    onChange={e => setData('duration_value', parseInt(e.target.value))}
                                    value={data.duration_value}
                                />
                                <select 
                                    className="flex-1 border-gray-200 rounded-lg"
                                    onChange={e => setData('duration_unit', e.target.value)}
                                    value={data.duration_unit}
                                >
                                    <option value="day">Day(s)</option>
                                    <option value="month">Month(s)</option>
                                </select>
                            </div>
                        </div>

                        <button 
                            type="submit"
                            disabled={processing}
                            className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition shadow-md disabled:opacity-50"
                        >
                            {processing ? 'Saving...' : 'Create Package'}
                        </button>
                    </form>
                </div>

                {/* --- EXISTING PACKAGES LIST --- */}
                <div className="lg:col-span-2 space-y-4">
                    {packages.map((pkg) => (
                        <div key={pkg.id} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between group hover:border-purple-200 transition">
                            <div className="flex items-center">
                                <div className="p-3 bg-purple-50 text-purple-600 rounded-xl mr-4">
                                    <Wifi size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-800 text-lg">{pkg.name}</h3>
                                    <div className="flex items-center text-sm text-gray-500">
                                        <Zap size={14} className="mr-1 text-yellow-500" />
                                        {pkg.speed_limit} • 
                                        <span className="ml-1 text-purple-600 font-semibold">KES {pkg.price}</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex items-center space-x-6">
                                <div className="text-right">
                                    <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Validity</p>
                                    <p className="text-sm font-medium text-gray-700">
                                        {pkg.duration_value} {pkg.duration_unit}{pkg.duration_value > 1 ? 's' : ''}
                                    </p>
                                </div>
                                
                                <button 
                                    onClick={() => deletePackage(pkg.id)}
                                    className="p-2 text-gray-300 hover:text-red-500 transition-colors cursor-pointer"
                                    title="Delete Package"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>
                    ))}

                    {packages.length === 0 && (
                        <div className="text-center py-20 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 text-gray-400">
                            No packages created yet.
                        </div>
                    )}
                </div>
            </div>
        </SidebarLayout>
    );
}