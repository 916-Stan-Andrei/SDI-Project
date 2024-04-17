import { render } from "@testing-library/react";
import ListOfTickets from "../components/ListOfTickets/ListOfTickets";
import Ticket from "../entities/Ticket";

const tickets: Ticket[] = [
  {
    ticketId: 0,
    eventName: "Event 1",
    eventDate: "eventDate 1",
    purchaseDate: "purchaseDate 1",
    type: "type 1",
    ticketPriorityLevel: 1,
  },
  {
    ticketId: 1,
    eventName: "Event 2",
    eventDate: "eventDate 2",
    purchaseDate: "purchaseDate 2",
    type: "type 2",
    ticketPriorityLevel: 2,
  },
];

// Mock useNavigate
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

const setTicketsMock = jest.fn();

describe("ListOfTickets", () => {
  const { getByText, getByRole, getAllByRole } = render(<ListOfTickets />);

  test("renders title ant table data correctly", () => {
    expect(getByText("Ticket List")).toBeInTheDocument();
    expect(getByRole("table")).toBeInTheDocument();
    expect(getAllByRole("row")).toHaveLength(tickets.length + 1);
    tickets.forEach((ticket) => {
      expect(getByText(ticket.eventName)).toBeInTheDocument();
      expect(getByText(ticket.eventDate)).toBeInTheDocument();
    });
    expect(getByText("Actions")).toBeInTheDocument();
  });

  test("renders buttons", () => {});
});
