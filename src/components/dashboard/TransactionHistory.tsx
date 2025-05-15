
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowDownLeft, ArrowUpRight, CreditCard, RefreshCw } from "lucide-react";

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: "credit" | "debit" | "transfer" | "withdrawal" | "repayment";
  status: "completed" | "pending" | "failed";
}

interface TransactionHistoryProps {
  transactions: Transaction[];
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ transactions }) => {
  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "credit":
        return <ArrowDownLeft className="h-4 w-4 text-green-500" />;
      case "debit":
        return <ArrowUpRight className="h-4 w-4 text-red-500" />;
      case "transfer":
        return <ArrowUpRight className="h-4 w-4 text-amber-500" />;
      case "withdrawal":
        return <ArrowUpRight className="h-4 w-4 text-orange-500" />;
      case "repayment":
        return <RefreshCw className="h-4 w-4 text-blue-500" />;
      default:
        return <CreditCard className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200">Completed</Badge>;
      case "pending":
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 hover:bg-yellow-50 border-yellow-200">Pending</Badge>;
      case "failed":
        return <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50 border-red-200">Failed</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getAmountDisplay = (transaction: Transaction) => {
    const isCredit = transaction.type === "credit";
    const prefix = isCredit ? "+" : "-";
    return (
      <span className={isCredit ? "text-green-600" : "text-red-600"}>
        {`${prefix}₦${Math.abs(transaction.amount).toLocaleString()}`}
      </span>
    );
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Transaction History</CardTitle>
      </CardHeader>
      <CardContent>
        {transactions.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    <div className="flex items-center">
                      <div className="mr-2">
                        {getTransactionIcon(transaction.type)}
                      </div>
                      <span>{transaction.date}</span>
                    </div>
                  </TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell className="text-right">{getAmountDisplay(transaction)}</TableCell>
                  <TableCell className="text-right">{getStatusBadge(transaction.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No transactions to display
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TransactionHistory;
