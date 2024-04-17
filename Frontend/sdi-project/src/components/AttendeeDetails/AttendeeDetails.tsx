import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAttendeeById } from "../../services/AttendeeService";
import Attendee from "../../entities/Attendee";

function AttendeeDetails() {
  const { id } = useParams<{ id: string }>();
  const [attendee, setAttendee] = useState<Attendee | null>();

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

  const handleBackToHome = () => {
    navigate(-1);
  };

  return (
    <div className="ticket-details-container">
      <h2>Ticket Details</h2>
      <div className="ticket-info">
        <p>First Name: {attendee?.firstName}</p>
        <p>Last Name: {attendee?.lastName}</p>
        <p>Birthdate: {attendee?.birthDate}</p>
        <p>{attendee?.ticketOwner ? "Owner" : "Not Owner"}</p>
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

export default AttendeeDetails;
