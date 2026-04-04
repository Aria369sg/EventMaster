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
    const selectedEvent = events.find((event) => event.id === id);

    if ((selectedEvent?.seatsLeft ?? 1) <= 0) {
      return false;
    }

    setReserved((prev) => [...prev, id]);
    setEvents((prev) =>
      prev.map((event) =>
        event.id === id
          ? { ...event, seatsLeft: Math.max((event.seatsLeft ?? 1) - 1, 0) }
          : event,
      ),
    );

    try {
      // api
      return true;
    } catch (error) {
      setEvents((prev) =>
        prev.map((event) =>
          event.id === id
            ? { ...event, seatsLeft: (event.seatsLeft ?? 0) + 1 }
            : event,
        ),
      );
      setReserved((prev) =>
        prev.filter((itemId) => itemId !== id)
      );
      return false;
    }
  }

  const deleteEvent = (eventId) => {
  setEvents((prev) =>
    prev.filter((event) => event.id !== eventId)
  );

    //api
  };

  const editEvent = (eventId, updatedData) => {
    setEvents((prev) =>
      prev.map((event) =>
        event.id === eventId
          ? { ...event, ...updatedData }
          : event
      )
    );
      //api
  };

  const createEvent = (newEvent) => {
    const newId = Date.now(); // mock id

    setEvents((prev) => [
      ...prev,
      { id: newId, seatsLeft: Number(newEvent.capacity) || 0, ...newEvent }
    ]);
  };

  return {
    events,
    loading,
    error,
    reserveEvent,
    reserved,
    deleteEvent,
    editEvent,
    createEvent
  };
}
