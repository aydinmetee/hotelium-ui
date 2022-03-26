export class ReservationMaster {
  accountTransactionId: number;
  checkInDate: Date;
  checkOutDate: Date;
  reservationDate: Date;
  description: string;
  id: string;
  roomCode: string;
  roomId: number;
  status: 'NEW' | 'BOOKING' | 'COMPLETED';
  bookAmount: number;
  source: 'DEBIT' | 'CASH' | 'BANK';
  dailyAmount: number;
  duration: number;
  isPayed: boolean;
}
