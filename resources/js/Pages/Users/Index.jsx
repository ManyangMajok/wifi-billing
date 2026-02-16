import React from 'react';
import SidebarLayout from '@/Layouts/SidebarLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Phone, Eye, Ban, CheckCircle } from 'lucide-react';

export default function Index({ users }) {
    return (
        <SidebarLayout>
            <Head title="Subscribers" />

            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Subscribers</h2>
                    <p className="text-gray-500">Manage your registered users and view their status.</p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-medium">
                        <tr>
                            <th className="px-6 py-3">Name</th>
                            <th className="px-6 py-3">Phone</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3 text-right">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100">
                        {users.data.map((user) => {
                            const isActive =
                                user.subscription &&
                                new Date(user.subscription.expires_at) > new Date();

                            return (
                                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold mr-3">
                                                {user.name?.charAt(0) ?? 'U'}
                                            </div>
                                            <span className="font-medium text-gray-900">{user.name}</span>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4 text-gray-500">
                                        <div className="flex items-center">
                                            <Phone size={14} className="mr-2 text-gray-400" />
                                            {user.phone || '—'}
                                        </div>
                                    </td>

                                    <td className="px-6 py-4">
                                        {user.status === 'suspended' ? (
                                            <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-bold">
                                                Suspended
                                            </span>
                                        ) : isActive ? (
                                            <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">
                                                Online
                                            </span>
                                        ) : (
                                            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-bold">
                                                Offline
                                            </span>
                                        )}
                                    </td>

                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end items-center space-x-2">
                                            <Link
                                                href={route('users.show', user.id)}
                                                className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-full transition"
                                                title="View Details"
                                            >
                                                <Eye size={18} />
                                            </Link>

                                            <button
                                                onClick={() => {
                                                    const action =
                                                        user.status === 'suspended'
                                                            ? 'activate'
                                                            : 'suspend';

                                                    if (
                                                        confirm(
                                                            `Are you sure you want to ${action} this user?`
                                                        )
                                                    ) {
                                                        router.post(route('users.toggle', user.id));
                                                    }
                                                }}
                                                className={`p-2 rounded-full transition ${
                                                    user.status === 'suspended'
                                                        ? 'text-green-400 hover:text-green-600 hover:bg-green-50'
                                                        : 'text-red-400 hover:text-red-600 hover:bg-red-50'
                                                }`}
                                                title={
                                                    user.status === 'suspended'
                                                        ? 'Activate'
                                                        : 'Suspend'
                                                }
                                            >
                                                {user.status === 'suspended' ? (
                                                    <CheckCircle size={18} />
                                                ) : (
                                                    <Ban size={18} />
                                                )}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}

                        {users.data.length === 0 && (
                            <tr>
                                <td colSpan="4" className="px-6 py-12 text-center text-gray-400">
                                    No subscribers found yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Links (Basic) */}
            <div className="mt-4 flex justify-center flex-wrap gap-2">
                {users.links?.map((link, key) => (
                    <Link
                        key={key}
                        href={link.url || '#'}
                        className={`px-3 py-1 border rounded text-sm ${
                            link.active
                                ? 'bg-purple-600 text-white border-purple-600'
                                : 'bg-white text-gray-700 hover:bg-gray-50'
                        } ${!link.url ? 'opacity-50 pointer-events-none' : ''}`}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                ))}
            </div>
        </SidebarLayout>
    );
}
