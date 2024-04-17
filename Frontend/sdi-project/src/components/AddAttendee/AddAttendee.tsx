import { useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import Attendee from "../../entities/Attendee";
import "./AddAttendee.css";
import { addAttendee } from "../../services/AttendeeService";

function AddAttendee() {
  const navigate = useNavigate();
  const location = useLocation();
  const { ticketId } = location.state;
  console.log(ticketId);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [ticketOwner, setTicketOwner] = useState(false);

  const handleBackToHome = () => {
    navigate(-1);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!firstName || !lastName || !birthDate) {
      toast.error("Please fill in all fields.");
      return;
    }
    const newAttendee: Attendee = {
      firstName,
      lastName,
      birthDate,
      ticketOwner,
      ticketId,
    };
    await addAttendee(newAttendee);
    toast.success("Attendee added!");
    navigate(-1);
  };
  return (
    <div className="add-ticket-container">
      <h2>Add Attendee</h2>
      <form onSubmit={handleSubmit} className="ticket-form">
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            className="form-control"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            className="form-control"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="birthDate">Birth Date:</label>
          <input
            type="date"
            id="birthDate"
            className="form-control"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="ticketOwner">Is ticket owner?:</label>
          <input
            type="checkbox"
            id="ticketOwner"
            className="form-check-input"
            checked={ticketOwner}
            onChange={(e) => setTicketOwner(e.target.checked)}
          />
        </div>
        <button type="submit" className="btn btn-success">
          Add Attendee
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

export default AddAttendee;
