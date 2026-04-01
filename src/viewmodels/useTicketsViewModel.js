import { useEffect, useState } from "react";
import { mockTickets } from "../models/mockData";

export default function useTicketsViewModel() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    setTickets(mockTickets);
  }, []);

  const cancelTicket = (ticketId) => {
    setTickets((prev)=>
      prev.filter((ticket) => ticket.id !== ticketId)
    );

    //api
  }

  return {
    tickets,
    cancelTicket
  };
}
