import React from 'react';
import SidebarLayout from '@/Layouts/SidebarLayout';
import { Head } from '@inertiajs/react';
import { CreditCard, CheckCircle, XCircle, Clock } from 'lucide-react';

export default function Index({ payments }) {
    return (
        <SidebarLayout>
            <Head title="Payments" />

            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Payment History</h2>
                <p className="text-gray-500">View all M-Pesa transactions and receipts.</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-medium">
                        <tr>
                            <th className="px-6 py-3">Receipt No.</th>
                            <th className="px-6 py-3">Customer</th>
                            <th className="px-6 py-3">Package</th>
                            <th className="px-6 py-3">Amount</th>
                            <th className="px-6 py-3">Date</th>
                            <th className="px-6 py-3">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {payments.data.map((payment) => (
                            <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 font-mono text-sm text-gray-600">
                                    {payment.transaction_code || 'PENDING'}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="font-medium text-gray-900">{payment.user ? payment.user.name : 'Unknown'}</div>
                                    <div className="text-xs text-gray-400">{payment.phone_number}</div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600">
                                    {payment.package ? payment.package.name : 'Deleted Plan'}
                                </td>
                                <td className="px-6 py-4 font-bold text-gray-800">
                                    KES {Number(payment.amount).toLocaleString()}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">
                                    {new Date(payment.created_at).toLocaleString()}
                                </td>
                                <td className="px-6 py-4">
                                    {payment.status === 'completed' ? (
                                        <span className="flex items-center text-green-600 text-xs font-bold uppercase">
                                            <CheckCircle size={14} className="mr-1"/> Success
                                        </span>
                                    ) : payment.status === 'failed' ? (
                                        <span className="flex items-center text-red-600 text-xs font-bold uppercase">
                                            <XCircle size={14} className="mr-1"/> Failed
                                        </span>
                                    ) : (
                                        <span className="flex items-center text-yellow-600 text-xs font-bold uppercase">
                                            <Clock size={14} className="mr-1"/> Pending
                                        </span>
                                    )}
                                </td>
                            </tr>
                        ))}
                         {payments.data.length === 0 && (
                            <tr>
                                <td colSpan="6" className="px-6 py-12 text-center text-gray-400">
                                    No transactions recorded yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </SidebarLayout>
    );
}