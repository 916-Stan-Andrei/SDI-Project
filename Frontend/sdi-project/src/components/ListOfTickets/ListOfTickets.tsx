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
  const [selectedTicketsToDelete, setSelectedTicketsToDelete] = useState<
    number[]
  >([]);
  const [isDeleteMultipleMode, setIsDeleteMultipleMode] = useState(false);
  const [selectedTicketsToExport, setSelectedTicketsToExport] = useState<
    number[]
  >([]);
  const [isExportMultipleMode, setIsExportMultipleMode] = useState(false);

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
    setSelectedTicketsToDelete([]);
  };

  const handleDeleteSelected = () => {
    setTickets(
      tickets.filter((ticket) => !selectedTicketsToDelete.includes(ticket.id))
    );
    setSelectedTicketsToDelete([]);
  };

  const handleCheckboxChangeForDelete = (ticketId: number) => {
    setSelectedTicketsToDelete((prevState) => {
      if (prevState.includes(ticketId)) {
        return prevState.filter((id) => id !== ticketId);
      } else {
        return [...prevState, ticketId];
      }
    });
  };

  // Export
  const toggleExportMultipleMode = () => {
    setIsExportMultipleMode((prevMode) => !prevMode);
    setSelectedTicketsToExport([]);
  };

  const handleCheckboxChangeForExport = (ticketId: number) => {
    setSelectedTicketsToExport((prevState) => {
      if (prevState.includes(ticketId)) {
        return prevState.filter((id) => id !== ticketId);
      } else {
        return [...prevState, ticketId];
      }
    });
  };

  const handleExportToJSONSelected = () => {
    const selectedTickets = tickets.filter((ticket) =>
      selectedTicketsToExport.includes(ticket.id)
    );
    const json = JSON.stringify(selectedTickets, null, 2);
    // Code to download JSON file
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "tickets.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleExportToCSVSelected = () => {
    const selectedTickets = tickets.filter((ticket) =>
      selectedTicketsToExport.includes(ticket.id)
    );
    const csv = selectedTickets
      .map((ticket) => {
        return `id: ${ticket.id}, Name: ${ticket.eventName}, Date: ${ticket.eventDate}, Purchase Date: ${ticket.purchaseDate}, Type: ${ticket.type}, Priority: ${ticket.ticketPriorityLevel}`;
      })
      .join("\n");
    // Code to download CSV file
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "tickets.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
        {!isExportMultipleMode && (
          <button
            type="button"
            className="btn btn-danger"
            onClick={toggleDeleteMultipleMode}
          >
            {!isDeleteMultipleMode ? "Delete Multiple" : "Normal Delete"}
          </button>
        )}
        {isDeleteMultipleMode && (
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleDeleteSelected}
            disabled={selectedTicketsToDelete.length === 0}
          >
            Delete Selected
          </button>
        )}
        {isExportMultipleMode ? (
          <>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleExportToJSONSelected}
              disabled={selectedTicketsToExport.length === 0}
            >
              Export to JSON
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleExportToCSVSelected}
              disabled={selectedTicketsToExport.length === 0}
            >
              Export to CSV
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={toggleExportMultipleMode}
            >
              Exit Export Mode
            </button>
          </>
        ) : (
          !isDeleteMultipleMode && (
            <button
              type="button"
              className="btn btn-primary"
              onClick={toggleExportMultipleMode}
            >
              Export
            </button>
          )
        )}
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
                    checked={selectedTicketsToDelete.includes(ticket.id)}
                    onChange={() => handleCheckboxChangeForDelete(ticket.id)}
                  ></input>
                )}
                {isExportMultipleMode && (
                  <input
                    type="checkbox"
                    checked={selectedTicketsToExport.includes(ticket.id)}
                    onChange={() => handleCheckboxChangeForExport(ticket.id)}
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
