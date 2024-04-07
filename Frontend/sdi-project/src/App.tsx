import "./App.css";
import AddTicket from "./components/AddTicket/AddTicket";
import HomePage from "./components/HomePage/HomePage";
import ListOfTickets from "./components/ListOfTickets/ListOfTickets";
import TicketDetails from "./components/TicketDetails/TicketDetails";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import EditTicket from "./components/Edit Ticket/EditTicket";
import { Toaster } from "react-hot-toast";
import useTicketStore from "./zustandStores/ticketStore";

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
