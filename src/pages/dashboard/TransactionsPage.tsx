
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ListVideo, Download, Search, ArrowLeftRight } from "lucide-react";
import { TransactionsEmpty } from "@/components/empty-states";

const TransactionsPage: React.FC = () => {
  // Empty transactions array to show empty state
  const transactions = [];
  const [searchTerm, setSearchTerm] = React.useState("");
  const [transactionType, setTransactionType] = React.useState<string>("all");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center">
            <ArrowLeftRight className="mr-2 h-6 w-6" />
            Transactions
          </h1>
          <p className="text-muted-foreground">
            View and manage all your financial transactions
          </p>
        </div>
        {/* <Button variant="outline" className="w-full sm:w-auto" disabled>
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button> */}
      </div>

      {/* Filters */}
      <Card>
        <CardHeader className="pb-3">
          {/* <CardTitle className="flex items-center">
            <ListVideo className="mr-2 h-5 w-5 text-solar-green-600" />
            Transaction Filters
          </CardTitle> */}
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search transactions..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={transactionType} onValueChange={setTransactionType}>
              <SelectTrigger>
                <SelectValue placeholder="Transaction type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="credit">Credits</SelectItem>
                <SelectItem value="debit">Debits</SelectItem>
                <SelectItem value="transfer">Transfers</SelectItem>
                <SelectItem value="withdrawal">Withdrawals</SelectItem>
                <SelectItem value="repayment">Repayments</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => {
                setSearchTerm("");
                setTransactionType("all");
              }}>
                Reset
              </Button>
              <Button className="flex-1 bg-solar-green-600 hover:bg-solar-green-700" disabled>
                Apply
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transaction list */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          <TransactionsEmpty />
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionsPage;
