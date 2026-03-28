import { useState } from "react";
import { createMockReservation } from "../services/mockReservationService";

export default function useEventDetailViewModel(event) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const reserveSpot = async () => {
    setMessage("");
    setError("");

    try {
      setLoading(true);
      const response = await createMockReservation({ eventId: event?.id, seats: 1 });
      setMessage(response.message);
      return true;
    } catch (err) {
      setError("No fue posible crear la reservacion.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    message,
    error,
    reserveSpot,
  };
}
