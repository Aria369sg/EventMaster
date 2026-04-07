import { useEffect, useState } from "react";
import {getAllEvents, createEvent as createEventAPI, deleteEvent as deleteEventAPI, updateEvent as updateEventAPI} from "../services/eventService"
import { createReservation } from "../services/reservationsService";
import { getUserIdFromToken } from "../helpers/StorageService";
import StorageService from "../helpers/StorageService";
import { STORAGE_KEYS } from "../models/storageKeys";

export default function useEventsViewModel() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reserved, setReserved] = useState([])

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        const response = await getAllEvents();

        const mappedEvents = response.map((event) => ({
          id: event._id,
          name: event.name,
          description: event.description,
          date: event.date,
          location: event.location,
          capacity: event.capacity,
          seatsLeft: event.availableSeats,
          status: event.status,
        }));

        setEvents(mappedEvents);

        await StorageService.setItem(STORAGE_KEYS.events, mappedEvents);
      } catch (err) {
        console.log("Sin internet, intentando desde cache");
        
        const cacheEvents = await StorageService.getItem(STORAGE_KEYS.events);

        if (cacheEvents){
          setEvents(cacheEvents);
        }
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  const reserveEvent = async (id) => {
    if (reserved.includes(id)) return;
    const userId = await getUserIdFromToken();


    const selectedEvent = events.find((event) => event.id === id);

    if ((selectedEvent?.seatsLeft ?? 1) <= 0) {
      return false;
    }

    setReserved((prev) => [...prev, id]);
    setEvents((prev) =>
      prev.map((event) =>
        event.id === id
          ? { ...event, seatsLeft: Math.max(event.seatsLeft - 1, 0) }
          : event
      )
    );

    try {
      await createReservation({
        idUser: userId,
        idEvent: id,
        seats: 1,
      });

      return true;
    } catch (error) {
      console.log("ERROR RESERVA FULL:", JSON.stringify(error.response?.data, null, 2));
      console.log("STATUS:", error.response?.status);

      setEvents((prev) =>
        prev.map((event) =>
          event.id === id
            ? { ...event, seatsLeft: event.seatsLeft + 1 }
            : event
        )
      );

      setReserved((prev) =>
        prev.filter((itemId) => itemId !== id)
      );

      return false;
    }
  };

  const deleteEvent = async (eventId) => {
    setEvents((prev) =>
      prev.filter((event) => event.id !== eventId)
    );

    try {
      await deleteEventAPI(eventId);
    } catch (error) {
      console.log("ERROR DELETE:", error);
    }
  };

  const editEvent = async (eventId, updatedData) => {
    setEvents((prev) =>
      prev.map((event) =>
        event.id === eventId
          ? { ...event, ...updatedData }
          : event
      )
    );

    try {
      await updateEventAPI(eventId, updatedData);
    } catch (error) {
      console.log("ERROR UPDATE:", error);
    }
  };

  const createEvent = async (newEvent) => {
    try {
      const response = await createEventAPI(newEvent);

      const createdEvent = response.event || {
        id: Date.now(),
        ...newEvent
      };

      setEvents((prev) => [
        ...prev,
        createdEvent
      ]);
    } catch (error) {
      console.log("ERROR CREATE:", error);
    }
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
