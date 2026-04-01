import { useEffect, useState } from "react";
import { getMockEvents } from "../services/mockEventService";

export default function useEventsViewModel() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reserved, setReserved] = useState([])

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        const response = await getMockEvents();
        setEvents(response);
      } catch (err) {
        setError("No fue posible cargar los eventos.");
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  const reserveEvent = async (id) =>{
    if (reserved.includes(id)) return;

    setReserved((prev) => [...prev, id]);

    try {
      // api
    } catch (error) {
      setReserved((prev) =>
        prev.filter((itemId) => itemId !== id)
      );

    }
  }

  return {
    events,
    loading,
    error,
    reserveEvent,
    reserved
  };
}
