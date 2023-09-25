import React, {FC, useReducer} from 'react'

import {createColumnHelper, flexRender, getCoreRowModel, useReactTable} from '@tanstack/react-table'
import {defaultData, Person} from './data';

const columnHelper = createColumnHelper<Person>();

export const defaultColumns = [
    columnHelper.accessor('firstName', {
        cell: info => info.getValue(),
        footer: props => props.column.id,
    }),
    columnHelper.accessor(row => row.lastName, {
        id: 'lastName',
        cell: info => info.getValue(),
        header: () => <span>Last Name</span>,
        footer: props => props.column.id,
    }),
    columnHelper.accessor('age', {
        header: () => 'Age',
        footer: props => props.column.id,
    }),
    columnHelper.accessor('visits', {
        header: () => <span>Visits</span>,
        footer: props => props.column.id,
    }),
    columnHelper.accessor('status', {
        header: 'Status',
        footer: props => props.column.id,
    }),
    columnHelper.accessor('progress', {
        header: 'Profile Progress',
        footer: props => props.column.id,
    }),
]

export const Table: FC = () => {

    const forceRerender = useReducer(() => [], [])[1]

    const table = useReactTable({
        data: defaultData,
        columns: defaultColumns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <div>
            <table border={1}>
                <thead>
                {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                            <th key={header.id} colSpan={header.colSpan}>
                                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody>
                {table.getRowModel().rows.map(row => (
                    <tr key={row.id}>
                        {row.getVisibleCells().map(cell => (
                            <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                        ))}
                    </tr>
                ))}
                </tbody>
                <tfoot>
                {table.getFooterGroups().map(footerGroup => (
                    <tr key={footerGroup.id}>
                        {footerGroup.headers.map(header => (
                            <th key={header.id} colSpan={header.colSpan}>
                                {header.isPlaceholder ? null : flexRender(header.column.columnDef.footer, header.getContext())}
                            </th>
                        ))}
                    </tr>
                ))}
                </tfoot>
            </table>
            <div/>
            <button onClick={() => forceRerender()}>Force rerender</button>
        </div>
    )
};
