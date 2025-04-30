import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface Transaction {
  id: number
  category: string
  amount: number
  date: string
  description: string
}

interface TransactionHistoryProps {
  transactions: Transaction[]
}

export function TransactionHistory({ transactions }: TransactionHistoryProps) {
  // Function to get badge variant based on category
  const getBadgeVariant = (category: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      Food: "default",
      Transport: "secondary",
      Shopping: "destructive",
      Bills: "outline",
      Entertainment: "secondary",
      Income: "default",
    }
    return variants[category] || "default"
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell className="font-medium">{new Date(transaction.date).toLocaleDateString()}</TableCell>
              <TableCell>
                <Badge variant={getBadgeVariant(transaction.category)}>{transaction.category}</Badge>
              </TableCell>
              <TableCell>{transaction.description}</TableCell>
              <TableCell className="text-right">${transaction.amount.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
