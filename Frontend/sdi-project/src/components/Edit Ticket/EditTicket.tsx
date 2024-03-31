import { useNavigate, useParams } from "react-router-dom";
import Ticket from "../../entities/Ticket";
import { useState } from "react";
import "./EditTicket.css";
import toast from "react-hot-toast";
import { fetchTickets, updateTicket } from "../../services/ApiService";

interface EditTicketProp {
  tickets: Ticket[];
  setTickets: (tickets: Ticket[]) => void;
}

interface EditableTicket {
  ticketToEdit: Ticket;
  tickets: Ticket[];
  setTickets: (tickets: Ticket[]) => void;
}

function EditTicketWrapper({ tickets, setTickets }: EditTicketProp) {
  const { id } = useParams<{ id: string }>(); // Fetch the id from URL path
  console.log(id);

  // Find the ticket with the given id
  const ticketToEdit = tickets.find((ticket) => {
    if (ticket.id !== undefined) {
      return ticket.id.toString() === id;
    }
  });

  if (!ticketToEdit) {
    return <div>Ticket not found!</div>;
  }

  return (
    <EditTicket
      ticketToEdit={ticketToEdit}
      tickets={tickets}
      setTickets={setTickets}
    />
  );
}

function EditTicket({ ticketToEdit, tickets, setTickets }: EditableTicket) {
  const navigate = useNavigate();

  const [eventName, setEventName] = useState(ticketToEdit.eventName);
  const [eventDate, setEventDate] = useState(ticketToEdit.eventDate);
  const [purchaseDate, setPurchaseDate] = useState(ticketToEdit.purchaseDate);
  const [type, setType] = useState(ticketToEdit.type);
  const [ticketPriorityLevel, setTicketPriorityLevel] = useState(
    ticketToEdit.ticketPriorityLevel.toString()
  );

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !eventName ||
      !eventDate ||
      !purchaseDate ||
      !type ||
      !ticketPriorityLevel
    ) {
      toast.error("Please fill in all fields.");
      return;
    }

    // Check if ticketPriorityLevel is not a number
    if (isNaN(Number(ticketPriorityLevel))) {
      toast.error("Ticket Priority Level must be a numerical value.");
      return;
    }

    if (
      eventName === ticketToEdit.eventName &&
      eventDate === ticketToEdit.eventDate &&
      purchaseDate === ticketToEdit.purchaseDate &&
      type === ticketToEdit.type &&
      ticketPriorityLevel === ticketToEdit.ticketPriorityLevel.toString()
    ) {
      toast.error("No changes detected. Please make modifications to save.");
      return;
    }

    // Create a new array with the updated ticket
    const updatedTicket: Ticket = {
      id: ticketToEdit.id,
      eventName,
      eventDate,
      purchaseDate,
      type,
      ticketPriorityLevel: Number(ticketPriorityLevel), // Convert ticketPriorityLevel to a number
    };

    await updateTicket(updatedTicket);
    await fetchTickets({ tickets, setTickets });
    toast.success("The ticket modifications are saved");
    navigate("/tickets");
  };

  const handleBackToHome = () => {
    navigate("/tickets");
  };

  return (
    <div className="edit-ticket-container">
      <h2>Edit Ticket</h2>
      <form onSubmit={handleEdit} className="ticket-form">
        <div className="form-group">
          <label htmlFor="eventName">Event Name:</label>
          <input
            type="text"
            id="eventName"
            className="form-control"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="eventDate">Event Date:</label>
          <input
            type="date"
            id="eventDate"
            className="form-control"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="purchaseDate">Purchase Date:</label>
          <input
            type="date"
            id="purchaseDate"
            className="form-control"
            value={purchaseDate}
            onChange={(e) => setPurchaseDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="type">Type:</label>
          <input
            type="text"
            id="type"
            className="form-control"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="ticketPriorityLevel">Ticket Priority Level:</label>
          <input
            type="text"
            id="ticketPriorityLevel"
            className="form-control"
            value={ticketPriorityLevel}
            onChange={(e) => setTicketPriorityLevel(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-warning">
          Edit Ticket
        </button>
      </form>
      <button
        type="button"
        className="btn btn-primary"
        onClick={handleBackToHome}
      >
        Back
      </button>
    </div>
  );
}

export default EditTicketWrapper;
