import { useNavigate } from "react-router-dom";
import Ticket from "../../entities/Ticket";
import { useState } from "react";
import ConfirmationModal from "../DeleteConfirmationModal/ConfirmationModal";
import "./ListOfTickets.css";
import toast from "react-hot-toast";

interface ListOfTicketsProps {
  tickets: Ticket[];
  setTickets: (tickets: Ticket[]) => void;
}

function ListOfTickets({ tickets, setTickets }: ListOfTicketsProps) {
  const [deleteTicketId, setDeleteTicketId] = useState<string | number | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleAddTicket = () => {
    navigate("/ticket/add");
  };

  const handleViewDetails = (ticketId: number) => {
    navigate(`/ticket/details/${ticketId}`);
  };

  const handleEdit = (ticketId: number) => {
    navigate(`/ticket/edit/${ticketId}`);
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  const handleDeleteTicket = (ticketId: string | number) => {
    setDeleteTicketId(ticketId);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (deleteTicketId !== null) {
      // Remove the ticket with the specified ID
      setTickets(tickets.filter((ticket) => ticket.id !== deleteTicketId));
      toast.success("Ticket deleted successfully");
    }
    setIsModalOpen(false);
    setDeleteTicketId(null);
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
    setDeleteTicketId(null);
  };

  return (
    <div className="ticket-list-container">
      <h2>Ticket List</h2>
      <button
        type="button"
        className="btn btn-primary"
        onClick={handleAddTicket}
      >
        Add
      </button>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Event Name</th>
            <th scope="col">Event Date</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.id}>
              <td>{ticket.eventName}</td>
              <td>{ticket.eventDate}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => handleViewDetails(ticket.id)}
                >
                  View
                </button>
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={() => handleEdit(ticket.id)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleDeleteTicket(ticket.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={handleBackToHome}
        type="button"
        className="btn btn-primary"
      >
        Back
      </button>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}

export default ListOfTickets;
