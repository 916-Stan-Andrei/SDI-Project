import { useState } from "react";
import Ticket from "../../entities/Ticket";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { addTicket, fetchTickets } from "../../services/TicketService";

function AddTicket() {
  const navigate = useNavigate();

  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [type, setType] = useState("");
  const [ticketPriorityLevel, setTicketPriorityLevel] = useState("");

  const handleBackToHome = () => {
    navigate("/tickets");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
    const newTicket: Ticket = {
      eventName,
      eventDate,
      purchaseDate,
      type,
      ticketPriorityLevel: Number(ticketPriorityLevel), // Convert ticketPriorityLevel to a number
    };
    await addTicket(newTicket);
    await fetchTickets();
    toast.success("Ticket added!");
    navigate("/tickets"); // Navigate back to the home page
  };

  return (
    <div className="add-ticket-container">
      <h2>Add Ticket</h2>
      <form onSubmit={handleSubmit} className="ticket-form">
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
        <button type="submit" className="btn btn-success">
          Add Ticket
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

export default AddTicket;
