import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Attendee from "../../entities/Attendee";
import {
  getAttendeeById,
  updateAttendee,
} from "../../services/AttendeeService";
import toast from "react-hot-toast";

function EditAttendee() {
  const { id } = useParams<{ id: string }>();
  const [attendee, setAttendee] = useState<Attendee | null>(null);

  useEffect(() => {
    const getAttendee = async () => {
      try {
        const data = await getAttendeeById(Number(id));
        setAttendee(data);
      } catch (error) {
        console.error("Error fetching ticket:", error);
      }
    };

    getAttendee();
  }, [id]);

  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [isTicketOwner, setIsTicketOwner] = useState(false); // Initially set to false

  useEffect(() => {
    if (attendee) {
      setFirstName(attendee.firstName);
      setLastName(attendee.lastName);
      setBirthDate(attendee.birthDate);
      setIsTicketOwner(attendee.ticketOwner); // Set directly from the attendee data
    }
  }, [attendee]);

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!firstName || !lastName || !birthDate) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (
      firstName === attendee?.firstName &&
      lastName === attendee.lastName &&
      birthDate === attendee.birthDate &&
      isTicketOwner === attendee.ticketOwner
    ) {
      toast.error("No changes detected. Please make modifications to save.");
      return;
    }

    const updatedAttendee: Attendee = {
      id: attendee?.id,
      firstName,
      lastName,
      birthDate,
      ticketOwner: isTicketOwner,
    };

    await updateAttendee(updatedAttendee);
    toast.success("The attendee modifications are saved");
    navigate(-1);
  };

  const handleBackToHome = () => {
    navigate(-1);
  };

  return (
    <div>
      <h2>Edit Attendee</h2>
      <form onSubmit={handleEdit} className="ticket-form">
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
          <label htmlFor="isTicketOwner">Is ticket owner?:</label>
          <input
            type="checkbox"
            id="isTicketOwner"
            className="form-check-input"
            checked={isTicketOwner}
            onChange={(e) => setIsTicketOwner(e.target.checked)}
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

export default EditAttendee;
