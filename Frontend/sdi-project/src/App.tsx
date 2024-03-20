import { useEffect, useState } from "react";
import "./App.css";
import AddTicket from "./components/AddTicket/AddTicket";
import HomePage from "./components/HomePage/HomePage";
import ListOfTickets from "./components/ListOfTickets/ListOfTickets";
import TicketDetails from "./components/TicketDetails/TicketDetails";
import TicketData from "./data/TicketData";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import EditTicketWrapper from "./components/Edit Ticket/EditTicket";
import { Toaster } from "react-hot-toast";

function App() {
  const [tickets, setTickets] = useState(() => {
    const saved = localStorage.getItem("tickets");
    if (saved) {
      const initialValue = JSON.parse(saved);
      return initialValue || "";
    } else {
      return TicketData;
    }
  });

  useEffect(() => {
    localStorage.setItem("tickets", JSON.stringify(tickets));
  }, [tickets]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/tickets",
      element: <ListOfTickets tickets={tickets} setTickets={setTickets} />,
    },
    {
      path: "/ticket/add",
      element: <AddTicket tickets={tickets} setTickets={setTickets} />,
    },
    {
      path: "/ticket/details/:id",
      element: <TicketDetails tickets={tickets} />,
    },
    {
      path: "/ticket/edit/:id",
      element: <EditTicketWrapper tickets={tickets} setTickets={setTickets} />,
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
