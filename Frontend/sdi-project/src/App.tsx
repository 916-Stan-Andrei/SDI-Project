import "./App.css";
import AddTicket from "./components/AddTicket/AddTicket";
import HomePage from "./components/HomePage/HomePage";
import ListOfTickets from "./components/ListOfTickets/ListOfTickets";
import TicketDetails from "./components/TicketDetails/TicketDetails";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import EditTicket from "./components/EditTicket/EditTicket";
import { Toaster } from "react-hot-toast";
import ListOfAttendees from "./components/Attendees/ListOfAttendees";
import AttendeeDetails from "./components/AttendeeDetails/AttendeeDetails";
import EditAttendee from "./components/EditAttendee/EditAttendee";
import AddAttendee from "./components/AddAttendee/AddAttendee";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/tickets",
      element: <ListOfTickets />,
    },
    {
      path: "/ticket/add",
      element: <AddTicket />,
    },
    {
      path: "/ticket/details/:id",
      element: <TicketDetails />,
    },
    {
      path: "/ticket/edit/:id",
      element: <EditTicket />,
    },
    {
      path: "/attendees/:ticketId",
      element: <ListOfAttendees />,
    },
    {
      path: "/attendee/:id",
      element: <AttendeeDetails />,
    },
    {
      path: "/attendee/edit/:id",
      element: <EditAttendee />,
    },
    {
      path: "/attendee/add",
      element: <AddAttendee />,
    },
  ]);
  return (
    <>
      <div>
        <Toaster />
      </div>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
