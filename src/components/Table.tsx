import React, { ReactNode } from 'react';

interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  children: ReactNode;
}

const Table: React.FC<TableProps> = ({ children, className, ...props }) => (
  <table className={`min-w-full divide-y divide-gray-200 ${className}`} {...props}>
    {children}
  </table>
);

interface TableHeaderProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  children: ReactNode;
}

const TableHeader: React.FC<TableHeaderProps> = ({ children, className, ...props }) => (
  <thead className={`bg-gray-50 ${className}`} {...props}>
    {children}
  </thead>
);

interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  children: ReactNode;
}

const TableBody: React.FC<TableBodyProps> = ({ children, className, ...props }) => (
  <tbody className={`bg-white divide-y divide-gray-200 ${className}`} {...props}>
    {children}
  </tbody>
);

interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  children: ReactNode;
}

const TableRow: React.FC<TableRowProps> = ({ children, className, ...props }) => (
  <tr className={`${className}`} {...props}>
    {children}
  </tr>
);

interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableHeaderCellElement> {
  children: ReactNode;
}

const TableHead: React.FC<TableHeadProps> = ({ children, className, ...props }) => (
  <th
    scope="col"
    className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${className}`}
    {...props}
  >
    {children}
  </th>
);

interface TableCellProps extends React.TdHTMLAttributes<HTMLTableDataCellElement> {
  children: ReactNode;
}

const TableCell: React.FC<TableCellProps> = ({ children, className, ...props }) => (
  <td className={`px-6 py-4 whitespace-nowrap ${className}`} {...props}>
    {children}
  </td>
);

export { Table, TableHeader, TableBody, TableRow, TableHead, TableCell };