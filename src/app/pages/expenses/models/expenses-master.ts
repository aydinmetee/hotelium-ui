export class ExpensesMaster {
  amount: number;
  id: string;
  status: 'UNPAID' | 'PAID' | 'CANCELLED';
  creDate: Date;
  updDate: Date;
}
