import { useEffect, useState } from "react";
import { mockTickets } from "../models/mockData";

export default function useTicketsViewModel() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    setTickets(mockTickets);
  }, []);

  return {
    tickets,
  };
}
