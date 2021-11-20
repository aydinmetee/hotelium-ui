export class ReservationMaster {
  accountTransactionId: number;
  checkInDate: string;
  checkOutDate: Date;
  description: string;
  id: number;
  roomCode: string;
  roomId: number;
  status: 'NEW' | 'BOOKING' | 'COMPLETED';
}
