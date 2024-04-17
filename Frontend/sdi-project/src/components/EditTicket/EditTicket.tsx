import { useNavigate, useParams } from "react-router-dom";
import Ticket from "../../entities/Ticket";
import { useEffect, useState } from "react";
import "./EditTicket.css";
import toast from "react-hot-toast";
import {
  fetchTickets,
  getTicket,
  updateTicket,
} from "../../services/TicketService";

function EditTicket() {
  const { id } = useParams<{ id: string }>();

  const [ticket, setTicket] = useState<Ticket | null>(null);

  useEffect(() => {
    const fetchTicket = async () => {
      if (id) {
        try {
          const ticketData = await getTicket(parseInt(id));
          setTicket(ticketData);
        } catch (error) {
          console.error("Error getting ticket: ", error);
        }
      }
    };

    fetchTicket();
  }, [id]);

  const navigate = useNavigate();
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [type, setType] = useState("");
  const [ticketPriorityLevel, setTicketPriorityLevel] = useState("");

  useEffect(() => {
    if (ticket) {
      setEventName(ticket.eventName);
      setEventDate(ticket.eventDate);
      setPurchaseDate(ticket.purchaseDate);
      setType(ticket.type);
      setTicketPriorityLevel(ticket.ticketPriorityLevel.toString());
    }
  }, [ticket]);

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
      eventName === ticket?.eventName &&
      eventDate === ticket?.eventDate &&
      purchaseDate === ticket?.purchaseDate &&
      type === ticket?.type &&
      ticketPriorityLevel === ticket?.ticketPriorityLevel.toString()
    ) {
      toast.error("No changes detected. Please make modifications to save.");
      return;
    }

    // Create a new array with the updated ticket
    const updatedTicket: Ticket = {
      ticketId: ticket?.ticketId,
      eventName,
      eventDate,
      purchaseDate,
      type,
      ticketPriorityLevel: Number(ticketPriorityLevel), // Convert ticketPriorityLevel to a number
    };

    await updateTicket(updatedTicket);
    await fetchTickets();
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

export default EditTicket;
