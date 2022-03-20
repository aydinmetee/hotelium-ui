export class ReservationMaster {
  accountTransactionId: number;
  checkInDate: Date;
  checkOutDate: Date;
  reservationDate: Date;
  description: string;
  id: number;
  roomCode: string;
  roomId: number;
  status: 'NEW' | 'BOOKING' | 'COMPLETED';
  bookAmount: number;
  source: 'DEBIT' | 'CASH' | 'BANK';
}
