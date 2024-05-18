
interface Ticket {
    ticketId?: number;
    eventName: string;
    eventDate: string;
    purchaseDate: string;
    type: string;
    ticketPriorityLevel: number;
    userId?:number;
}

export default Ticket;