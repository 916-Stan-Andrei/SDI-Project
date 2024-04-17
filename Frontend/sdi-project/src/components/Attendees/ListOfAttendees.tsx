import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteAttendee,
  fetchAttendeesForTicket,
} from "../../services/AttendeeService";
import Attendee from "../../entities/Attendee";
import "./ListOfAttendees.css";
import ConfirmationModal from "../DeleteConfirmationModal/ConfirmationModal";
import toast from "react-hot-toast";

function ListOfAttendees() {
  const { ticketId } = useParams<{ ticketId: string }>();
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteAttendeeId, setDeleteAttendeeId] = useState<
    string | number | null
  >(null);

  useEffect(() => {
    const fetchAttendees = async () => {
      try {
        const ticketIdNumber = parseInt(ticketId!);
        if (isNaN(ticketIdNumber)) {
          throw new Error("Invalid ticketId");
        }
        const data = await fetchAttendeesForTicket(ticketIdNumber);
        setAttendees(data);
      } catch (error) {
        console.error("Error fetching attendees", error);
      }
    };
    fetchAttendees();
  }, [ticketId, attendees]);

  //Navigation

  const navigate = useNavigate();

  const handleViewClicked = (attendeeId: number) => {
    navigate(`/attendee/${attendeeId}`);
  };

  const handleEditClicked = (attendeeId: Number) => {
    navigate(`/attendee/edit/${attendeeId}`);
  };

  const handleBackToHome = () => {
    navigate("/tickets");
  };

  const handleAddClicked = () => {
    navigate("/attendee/add", { state: { ticketId: ticketId } });
  };

  // Delete
  const handleDeleteAttendee = (attendeeId: string | number | null) => {
    setDeleteAttendeeId(attendeeId);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (deleteAttendeeId !== null) {
      await deleteAttendee(Number(deleteAttendeeId));
      toast.success("Ticket deleted successfully");
    }
    setIsModalOpen(false);
    setDeleteAttendeeId(null);
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
    setDeleteAttendeeId(null);
  };

  return (
    <div>
      <h2>List of Attendees</h2>
      <button
        type="button"
        className="btn btn-primary"
        onClick={handleAddClicked}
      >
        Add
      </button>
      <table className="table table-dark">
        <thead>
          <tr>
            <th scope="col">First Name</th>
            <th scope="col">Last Date</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {attendees.map((attendee) => (
            <tr key={attendee.id}>
              <td>{attendee.firstName}</td>
              <td>{attendee.lastName}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => handleViewClicked(attendee.id!)}
                >
                  View
                </button>
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={() => handleEditClicked(attendee.id!)}
                >
                  Edit
                </button>

                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleDeleteAttendee(attendee.id!)}
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

export default ListOfAttendees;
