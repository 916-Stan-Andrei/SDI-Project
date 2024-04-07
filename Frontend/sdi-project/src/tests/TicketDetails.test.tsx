import { render, getByText } from "@testing-library/react"; // Import getByText

import Ticket from "../entities/Ticket";
import TicketDetails from "../components/TicketDetails/TicketDetails";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({ id: "1" }),
  useRouteMatch: () => ({ url: "/ticket/details/id" }),
}));

const tickets: Ticket[] = [
  {
    id: 1,
    eventName: "Event 1",
    eventDate: "2024-03-20",
    purchaseDate: "2024-03-18",
    type: "General",
    ticketPriorityLevel: 1,
  },
];

describe("TicketDetails ", () => {
  test("should render ticket details correctly", () => {
    const { getByText } = render(<TicketDetails />);
    expect(getByText("Ticket Details")).toBeInTheDocument();
    expect(getByText("Event Name: Event 1")).toBeInTheDocument();
    expect(getByText("Event Date: 2024-03-20")).toBeInTheDocument();
    expect(getByText("Purchase Date: 2024-03-18")).toBeInTheDocument();
    expect(getByText("Type: General")).toBeInTheDocument();
    expect(getByText("Ticket Priority Level: 1")).toBeInTheDocument();
  });
});
