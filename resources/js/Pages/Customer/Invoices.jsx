import React from 'react';
import CustomerLayout from '../../Components/Layout/CustomerLayout';
import Table from '../../Components/Table';

const Invoices = () => {
    return (
        <CustomerLayout>
            <Table
                title="Faturalar"
                columns={[
                    { key: 'first_name', label: 'Adı' },
                    { key: 'last_name', label: 'Soyadı' },
                    { key: 'identification_number', label: 'T.C. Kimlik No' },
                    { key: 'company_name', label: 'Firma Adı' },
                    { key: 'address', label: 'Adres' },
                    { key: 'invoice_date', label: 'Fatura Tarihi' },
                    { key: 'file', label: 'Fatura' },
                ]}
                dataUrl="/api/invoices"
                columnFormatters={{
                    company_name: (value, row) => value ? value : <i>Bireysel Fatura</i>,
                    address: (value, row) => `${row.address.length > 20 ? row.address.substring(0, 20) + '...' : row.address}`,
                    file: (value, row) => <a href={row.file} target="_blank" className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded-md text-sm cursor-pointer hover:bg-blue-500/30 transition-colors duration-300">Fatura İndir</a>
                }}
            />
        </CustomerLayout>
    );
};

export default Invoices;