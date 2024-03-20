import { useNavigate, useParams } from "react-router-dom";
import Ticket from "../../entities/Ticket";
import "./TicketDetails.css";

interface TicketDetailsProp {
  tickets: Ticket[];
}

function TicketDetails({ tickets }: TicketDetailsProp) {
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>(); // Fetch the id from URL path
  console.log(id);

  // Find the ticket with the given id
  const ticket = tickets.find((ticket) => {
    return ticket.id.toString() === id;
  });

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
