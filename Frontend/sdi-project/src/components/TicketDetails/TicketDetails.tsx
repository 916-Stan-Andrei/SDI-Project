import { useNavigate, useParams } from "react-router-dom";
import Ticket from "../../entities/Ticket";
import "./TicketDetails.css";
import { getTicket } from "../../services/TicketService";
import { useEffect, useState } from "react";

function TicketDetails() {
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>(); // Fetch the id from URL path
  const [ticket, setTicket] = useState<Ticket | null>(null);

  // Find the ticket with the given id
  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const data = await getTicket(Number(id)); // Assuming your API endpoint for fetching a ticket is /api/tickets/:id
        setTicket(data); // Update the ticket state with the fetched ticket
      } catch (error) {
        console.error("Error fetching ticket:", error);
      }
    };

    fetchTicket(); // Call the fetchTicket function when the component mounts
  }, [id]);

  if (!ticket) {
    return <div>Ticket not found!</div>;
  }
  const handleBackToHome = () => {
    navigate("/tickets");
  };

  return (
    <div className="ticket-details-container">
      <h2>Ticket Details</h2>
      <div className="ticket-info">
        <p>Event Name: {ticket.eventName}</p>
        <p>Event Date: {ticket.eventDate}</p>
        <p>Purchase Date: {ticket.purchaseDate}</p>
        <p>Type: {ticket.type}</p>
        <p>Ticket Priority Level: {ticket.ticketPriorityLevel}</p>
      </div>
      <button
        onClick={handleBackToHome}
        type="button"
        className="btn btn-primary"
      >
        Back
      </button>
    </div>
  );
}

export default TicketDetails;
