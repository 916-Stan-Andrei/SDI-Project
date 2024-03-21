import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Ticket from "../../entities/Ticket";
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
  const [selectedTickets, setSelectedTickets] = useState<number[]>([]);
  const [isDeleteMultipleMode, setIsDeleteMultipleMode] = useState(false);

  // Navigation
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

  // Single delete
  const handleDeleteTicket = (ticketId: string | number) => {
    setDeleteTicketId(ticketId);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (deleteTicketId !== null) {
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

  // Bulk delete
  const toggleDeleteMultipleMode = () => {
    setIsDeleteMultipleMode((prevMode) => !prevMode);
    setSelectedTickets([]);
  };

  const handleDeleteSelected = () => {
    setTickets(
      tickets.filter((ticket) => !selectedTickets.includes(ticket.id))
    );
    setSelectedTickets([]);
  };

  const handleCheckboxChange = (ticketId: number) => {
    setSelectedTickets((prevState) => {
      if (prevState.includes(ticketId)) {
        return prevState.filter((id) => id !== ticketId);
      } else {
        return [...prevState, ticketId];
      }
    });
  };

  // Export tickets to CSV
  const exportToCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8,";
    const header = Object.keys(tickets[0]).join(",");
    const rows = tickets.map((ticket) => Object.values(ticket).join(","));
    const csv = [header, ...rows].join("\n");
    const encodedURI = encodeURI(csvContent + csv);
    const link = document.createElement("a");
    link.setAttribute("href", encodedURI);
    link.setAttribute("download", "tickets.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="ticket-list-container">
      <h2>Ticket List</h2>
      <div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleAddTicket}
        >
          Add
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={toggleDeleteMultipleMode}
        >
          {!isDeleteMultipleMode ? "Delete Multiple" : "Normal Delete"}
        </button>
        {isDeleteMultipleMode && (
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleDeleteSelected}
          >
            Delete Selected
          </button>
        )}
        <button type="button" className="btn btn-primary" onClick={exportToCSV}>
          Export CSV
        </button>
      </div>
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
                {!isDeleteMultipleMode && (
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleDeleteTicket(ticket.id)}
                  >
                    Delete
                  </button>
                )}
                {isDeleteMultipleMode && (
                  <input
                    type="checkbox"
                    checked={selectedTickets.includes(ticket.id)}
                    onChange={() => handleCheckboxChange(ticket.id)}
                  ></input>
                )}
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
