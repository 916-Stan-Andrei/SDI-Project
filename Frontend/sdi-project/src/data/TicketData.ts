import Ticket from '../entities/Ticket';

const  TicketData: Ticket[] = [
    {
      id: 0,
      eventName: "Concert",
      eventDate: "2024-04-20",
      purchaseDate: "2024-03-15",
      type: "VIP",
      ticketPriorityLevel: 2
    },
    {
      id: 1,
      eventName: "Sporting Event",
      eventDate: "2024-05-10",
      purchaseDate: "2024-03-16",
      type: "General Admission",
      ticketPriorityLevel: 1
    },
    {
      id: 2,
      eventName: "Theater Show",
      eventDate: "2024-06-05",
      purchaseDate: "2024-03-17",
      type: "Matinee",
      ticketPriorityLevel: 3
    },
  ];

  export default TicketData;