import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { transactions } from "@/lib/data";

export default function Transactions() {
  const totalIncome = transactions
    .filter((txn) => txn.category === "Income")
    .reduce((acc, txn) => acc + txn.amount, 0);

  const totalExpense = transactions
    .filter((txn) => txn.category === "Expense")
    .reduce((acc, txn) => acc + txn.amount, 0);

  return (
    <div className="p-4">
      <Table>
        <TableCaption>A list of your recent transactions.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Transaction ID</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((txn) => (
            <TableRow key={txn.id}>
              <TableCell className="font-medium">{txn.id}</TableCell>
              <TableCell>{txn.description}</TableCell>
              <TableCell>{txn.category}</TableCell>
              <TableCell>{txn.method}</TableCell>
              <TableCell
                className={`text-right ${
                  txn.category === "Income" ? "text-green-600" : "text-red-600"
                }`}
              >
                ${txn.amount.toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4} className="font-medium text-right">
              Total Income:
            </TableCell>
            <TableCell className="text-right text-green-600 font-medium">
              ${totalIncome.toFixed(2)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={4} className="font-medium text-right">
              Total Expense:
            </TableCell>
            <TableCell className="text-right text-red-600 font-medium">
              ${totalExpense.toFixed(2)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
