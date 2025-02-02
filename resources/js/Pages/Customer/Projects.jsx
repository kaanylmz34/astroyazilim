import React, { useState, useEffect } from 'react';
import CustomerLayout from '@/Components/Layout/CustomerLayout';
import Table from '@/Components/Table';
import { Link } from '@inertiajs/react';
const Projects = () => {
    
    return (
        <CustomerLayout>
            <Table
                title="Projeler"
                columns={[
                    { label: '', key: 'id', hidden: true },
                    { label: 'Proje Adı', key: 'name' },
                    { label: 'Açıklama', key: 'description' },
                    { label: 'Fiyat', key: 'price' },
                    { label: 'İşlemler', key: 'actions' }
                ]}
                columnFormatters={{
                    actions: (value, row) => {
                        return <div>
                            <Link href={route('customer.project', { project: row.id })} className="bg-gray-500/20 text-gray-300 px-2 py-1 rounded-md text-sm cursor-pointer hover:bg-gray-500/30 transition-colors duration-300">Proje Takibi</Link>
                        </div>
                    }
                }}
                dataUrl="/api/projects"
                pagination={true}
            />
        </CustomerLayout>
    )

}

export default Projects;