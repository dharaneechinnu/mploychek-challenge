export interface RecordItem {
  id: string;
  title: string;
  category: string;
  status: 'Active' | 'Pending' | 'Completed';
  amount: number;
  adminOnly: boolean;
}
