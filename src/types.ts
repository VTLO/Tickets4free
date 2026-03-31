export interface Ticket {
  id: string;
  passengerName: string;
  origin: string;
  destination: string;
  travelDate: string;
  travelTime: string;
  ticketType: TicketType;
  price: number;
  hash: string;
  issuedAt: string;
  validUntil: string;
}

export type TicketType = 'single' | 'return' | 'day-pass' | 'weekly';

export interface Station {
  name: string;
  line: string;
  lineColor: string;
}

export interface TicketFormData {
  passengerName: string;
  origin: string;
  destination: string;
  travelDate: string;
  travelTime: string;
  ticketType: TicketType;
}
