import React from 'react';
import CustomerLayout from '../../Components/Layout/CustomerLayout';
import Table from '../../Components/Table';

const Payments = () => {
    return (
        <CustomerLayout>
            <Table 
                title="Ödemeler"
                columns={[
                    { key: 'amount', label: 'Tutar' },
                    { key: 'payment_date', label: 'Tarih' },
                    { key: 'payment_method', label: 'Ödeme Yöntemi' },
                    { key: 'payment_status', label: 'Durum' },
                    { key: 'user_note', label: 'Not' },
                ]}
                dataUrl="/api/payments"
                columnFormatters={{
                    payment_method: (value, row) => {
                        switch(value) {
                            case 'credit_card':
                                return <span className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded-md text-sm cursor-pointer hover:bg-blue-500/30 transition-colors duration-300">Kredi Kartı</span>;
                            case 'bank_transfer':
                                return <span className="bg-green-500/20 text-green-300 px-2 py-1 rounded-md text-sm cursor-pointer hover:bg-green-500/30 transition-colors duration-300">Banka Havalesi</span>;
                            case 'cash':
                                return <span className="bg-red-500/20 text-red-300 px-2 py-1 rounded-md text-sm cursor-pointer hover:bg-red-500/30 transition-colors duration-300">Nakit</span>;
                            default:
                                return <span className="bg-gray-500/20 text-gray-300 px-2 py-1 rounded-md text-sm cursor-pointer hover:bg-gray-500/30 transition-colors duration-300">{value}</span>;
                        }
                    },
                    payment_status: (value, row) => {
                        switch(value) {
                            case 'pending':
                                return <span className="bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded-md text-sm cursor-pointer hover:bg-yellow-500/30 transition-colors duration-300">Bekliyor</span>;
                            case 'completed': 
                                return <span className="bg-green-500/20 text-green-300 px-2 py-1 rounded-md text-sm cursor-pointer hover:bg-green-500/30 transition-colors duration-300">Tamamlandı</span>;
                            case 'failed':
                                return <span className="bg-red-500/20 text-red-300 px-2 py-1 rounded-md text-sm cursor-pointer hover:bg-red-500/30 transition-colors duration-300">Reddedildi</span>;
                            default:
                                return <span className="bg-gray-500/20 text-gray-300 px-2 py-1 rounded-md text-sm cursor-pointer hover:bg-gray-500/30 transition-colors duration-300">{value}</span>;
                        }
                    }
                }}
                pagination={true}
            />
        </CustomerLayout>
    );
};

export default Payments;