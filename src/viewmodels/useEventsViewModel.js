import { useEffect, useState } from "react";
import { getMockEvents } from "../services/mockEventService";

export default function useEventsViewModel() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  return {
    events,
    loading,
    error,
  };
}
