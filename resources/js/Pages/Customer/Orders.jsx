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
            />
        </CustomerLayout>
    );
};