import React from 'react';
import CustomerLayout from '@/Components/Layout/CustomerLayout';
import Card from '@/Components/Card';
import Table from '@/Components/Table';

export default () => {
    return (
        <CustomerLayout>
            <Table
                title="Siparişler"
                columns={[
                    {
                        label: 'Ürün Adı',
                        key: 'product_name',
                    },
                    {
                        label: 'Ürün Fiyatı',
                        key: 'product_price',
                    },
                    {
                        label: 'Yapılan Ödeme',
                        key: 'payment_amount',
                    },
                    {
                        label: 'Fatura Kesim Tarihi',
                        key: 'invoice_date',
                    },
                    {
                        label: 'Ödeme Tarihi',
                        key: 'payment_date',
                    },
                    {
                        label: 'Ödeme Durumu',
                        key: 'payment_status',
                    },
                    {
                        label: 'Sipariş Durumu',
                        key: 'order_status',
                    },
                ]}
                dataUrl="/api/orders"
                columnFormatters={{
                    order_status: (value, row) => {
                        switch(value) {
                            case 'pending':
                                return <span className="bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded-md text-sm cursor-pointer hover:bg-yellow-500/30 transition-colors duration-300">Beklemede</span>;
                            case 'processing':
                                return <span className="bg-green-500/20 text-green-300 px-2 py-1 rounded-md text-sm cursor-pointer hover:bg-green-500/30 transition-colors duration-300">İşleniyor</span>;
                            case 'completed':
                                return <span className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded-md text-sm cursor-pointer hover:bg-blue-500/30 transition-colors duration-300">Tamamlandı</span>;
                            case 'cancelled':
                                return <span className="bg-red-500/20 text-red-300 px-2 py-1 rounded-md text-sm cursor-pointer hover:bg-red-500/30 transition-colors duration-300">İptal Edildi</span>;
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
                                return <span className="bg-red-500/20 text-red-300 px-2 py-1 rounded-md text-sm cursor-pointer hover:bg-red-500/30 transition-colors duration-300">Başarısız</span>;
                            case 'refunded':
                                return <span className="bg-gray-500/20 text-gray-300 px-2 py-1 rounded-md text-sm cursor-pointer hover:bg-gray-500/30 transition-colors duration-300">İade Edildi</span>;
                            default:
                                return <span className="bg-gray-500/20 text-gray-300 px-2 py-1 rounded-md text-sm cursor-pointer hover:bg-gray-500/30 transition-colors duration-300">{value}</span>;
                        }
                    },
                }}
            />
        </CustomerLayout>
    );
};