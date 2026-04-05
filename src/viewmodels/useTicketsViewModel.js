import { useEffect, useState } from "react";
import {  reservations, cancelReservation } from "../services/reservationsService";

export default function useTicketsViewModel() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadReservations = async () => {
    try {
      setLoading(true);

      const response = await reservations();

      const mappedTickets = response.filter((item) => item.status !== "cancelled").map((item)  => ({
        id: item._id,
        title: item.idEvent?.name,
        date: item.idEvent?.date,
        location: item.idEvent?.location,
        seats: item.seats,
      }));
      console.log("RESPONSE RESERVATIONS:", response);

      setTickets(mappedTickets);
    } catch (error) {
      console.log("Error cargando reservaciones:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReservations();
  }, []);

  const cancelTicket = async (ticketId) => {
    try {
      await cancelReservation(ticketId);

      setTickets((prev) =>
        prev.filter((ticket) => ticket.id !== ticketId)
      );

    } catch (error) {
      const message = error.response?.data?.message;

      console.log("ERROR:", message);

      if (message === "Reservation already cancelled") {
        setTickets((prev) =>
          prev.filter((ticket) => ticket.id !== ticketId)
        );
        return;
      }
      

      console.log("Error cancelando reservación:", error);
    } finally {
      await loadReservations();
    }

  };

  return {
    tickets,
    loading,
    cancelTicket,
    reload: loadReservations,
  };
}