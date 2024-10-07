import React from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from './Table';
// TODO: Implement formatCurrency and formatDate functions
// import { formatCurrency, formatDate } from '../utils/formatters';

interface Invoice {
  id: string;
  date: string;
  amount: number;
  status: string;
}

interface InvoiceListProps {
  loading: boolean;
  invoices: Invoice[];
}

const InvoiceList: React.FC<InvoiceListProps> = ({ loading, invoices }) => {
  if (loading) {
    return <div className="text-center">Loading invoices...</div>;
  }

  if (invoices.length === 0) {
    return <div className="text-center">No invoices found.</div>;
  }

  // TODO: Implement proper formatting functions
  const formatDate = (date: string) => new Date(date).toLocaleDateString();
  const formatCurrency = (amount: number) => `$${amount.toFixed(2)}`;

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice ID</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell>{invoice.id}</TableCell>
              <TableCell>{formatDate(invoice.date)}</TableCell>
              <TableCell>{formatCurrency(invoice.amount)}</TableCell>
              <TableCell>
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(invoice.status)}`}>
                  {invoice.status}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

const getStatusColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'paid':
      return 'bg-green-100 text-green-800';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'overdue':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default InvoiceList;